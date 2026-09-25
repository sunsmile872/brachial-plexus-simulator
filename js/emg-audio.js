/**
 * Real-time EMG Audio Synthesizer & Oscilloscope Visualizer
 * Accurately simulates acoustic and oscilloscope waveform signatures of:
 * - Normal voluntary MUAP
 * - Fibrillation Potentials (Fibs)
 * - Positive Sharp Waves (PSWs)
 * - Myokymic Discharges (Radiation Plexopathy hallmark)
 * - Fasciculations
 * - Complex Repetitive Discharges (CRD)
 */

class EMGAudioEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.audioCtx = null;
    this.gainNode = null;
    this.analyser = null;
    this.audioElement = null;
    this.mediaSourceNode = null;
    this.dataArray = null;
    this.isPlaying = false;
    this.playbackMode = 'real'; // 'real' (clinical recording) or 'synth' (Web Audio procedural)
    this.currentMode = 'normal'; // 'normal', 'normal_insertional', 'fibs', 'psws', 'psw_to_fibs', 'fascics', 'myokymia', 'myotonia', 'neuromyotonia', 'cramp', 'crd'
    this.timerId = null;
    this.animFrameId = null;
    this.volume = 0.75; // Audibly tuned default (75%)
    this.timebase = 10; // ms/div (total 10 divisions = 100 ms)
    this.gain = 50; // uV/div
    this.waveHistory = [];
    this.sweepX = 0;

    this.gainSettings = {
      normal: 200,          // 200 uV/div
      normal_insertional: 100, // 100 uV/div
      fibs: 50,             // 50 uV/div
      psws: 50,             // 50 uV/div
      psw_to_fibs: 50,      // 50 uV/div
      fascics: 200,         // 200 uV/div
      myokymia: 100,        // 100 uV/div
      myotonia: 100,        // 100 uV/div
      neuromyotonia: 100,   // 100 uV/div
      cramp: 500,           // 500 uV/div
      crd: 100              // 100 uV/div
    };

    // Real Clinical Audio Catalog mapped from Google Drive recordings
    this.audioManifest = {
      normal: 'assets/audio/normal_biceps_muap.m4a',
      normal_insertional: 'assets/audio/normal_insertional_activity.m4a',
      fibs: 'assets/audio/fibrillation_potential.m4a',
      psws: 'assets/audio/positive_sharp_waves.m4a',
      psw_to_fibs: 'assets/audio/psw_to_fibs_transition.m4a',
      fascics: 'assets/audio/fasciculation_potentials.m4a',
      myokymia: 'assets/audio/myokymic_discharge.m4a',
      myotonia: 'assets/audio/myotonic_discharge.m4a',
      neuromyotonia: 'assets/audio/neuromyotonic_discharge.m4a',
      cramp: 'assets/audio/cramp_discharge.m4a',
      crd: null // procedurally synthesized
    };
    
    if (this.canvas) {
      this.initCanvas();
    }
  }

  initCanvas() {
    if (!this.canvas) {
      this.canvas = document.getElementById('emg-oscilloscope');
    }
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      const parentWidth = (this.canvas.parentElement && this.canvas.parentElement.clientWidth > 0) ? this.canvas.parentElement.clientWidth : 0;
      this.canvas.width = parentWidth > 50 ? parentWidth : 700;
      this.canvas.height = 200;
      this.drawGrid();
    }
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);

      // Create audio element for real recording playback
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(e => console.warn('AudioContext resume error:', e));
    }
  }

  setPlaybackSource(mode) {
    this.playbackMode = mode; // 'real' or 'synth'
    if (this.isPlaying) {
      this.stop();
      this.start(this.currentMode);
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  setMode(mode) {
    this.currentMode = mode;
    if (this.isPlaying) {
      this.stop();
      this.start(mode);
    }
  }

  start(mode) {
    if (mode) this.currentMode = mode;
    this.initAudio();
    this.isPlaying = true;

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(e => console.warn('AudioContext resume error:', e));
    }

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    const audioSrc = this.audioManifest[this.currentMode];
    if (this.playbackMode === 'real' && audioSrc) {
      // Real Clinical Recording Mode
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      if (this.audioElement) {
        try {
          this.audioElement.pause();
          this.audioElement.src = audioSrc;
          this.audioElement.currentTime = 0;
          this.audioElement.volume = this.volume;
          const playPromise = this.audioElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(e => {
              console.warn('Real audio playback failed, falling back to procedural synth:', e);
              this.scheduleNextDischarge();
            });
          }
        } catch (err) {
          console.warn('Real audio error, falling back to synth:', err);
          this.scheduleNextDischarge();
        }
      } else {
        this.scheduleNextDischarge();
      }
    } else {
      // Procedural Synthesis Mode
      if (this.audioElement) {
        try {
          this.audioElement.pause();
        } catch (e) {}
      }
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.scheduleNextDischarge();
    }

    this.animateOscilloscope();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch (e) {}
    }
    this.drawGrid();
  }

  scheduleNextDischarge() {
    if (!this.isPlaying || !this.audioCtx) return;

    let delay = 100;
    switch (this.currentMode) {
      case 'fibs':
        this.synthesizeFibrillation();
        delay = 50 + Math.random() * 120; // 8 - 20 Hz irregular clicking
        break;
      case 'psws':
        this.synthesizePSW();
        delay = 70 + Math.random() * 160; // 5 - 14 Hz dull thumps
        break;
      case 'psw_to_fibs':
        if (Math.random() > 0.5) this.synthesizePSW();
        else this.synthesizeFibrillation();
        delay = 60 + Math.random() * 140;
        break;
      case 'myokymia':
        this.synthesizeMyokymicBurst();
        delay = 800 + Math.random() * 300; // 1.0 - 1.1s rhythmic marching soldiers
        break;
      case 'myotonia':
        this.synthesizeMyotonia();
        delay = 1800; // Recurrent dive-bomber revving every 1.8s
        break;
      case 'neuromyotonia':
        this.synthesizeNeuromyotonia();
        delay = 15; // 60-150 Hz continuous pinging
        break;
      case 'cramp':
        this.synthesizeCrampDischarge();
        delay = 18 + Math.random() * 10; // 40-50 Hz dense motor firing
        break;
      case 'normal_insertional':
        this.synthesizeInsertionalActivity();
        delay = 600 + Math.random() * 800;
        break;
      case 'fascics':
        this.synthesizeFasciculation();
        delay = 600 + Math.random() * 2400; // 0.3 - 1.5 Hz sporadic popcorn
        break;
      case 'crd':
        this.synthesizeCRD();
        delay = 20; // ~50 Hz continuous ephaptic buzzing
        break;
      case 'normal':
      default:
        this.synthesizeNormalMUAP();
        delay = 70 + Math.random() * 30; // 10 - 14 Hz crisp firing
        break;
    }

    this.timerId = setTimeout(() => {
      this.scheduleNextDischarge();
    }, delay);
  }

  // --- SYNTHESIS ALGORITHMS ---

  synthesizeFibrillation() {
    // High-frequency clicking 'rain on tin roof': 1-3 ms duration, 1400-2400 Hz
    const now = this.audioCtx.currentTime + 0.005;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1600 + Math.random() * 800, now);
    
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(1.0, now + 0.001);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.018);

    this.recordWaveform('fib');
  }

  synthesizePSW() {
    // Positive Sharp Wave: sharp dull 'thump': initial rapid drop then slow exponential decay
    const now = this.audioCtx.currentTime + 0.005;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150 + Math.random() * 50, now);

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(1.0, now + 0.002);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.040);

    this.recordWaveform('psw');
  }

  synthesizeMyokymicBurst() {
    // Myokymia: 5-8 grouped potentials fired in rapid succession (35-45 Hz within burst)
    const burstCount = 5 + Math.floor(Math.random() * 3);
    const interval = 0.024; // ~42 Hz inside burst
    const now = this.audioCtx.currentTime + 0.005;

    for (let i = 0; i < burstCount; i++) {
      const t = now + i * interval;
      const osc = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260 + (i % 2) * 40, t);

      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.85, t + 0.002);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.016);

      osc.connect(g);
      g.connect(this.gainNode);
      osc.start(t);
      osc.stop(t + 0.018);

      setTimeout(() => this.recordWaveform('muap_burst'), i * interval * 1000);
    }
  }

  synthesizeFasciculation() {
    // Fasciculation: Low-mid frequency irregular punchy pop
    const now = this.audioCtx.currentTime + 0.005;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160 + Math.random() * 60, now);

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(1.1, now + 0.003);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.050);

    this.recordWaveform('fascic');
  }

  synthesizeCRD() {
    // Complex repetitive discharge: High pitch continuous buzzing machine gun
    const now = this.audioCtx.currentTime + 0.005;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280 + Math.random() * 20, now);

    g.gain.setValueAtTime(0.65, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.020);

    this.recordWaveform('crd');
  }

  synthesizeNormalMUAP() {
    // Normal Motor Unit Action Potential: Crisp thump/snappy sound
    const now = this.audioCtx.currentTime + 0.005;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220 + Math.random() * 60, now);

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.9, now + 0.002);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.020);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.022);

    this.recordWaveform('normal');
  }

  synthesizeMyotonia() {
    // Myotonic Discharge: Classic "Dive Bomber" or revving engine sound
    // Waxing then waning frequency (from 150 Hz down to 35 Hz) and amplitude
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime + 0.005;
    const duration = 1.4; // 1.4 sec per revving dive-bomb dive
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    // Frequency glide: starts high (~180 Hz), sweeps up slightly then dives down to 40 Hz
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.35); // rev up
    osc.frequency.exponentialRampToValueAtTime(38, now + duration); // dive bomber down

    // Amplitude waxing and waning
    g.gain.setValueAtTime(0.01, now);
    g.gain.linearRampToValueAtTime(0.9, now + 0.35);
    g.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + duration + 0.05);

    this.recordWaveform('myotonia');
  }

  synthesizeNeuromyotonia() {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime + 0.005;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220 + Math.random() * 40, now);
    g.gain.setValueAtTime(0.4, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.014);

    this.recordWaveform('crd');
  }

  synthesizeCrampDischarge() {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime + 0.005;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110 + Math.random() * 60, now);
    g.gain.setValueAtTime(0.8, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.028);

    this.recordWaveform('muap');
  }

  synthesizeInsertionalActivity() {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime + 0.005;
    const count = 8;
    for (let i = 0; i < count; i++) {
      const t = now + i * 0.015;
      const osc = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500 + Math.random() * 500, t);
      g.gain.setValueAtTime(0.7, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.012);
      osc.connect(g);
      g.connect(this.gainNode);
      osc.start(t);
      osc.stop(t + 0.015);
    }
    this.recordWaveform('fib');
  }

  recordWaveform(type) {
    this.waveHistory.push({
      type: type,
      timestamp: Date.now()
    });
    if (this.waveHistory.length > 50) this.waveHistory.shift();
  }

  // --- PHYSIOLOGICAL CLINICAL WAVEFORM CALCULATOR ---
  // Convention: Y is INVERTED on screen: Downward is POSITIVE (+), Upward is NEGATIVE (-)
  getPhysiologicalWaveform(type, t) {
    // t: normalized time around potential center (-1 to 1)
    let y = 0;
    switch (type) {
      case 'fib': {
        // Fibrillation Potential (Perotto / Preston & Shapiro):
        // Very brief spike (1-3 ms), high frequency.
        // 1. Initial positive (downward) deflection: small, rapid (approx 0.5 ms).
        // 2. Main negative (upward) spike: very high, razor-sharp peak (approx 1 ms).
        // 3. Terminal positive (downward) return: small, rapid recovery to baseline.
        if (t >= -0.4 && t <= 0.6) {
          if (t < -0.1) {
            // Initial downward positive phase
            const p = (t + 0.4) / 0.3; // 0 to 1
            y = Math.sin(p * Math.PI) * 22; // Downward (+)
          } else if (t < 0.25) {
            // Razor-sharp negative upward spike
            const p = (t + 0.1) / 0.35; // 0 to 1
            y = -Math.sin(p * Math.PI) * 82; // Upward (-)
          } else {
            // Terminal positive downward phase
            const p = (t - 0.25) / 0.35; // 0 to 1
            y = Math.sin(p * Math.PI) * 16; // Downward (+)
          }
        }
        break;
      }
      case 'psw': {
        // Positive Sharp Wave (PSW) (Perotto / Preston & Shapiro):
        // Distinctive asymmetric waveform:
        // 1. Initial phase: Instantaneous, steep, high-amplitude downward deflection (Positive drop).
        // 2. Second phase: Smooth, prolonged, low-voltage negative (upward) wave that gently decays back to baseline (10-30 ms).
        if (t >= -0.1 && t <= 1.4) {
          if (t < 0.1) {
            // Extremely steep sharp positive drop (instantaneous spike downward)
            const p = (t + 0.1) / 0.2; // 0 to 1
            y = Math.sin(p * (Math.PI / 2)) * 75; // Sharp plunge downward (+)
          } else {
            // Prolonged low-voltage negative upward recovery phase
            const p = (t - 0.1) / 1.3; // 0 to 1
            // Starts from peak positive (downward), crosses baseline into upward negative deflection, then slowly decays
            y = 75 * Math.exp(-p * 3.8) - Math.sin(p * Math.PI) * 28;
          }
        }
        break;
      }
      case 'normal':
      case 'muap': {
        // Normal Triphasic MUAP: 5-15 ms, 200-2000 uV
        // Initial positive (down), large negative spike (up), terminal positive (down)
        if (t >= -0.5 && t <= 0.9) {
          const p = (t + 0.5) / 1.4;
          if (p < 0.2) {
            y = Math.sin((p / 0.2) * Math.PI) * 20; // Initial positive
          } else if (p < 0.65) {
            y = -Math.sin(((p - 0.2) / 0.45) * Math.PI) * 75; // Sharp main negative spike
          } else {
            y = Math.sin(((p - 0.65) / 0.35) * Math.PI) * 22; // Terminal positive phase
          }
        }
        break;
      }
      case 'fascic': {
        // Fasciculation: Large polyphasic potential (4-6 phases, high amplitude)
        if (t >= -0.6 && t <= 1.0) {
          y = (Math.sin(t * Math.PI * 4) * 45 - Math.cos(t * Math.PI * 2) * 35) * Math.exp(-Math.pow(t - 0.2, 2) * 3.5);
        }
        break;
      }
      case 'myokymia': {
        // Grouped repetitive rhythmic bursts
        if (t >= 0 && t <= 1.5) {
          const burstIdx = Math.floor(t * 5);
          const subT = (t * 5) % 1;
          y = -Math.sin(subT * Math.PI * 2) * 50 * Math.exp(-Math.pow(subT - 0.5, 2) * 4);
        }
        break;
      }
      case 'myotonia': {
        // Waxing and waning high frequency bursts
        if (t >= -1.0 && t <= 1.0) {
          const amp = Math.sin((t + 1) * Math.PI * 0.5) * 48;
          y = Math.sin(t * Math.PI * 14) * amp;
        }
        break;
      }
      case 'crd': {
        // Uniform continuous ephaptic discharge
        y = Math.sin(t * Math.PI * 8) * 35 + Math.sin(t * Math.PI * 16) * 12;
        break;
      }
      case 'neuromyotonia': {
        // Neuromyotonic Discharge (Isaacs' syndrome / Peripheral nerve hyperexcitability):
        // Very high frequency discharge (150-300 Hz) with rapid repetitive spikes
        // Narrow biphasic spike potential (1-2 ms duration)
        if (t >= -0.45 && t <= 0.45) {
          y = -Math.sin(t * Math.PI * 2.2) * 58 * Math.exp(-Math.pow(t * 3.8, 2));
        }
        break;
      }
      case 'cramp': {
        // Muscle Cramp: Involuntary maximal multi-MUAP recruitment
        // Dense overlapping asynchronous potentials of varying amplitudes (40-60 Hz)
        const m1 = (t >= -0.55 && t <= 0.65) ? -Math.sin(t * Math.PI * 1.8) * 58 * Math.exp(-Math.pow(t * 2.2, 2)) : 0;
        const m2 = ((t - 0.22) >= -0.45 && (t - 0.22) <= 0.5) ? Math.sin((t - 0.22) * Math.PI * 2.5) * 36 * Math.exp(-Math.pow((t - 0.22) * 3, 2)) : 0;
        const m3 = ((t + 0.25) >= -0.45 && (t + 0.25) <= 0.5) ? -Math.sin((t + 0.25) * Math.PI * 3.0) * 28 * Math.exp(-Math.pow((t + 0.25) * 3.5, 2)) : 0;
        y = m1 + m2 + m3;
        break;
      }
      default:
        y = 0;
    }
    return y;
  }

  drawGrid() {
    if (!this.canvas) {
      this.canvas = document.getElementById('emg-oscilloscope');
    }
    if (this.canvas && !this.ctx) {
      this.ctx = this.canvas.getContext('2d');
    }
    if (!this.ctx) return;
    
    // Auto-measure width if canvas is unmeasured or zero
    if (this.canvas.width <= 0) {
      const parentW = (this.canvas.parentElement && this.canvas.parentElement.clientWidth > 0) ? this.canvas.parentElement.clientWidth : 0;
      this.canvas.width = parentW > 50 ? parentW : 700;
      this.canvas.height = 200;
    }
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Background dark medical phosphor CRT
    this.ctx.fillStyle = '#061320';
    this.ctx.fillRect(0, 0, w, h);

    // Phosphor Grid lines (10 horizontal divisions = 100 ms total, 8 vertical)
    this.ctx.strokeStyle = 'rgba(13, 148, 136, 0.22)';
    this.ctx.lineWidth = 1;

    for (let x = 0; x <= w; x += w / 10) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
      this.ctx.stroke();
    }
    for (let y = 0; y <= h; y += h / 8) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
      this.ctx.stroke();
    }

    // Baseline center isoelectric line
    this.ctx.strokeStyle = 'rgba(52, 211, 153, 0.45)';
    this.ctx.beginPath();
    this.ctx.moveTo(0, h / 2);
    this.ctx.lineTo(w, h / 2);
    this.ctx.stroke();

    // Calibration markers with strict PM&R electrodiagnostic conventions
    const gainVal = (this.gainSettings && this.gainSettings[this.currentMode]) ? this.gainSettings[this.currentMode] : 100;
    this.ctx.fillStyle = '#34d399';
    this.ctx.font = '600 11px system-ui, -apple-system, monospace';
    this.ctx.fillText('10 ms/div  •  ' + gainVal + ' µV/div  •  [ - Up / + Down ]', 12, 18);
    
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.fillText('🎙️ CLINICAL EMG | ' + (this.currentMode || 'NORMAL').toUpperCase(), Math.max(12, w - 240), 18);
  }

  animateOscilloscope() {
    if (!this.canvas) {
      this.canvas = document.getElementById('emg-oscilloscope');
    }
    if (this.canvas && !this.ctx) {
      this.ctx = this.canvas.getContext('2d');
    }
    if (!this.ctx || !this.isPlaying) {
      if (this.ctx) this.drawGrid();
      return;
    }

    try {
      if (this.canvas.width <= 0 || this.canvas.height <= 0) {
        const parentW = (this.canvas.parentElement && this.canvas.parentElement.clientWidth > 0) ? this.canvas.parentElement.clientWidth : 0;
        this.canvas.width = parentW > 50 ? parentW : 700;
        this.canvas.height = 200;
      }

      const w = this.canvas.width;
      const h = this.canvas.height;
      const midY = h / 2;

      this.drawGrid();

      // High-resolution Phosphor Green Beam
      this.ctx.strokeStyle = '#34d399';
      this.ctx.lineWidth = 2.2;
      this.ctx.shadowColor = '#10b981';
      this.ctx.shadowBlur = 7;

      this.ctx.beginPath();

      const now = Date.now();

      // Standardized Clinical Triggered EMG Sweep
      // Timebase = 100 ms full screen (10 ms/div)
      const sweepDuration = 1200; // ms for sweep loop across canvas
      const sweepProgress = (now % sweepDuration) / sweepDuration;
      const currentBeamX = sweepProgress * w;

      // Real audio energy modulation
      const audioMod = (this.playbackMode === 'real' && this.audioElement && !this.audioElement.paused) ? 1.25 : 1.0;

      // Map wave mode to physiological shape
      let waveType = 'normal';
      if (this.currentMode === 'fibs') waveType = 'fib';
      else if (this.currentMode === 'psws') waveType = 'psw';
      else if (this.currentMode === 'psw_to_fibs') waveType = 'psw';
      else if (this.currentMode === 'fascics') waveType = 'fascic';
      else if (this.currentMode === 'myokymia') waveType = 'myokymia';
      else if (this.currentMode === 'myotonia') waveType = 'myotonia';
      else if (this.currentMode === 'neuromyotonia') waveType = 'neuromyotonia';
      else if (this.currentMode === 'cramp') waveType = 'cramp';
      else if (this.currentMode === 'crd') waveType = 'crd';
      else if (this.currentMode === 'normal_insertional') waveType = 'crd';

      // Repeat potentials at true clinical firing frequencies and durations
      let cycleWidth = w / 3.0;
      let widthFactor = 0.28;

      if (waveType === 'fib') {
        // Fibrillation: brief spike (1-3 ms), narrow width on 100ms sweep screen (~3% of screen width)
        cycleWidth = w / 4.2;
        widthFactor = 0.08;
      } else if (waveType === 'psw') {
        // Positive Sharp Wave: broad wave (10-30 ms), wider deflection across screen (~20% of screen width)
        cycleWidth = w / 2.6;
        widthFactor = 0.24;
      } else if (waveType === 'myotonia') {
        cycleWidth = w / 6.0; // High frequency rapid volleys
        widthFactor = 0.40;
      } else if (waveType === 'neuromyotonia') {
        // Neuromyotonia: 150-300 Hz = ultra-rapid volley of 15-25 spikes across 100 ms
        cycleWidth = w / 16.0;
        widthFactor = 0.38;
      } else if (waveType === 'cramp') {
        // Cramp: 40-60 Hz dense multi-MUAP recruitment
        cycleWidth = w / 4.5;
        widthFactor = 0.32;
      }

      for (let x = 0; x < w; x += 2) {
        let y = midY;
        let activeWave = waveType;
        if (this.currentMode === 'psw_to_fibs') {
          activeWave = (x < w * 0.5) ? 'psw' : 'fib';
        }

        let deflection = 0;

        if (activeWave === 'neuromyotonia') {
          // Neuromyotonia (150-300 Hz rapid repetitive volley):
          // High-frequency repetitive spikes with a periodic amplitude decrementing burst envelope
          const burstLen = w * 0.65;
          const burstPhase = ((x + now * 0.14) % burstLen) / burstLen;
          const decrement = 0.25 + 0.75 * Math.exp(-burstPhase * 2.8);
          
          const spikeCycle = w / 18.0; // 18 sharp spikes across screen (180 Hz!)
          const spikeT = ((x + now * 0.07) % spikeCycle - spikeCycle * 0.5) / (spikeCycle * 0.32);
          if (spikeT >= -0.5 && spikeT <= 0.5) {
            deflection = (-Math.sin(spikeT * Math.PI * 2) * 65 * Math.exp(-Math.pow(spikeT * 3.4, 2))) * decrement * audioMod;
          }
        } else if (activeWave === 'cramp') {
          // Muscle Cramp: Involuntary maximal multi-MUAP dense recruitment
          // Multiple motor units firing asynchronously with turbulent baseline spasm (Full Interference Pattern)
          const m1 = this.getPhysiologicalWaveform('muap', ((x + now * 0.12) % (w / 4.4) - (w / 8.8)) / ((w / 4.4) * 0.26));
          const m2 = this.getPhysiologicalWaveform('muap', ((x + now * 0.08 + 70) % (w / 5.2) - (w / 10.4)) / ((w / 5.2) * 0.24)) * 0.85;
          const m3 = this.getPhysiologicalWaveform('fib', ((x + now * 0.16 + 140) % (w / 3.6) - (w / 7.2)) / ((w / 3.6) * 0.14)) * 0.65;
          const spasmFlutter = Math.sin(x * 0.16 + now * 0.05) * 18 + Math.cos(x * 0.26 - now * 0.04) * 14;
          deflection = (m1 + m2 + m3) * 1.15 * audioMod + spasmFlutter;
        } else {
          const modX = ((x + now * 0.08) % cycleWidth) - cycleWidth * 0.5;
          const normalizedT = modX / (cycleWidth * widthFactor);
          deflection = this.getPhysiologicalWaveform(activeWave, normalizedT) * audioMod;
        }

        y += deflection;

        // Baseline electrical noise (true needle electrode thermal resistance)
        const noiseAmp = (activeWave === 'cramp') ? 5.0 : 2.5;
        y += (Math.random() - 0.5) * noiseAmp;

        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.stroke();

      // Render moving phosphor beam head
      this.ctx.fillStyle = '#6ee7b7';
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = '#34d399';
      this.ctx.beginPath();
      this.ctx.arc(currentBeamX, midY, 3.5, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.shadowBlur = 0;
    } catch (err) {
      console.error('Oscilloscope render error:', err);
    }

    if (this.isPlaying) {
      this.animFrameId = requestAnimationFrame(() => this.animateOscilloscope());
    }
  }
}

if (typeof window !== 'undefined') {
  window.EMGAudioEngine = EMGAudioEngine;
}

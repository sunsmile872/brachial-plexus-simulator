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
    this.volume = 0.75; // Audibly tuned default (75%)
    this.timebase = 10; // ms/div (total 10 divisions = 100 ms)
    this.gain = 50; // uV/div
    this.waveHistory = [];
    this.sweepX = 0;

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
    const width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : 600;
    this.canvas.width = Math.max(width, 400);
    this.canvas.height = 200;
    this.drawGrid();
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      
      // Analyser for real-time waveform display
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 1024;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);

      // Create audio element for real recording playback
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.crossOrigin = 'anonymous';

      // Connect HTMLAudio to Web Audio API graph
      try {
        this.mediaSourceNode = this.audioCtx.createMediaElementSource(this.audioElement);
        this.mediaSourceNode.connect(this.gainNode);
      } catch (e) {
        console.warn('MediaElementSource initialization:', e);
      }
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
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

    const audioSrc = this.audioManifest[this.currentMode];
    if (this.playbackMode === 'real' && audioSrc) {
      // Real Clinical Recording Mode
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.audioElement.src = audioSrc;
      this.audioElement.currentTime = 0;
      this.audioElement.play().catch(e => {
        console.warn('Real audio playback fallback to synthesis:', e);
        this.scheduleNextDischarge();
      });
    } else {
      // Procedural Synthesis Mode
      if (this.audioElement) {
        this.audioElement.pause();
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
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  scheduleNextDischarge() {
    if (!this.isPlaying || !this.audioCtx) return;

    let delay = 100;
    switch (this.currentMode) {
      case 'fibs':
        this.synthesizeFibrillation();
        delay = 60 + Math.random() * 180; // 5 - 16 Hz irregular clicking
        break;
      case 'psws':
        this.synthesizePSW();
        delay = 80 + Math.random() * 200; // 4 - 12 Hz dull thumps
        break;
      case 'myokymia':
        this.synthesizeMyokymicBurst();
        delay = 900 + Math.random() * 300; // 1.0 - 1.2s rhythmic marching soldiers
        break;
      case 'fascics':
        this.synthesizeFasciculation();
        delay = 600 + Math.random() * 2400; // 0.3 - 1.5 Hz sporadic popcorn
        break;
      case 'crd':
        this.synthesizeCRD();
        delay = 22; // ~45 Hz continuous ephaptic buzzing
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

  recordWaveform(type) {
    this.waveHistory.push({
      type: type,
      timestamp: Date.now()
    });
    if (this.waveHistory.length > 50) this.waveHistory.shift();
  }

  // --- OSCILLOSCOPE DRAWING ---

  drawGrid() {
    if (!this.ctx) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Background dark medical phosphor CRT
    this.ctx.fillStyle = '#061320';
    this.ctx.fillRect(0, 0, w, h);

    // Grid lines (10 horizontal, 10 vertical)
    this.ctx.strokeStyle = 'rgba(13, 148, 136, 0.2)';
    this.ctx.lineWidth = 1;

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
  }

  // --- PHYSIOLOGICAL CLINICAL WAVEFORM CALCULATOR ---
  // Convention: Y is INVERTED on screen: Downward is POSITIVE (+), Upward is NEGATIVE (-)
  getPhysiologicalWaveform(type, t) {
    // t is normalized relative time across the wave duration (-1 to 1, 0 is trigger point)
    let y = 0;
    switch (type) {
      case 'fib': {
        // Fibrillation: 1-5 ms, 20-200 uV
        // Initial small positive (downward +), sharp negative peak (upward -), terminal positive (downward +)
        if (t >= -0.3 && t <= 0.7) {
          const p = (t + 0.3) / 1.0;
          if (p < 0.25) {
            y = Math.sin((p / 0.25) * Math.PI) * 18; // Positive initial phase (downward)
          } else if (p < 0.65) {
            y = -Math.sin(((p - 0.25) / 0.4) * Math.PI) * 58; // Sharp negative spike (upward)
          } else {
            y = Math.sin(((p - 0.65) / 0.35) * Math.PI) * 14; // Terminal positive (downward)
          }
        }
        break;
      }
      case 'psw': {
        // Positive Sharp Wave: 10-30 ms, 20-200 uV
        // Rapid steep downward deflection (Positive), followed by prolonged low-voltage negative plateau (Upward)
        if (t >= 0 && t <= 1.2) {
          if (t < 0.15) {
            y = (t / 0.15) * 65; // Rapid steep positive drop (downward)
          } else {
            const decay = (t - 0.15) / 1.05;
            y = 65 * Math.exp(-decay * 3.5) - Math.sin(decay * Math.PI) * 16;
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
      default:
        y = 0;
    }
    return y;
  }

  drawGrid() {
    if (!this.ctx) return;
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
    const gainVal = this.gainSettings[this.currentMode] || 100;
    this.ctx.fillStyle = '#34d399';
    this.ctx.font = '600 11px system-ui, -apple-system, monospace';
    this.ctx.fillText('10 ms/div  •  ' + gainVal + ' µV/div  •  [ - Up / + Down ]', 12, 18);
    
    const sourceLabel = this.playbackMode === 'real' ? '🎙️ CLINICAL RECORDING' : '🎛️ SYNTHESIZER';
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.fillText(sourceLabel + ' | ' + this.currentMode.toUpperCase(), w - 230, 18);
  }

  animateOscilloscope() {
    if (!this.isPlaying) {
      this.drawGrid();
      return;
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

    // Build physiological trace synchronized to real audio or procedural triggers
    for (let x = 0; x < w; x += 2) {
      let y = midY;

      // Extract time relative to screen center
      const relTime = (x - w * 0.45) / (w * 0.15); // normalized scale

      // Real audio energy modulation
      let audioMod = 1.0;
      if (this.playbackMode === 'real' && this.analyser && this.dataArray && this.audioElement && !this.audioElement.paused) {
        this.analyser.getByteTimeDomainData(this.dataArray);
        // Calculate instantaneous RMS envelope from audio
        let sum = 0;
        for (let i = 0; i < 64; i++) {
          const val = (this.dataArray[i] - 128) / 128.0;
          sum += val * val;
        }
        const rms = Math.sqrt(sum / 64);
        audioMod = Math.min(2.5, Math.max(0.2, rms * 8.0));
      }

      // Map wave mode to physiological shape
      let waveType = 'normal';
      if (this.currentMode === 'fibs') waveType = 'fib';
      else if (this.currentMode === 'psws') waveType = 'psw';
      else if (this.currentMode === 'psw_to_fibs') waveType = (x < w * 0.5) ? 'psw' : 'fib';
      else if (this.currentMode === 'fascics') waveType = 'fascic';
      else if (this.currentMode === 'myokymia') waveType = 'myokymia';
      else if (this.currentMode === 'myotonia') waveType = 'myotonia';
      else if (this.currentMode === 'crd') waveType = 'crd';
      else if (this.currentMode === 'normal_insertional') waveType = 'crd';

      // Repeat potentials at true clinical firing frequencies across the screen
      const cycleWidth = w / 3.2; // ~3 potentials visible per screen
      const modX = ((x + now * 0.08) % cycleWidth) - cycleWidth * 0.5;
      const normalizedT = modX / (cycleWidth * 0.28);

      const deflection = this.getPhysiologicalWaveform(waveType, normalizedT) * audioMod;
      y += deflection;

      // Baseline electrical noise (true needle electrode thermal resistance)
      y += (Math.random() - 0.5) * 3.0;

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
    this.ctx.arc(currentBeamX, midY, 3, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.shadowBlur = 0;

    requestAnimationFrame(() => this.animateOscilloscope());
  }
}

if (typeof window !== 'undefined') {
  window.EMGAudioEngine = EMGAudioEngine;
}

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
    this.isPlaying = false;
    this.currentMode = 'normal'; // 'normal', 'fibs', 'psws', 'myokymia', 'fascics', 'crd'
    this.timerId = null;
    this.volume = 0.3;
    this.timebase = 10; // ms/div (total 10 divisions = 100 ms)
    this.gain = 50; // uV/div
    this.waveHistory = [];
    this.sweepX = 0;
    
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
      this.gainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
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
    this.scheduleNextDischarge();
    this.animateOscilloscope();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  scheduleNextDischarge() {
    if (!this.isPlaying || !this.audioCtx) return;

    let delay = 100;
    switch (this.currentMode) {
      case 'fibs':
        this.synthesizeFibrillation();
        delay = 50 + Math.random() * 200; // 5 - 20 Hz irregular
        break;
      case 'psws':
        this.synthesizePSW();
        delay = 70 + Math.random() * 220; // 4 - 15 Hz
        break;
      case 'myokymia':
        this.synthesizeMyokymicBurst();
        delay = 800 + Math.random() * 400; // 0.8 - 1.2s rhythmic grouping
        break;
      case 'fascics':
        this.synthesizeFasciculation();
        delay = 500 + Math.random() * 2500; // very irregular 0.3 - 2 Hz
        break;
      case 'crd':
        this.synthesizeCRD();
        delay = 18; // ~55 Hz uninterrupted
        break;
      case 'normal':
      default:
        this.synthesizeNormalMUAP();
        delay = 60 + Math.random() * 40; // 10 - 15 Hz regular
        break;
    }

    this.timerId = setTimeout(() => {
      this.scheduleNextDischarge();
    }, delay);
  }

  // --- SYNTHESIS ALGORITHMS ---

  synthesizeFibrillation() {
    // High-frequency clicking 'rain on tin roof': 1-3 ms duration, 1000-2500 Hz
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200 + Math.random() * 800, now);
    
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(this.volume * 0.9, now + 0.001);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.004);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.005);

    this.recordWaveform('fib');
  }

  synthesizePSW() {
    // Positive Sharp Wave: sharp dull 'thump': initial rapid drop then slow exponential decay
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180 + Math.random() * 60, now);

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(this.volume * 1.0, now + 0.002);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.018);

    this.recordWaveform('psw');
  }

  synthesizeMyokymicBurst() {
    // Myokymia: 4-8 grouped potentials fired in rapid succession (30-50 Hz within burst)
    const burstCount = 4 + Math.floor(Math.random() * 4);
    const interval = 0.025; // 40 Hz inside burst
    const now = this.audioCtx.currentTime;

    for (let i = 0; i < burstCount; i++) {
      const t = now + i * interval;
      const osc = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(250, t);

      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(this.volume * 0.8, t + 0.002);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.012);

      osc.connect(g);
      g.connect(this.gainNode);
      osc.start(t);
      osc.stop(t + 0.015);

      setTimeout(() => this.recordWaveform('muap_burst'), i * interval * 1000);
    }
  }

  synthesizeFasciculation() {
    // Fasciculation: Low frequency irregular pop
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140 + Math.random() * 40, now);

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(this.volume * 1.2, now + 0.004);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.030);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.035);

    this.recordWaveform('fascic');
  }

  synthesizeCRD() {
    // Complex repetitive discharge: High pitch continuous buzzing machine gun
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);

    g.gain.setValueAtTime(this.volume * 0.45, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.016);

    this.recordWaveform('crd');
  }

  synthesizeNormalMUAP() {
    // Normal Motor Unit Action Potential: Crisp thump/snappy sound
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200 + Math.random() * 50, now);

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(this.volume * 0.7, now + 0.002);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.015);

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

    // Baseline center line
    this.ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
    this.ctx.beginPath();
    this.ctx.moveTo(0, h / 2);
    this.ctx.lineTo(w, h / 2);
    this.ctx.stroke();

    // Calibration markers
    this.ctx.fillStyle = '#34d399';
    this.ctx.font = '11px monospace';
    this.ctx.fillText('10 ms/div | ' + this.gain + ' µV/div', 10, 18);
    this.ctx.fillText('Mode: ' + this.currentMode.toUpperCase(), w - 160, 18);
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

    // Sweep line and waveform
    this.ctx.strokeStyle = '#34d399';
    this.ctx.lineWidth = 2;
    this.ctx.shadowColor = '#10b981';
    this.ctx.shadowBlur = 6;

    this.ctx.beginPath();
    this.ctx.moveTo(0, midY);

    const now = Date.now();
    for (let x = 0; x < w; x += 2) {
      let y = midY;
      // Check if any recent wave falls on this x pixel
      const timeOffset = (w - x) * 1.5; // map x to time
      
      this.waveHistory.forEach(wave => {
        const diff = now - wave.timestamp - timeOffset;
        if (Math.abs(diff) < 20) {
          const t = (diff + 20) / 40; // 0 to 1
          if (wave.type === 'fib') {
            // High-frequency biphasic spike: 20-100 uV, 2ms
            y += Math.sin(t * Math.PI * 4) * Math.exp(-Math.pow((t - 0.5) * 5, 2)) * 38;
          } else if (wave.type === 'psw') {
            // Initial sharp positive downward, followed by slow negative upward
            if (t < 0.3) {
              y += (t / 0.3) * 45; // Downward in clinical EMG convention
            } else {
              y -= Math.exp(-(t - 0.3) * 4) * 20;
            }
          } else if (wave.type === 'muap_burst' || wave.type === 'normal') {
            // Triphasic MUAP: small initial positive, large sharp negative peak, terminal positive
            y += Math.sin(t * Math.PI * 2) * Math.exp(-Math.pow((t - 0.5) * 4, 2)) * 60;
          } else if (wave.type === 'fascic') {
            // Polyphasic large potential
            y += (Math.sin(t * Math.PI * 6) + Math.cos(t * Math.PI * 2)) * 35;
          } else if (wave.type === 'crd') {
            // Uniform repetitive serrated pattern
            y += Math.sin(x * 0.4) * 25;
          }
        }
      });

      // Add tiny baseline noise
      y += (Math.random() - 0.5) * 2.5;
      this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    requestAnimationFrame(() => this.animateOscilloscope());
  }
}

if (typeof window !== 'undefined') {
  window.EMGAudioEngine = EMGAudioEngine;
}

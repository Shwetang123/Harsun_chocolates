// Web Audio API synthesized luxury chime and sound effects
// Does not depend on external files, zero latency, runs offline

class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.initCtx();
      this.playChime(587.33, 0.15); // D5 pleasant chime
    }
    return this.enabled;
  }

  public playChime(freq = 523.25, duration = 0.4) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      // Gentle pitch drop
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, this.ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(freq, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio not permitted or unsupported
    }
  }

  public playSweetPop() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio fallback
    }
  }

  public playChocolateSnap() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      // High frequency crisp attack (the acoustic crack)
      const oscCrack = this.ctx.createOscillator();
      const gainCrack = this.ctx.createGain();
      oscCrack.type = 'sawtooth';
      oscCrack.frequency.setValueAtTime(1800, t);
      oscCrack.frequency.exponentialRampToValueAtTime(120, t + 0.04);
      gainCrack.gain.setValueAtTime(0.2, t);
      gainCrack.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
      oscCrack.connect(gainCrack);
      gainCrack.connect(this.ctx.destination);
      oscCrack.start(t);
      oscCrack.stop(t + 0.05);

      // Resonant hollow bar body thump
      const oscBody = this.ctx.createOscillator();
      const gainBody = this.ctx.createGain();
      oscBody.type = 'triangle';
      oscBody.frequency.setValueAtTime(260, t);
      oscBody.frequency.exponentialRampToValueAtTime(65, t + 0.08);
      gainBody.gain.setValueAtTime(0.25, t);
      gainBody.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      oscBody.connect(gainBody);
      gainBody.connect(this.ctx.destination);
      oscBody.start(t);
      oscBody.stop(t + 0.1);
    } catch {
      // Audio fallback
    }
  }
}

export const soundManager = new SoundController();

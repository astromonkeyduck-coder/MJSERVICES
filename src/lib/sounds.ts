let ctx: AudioContext | null = null;
let reduced = false;

if (typeof window !== "undefined") {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduced = mq.matches;
  mq.addEventListener("change", (e) => { reduced = e.matches; });
}

function getCtx(): AudioContext | null {
  if (reduced) return null;
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new AudioContext();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function noise(ac: AudioContext, duration: number, gain: number, freq: number) {
  const len = ac.sampleRate * duration;
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

  const src = ac.createBufferSource();
  src.buffer = buf;

  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = 0.8;

  const g = ac.createGain();
  const t = ac.currentTime;
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + duration);

  src.connect(filter).connect(g).connect(ac.destination);
  src.start(t);
  src.stop(t + duration);
}

function tone(ac: AudioContext, freq: number, duration: number, gain: number, delay = 0) {
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;

  const g = ac.createGain();
  const t = ac.currentTime + delay;
  g.gain.setValueAtTime(0.001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t + duration);

  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration);
}

export function playFlip() {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const dur = 0.7;
  const fadeIn = 0.2;
  const peak = 0.3;
  const fadeOut = dur;

  const osc = ac.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(60, t);
  osc.frequency.exponentialRampToValueAtTime(180, t + peak);
  osc.frequency.exponentialRampToValueAtTime(90, t + dur);

  const oscGain = ac.createGain();
  oscGain.gain.setValueAtTime(0.001, t);
  oscGain.gain.linearRampToValueAtTime(0.06, t + fadeIn);
  oscGain.gain.setValueAtTime(0.06, t + peak);
  oscGain.gain.exponentialRampToValueAtTime(0.001, t + fadeOut);

  const oscFilter = ac.createBiquadFilter();
  oscFilter.type = "lowpass";
  oscFilter.frequency.setValueAtTime(300, t);
  oscFilter.frequency.linearRampToValueAtTime(600, t + 0.15);
  oscFilter.frequency.linearRampToValueAtTime(200, t + dur);
  oscFilter.Q.value = 1;

  osc.connect(oscFilter).connect(oscGain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur);

  // Airy wind whoosh -- filtered noise, long and breathy
  const len = ac.sampleRate * dur;
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

  const src = ac.createBufferSource();
  src.buffer = buf;

  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.setValueAtTime(800, t);
  hp.frequency.linearRampToValueAtTime(2000, t + 0.2);
  hp.frequency.linearRampToValueAtTime(600, t + dur);
  hp.Q.value = 0.3;

  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(4000, t);
  lp.frequency.linearRampToValueAtTime(8000, t + 0.15);
  lp.frequency.linearRampToValueAtTime(2000, t + dur);
  lp.Q.value = 0.5;

  const windGain = ac.createGain();
  windGain.gain.setValueAtTime(0.001, t);
  windGain.gain.linearRampToValueAtTime(0.09, t + fadeIn);
  windGain.gain.setValueAtTime(0.09, t + peak);
  windGain.gain.exponentialRampToValueAtTime(0.001, t + fadeOut);

  src.connect(hp).connect(lp).connect(windGain).connect(ac.destination);
  src.start(t);
  src.stop(t + dur);
}

export function playClick() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, 800, 0.06, 0.05);
}

export function playHover() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, 1200, 0.03, 0.025);
}

export function playSuccess() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, 523, 0.25, 0.07, 0);
  tone(ac, 659, 0.3, 0.07, 0.15);
}

export function playError() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, 220, 0.2, 0.06);
}

let ambientPlayed = false;
export function playAmbient() {
  if (ambientPlayed) return;
  const ac = getCtx();
  if (!ac) return;
  ambientPlayed = true;
  tone(ac, 440, 0.6, 0.04);
}

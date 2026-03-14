"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const TRACKS = ["/audio/midnightoverpass-1.mp3", "/audio/midnightoverpass-2.mp3"];
const TARGET_VOLUME = 0.15;
const FADE_MS = 2000;
const MUTE_FADE_MS = 500;

interface AudioCtx {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
}

const Ctx = createContext<AudioCtx>({
  analyser: null,
  isPlaying: false,
  isMuted: false,
  toggleMute: () => {},
});

export const useAudio = () => useContext(Ctx);

export function AudioProvider({ children }: { children: ReactNode }) {
  const acRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackIdx = useRef(0);
  const unlocked = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const initAudio = useCallback(() => {
    if (acRef.current) return acRef.current;

    const ac = new AudioContext();
    acRef.current = ac;

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0, ac.currentTime);
    gainRef.current = gain;

    const an = ac.createAnalyser();
    an.fftSize = window.innerWidth < 768 ? 128 : 256;
    an.smoothingTimeConstant = 0.85;
    analyserRef.current = an;

    gain.connect(an).connect(ac.destination);

    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.preload = "auto";
    audioRef.current = audio;

    const source = ac.createMediaElementSource(audio);
    source.connect(gain);

    audio.addEventListener("ended", () => {
      trackIdx.current = (trackIdx.current + 1) % TRACKS.length;
      audio.src = TRACKS[trackIdx.current];
      audio.play();
    });

    setAnalyser(an);
    return ac;
  }, []);

  const startPlayback = useCallback(() => {
    if (unlocked.current) return;
    unlocked.current = true;

    const ac = initAudio();
    if (ac.state === "suspended") ac.resume();

    const audio = audioRef.current!;
    const gain = gainRef.current!;

    audio.src = TRACKS[trackIdx.current];
    audio.play().then(() => {
      gain.gain.setValueAtTime(0, ac.currentTime);
      gain.gain.linearRampToValueAtTime(TARGET_VOLUME, ac.currentTime + FADE_MS / 1000);
      setIsPlaying(true);
    }).catch(() => {
      unlocked.current = false;
    });
  }, [initAudio]);

  useEffect(() => {
    const events = ["click", "touchstart", "scroll", "keydown"] as const;
    const handler = () => {
      startPlayback();
      events.forEach((e) => window.removeEventListener(e, handler));
    };
    events.forEach((e) => window.addEventListener(e, handler, { once: true, passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
    };
  }, [startPlayback]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      acRef.current?.close();
    };
  }, []);

  const toggleMute = useCallback(() => {
    const ac = acRef.current;
    const gain = gainRef.current;
    if (!ac || !gain) return;

    const fadeTime = MUTE_FADE_MS / 1000;

    if (isMuted) {
      gain.gain.cancelScheduledValues(ac.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ac.currentTime);
      gain.gain.linearRampToValueAtTime(TARGET_VOLUME, ac.currentTime + fadeTime);
      setIsMuted(false);
    } else {
      gain.gain.cancelScheduledValues(ac.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ac.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ac.currentTime + fadeTime);
      setIsMuted(true);
    }
  }, [isMuted]);

  return (
    <Ctx.Provider value={{ analyser, isPlaying, isMuted, toggleMute }}>
      {children}
    </Ctx.Provider>
  );
}

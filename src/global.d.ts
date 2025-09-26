import "p5/lib/addons/p5.sound";
import p5 from "p5";
import Item from "./item";

declare global {
  const p: p5;
  interface Window {
    p: p5;
    p5: typeof p5;
  }
}

declare module "p5" {
  interface SoundFile {
    play(mode?: string): void;
    pause(): void;
    stop(): void;
    jump(time: number, rate?: number): void;
    setVolume(volume: number, rampTime?: number): void;
    getVolume(): number;
    isPlaying(): boolean;
    isPaused(): boolean;
    isStopped(): boolean;
    onended(callback: () => void): void;
  }

  interface Amplitude {
    getLevel(channel?: number): number;
    setInput(source: p5.SoundFile | p5.AudioIn): void;
  }

  interface FFT {
    analyze(bins?: number, scale?: number): number[];
    getEnergy(frequency: number | string): number;
    setInput(source: p5.SoundFile | p5.AudioIn): void;
    waveform(bins?: number, precision?: string): any[];
  }
}

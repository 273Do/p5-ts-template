import "p5/lib/addons/p5.sound";
import p5 from "p5";

declare global {
  const p: p5;
  interface Window {
    p: p5;
    p5: typeof p5;
  }
}

declare module "p5" {
  interface SoundFile {
    // Playback control
    play(
      startTime?: number,
      rate?: number,
      amp?: number,
      cueStart?: number,
      duration?: number
    ): void;
    pause(startTime?: number): void;
    loop(
      startTime?: number,
      rate?: number,
      amp?: number,
      cueStart?: number,
      duration?: number
    ): void;
    stop(startTime?: number): void;
    jump(time: number, duration?: number): void;

    // Volume control
    setVolume(volume: number, rampTime?: number, timeFromNow?: number): void;
    getVolume(): number;

    // Playback rate and pan
    rate(playbackRate?: number): number;
    setPan(pan: number, timeFromNow?: number): void;
    getPan(): number;

    // Playback mode
    playMode(mode: "restart" | "sustain" | "untilDone"): void;

    // Time information
    duration(): number;
    currentTime(): number;

    // Status checks
    isPlaying(): boolean;
    isPaused(): boolean;

    // Callbacks
    onended(callback: () => void): void;

    // Buffer access
    peaks(length?: number): number[];
    frames(): number;
    channels(): number;
    sampleRate(): number;

    // Reverse and other
    reverseBuffer(): void;
    setPath(path: string, callback?: () => void): void;
  }

  interface Amplitude {
    getLevel(channel?: number): number;
    setInput(
      source?: SoundFile | AudioIn | Oscillator,
      smoothing?: number
    ): void;
    smooth(smoothing: number): void;
    normalize(boolean?: boolean): void;
    toggleNormalize(boolean?: boolean): void;
  }

  interface FFT {
    analyze(bins?: number, scale?: number): number[];
    getEnergy(
      frequency1: number | string,
      frequency2?: number | string
    ): number;
    getCentroid(): number;
    setInput(source?: SoundFile | AudioIn | Oscillator): void;
    waveform(bins?: number, precision?: "byte" | "float"): number[];
    smooth(smoothing: number): void;
    linAverages(N: number): number[];
    logAverages(octaveBands: number[]): number[];
  }

  interface AudioIn {
    start(
      successCallback?: () => void,
      errorCallback?: (error: any) => void
    ): void;
    stop(): void;
    connect(unit?: any): void;
    disconnect(): void;
    read(): number;
    setSource(num: number): void;
    amp(vol: number, rampTime?: number, tFromNow?: number): void;
    getSources(
      successCallback: (devices: MediaDeviceInfo[]) => void,
      errorCallback?: (error: any) => void
    ): void;
    enabled: boolean;
  }

  interface Oscillator {
    start(time?: number, freq?: number, amp?: number): void;
    stop(time?: number): void;
    amp(vol: number, rampTime?: number, tFromNow?: number): this;
    freq(
      frequency: number | Oscillator,
      rampTime?: number,
      tFromNow?: number
    ): this;
    getFreq(): number;
    setType(type: "sine" | "triangle" | "sawtooth" | "square"): void;
    getType(): string;
    connect(unit?: any): void;
    disconnect(): void;
    pan(panning: number, timeFromNow?: number): this;
    getPan(): number;
    phase(phase: number): this;
  }

  interface Envelope {
    set(
      attackTime: number,
      decayTime: number,
      sustainLevel: number,
      releaseTime: number
    ): void;
    setADSR(
      attackTime: number,
      decayTime?: number,
      sustainLevel?: number,
      releaseTime?: number
    ): void;
    setRange(attackLevel: number, releaseLevel: number): void;
    play(unit: any, startTime?: number, sustainTime?: number): void;
    triggerAttack(unit: any, time?: number): void;
    triggerRelease(unit: any, time?: number): void;
    ramp(unit: any, time: number, v: number, rampTime?: number): void;
    add(value: number): void;
    mult(value: number): void;
  }

  interface Reverb {
    process(
      src: SoundFile | AudioIn | Oscillator,
      reverbTime?: number,
      decayRate?: number,
      reverse?: boolean
    ): void;
    set(reverbTime?: number, decayRate?: number, reverse?: boolean): void;
    amp(volume: number, rampTime?: number, timeFromNow?: number): void;
    connect(unit?: any): void;
    disconnect(): void;
    drywet(mix: number): void;
  }

  interface Delay {
    process(
      src: SoundFile | AudioIn | Oscillator,
      delayTime?: number,
      feedback?: number,
      filter?: number
    ): void;
    delayTime(delayTime: number): void;
    feedback(feedback: number): void;
    filter(frequency: number, resonance?: number): void;
    setType(type: "lowpass" | "highpass" | "bandpass"): void;
    amp(volume: number, rampTime?: number, timeFromNow?: number): void;
    connect(unit?: any): void;
    disconnect(): void;
    drywet(mix: number): void;
  }

  interface Filter {
    process(
      src: SoundFile | AudioIn | Oscillator,
      freq?: number,
      res?: number
    ): void;
    set(freq: number, res?: number, timeFromNow?: number): void;
    freq(freq: number, timeFromNow?: number): void;
    res(res: number, timeFromNow?: number): void;
    setType(type: "lowpass" | "highpass" | "bandpass"): void;
    amp(volume: number, rampTime?: number, timeFromNow?: number): void;
    connect(unit?: any): void;
    disconnect(): void;
  }

  interface Recorder {
    record(
      soundFile: SoundFile,
      duration?: number,
      callback?: () => void
    ): void;
    stop(): void;
  }

  interface Phrase {
    addNote(time: number, value: number | any): void;
    sequence: any[];
  }

  interface Part {
    start(time?: number): void;
    stop(time?: number): void;
    pause(): void;
    loop(loopSwitch?: boolean): void;
    addPhrase(phrase: Phrase): void;
    removePhrase(phrase: Phrase): void;
    setBPM(BPM: number, rampTime?: number): void;
  }

  interface Score {
    start(): void;
    stop(): void;
    pause(): void;
    loop(): void;
    addPart(part: Part): void;
    onStep(callback: (step: number) => void): void;
    setBPM(BPM: number, rampTime?: number): void;
  }

  // p5 instance methods for sound
  interface p5InstanceExtensions {
    loadSound(
      path: string | string[],
      successCallback?: (file: SoundFile) => void,
      errorCallback?: (error: any) => void,
      whileLoadingCallback?: (progress: number) => void
    ): SoundFile;
    createAudioIn(errorCallback?: (error: any) => void): AudioIn;
    userStartAudio(
      elements?: Element[] | Element,
      callback?: () => void
    ): Promise<void>;
    getAudioContext(): AudioContext;
    masterVolume(
      volume?: number,
      rampTime?: number,
      timeFromNow?: number
    ): number;
    soundFormats(...formats: string[]): void;
    saveSound(soundFile: SoundFile, fileName: string): void;
    sampleRate(): number;
    freqToMidi(frequency: number): number;
    midiToFreq(midiNote: number): number;
  }
}

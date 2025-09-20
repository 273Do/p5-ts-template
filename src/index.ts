import * as audioModule from "./audio";
import { COLOR, SCREEN } from "./constants";

export const preload = () => {
  audioModule.preload();
};

export const resize = () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const scale = Math.min(
    window.innerWidth / SCREEN.width,
    window.innerHeight / SCREEN.height
  );
  canvas.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
};

export const setup = () => {
  const { audio } = audioModule;

  p.createCanvas(SCREEN.width, SCREEN.height);
  p.pixelDensity(1);
  p.frameRate(SCREEN.frameRate);

  // オーディオファイル入力のセットアップ
  audioModule.setupAudioInput();

  document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      playOrPause();
    } else if (e.key === "ArrowLeft") {
      audio.jump(audio.currentTime() - 2);
    } else if (e.key === "ArrowRight") {
      audio.jump(audio.currentTime() + 2);
    }
  });

  resize();
};

export const draw = () => {
  const { fft } = audioModule;

  p.background(COLOR.black);

  let spectrum = fft.analyze();
  console.log("Spectrum length:", spectrum.length); // 256個
  console.log("First 10 values:", spectrum.slice(0, 10));

  // 波形データ（-1.0〜+1.0の配列）
  let waveform = fft.waveform();
  console.log("Waveform length:", waveform.length); // 1024個
  console.log("First 10 values:", waveform.slice(0, 10));
};

export const playOrPause = () => {
  const { audio } = audioModule;

  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.play();
  }
};

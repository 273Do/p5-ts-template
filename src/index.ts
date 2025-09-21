import * as audioModule from "./audio";
import { SCREEN } from "./constants";
import { setupControls } from "./controls";
import { drawVisualization } from "./sketches/audioVisualization";

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
  p.createCanvas(SCREEN.width, SCREEN.height);
  p.pixelDensity(1);
  p.frameRate(SCREEN.frameRate);

  // オーディオ解析器を初期化
  // Initialize audio analyzers
  audioModule.initializeAudio();

  // オーディオファイル入力のセットアップ
  // Set up audio file input
  audioModule.setupAudioInput();

  // オーディオコントロールのセットアップ
  // Set up audio controls
  setupControls();

  // 初期のキャンバスサイズ調整
  // Initial canvas size adjustment
  resize();
};

export const draw = () => {
  // 指定したスケッチの描画
  // Draw the specified sketch
  drawVisualization();
};

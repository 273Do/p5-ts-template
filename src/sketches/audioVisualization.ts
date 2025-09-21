import * as audioModule from "../audio";
import { COLOR } from "../constants";

/**
 * オーディオビジュアライゼーションの描画
 */
export const drawVisualization = () => {
  const { fft, analyzer } = audioModule;

  p.background(COLOR.black);

  if (fft) {
    // 周波数スペクトルデータ（0〜255の配列）
    // Frequency spectrum data (array from 0 to 255)
    let spectrum = fft.analyze();
    // console.log("Spectrum length:", spectrum.length);
    // console.log("First 10 values:", spectrum.slice(0, 10));

    // 波形データ（-1.0〜+1.0の配列）
    // Waveform data (array ranging from -1.0 to +1.0)
    let waveform = fft.waveform();
    // console.log("Waveform length:", waveform.length);
    // console.log("First 10 values:", waveform.slice(0, 10));

    // 現在の音量レベル（0.0〜1.0）
    // Current volume level (0.0 to 1.0)
    let volume = analyzer.getLevel();
    // console.log("Current Level:", analyzer.getLevel());

    // ここに具体的なコードを追加
    // Add specific code here
    drawSpectrum(spectrum);
    drawWaveform(waveform);
    drawLevel(volume);
  }
};

/**
 * スペクトラム表示(display spectrum)
 */
const drawSpectrum = (spectrum: number[]) => {
  p.stroke(255);
  p.noFill();
  for (let i = 0; i < spectrum.length; i++) {
    const x = p.map(i, 0, spectrum.length, 0, p.width);
    const h = p.map(spectrum[i], 0, 255, 0, p.height);
    p.rect(x, p.height - h, p.width / spectrum.length, h);
  }
};

/**
 * 波形表示(display waveform)
 */
const drawWaveform = (waveform: number[]) => {
  p.stroke(100, 255, 100);
  p.noFill();
  p.beginShape();
  for (let i = 0; i < waveform.length; i++) {
    const x = p.map(i, 0, waveform.length, 0, p.width);
    const y = p.map(waveform[i], -1, 1, p.height, 0);
    p.vertex(x, y);
  }
  p.endShape();
};

/**
 * レベル表示(display level)
 */
const drawLevel = (level: number) => {
  const h = p.map(level, 0, 1, 0, p.height);
  p.fill(255, 100, 100);
  p.noStroke();
  p.rect(p.width - 50, p.height - h, 30, h);
};

import p5 from "p5";
import "p5/lib/addons/p5.sound";

export let audio: p5.SoundFile;
export let analyzer: p5.Amplitude;
export let fft: p5.FFT;

export const preload = () => {
  // デフォルトのサンプルオーディオを読み込み
  // Load the default sample audio
  audio = window.p.loadSound("sample-audio.mp3");
};

export const initializeAudio = () => {
  // 振幅解析器を初期化
  // Initialize the amplitude analyzer
  analyzer = new window.p5.Amplitude();
  analyzer.setInput(audio);

  // FFT解析器を初期化
  // Initialize the FFT analyzer
  fft = new window.p5.FFT(0.8, 512);
  fft.setInput(audio);
};

export const setupAudioInput = () => {
  const input = document.getElementById("audio-input") as HTMLInputElement;
  if (input) {
    input.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        // 既存のオーディオを停止
        // Stop existing audio
        if (audio && audio.isPlaying()) {
          audio.stop();
        }
        // 新しいオーディオを読み込み
        // Load the new audio
        audio = window.p.loadSound(URL.createObjectURL(target.files[0]), () => {
          // analyzerとfftの入力を新しいオーディオに設定
          // Set the input of analyzer and fft to the new audio
          if (analyzer) analyzer.setInput(audio);
          if (fft) fft.setInput(audio);
        });
      }
    });
  }
};

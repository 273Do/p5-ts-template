import * as audioModule from "./audio";

export const setupControls = () => {
  const { audio } = audioModule;

  document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      playOrPause();
    } else if (e.key === "ArrowLeft") {
      audio.jump(audio.currentTime() - 2);
    } else if (e.key === "ArrowRight") {
      audio.jump(audio.currentTime() + 2);
    }
  });
};

export const playOrPause = () => {
  const { audio } = audioModule;

  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.play();
  }
};

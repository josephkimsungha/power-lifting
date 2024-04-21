import { Howl } from "howler";

class AudioController {
  private howls: Howl[] = [];

  playTitleScreenMusic() {
    const titleScreenAudio = new Howl({
      src: ["./assets/titlescreen.mp3"],
      volume: 0.01,
    });

    this.howls.push(titleScreenAudio);
    titleScreenAudio.play();
  }
}

export const audioController = new AudioController();

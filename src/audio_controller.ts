import { Howl } from 'howler';

class AudioController {
  private howls: Howl[] = [];

  playTitleScreenMusic() {
    const titleScreen = new Howl({
      src: ['./assets/titlescreen.mp3'],
      volume: 0.01
    });

    this.howls.push(titleScreen);
    titleScreen.play();
  }
}

export const audioController = new AudioController();

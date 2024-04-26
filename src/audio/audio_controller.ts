import { Howl } from "howler";

export class AudioController {
  private tracks = new Map<string, Howl>();

  preload() {
    this.tracks.set(
      "titleScreen",
      new Howl({
        src: ["./assets/audio/Title.mp3"],
        volume: 0.1,
      }),
    );
    this.tracks.set(
      "Win",
      new Howl({
        src: ["./assets/audio/Win.mp3"],
        volume: 0.1,
      }),
    );
    this.tracks.set(
      "Loss",
      new Howl({
        src: ["./assets/audio/Loss.mp3"],
        volume: 0.1,
      }),
    );
    this.tracks.set(
      "Checkpoint",
      new Howl({
        src: ["./assets/audio/Checkpoint.mp3"],
        volume: 0.1,
      }),
    );
    this.tracks.set(
      "Week1",
      new Howl({
        src: ["./assets/audio/Week1.mp3"],
        volume: 0.1,
      }),
    );
    this.tracks.set(
      "Week2",
      new Howl({
        src: ["./assets/audio/Week2.mp3"],
        volume: 0.1,
      }),
    );
    this.tracks.set(
      "Week3",
      new Howl({
        src: ["./assets/audio/Week2.mp3"],
        volume: 0.1,
      }),
    );
    // SFX
    this.tracks.set(
      "pop",
      new Howl({
        src: ["./assets/audio/happy-pop-2-185287.mp3"],
        volume: 0.3,
      }),
    );
    this.tracks.set(
      "crash",
      new Howl({
        src: ["./assets/audio/large-crash-with-cataiff-14490.mp3"],
        volume: 0.55,
      }),
    );
    this.tracks.set(
      "key",
      new Howl({
        src: ["./assets/audio/mech-keyboard-02-102918.mp3"],
        volume: 0.1,
      }),
    );
    this.tracks.set(
      "bag",
      new Howl({
        src: ["./assets/audio/rustling-of-chips-bag-100788.mp3"],
        volume: 0.5,
      }),
    );
    this.tracks.set(
      "shine",
      new Howl({
        src: ["./assets/audio/shine-193240.mp3"],
        volume: 0.3,
      }),
    );

    const allTracks = Array.from(this.tracks.values());
    return Promise.all(
      allTracks.map(
        (howl: Howl) => new Promise((resolve) => howl.once("load", resolve)),
      ),
    );
  }

  playTitleScreenMusic() {
    this.tracks.get("titleScreen")!.play();
    this.tracks.get("titleScreen")!.loop(true);
  }

  playMinigameMusic(week: number) {
    let trackToPlay: string;
    switch (week) {
      case 0:
        trackToPlay = "Week1";
        break;
      case 1:
        trackToPlay = "Week2";
        break;
      case 2:
        trackToPlay = "Week3";
        break;
    }

    if (this.tracks.get(trackToPlay)!.playing()) {
      return;
    } else {
      this.stopAllTracks();
      this.tracks.get(trackToPlay)!.play();
      this.tracks.get(trackToPlay)!.loop(true);
    }
  }

  playCheckpointMusic() {
    this.stopAllTracks();
    this.tracks.get("Checkpoint")!.play();
    this.tracks.get("Checkpoint")!.loop(true);
  }

  playFailMusic() {
    this.stopAllTracks();
    this.tracks.get("Loss")!.play();
  }

  playWinMusic() {
    this.stopAllTracks();
    this.tracks.get("Win")!.play();
  }

  playTrack(t: string) {
    this.tracks.get(t)?.play();
  }

  stopAllTracks() {
    this.tracks.forEach((element) => {
      element!.stop();
    });
  }
}

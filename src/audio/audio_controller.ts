import { Howl } from "howler";

export class AudioController {
  private tracks = new Map<string, Howl>();

  preload() {
    this.tracks.set(
      "titleScreen",
      new Howl({
        src: ["./assets/audio/Title.mp3"],
        volume: 0.01,
      }),
    );
    this.tracks.set(
      "Win",
      new Howl({
        src: ["./assets/audio/Win.mp3"],
        volume: 0.01,
      }),
    );
    this.tracks.set(
      "Loss",
      new Howl({
        src: ["./assets/audio/Loss.mp3"],
        volume: 0.01,
      }),
    );
    this.tracks.set(
      "Checkpoint",
      new Howl({
        src: ["./assets/audio/Checkpoint.mp3"],
        volume: 0.01,
      }),
    );
    this.tracks.set(
      "Week1",
      new Howl({
        src: ["./assets/audio/Week1.mp3"],
        volume: 0.01,
      }),
    );
    this.tracks.set(
      "Week2",
      new Howl({
        src: ["./assets/audio/Week2.mp3"],
        volume: 0.01,
      }),
    );
    this.tracks.set(
      "Week3",
      new Howl({
        src: ["./assets/audio/Week2.mp3"],
        volume: 0.01,
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
  }
}

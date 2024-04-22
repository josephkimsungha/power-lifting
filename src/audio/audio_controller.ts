import { Howl } from "howler";

export class AudioController {
  private tracks = new Map<string, Howl>();

  preload() {
    this.tracks.set(
      "titleScreen",
      new Howl({
        src: ["./assets/titlescreen.mp3"],
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

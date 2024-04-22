import "pixi.js/lib/math-extras/init";

import { Application } from "pixi.js";
import { Controller } from "./controller";
import { AudioController } from "./audio/audio_controller";

class Game {
  private app: Application;
  private controller: Controller;
  // Keep this public as main menu needs to be able to play
  // music before the game has started.
  audioController = new AudioController();

  constructor() {
    this.app = new Application();
    this.controller = new Controller(this.app);
  }

  async start(): Promise<void> {
    await this.app.init({ resizeTo: window });
    document.body.appendChild(this.app.canvas);

    this.controller.start();
  }

  async preload() {
    this.controller.preload();
    this.audioController.preload();
  }
}

/** Global singleton representing the game. */
export const game = new Game();

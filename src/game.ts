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
    const screenHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0,
    );
    const screenWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    );

    const constrainByWidth = (screenHeight * 16) / 9 > screenWidth;

    await this.app.init({
      width: constrainByWidth
        ? screenWidth
        : Math.floor((screenHeight * 16) / 9),
      height: constrainByWidth
        ? Math.floor((screenWidth / 16) * 9)
        : screenHeight,
      resolution: window.devicePixelRatio || 1,
      antialias: true,
      autoDensity: true,
    });
    document.body.appendChild(this.app.canvas);

    this.controller.start();
  }

  async preload() {
    this.controller.preload();
    await this.audioController.preload();
  }
}

/** Global singleton representing the game. */
export const game = new Game();

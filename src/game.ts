import "pixi.js/lib/math-extras/init";

import { Application } from "pixi.js";
import { Controller } from "./controller";

class Game {
  private app: Application;
  private controller: Controller;

  constructor() {
    this.app = new Application();
    this.controller = new Controller(this.app);
  }

  async start(): Promise<void> {
    await this.app.init({ resizeTo: window });
    document.body.appendChild(this.app.canvas);

    this.controller.start();
  }
}

/** Global singleton representing the game. */
export const game = new Game();

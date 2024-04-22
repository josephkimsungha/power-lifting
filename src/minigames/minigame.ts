import { Application, Container, Graphics } from "pixi.js";

export interface MinigameDelegate {
  onMinigameEnd: (passed: boolean) => void;
}

/** Base class for all minigames to extend. */
export class Minigame {
  protected container: Container;

  constructor(
    protected readonly app: Application,
    protected readonly delegate: MinigameDelegate,
  ) {
    this.container = new Container();
  }

  /**
   * Override this function to load any assets the
   * minigame needs. Return a promise that resolves when
   * assets are ready.
   */
  static async preload() {}

  attach() {
    this.populateContainer();
    this.app.stage.addChild(this.container);
  }

  detach() {
    this.app.stage.removeChild(this.container);
  }

  protected populateContainer() {
    const square = new Graphics();
    const x = (this.app.screen.width - 100) * Math.random();
    const y = (this.app.screen.height - 100) * Math.random();

    square.rect(x, y, 100, 100);
    square.fill(0xde3249);
    square.eventMode = "static";
    square.on("pointerdown", () => {
      square.removeFromParent();
      this.finishMinigame(true);
    });
    this.container.addChild(square);
  }

  protected finishMinigame(passed: boolean) {
    // Show the player they've won or lost.
    this.delegate.onMinigameEnd(passed);
  }
}

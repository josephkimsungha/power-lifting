import { Application, Container, Graphics } from "pixi.js";

export interface MinigameDelegate {
  finished: (passed: boolean) => void;
}

/** Base class all minigames extend */
export class Minigame {
  private container: Container;

  constructor(private readonly app: Application, private readonly minigameDelegate: MinigameDelegate) {
    this.container = new Container();
  }

  private finishMinigame(passed: boolean) {
    // Show the player they've won or lost.
    this.minigameDelegate.finished(passed);
  }

  protected populateContainer() {
    const square = new Graphics();
    const x = (this.app.screen.width - 100) * Math.random();
    const y = (this.app.screen.height - 100) * Math.random();

    square.rect(x, y, 100, 100);
    square.fill(0xde3249);
    square.eventMode = 'static';
    square.on('pointerdown', () => {
      square.removeFromParent();
      this.finishMinigame(true);
    });
    this.container.addChild(square);
  }

  attach() {
    this.populateContainer();
    this.app.stage.addChild(this.container);
  }

  detach() {
    this.app.stage.removeChild(this.container);
  }
}

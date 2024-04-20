import { Application, Container, Graphics } from "pixi.js";

/** Base class all minigames extend */
export class Minigame {
  private container: Container;

  constructor(private readonly app: Application) {
    this.container = new Container();
  }

  finishMinigame(passed: boolean) {
    console.log('Minigame Finished', passed);
  }

  populateContainer() {
    const square = new Graphics();
    square.rect(50, 50, 100, 100);
    square.fill(0xde3249);
    square.eventMode = 'static';
    square.on('pointerdown', () => {
      this.finishMinigame(true);
      square.removeFromParent();
    });
    this.container.addChild(square);
  }

  attach() {
    this.app.stage.addChild(this.container);
  }

  detach() {
    this.app.stage.removeChild(this.container);
  }
}

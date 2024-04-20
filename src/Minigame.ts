import { Application, Container, Graphics } from "pixi.js";

/** Base class all minigames extend */
export class Minigame {
  private container: Container;

  constructor(private readonly app: Application) {
    this.container = new Container();
  }

  populateContainer() {
    const graphics = new Graphics();
    // Rectangle
    graphics.rect(50, 50, 100, 100);
    graphics.fill(0xde3249);

    this.container.addChild(graphics);
  }

  attach() {
    this.app.stage.addChild(this.container);
  }

  detach() {
    this.app.stage.removeChild(this.container);
  }
}

import {
  Container,
  FederatedMouseEvent,
  Graphics,
  Point,
  Ticker,
} from "pixi.js";
import { Minigame } from "./minigame";

export class TimingMinigame extends Minigame {
  private reticle = new Graphics();
  private target = new Graphics();

  private recticleXVel = 10;

  protected override async populateContainer() {
    this.container.eventMode = "static";
    this.container.hitArea = this.app.screen;
    this.container.on("pointerdown", () => this.checkHit());

    const x = this.app.screen.width / 2;
    const y = this.app.screen.height / 2;
    this.reticle.rect(-20, -20, 40, 40);
    this.reticle.fill(0xde3249);
    this.reticle.position = new Point(x, y);
    this.reticle.zIndex = 1;

    this.target.rect(-50, -50, 100, 100);
    this.target.fill(0xabcdef);
    this.target.position = new Point(x, y);

    this.ticker.add((time) => {
      this.reticle.position.x += this.recticleXVel * time.deltaTime;
      if (
        this.reticle.position.x < 0 ||
        this.reticle.position.x > this.app.screen.width
      ) {
        this.recticleXVel *= -1;
      }
    });

    this.container.addChild(this.target);
    this.container.addChild(this.reticle);
  }

  private checkHit() {
    if (this.testForAABB(this.reticle, this.target)) {
      this.finishMinigame(true);
    }
  }

  private testForAABB(object1: Container, object2: Container) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }
}

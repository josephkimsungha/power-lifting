import {
  Assets,
  Sprite,
  Container,
  FederatedMouseEvent,
  Graphics,
  Point,
  Ticker,
  TickerCallback,
} from "pixi.js";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { Minigame } from "../minigame";

export class FlingMinigame extends Minigame {
  private dragTarget?: Container;

  private dragListener = (e: FederatedMouseEvent) => void this.onDragMove(e);

  private dragTargetVelocity = new Point(0, 0);
  private readonly velocityInfo: Record<string, Point> = {};

  private readonly tickerCallbacks: Record<string, TickerCallback<this>[]> = {};

  private addPopup() {
      const square = new Graphics();

      const x = (this.app.screen.width - 100) * Math.random() + 50;
      const y = (this.app.screen.height - 100) * Math.random() + 50;
      square.rect(-50, -50, 100, 100);
      square.fill(0xde3249);
      square.position = new Point(x, y);
      this.velocityInfo[square.label] = new Point(0, 0);

      square.eventMode = "static";
      square.cursor = "pointer";
      square.on("pointerdown", () => this.onDragStart(square));

      const checkSquarePos = () => {
        const squarePos = square.getGlobalPosition();
        if (
          squarePos.x < 0 ||
          squarePos.x > this.app.screen.width ||
          squarePos.y < 0 ||
          squarePos.y > this.app.screen.height
        ) {
          // Clean up ticker.
          const tickerCallbacks = this.tickerCallbacks[square.label];
          if (tickerCallbacks) {
            tickerCallbacks.forEach((callback) => {
              this.app.ticker.remove(callback);
            });
          }

          square.removeFromParent();
        }
      };
      const handleSquarePhysics = (time: Ticker) =>
        this.handlePhysics(time, square);

      this.app.ticker.add(checkSquarePos);
      this.app.ticker.add(handleSquarePhysics);

      this.tickerCallbacks[square.label] = [
        checkSquarePos,
        handleSquarePhysics,
      ];

      this.container.addChild(square);
  }

  protected override async populateContainer() {
    const bgAsset = await Assets.load(
      [
        MINIGAME_ASSET_ALIASES.BLOG_POST_1,
        MINIGAME_ASSET_ALIASES.BLOG_POST_2,
        MINIGAME_ASSET_ALIASES.BLOG_POST_3,
      ][this.week],
    );

    const bg = new Sprite(bgAsset);
    bg.width = this.app.screen.width;
    bg.height = this.app.screen.height;
    bg.zIndex = -1;
    this.container.addChild(bg);

    this.container.eventMode = "static";
    this.container.hitArea = this.app.screen;
    this.container.on("pointerup", () => this.onDragEnd());
    this.container.on("pointerupoutside", () => this.onDragEnd());

    for (let i = 0; i < 3; i++) {
  }

  private handlePhysics(time: Ticker, object: Container) {
    if (this.dragTarget === object) return;

    const vel = this.velocityInfo[object.label];
    const adjustedVel = vel;
    adjustedVel.x = vel.x * time.deltaTime;
    adjustedVel.y = vel.y * time.deltaTime;

    object.position.add(vel.multiplyScalar(time.deltaTime), object.position);
  }

  private onDragStart(object: Container) {
    if (!!this.dragTarget) return;

    this.velocityInfo[object.label] = new Point(0, 0);
    this.dragTarget = object;
    this.container.on("pointermove", this.dragListener);
  }

  private onDragEnd() {
    if (!this.dragTarget) return;

    this.container.off("pointermove", this.dragListener);

    this.velocityInfo[this.dragTarget.label] = this.dragTargetVelocity;
    this.dragTargetVelocity = new Point(0, 0);

    this.dragTarget = undefined;
  }

  private onDragMove(event: FederatedMouseEvent) {
    if (!this.dragTarget) return;

    const previousPos = this.dragTarget.position.clone();
    this.dragTarget.position = event.getLocalPosition(this.dragTarget.parent);

    this.dragTargetVelocity = this.dragTarget.position.subtract(previousPos);
  }
}

import {
  Assets,
  Sprite,
  Container,
  FederatedMouseEvent,
  Point,
  Ticker,
  TickerCallback,
} from "pixi.js";
import { ProgressBar } from "@pixi/ui";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { Minigame } from "../minigame";

const POPUP_ASSETS = [
  MINIGAME_ASSET_ALIASES.POPUP_1,
  MINIGAME_ASSET_ALIASES.POPUP_2,
  MINIGAME_ASSET_ALIASES.POPUP_3,
  MINIGAME_ASSET_ALIASES.POPUP_4,
  MINIGAME_ASSET_ALIASES.POPUP_5,
];

export class FlingMinigame extends Minigame {
  private dragTarget?: Container;
  private dragListener = (e: FederatedMouseEvent) => void this.onDragMove(e);
  private dragTargetVelocity = new Point(0, 0);
  private timeToNextPopup = 0;
  private readonly velocityInfo: Record<string, Point> = {};
  private readonly tickerCallbacks: Record<string, TickerCallback<this>[]> = {};
  private spawnedPopups = 0;
  private popupsOnScreen = 0;
  private learningTime = 0;

  lifetime = 20_000;

  private async addPopup() {
    const popupAssetId =
      POPUP_ASSETS[Math.floor(POPUP_ASSETS.length * Math.random())];
    const square = new Sprite(await Assets.load(popupAssetId));
    square.label = String(this.spawnedPopups++);
    const { screen } = this.app;
    const aspectRatio = square.height / square.width;
    square.width = screen.width * 0.3;
    square.height = square.width * aspectRatio;
    square.anchor = 0.5;

    const x = screen.width * 0.2 + Math.random() * (screen.width * 0.6);
    const y = screen.height * 0.2 + Math.random() * (screen.height * 0.6);
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
        this.popupsOnScreen--;
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

    this.tickerCallbacks[square.label] = [checkSquarePos, handleSquarePhysics];

    this.popupsOnScreen++;
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

    const progressBar = new ProgressBar({
      bg: new Sprite(
        await Assets.load(MINIGAME_ASSET_ALIASES.LEARNING_PROGRESS_CONTAINER),
      ),
      fill: new Sprite(await Assets.load(MINIGAME_ASSET_ALIASES.PROGRESS_BAR)),
      progress: 0,
      fillPaddings: {
        top: 75,
        bottom: 0,
        right: 0,
        left: 228,
      },
    });
    const aspectRatio = progressBar.width / progressBar.height;
    progressBar.width = this.app.screen.width * 0.25;
    progressBar.height = progressBar.width / aspectRatio;
    progressBar.x = progressBar.height / 2;
    progressBar.y = progressBar.height / 2;
    this.container.addChild(progressBar);

    for (let i = 0; i < 2 + this.week; i++) {
      this.addPopup();
    }

    this.container.eventMode = "static";
    this.container.hitArea = this.app.screen;
    this.container.on("pointerup", () => this.onDragEnd());
    this.container.on("pointerupoutside", () => this.onDragEnd());
    this.ticker.add(
      (ticker: Ticker) => void this.processPopups(ticker, progressBar),
    );
  }

  private async processPopups(ticker: Ticker, progressBar: ProgressBar) {
    if (this.popupsOnScreen < 3) {
      this.learningTime += ticker.deltaMS / (this.popupsOnScreen + 1);
    }
    this.timeToNextPopup -= ticker.deltaMS;

    const goal = this.lifetime * 0.3;
    const minTime = [1000, 700, 500][this.week];
    if (this.learningTime > goal) {
      this.finishMinigame(true);
      return;
    }
    progressBar.progress = (this.learningTime / goal) * 100;
    if (this.timeToNextPopup <= 0) {
      await this.addPopup();
      this.timeToNextPopup = minTime + Math.random() * 2000;
    }
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

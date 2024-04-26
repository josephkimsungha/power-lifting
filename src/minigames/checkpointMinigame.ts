import { Assets, Point, Sprite, Ticker } from "pixi.js";
import { KeyboardMinigame } from "./keyboardMinigame";
import { MINIGAME_ASSET_ALIASES } from "./assets";

/** Minigame that plays at the end of each day. Generally just a button masher. */
export class CheckpointMinigame extends KeyboardMinigame {
  // Checkpoints have no time limit.
  protected override lifetime = undefined;
  protected override tutorialAlias: MINIGAME_ASSET_ALIASES =
    MINIGAME_ASSET_ALIASES.CHECKPOINT_TUTORIAL;

  // Charge bar goes from 0 -> 100 but drains at some rate.
  protected chargeBar = 0;
  protected chargeRate = 10;
  protected drainRate = 0.1;

  protected background: Sprite;
  protected initialBackgroundAlias = MINIGAME_ASSET_ALIASES.CHECKPOINT_1_1;
  private initialBackgroundScale: Point;

  private minigameComplete = false;

  private bounceProgress = 0;

  protected async populateContainer() {
    const { screen } = this.app;
    await this.cacheAssets();
    const texture = await Assets.load(this.initialBackgroundAlias);
    this.background = new Sprite(texture);
    this.background.setSize(screen);
    this.background.anchor = 0.5;
    this.background.position = new Point(screen.width / 2, screen.height / 2);
    this.initialBackgroundScale = this.background.scale.clone();
    this.background.zIndex = -1;

    this.container.addChild(this.background);

    this.ticker.add(async (time) => {
      if (this.chargeBar > 0 && this.chargeBar < 100) {
        // Slowly drain.
        this.chargeBar -= this.drainRate * time.deltaTime;
      }

      await this.updateBackground();

      if (this.chargeBar === 100) {
        this.finishCheckpoint();
      }
    });
  }

  protected async cacheAssets() {}

  protected async updateBackground() {}

  protected async changeBackgroundTexture(alias: MINIGAME_ASSET_ALIASES) {
    this.background.texture = await Assets.load(alias);
  }

  protected async endContent() {}

  protected override onKeyDown(key: string, e: KeyboardEvent) {
    // Prevent holding down the key to win.
    if (this.minigameComplete || key != " " || e.repeat) return;

    this.chargeBar = Math.min(this.chargeBar + this.chargeRate, 100);

    const ticker = new Ticker();
    ticker.add((time) =>
      this.bounce(
        time,
        this.initialBackgroundScale.clone().multiplyScalar(1.05),
        150,
      ),
    );
    ticker.start();
  }

  private finishCheckpoint() {
    this.minigameComplete = true;
    this.finishMinigame(true, this.endContent());
  }

  private async bounce(
    ticker: Ticker,
    peakScale: Point,
    timeToFinishMs: number,
  ) {
    this.bounceProgress = Math.min(
      this.bounceProgress + ticker.deltaMS / timeToFinishMs,
      1,
    );

    const bounce = (f: number) => -Math.pow(1 - 2 * f, 2) + 1;
    const directionVector = peakScale
      .clone()
      .subtract(this.initialBackgroundScale);
    this.background.scale = this.initialBackgroundScale
      .clone()
      .add(directionVector.multiplyScalar(bounce(this.bounceProgress)));

    if (this.bounceProgress === 1) {
      this.bounceProgress = 0;
      ticker.destroy();
    }
  }
}

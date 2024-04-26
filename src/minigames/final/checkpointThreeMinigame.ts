import { Assets, Point, Sprite, Ticker } from "pixi.js";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { CheckpointMinigame } from "../checkpointMinigame";
import { game } from "../../game";

export class CheckpointThreeMinigame extends CheckpointMinigame {
  protected override chargeRate = 6;
  protected override drainRate = 0.25;

  protected override initialBackgroundAlias =
    MINIGAME_ASSET_ALIASES.CHECKPOINT_3_1;

  protected override async cacheAssets() {
    await Assets.load([
      MINIGAME_ASSET_ALIASES.CHECKPOINT_3_1,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_3_2,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_3_3,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_3_4,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_3_5,
      MINIGAME_ASSET_ALIASES.BAR,
    ]);
  }

  protected override async updateBackground() {
    if (this.chargeBar < 33) {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_3_1);
    } else if (this.chargeBar < 66) {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_3_2);
    } else if (this.chargeBar < 100) {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_3_3);
    } else {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_3_4);
    }
  }

  override playAudio(): void {
    game.audioController.playCheckpointMusic();
  }

  protected override async endContent() {
    const { screen } = this.app;
    const texture = await Assets.load(MINIGAME_ASSET_ALIASES.BAR);
    const bar = new Sprite(texture);

    const aspectRatio = bar.width / bar.height;
    bar.width = screen.width * 0.64;
    bar.height = bar.width / aspectRatio;
    bar.anchor = new Point(0.5, 1);
    bar.position = new Point(screen.width * 0.51, screen.height * 0.25);
    bar.zIndex = 1;

    this.container.addChild(bar);

    let ticker = new Ticker();
    ticker.autoStart = true;
    await new Promise<void>((res) => {
      ticker.add((time) => {
        bar.y -= 25 * time.deltaTime;
        if (bar.y < 0) {
          res();
          ticker.destroy();
        }
      });
    });
    await new Promise((res) => setTimeout(res, 300));

    await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_3_5);
    await new Promise((res) => setTimeout(res, 500));

    bar.position = new Point(screen.width * 0.5, screen.height * 1.2);
    bar.angle = -6;
    bar.scale = bar.scale.clone().multiplyScalar(0.6);

    ticker = new Ticker();
    ticker.autoStart = true;
    await new Promise<void>((res) => {
      ticker.add((time) => {
        bar.y -= 19 * time.deltaTime;
        if (bar.y < -bar.width) {
          res();
          ticker.destroy();
        }
      });
    });

    await new Promise((res) => setTimeout(res, 2000));
  }
}

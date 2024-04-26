import { Assets, Point, Sprite, Ticker } from "pixi.js";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { CheckpointMinigame } from "../checkpointMinigame";
import { game } from "../../game";

export class CheckpointTwoMinigame extends CheckpointMinigame {
  protected override chargeRate = 8;
  protected override drainRate = 0.2;

  protected override initialBackgroundAlias =
    MINIGAME_ASSET_ALIASES.CHECKPOINT_2_1;

  protected override async cacheAssets() {
    await Assets.load([
      MINIGAME_ASSET_ALIASES.CHECKPOINT_2_1,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_2_2,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_2_3,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_2_4,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_2_5,
      MINIGAME_ASSET_ALIASES.RABBIT,
    ]);
  }

  override playAudio(): void {
    game.audioController.playCheckpointMusic();
  }

  protected override async updateBackground() {
    if (this.chargeBar < 33) {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_2_1);
    } else if (this.chargeBar < 66) {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_2_2);
    } else if (this.chargeBar < 100) {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_2_3);
    } else {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_2_4);
    }
  }

  protected override async endContent() {
    const { screen } = this.app;
    const texture = await Assets.load(MINIGAME_ASSET_ALIASES.RABBIT);
    const rabbit = new Sprite(texture);

    const aspectRatio = rabbit.width / rabbit.height;
    rabbit.width = screen.width * 0.18;
    rabbit.height = rabbit.width / aspectRatio;
    rabbit.anchor = new Point(0, 1);
    rabbit.position = new Point(screen.width * 0.2, screen.height * 0.65);
    rabbit.zIndex = 1;

    this.container.addChild(rabbit);

    const ticker = new Ticker();
    ticker.autoStart = true;
    const destination = new Point(screen.width * 0.55, screen.height * 0.3);
    const directionVector = destination
      .clone()
      .subtract(rabbit.position.clone());
    await new Promise<void>((res) => {
      ticker.add((time) => {
        rabbit.position = rabbit.position.add(
          directionVector.normalize().multiplyScalar(10 * time.deltaTime),
        );
        if (rabbit.position.x > destination.x) {
          res();
          ticker.destroy();
        }
      });
    });

    rabbit.removeFromParent();
    await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_2_5);

    await new Promise((res) => setTimeout(res, 2000));
  }
}

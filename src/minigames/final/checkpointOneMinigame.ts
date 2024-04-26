import { Assets, Point, Sprite, Ticker } from "pixi.js";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { CheckpointMinigame } from "../checkpointMinigame";
import { game } from "../../game";

export class CheckpointOneMinigame extends CheckpointMinigame {
  protected override chargeRate = 10;
  protected override drainRate = 0.1;

  protected override initialBackgroundAlias =
    MINIGAME_ASSET_ALIASES.CHECKPOINT_1_1;

  protected override async cacheAssets() {
    await Assets.load([
      MINIGAME_ASSET_ALIASES.CHECKPOINT_1_1,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_1_2,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_1_3,
      MINIGAME_ASSET_ALIASES.CHECKPOINT_1_4,
      MINIGAME_ASSET_ALIASES.ROOMBA,
    ]);
  }

  protected override async updateBackground() {
    if (this.chargeBar < 33) {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_1_1);
    } else if (this.chargeBar < 66) {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_1_2);
    } else if (this.chargeBar < 100) {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_1_3);
    } else {
      await this.changeBackgroundTexture(MINIGAME_ASSET_ALIASES.CHECKPOINT_1_4);
    }
  }

  override playAudio(): void {
    game.audioController.playCheckpointMusic();
  }

  protected override async endContent() {
    const { screen } = this.app;
    const texture = await Assets.load(MINIGAME_ASSET_ALIASES.ROOMBA);
    const roomba = new Sprite(texture);

    const aspectRatio = roomba.width / roomba.height;
    roomba.width = screen.width * 0.15;
    roomba.height = roomba.width / aspectRatio;
    roomba.anchor = new Point(0, 1);
    roomba.position = new Point(-roomba.width, screen.height * 0.85);
    roomba.zIndex = 1;

    this.container.addChild(roomba);

    const ticker = new Ticker();
    ticker.autoStart = true;
    await new Promise<void>((res) => {
      ticker.add((time) => {
        roomba.x += 8 * time.deltaTime;
        if (roomba.x > screen.width) {
          res();
          ticker.destroy();
        }
      });
    });
    await new Promise((res) => setTimeout(res, 2000));
  }
}

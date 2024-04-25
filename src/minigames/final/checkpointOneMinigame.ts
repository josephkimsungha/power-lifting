import { Assets } from "pixi.js";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { CheckpointMinigame } from "../checkpointMinigame";

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
}

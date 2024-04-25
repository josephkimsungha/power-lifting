import { Assets } from "pixi.js";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { CheckpointMinigame } from "../checkpointMinigame";

export class CheckpointTwoMinigame extends CheckpointMinigame {
  protected override chargeRate = 10;
  protected override drainRate = 0.1;

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
}

import { Assets } from "pixi.js";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { CheckpointMinigame } from "../checkpointMinigame";

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
}

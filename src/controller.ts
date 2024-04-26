import { Application } from "pixi.js";
import { Minigame, MinigameDelegate } from "./minigames/minigame";
import { FlingMinigame } from "./minigames/final/flingMinigame";
import { TypingMinigame } from "./minigames/typingMinigame";
import { RhythmMinigame } from "./minigames/rhythmMinigame";
import { ScrubMinigame } from "./minigames/final/scrubMinigame";
import { ShakingMinigame } from "./minigames/shakingMinigame";
import { ShoppingMinigame } from "./minigames/final/shoppingMinigame";
import { backgroundLoadMinigameAssets } from "./minigames/assets";
import { BalancingMinigame } from "./minigames/balancingMinigame";
import {
  Interlude,
  InterludeDelegate,
  backgroundLoadInterludeAssets,
} from "./interlude/interlude";
import { CheckpointOneMinigame } from "./minigames/final/checkpointOneMinigame";
import { CheckpointTwoMinigame } from "./minigames/final/checkpointTwoMinigame";
import { CheckpointThreeMinigame } from "./minigames/final/checkpointThreeMinigame";

const MINIGAMES_POOL = new URLSearchParams(window.location.search).get("quick")
  ? [Minigame]
  : [
      TypingMinigame,
      BalancingMinigame,
      ShoppingMinigame,
      ShakingMinigame,
      RhythmMinigame,
      ScrubMinigame,
      FlingMinigame,
    ];

/** Controls the flow of the game. */
export class Controller implements MinigameDelegate, InterludeDelegate {
  private completedMinigamePhases = 0;

  private minigameQueue: Minigame[] = [];
  private minigameLoseCount = 0;

  private currentMinigame?: Minigame;

  constructor(private readonly app: Application) {}

  preload() {
    backgroundLoadInterludeAssets();
    backgroundLoadMinigameAssets();
  }

  start() {
    const intro = new Interlude(this.app, this, 0);
    intro.start();
  }

  onMinigameEnd(passed: boolean) {
    this.currentMinigame!.detach();
    if (!passed) {
      this.minigameLoseCount++;
    } else {
      this.minigameLoseCount = 0;
    }

    if (this.minigameLoseCount > 1) {
      // Player has run out of chances to proceed to the next phase.
      console.log("You lose!");
      return;
    }

    if (this.minigameQueue.length === 0) {
      this.completedMinigamePhases++;
      this.minigameLoseCount = 0;
    }

    if (this.completedMinigamePhases >= 3) {
      // Trigger end game loop.
      this.startNextInterlude();
      return;
    }

    if (this.minigameQueue.length === 0) {
      // Trigger check point and go around again.
      this.currentMinigame =
        this.completedMinigamePhases === 1
          ? new CheckpointOneMinigame(
              this.app,
              this,
              this.completedMinigamePhases,
            )
          : new CheckpointTwoMinigame(
              this.app,
              this,
              this.completedMinigamePhases,
            );
      this.currentMinigame.attach(); // No await.
      this.populateMinigameQueue();
    } else {
      this.startNextMinigame();
    }
  }

  onInterludeEnd() {
    if (this.completedMinigamePhases === 3) {
      this.currentMinigame = new CheckpointThreeMinigame(
        this.app,
        this,
        this.completedMinigamePhases,
      );
      this.currentMinigame.attach(); // No await.

      return;
    }

    if (this.completedMinigamePhases > 3) {
      console.log("The end!");
      return;
    }

    this.populateMinigameQueue();
    this.startNextMinigame();
  }

  private populateMinigameQueue() {
    // Reset the current queue.
    this.minigameQueue.length = 0;
    for (let i = 0; i < MINIGAMES_POOL.length; i++) {
      const minigame = new MINIGAMES_POOL[i](
        this.app,
        this,
        this.completedMinigamePhases,
      );
      this.minigameQueue.push(minigame);
    }
  }

  private startNextMinigame() {
    this.currentMinigame = this.minigameQueue.shift();
    this.currentMinigame.attach(); // No await.
  }

  private startNextInterlude() {
    const interlude = new Interlude(
      this.app,
      this,
      this.completedMinigamePhases,
    );
    interlude.start();
  }
}

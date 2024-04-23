import { Application } from "pixi.js";
import { Minigame, MinigameDelegate } from "./minigames/minigame";
import { KeyboardMinigame } from "./minigames/keyboardMinigame";
import { FlingMinigame } from "./minigames/flingMinigame";
import { TypingMinigame } from "./minigames/typingMinigame";
import { TimingMinigame } from "./minigames/timingMinigame";
import { RhythmMinigame } from "./minigames/rhythmMinigame";
import { Interlude, InterludeDelegate } from "./interlude/interlude";
import { CheckpointMinigame } from "./minigames/checkpointMinigame";

/** Controls the flow of the game. */
export class Controller implements MinigameDelegate, InterludeDelegate {
  private MINIGAMES_POOL = [
    Minigame,
    KeyboardMinigame,
    FlingMinigame,
    TypingMinigame,
    TimingMinigame,
    RhythmMinigame,
  ];

  private completedMinigamePhases = 0;

  private minigameQueue: Minigame[] = [];
  private minigameWinCount = 0;

  private currentMinigame?: Minigame;

  constructor(private readonly app: Application) {}

  preload() {
    return Promise.all(this.MINIGAMES_POOL.map((mg) => mg.preload()));
  }

  start(quickMinigames = false) {
    if (quickMinigames) {
      this.MINIGAMES_POOL = [Minigame];
    }
    const intro = new Interlude(this.app, this, 0);
    intro.start();
  }

  onMinigameEnd(passed: boolean) {
    this.currentMinigame!.detach();
    if (passed) {
      this.minigameWinCount++;
    }
    console.log(
      passed ? "Nice!" : "Too bad!",
      "Player has won",
      this.minigameWinCount,
    );

    if (this.minigameWinCount === 5) {
      this.currentMinigame = new CheckpointMinigame(this.app, this);
      this.currentMinigame.attach();
      return;
    }
    if (this.minigameWinCount >= 6) {
      // Player has met the requirements to proceed to the next phase.
      this.completedMinigamePhases++;

      this.startNextInterlude();
      this.minigameWinCount = 0;
      return;
    }

    if (this.minigameQueue.length === 0) {
      // Player has run out of chances to proceed to the next phase.
      console.log("You lose!");
      return;
    }

    this.startNextMinigame();
  }

  onInterludeEnd() {
    if (this.completedMinigamePhases >= 3) {
      // TODO: What should we do once the player has finished?
      location.reload();
      return;
    }

    this.populateMinigameQueue(10);
    this.startNextMinigame();
  }

  private populateMinigameQueue(count: number, pool = this.MINIGAMES_POOL) {
    // Reset the current queue.
    this.minigameQueue.length = 0;
    for (let i = 0; i < count; i++) {
      // TODO: Don't let the same minigame be selected multiple times for the queue.
      const minigame = new pool[Math.floor(Math.random() * pool.length)](
        this.app,
        this,
      );
      this.minigameQueue.push(minigame);
    }
  }

  private startNextMinigame() {
    this.currentMinigame = this.minigameQueue.shift();
    this.currentMinigame.attach();
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

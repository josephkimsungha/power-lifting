import { Application } from "pixi.js";
import { Minigame, MinigameDelegate } from "./minigames/minigame";
import { KeyboardMinigame } from "./minigames/keyboardMinigame";
import { FlingMinigame } from "./minigames/flingMinigame";
import { TypingMinigame } from "./minigames/typingMinigame";
import { TimingMinigame } from "./minigames/timingMinigame";
import { RhythmMinigame } from "./minigames/rhythmMinigame";
import { Interlude, InterludeDelegate } from "./interlude/interlude";
import { CheckpointMinigame } from "./minigames/checkpointMinigame";

const ALL_MINIGAMES = [
  Minigame,
  KeyboardMinigame,
  FlingMinigame,
  TypingMinigame,
  TimingMinigame,
  // TODO: Only play this at the end of a phase.
  CheckpointMinigame,
];
/** Controls the flow of the game. */
export class Controller implements MinigameDelegate, InterludeDelegate {
  private completedMinigamePhases = 0;

  private minigameQueue: Minigame[] = [];
  private minigameWinCount = 0;

  private currentScreen?: Minigame | Interlude;

  constructor(private readonly app: Application) {}

  preload() {
    return Promise.all(ALL_MINIGAMES.map((mg) => mg.preload()));
  }

  start() {
    this.populateMinigameQueue(10);
    this.startNextMinigame();
  }

  onMinigameEnd(passed: boolean) {
    this.currentScreen!.detach();
    if (passed) {
      this.minigameWinCount++;
    }
    console.log(
      passed ? "Nice!" : "Too bad!",
      "Player has won",
      this.minigameWinCount,
    );

    if (this.minigameWinCount >= 5) {
      // Player has met the requirements to proceed to the next phase.
      this.completedMinigamePhases++;
      if (this.completedMinigamePhases >= 3) {
        console.log("You are the power lifting champion!");
        return;
      }

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
    this.currentScreen!.detach();

    this.populateMinigameQueue(10);
    this.startNextMinigame();
  }

  private populateMinigameQueue(count: number, pool = ALL_MINIGAMES) {
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
    this.currentScreen?.detach();

    this.currentScreen = this.minigameQueue.shift();
    this.currentScreen.attach();
  }

  private startNextInterlude() {
    this.currentScreen?.detach();

    this.currentScreen = new Interlude(this.app, this);
    this.currentScreen.attach();
  }
}

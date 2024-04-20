import { Application } from "pixi.js";
import { Minigame, MinigameDelegate } from "./minigames/minigame";
import { KeyboardMinigame } from "./minigames/keyboardMinigame";

/** Controls the flow of the game. */
export class Controller implements MinigameDelegate {
  private currentMinigame?: Minigame;

  constructor(private readonly app: Application) {}

  start() {
    this.currentMinigame = new KeyboardMinigame(this.app, this);
    this.currentMinigame.attach();
  }

  onMinigameEnd(passed: boolean) {
    this.currentMinigame!.detach();
    this.currentMinigame = undefined;
    console.log("Player", passed ? "won" : "lost");
    // For now just restart the same minigame again.
    this.start();
  }
}

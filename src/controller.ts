import { Application } from "pixi.js";
import { Minigame, MinigameDelegate } from "./minigame";
import { KeyboardMinigame } from "./keyboardMinigame";

/** Controls the flow of the game. */
export class Controller implements MinigameDelegate {
  private currentMinigame?: Minigame;

  constructor(private readonly app: Application) { }

  finished(passed: boolean) {
    this.currentMinigame!.detach();
    this.currentMinigame = undefined;
    console.log('Player', passed ? 'won' : 'lost');
    // For now just restart the same minigame again.
    this.start();
  }

  start() {
    this.currentMinigame = new KeyboardMinigame(this.app, this);
    this.currentMinigame.attach();
  }
}

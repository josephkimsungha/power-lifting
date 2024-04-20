import { TextStyle, Text } from "pixi.js";
import { Minigame } from "./minigame";

export class KeyboardMinigame extends Minigame {
  private keyDownListener = (e: KeyboardEvent) => void this.onKeyDown(e.key);
  private currentLetter = (Math.floor(Math.random() * 10)).toString();

  protected onKeyDown(key: string) {
    console.log(key, 'pressed');
    this.finishMinigame(key === this.currentLetter);
  }

  override populateContainer(): void {
    const text = new Text({
      text: this.currentLetter,
      style: new TextStyle({ fill: '#de3249' })
    });

    this.container.addChild(text);
  }

  override attach() {
    super.attach();
    window.addEventListener('keydown', this.keyDownListener);
  }

  override detach() {
    window.removeEventListener('keydown', this.keyDownListener);
    super.detach();
  }
}

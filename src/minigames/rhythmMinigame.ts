import { TextStyle, Text } from "pixi.js";
import { KeyboardMinigame } from "./keyboardMinigame";

export class RhythmMinigame extends KeyboardMinigame {
  //private keyDownListener = (e: KeyboardEvent) => void this.onKeyDown(e.key);
  protected text: Text | null = null;
  private waitingForPress: boolean = false;

  protected override async populateContainer() {
    this.text = new Text({
      label: "text",
      text: "3",
      style: new TextStyle({ fill: "#de3249" }),
    });
    this.container.addChild(this.text);

    this.countdown();
  }

  async countdown() {
    await this.waitFor(1000);
    this.text.text = "2";
    await this.waitFor(1000);
    this.text.text = "1";
    await this.waitFor(1000);
    this.text.text = "NOW";
    this.waitingForPress = true;
    await this.waitFor(500);
    this.waitingForPress = false;
  }

  async waitFor(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  protected override onKeyDown(key: string) {
    console.log(key, "pressed");
    if (this.waitingForPress == true) {
      this.finishMinigame(true);
      this.waitingForPress = false;
    } else {
      this.finishMinigame(false);
    }
  }
}

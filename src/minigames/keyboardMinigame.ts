import { TextStyle, Text } from "pixi.js";
import { Minigame } from "./minigame";

export class KeyboardMinigame extends Minigame {
  private keyDownListener = (e: KeyboardEvent) => void this.onKeyDown(e.key, e);

  override async attach() {
    await super.attach();
    window.addEventListener("keydown", this.keyDownListener);
  }

  override detach() {
    window.removeEventListener("keydown", this.keyDownListener);
    super.detach();
  }

  protected override async populateContainer() {
    const text = new Text({
      label: "text",
      text: Math.floor(Math.random() * 10).toString(),
      style: new TextStyle({ fill: "#de3249" }),
    });

    this.container.addChild(text);
  }

  protected onKeyDown(key: string, e: KeyboardEvent) {
    console.log(key, "pressed");
    const text = this.container.getChildByLabel("text");
    if (!text || !(text instanceof Text)) {
      this.finishMinigame(false);
    }
    this.finishMinigame(key === (text as Text).text);
  }
}

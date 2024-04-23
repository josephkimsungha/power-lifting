import { Container, Graphics, Point, Text, TextStyle } from "pixi.js";
import { KeyboardMinigame } from "./keyboardMinigame";

/** Minigame that plays at the end of each day. Generally just a button masher. */
export class CheckpointMinigame extends KeyboardMinigame {
  // Checkpoints have no time limit.
  protected override lifetime = undefined;

  // Charge bar goes from 0 -> 100 but drains at some rate.
  private chargeBar = 0;
  private chargeRate = 10;
  private drainRate = 0.1;

  protected populateContainer() {
    const chargeIndicator = new Container();
    const x = this.app.screen.width / 2 - 200;
    const y = this.app.screen.height / 2 - 200;
    chargeIndicator.setSize(400);
    chargeIndicator.position = new Point(x, y);

    const background = new Graphics();
    background.rect(0, 0, 400, 400);
    background.fill(0xde3249);
    background.zIndex = -1;

    const text = new Text({
      text: this.chargeBar,
      style: new TextStyle({ fill: "#abcdef" }),
    });
    text.anchor.set(0.5);
    text.position = new Point(background.width / 2, background.height / 2);

    chargeIndicator.addChild(background, text);

    this.ticker.add((time) => {
      if (this.chargeBar > 0 && this.chargeBar < 100) {
        // Slowly drain.
        this.chargeBar -= this.drainRate * time.deltaTime;
      }

      // Update indicator.
      text.text = Math.round(this.chargeBar);
      const redValue = Math.round((this.chargeBar * 15) / 100).toString(16);
      background.tint = `#${redValue}ff`;

      if (this.chargeBar === 100) {
        this.finishMinigame(true);
      }
    });

    this.container.addChild(chargeIndicator);
  }

  protected override onKeyDown(key: string, e: KeyboardEvent) {
    // Prevent holding down the key to win.
    if (key != " " || e.repeat) return;

    this.chargeBar = Math.min(this.chargeBar + this.chargeRate, 100);
  }
}

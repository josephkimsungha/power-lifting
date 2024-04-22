import { Application, Container, Text, TextStyle } from "pixi.js";
import { getIntroFrames } from "./frames/introFrames";
import { getDayOneFrames } from "./frames/dayOneFrames";
import { getDayTwoFrames } from "./frames/dayTwoFrames";
import { getDayThreeFrames } from "./frames/dayThreeFrames";

export interface InterludeDelegate {
  onInterludeEnd: () => void;
}

const framesMap = [
  getIntroFrames,
  getDayOneFrames,
  getDayTwoFrames,
  getDayThreeFrames,
];

export class Interlude {
  private frames: Container[] = [];
  private currentFrame = -1;

  constructor(
    private readonly app: Application,
    private readonly delegate: InterludeDelegate,
    day: number,
  ) {
    const getFrames = framesMap[day];
    if (getFrames === undefined) return;

    this.frames = getFrames(app);
  }

  start() {
    this.showNextFrame();
  }

  private showNextFrame() {
    this.currentFrame++;
    if (this.currentFrame >= this.frames.length) {
      this.delegate.onInterludeEnd();
      return;
    }

    const container = this.frames[this.currentFrame];
    container.eventMode = "static";
    container.on("click", () => {
      this.app.stage.removeChild(container);
      this.showNextFrame();
    });

    this.app.stage.addChild(container);
  }
}

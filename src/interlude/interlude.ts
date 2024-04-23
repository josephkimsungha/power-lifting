import { Application, Assets, Container } from "pixi.js";
import { getIntroFrames } from "./frames/introFrames";
import { getDayOneFrames } from "./frames/dayOneFrames";
import { getDayTwoFrames } from "./frames/dayTwoFrames";
import { getDayThreeFrames } from "./frames/dayThreeFrames";

export function preloadInterludeAssets() {
  Assets.add({
    alias: "intro1",
    src: "./assets/sprites/intro/opening-gym-panel-1.png",
  });
  Assets.add({
    alias: "intro2",
    src: "./assets/sprites/intro/opening-gym-panel-2.png",
  });
  Assets.add({
    alias: "intro3",
    src: "./assets/sprites/intro/opening-gym-panel-3.png",
  });

  Assets.backgroundLoad(["intro1", "intro2", "intro3"]);
}

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
    private readonly day: number,
  ) {}

  async start() {
    const getFrames = framesMap[this.day];
    if (getFrames === undefined) return;
    this.frames = await getFrames(this.app);

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

import { Application, Assets, Ticker } from "pixi.js";
import { getIntroFrames } from "./frames/introFrames";
import { getDayOneFrames } from "./frames/dayOneFrames";
import { getDayTwoFrames } from "./frames/dayTwoFrames";
import { getDayThreeFrames } from "./frames/dayThreeFrames";
import { FrameData } from "./frames/types";

const INTERLUDE_ASSET_PATHS = {
  intro1: "./assets/sprites/intro/opening-gym-panel-1.png",
  intro2: "./assets/sprites/intro/opening-gym-panel-2.png",
  intro3: "./assets/sprites/intro/opening-gym-panel-3.png",
  intro4: "./assets/sprites/intro/exercise1.png",
  intro5: "./assets/sprites/intro/exercise2.png",
  intro6: "./assets/sprites/intro/exercise3.png",
  intro7: "./assets/sprites/intro/exercise4.png",
  intro8: "./assets/sprites/intro/exercise5.png",
  intro9: "./assets/sprites/intro/exercise6.png",
  intro10: "./assets/sprites/intro/gymconvo1.png",
  intro11: "./assets/sprites/intro/gymconvo2.png",
  intro12: "./assets/sprites/intro/gymconvo3.png",
  intro13: "./assets/sprites/intro/gymconvo4.png",
  intro14: "./assets/sprites/intro/gymconvo5.png",
  intro15: "./assets/sprites/intro/gymconvo6.png",
};

export function backgroundLoadInterludeAssets() {
  const aliases = Object.keys(INTERLUDE_ASSET_PATHS);
  aliases.forEach((alias) => {
    Assets.add({
      alias: alias,
      src: INTERLUDE_ASSET_PATHS[alias],
    });
  });

  Assets.backgroundLoad(aliases);
}

export interface InterludeDelegate {
  onInterludeEnd: () => void;
}

const framesList = [
  getIntroFrames,
  getDayOneFrames,
  getDayTwoFrames,
  getDayThreeFrames,
];

export class Interlude {
  private frames: FrameData[] = [];
  private currentFrame = -1;

  constructor(
    private readonly app: Application,
    private readonly delegate: InterludeDelegate,
    private readonly day: number,
  ) {}

  async start() {
    const getFrames = framesList[this.day];
    if (getFrames !== undefined) {
      this.frames = await getFrames(this.app);
    }

    this.showNextFrame();
  }

  private showNextFrame() {
    this.currentFrame++;
    if (this.currentFrame >= this.frames.length) {
      this.delegate.onInterludeEnd();
      return;
    }

    const { container, advanceMode } = this.frames[this.currentFrame];
    container.eventMode = "static";
    if (advanceMode === "click") {
      container.on("click", () => {
        this.app.stage.removeChild(container);
        this.showNextFrame();
      });
    } else if (advanceMode === "auto") {
      let remainingTime = 300;
      const ticker = new Ticker();
      ticker.add((time) => {
        remainingTime -= time.deltaMS;
        if (remainingTime > 0) return;

        this.app.stage.removeChild(container);
        this.showNextFrame();
        ticker.destroy();
      });
      ticker.start();
    }

    this.app.stage.addChild(container);
  }
}

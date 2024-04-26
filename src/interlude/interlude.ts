import { Application, Assets, Ticker } from "pixi.js";
import { getIntroFrames } from "./frames/introFrames";
import { getWeekThreeFrames } from "./frames/weekThreeFrames";
import { FrameData } from "./frames/types";
import { getOutroFrames } from "./frames/outroFrames";
import { game } from "../game";

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
  beforeComp1: "./assets/sprites/beforecomp/before-comp-1.png",
  beforeComp2: "./assets/sprites/beforecomp/before-comp-2.png",
  beforeComp3: "./assets/sprites/beforecomp/before-comp-3.png",
  beforeComp4: "./assets/sprites/beforecomp/before-comp-4.png",
  beforeComp5: "./assets/sprites/beforecomp/before-comp-5.png",
  beforeComp6: "./assets/sprites/beforecomp/lastday-gym-1.png",
  beforeComp7: "./assets/sprites/beforecomp/lastday-gym-2.png",
  beforeComp8: "./assets/sprites/beforecomp/lastday-gym-3.png",
  afterComp1: "./assets/sprites/aftercomp/aftercomp1.png",
  afterComp2: "./assets/sprites/aftercomp/aftercomp2.png",
  afterComp3: "./assets/sprites/aftercomp/aftercomp3.png",
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
  () => [],
  () => [],
  getWeekThreeFrames,
  getOutroFrames,
];

export class Interlude {
  private frames: FrameData[] = [];
  private currentFrame = -1;

  constructor(
    private readonly app: Application,
    private readonly delegate: InterludeDelegate,
    private readonly week: number,
  ) {}

  async start() {
    const getFrames = framesList[this.week];
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

    const { container, advanceMode, autoAdvanceMs } =
      this.frames[this.currentFrame];

    if (container.label === "intro13") {
      game.audioController.playTrack("shine");
    }
    container.eventMode = "static";
    if (advanceMode === "click") {
      container.on("click", () => {
        this.app.stage.removeChild(container);
        this.showNextFrame();
      });
    } else if (advanceMode === "auto") {
      let remainingTime = autoAdvanceMs;
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

import { Application, Assets, Container, Sprite } from "pixi.js";
import { FrameData, GetFrames } from "./types";

export const getWeekThreeFrames: GetFrames = async (app: Application) => {
  const allFrames: FrameData[] = [
    await spriteFrame(app, "beforeComp1"),
    await spriteFrame(app, "beforeComp2", "auto", 800),
    await spriteFrame(app, "beforeComp3", "auto", 800),
    await spriteFrame(app, "beforeComp4"),
    await spriteFrame(app, "beforeComp5"),
    await spriteFrame(app, "beforeComp6"),
    await spriteFrame(app, "beforeComp7"),
    await spriteFrame(app, "beforeComp8"),
  ];

  return allFrames;
};

const spriteFrame = async (
  app: Application,
  assetAlias: string,
  advanceMode: "auto" | "click" = "click",
  autoAdvanceMs = 400,
) => {
  const frame = new Container();
  frame.hitArea = app.screen;

  const texture = await Assets.load(assetAlias);
  const sprite = new Sprite(texture);
  sprite.setSize(app.screen);

  frame.addChild(sprite);

  return { container: frame, advanceMode, autoAdvanceMs };
};

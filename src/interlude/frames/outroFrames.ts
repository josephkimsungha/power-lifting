import { Application, Assets, Container, Sprite } from "pixi.js";
import { FrameData, GetFrames } from "./types";

export const getOutroFrames: GetFrames = async (app: Application) => {
  const allFrames: FrameData[] = [
    await spriteFrame(app, "afterComp1"),
    await spriteFrame(app, "afterComp2"),
    await spriteFrame(app, "afterComp3"),
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

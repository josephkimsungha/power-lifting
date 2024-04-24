import { Application, Assets, Container, Sprite } from "pixi.js";
import { FrameData, GetFrames } from "./types";

export const getIntroFrames: GetFrames = async (app: Application) => {
  const allFrames: FrameData[] = [
    await spriteFrame(app, "intro1"),
    await spriteFrame(app, "intro2"),
    await spriteFrame(app, "intro3"),
    await spriteFrame(app, "intro4", "auto"),
    await spriteFrame(app, "intro5", "auto"),
    await spriteFrame(app, "intro6", "auto"),
    await spriteFrame(app, "intro7", "auto"),
    await spriteFrame(app, "intro8", "auto"),
    await spriteFrame(app, "intro9"),
    await spriteFrame(app, "intro10"),
    await spriteFrame(app, "intro11"),
    await spriteFrame(app, "intro12"),
    await spriteFrame(app, "intro13", "auto"),
    await spriteFrame(app, "intro14"),
    await spriteFrame(app, "intro15"),
  ];

  return allFrames;
};

const spriteFrame = async (
  app: Application,
  assetAlias: string,
  advanceMode: "auto" | "click" = "click",
) => {
  const frame = new Container();
  frame.hitArea = app.screen;

  const texture = await Assets.load(assetAlias);
  const sprite = new Sprite(texture);
  sprite.setSize(app.screen);

  frame.addChild(sprite);

  return { container: frame, advanceMode };
};

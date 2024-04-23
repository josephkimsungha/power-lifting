import { Application, Assets, Container, Sprite } from "pixi.js";
import { GetFrames } from "./types";

export const getIntroFrames: GetFrames = async (app: Application) => {
  const allFrames: Container[] = [
    await getFrame1(app),
    await getFrame2(app),
    await getFrame3(app),
  ];

  return allFrames;
};

async function getFrame1(app: Application) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const texture = await Assets.load("intro1");
  const sprite = new Sprite(texture);
  sprite.setSize(app.screen);

  frame.addChild(sprite);

  return frame;
}

async function getFrame2(app: Application) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const texture = await Assets.load("intro2");
  const sprite = new Sprite(texture);
  sprite.setSize(app.screen);

  frame.addChild(sprite);

  return frame;
}

async function getFrame3(app: Application) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const texture = await Assets.load("intro3");
  const sprite = new Sprite(texture);
  sprite.setSize(app.screen);

  frame.addChild(sprite);

  return frame;
}

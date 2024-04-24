import { Application, Container, Text, TextStyle } from "pixi.js";
import { FrameData, GetFrame, GetFrames } from "./types";

export const getDayTwoFrames: GetFrames = async (app: Application) => {
  const allFrames: FrameData[] = [await getFrame1(app), await getFrame2(app)];

  return allFrames;
};

const getFrame1: GetFrame = async (app: Application) => {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "This is the end of the second day",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return { container: frame, advanceMode: "click" };
};

const getFrame2: GetFrame = async (app: Application) => {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "Keep getting swole",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return { container: frame, advanceMode: "click" };
};

import { Application, Container, Point, Text, TextStyle } from "pixi.js";
import { FrameData, GetFrame, GetFrames } from "./types";

export const getDayThreeFrames: GetFrames = async (app: Application) => {
  const allFrames: FrameData[] = [
    await getFrame1(app),
    await getFrame2(app),
    await getFrame3(app),
    await getFrame4(app),
  ];

  return allFrames;
};

const getFrame1: GetFrame = async (app: Application) => {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "You did it!",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return { container: frame, advanceMode: "click" };
};

const getFrame2: GetFrame = async (app: Application) => {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "You won the competition.",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return { container: frame, advanceMode: "click" };
};

const getFrame3: GetFrame = async (app: Application) => {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "You showed your rivals who's goated.",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return { container: frame, advanceMode: "click" };
};

const getFrame4: GetFrame = async (app: Application) => {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "I guess this is it...",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return { container: frame, advanceMode: "click" };
};

import { Application, Container, Point, Text, TextStyle } from "pixi.js";
import { GetFrames } from "./types";

export const getIntroFrames: GetFrames = (app: Application) => {
  const allFrames: Container[] = [getFrame1(app), getFrame2(app)];

  return allFrames;
};

function getFrame1(app: Application) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "This is the intro",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return frame;
}

function getFrame2(app: Application) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "There will be a few frames of storyline here",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return frame;
}

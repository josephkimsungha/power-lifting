import { Application, Container, Point, Text, TextStyle } from "pixi.js";
import { GetFrames } from "./types";

export const getDayThreeFrames: GetFrames = (app: Application) => {
  const allFrames: Container[] = [
    getFrame1(app),
    getFrame2(app),
    getFrame3(app),
    getFrame4(app),
  ];

  return allFrames;
};

function getFrame1(app: Application) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "You did it!",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return frame;
}

function getFrame2(app: Application) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "You won the competition.",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return frame;
}

function getFrame3(app: Application) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "You showed your rivals who's goated.",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return frame;
}

function getFrame4(app: Application) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const text = new Text({
    text: "I guess this is it...",
    style: new TextStyle({ fill: "#de3249" }),
  });
  frame.addChild(text);

  return frame;
}

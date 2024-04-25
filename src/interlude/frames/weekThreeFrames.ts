import { Application, Rectangle } from "pixi.js";
import { FrameData, GetFrames } from "./types";
import { getRelativelyPositionedSpeech, spriteFrame } from "./helpers";

export const getWeekThreeFrames: GetFrames = async (app: Application) => {
  const { screen } = app;

  const allFrames: FrameData[] = [
    await spriteFrame(app, "beforeComp1", [getSpeech1(screen)]),
    await spriteFrame(app, "beforeComp2", [getSpeech1(screen)], "auto", 800),
    await spriteFrame(app, "beforeComp3", [getSpeech1(screen)], "auto", 800),
    await spriteFrame(app, "beforeComp4", [
      getSpeech1(screen),
      getSpeech2(screen),
    ]),
    await spriteFrame(app, "beforeComp5", [
      getSpeech1(screen),
      getSpeech2(screen),
      getSpeech3(screen),
    ]),
    await spriteFrame(app, "beforeComp6", [getSpeech4(screen)]),
    await spriteFrame(app, "beforeComp7", [
      getSpeech4(screen),
      getSpeech5(screen),
    ]),
    await spriteFrame(app, "beforeComp8", [
      getSpeech4(screen),
      getSpeech5(screen),
      getSpeech6(screen),
    ]),
  ];

  return allFrames;
};

function getSpeech1(screen: Rectangle) {
  return getRelativelyPositionedSpeech("It's been 3 weeks...", screen, {
    x: 0.28,
    y: 0.07,
    width: 0.095,
    height: 0.12,
  });
}

function getSpeech2(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "What's this? A powerlifting competition? Maybe with this-",
    screen,
    { x: 0.315, y: 0.67, width: 0.11, height: 0.25 },
  );
}

function getSpeech3(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "I can show that wolf how far I've come!",
    screen,
    { x: 0.838, y: 0.57, width: 0.125, height: 0.122 },
  );
}

function getSpeech4(screen: Rectangle) {
  return getRelativelyPositionedSpeech("Today's the day.", screen, {
    x: 0.465,
    y: 0.075,
    width: 0.11,
    height: 0.21,
  });
}

function getSpeech5(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "I know I can win this competition. I've been training non-stop for it.",
    screen,
    { x: 0.345, y: 0.41, width: 0.225, height: 0.165 },
  );
}

function getSpeech6(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "It's time for me to blow the roof off the competition!",
    screen,
    { x: 0.65, y: 0.11, width: 0.3, height: 0.23 },
  );
}

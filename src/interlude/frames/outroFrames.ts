import { Application, Rectangle } from "pixi.js";
import { FrameData, GetFrames } from "./types";
import { getRelativelyPositionedSpeech, spriteFrame } from "./helpers";

export const getOutroFrames: GetFrames = async (app: Application) => {
  const { screen } = app;

  const allFrames: FrameData[] = [
    await spriteFrame(app, "afterComp1", [getSpeech1(screen)]),
    await spriteFrame(app, "afterComp2", [
      getSpeech1(screen),
      getSpeech2(screen),
    ]),
    await spriteFrame(app, "afterComp3", [
      getSpeech1(screen),
      getSpeech2(screen),
      getSpeech3(screen),
      getSpeech4(screen),
    ]),
    await spriteFrame(app, "afterComp3", [
      getSpeech1(screen),
      getSpeech2(screen),
      getSpeech3(screen),
      getSpeech4(screen),
      getSpeech5(screen),
    ]),
  ];

  return allFrames;
};

function getSpeech1(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "\"Sorry pal, you're disqualified. You can't just go breaking the fifth wall like that.\"",
    screen,
    {
      x: 0.07,
      y: 0.69,
      width: 0.215,
      height: 0.2,
    },
  );
}

function getSpeech2(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "After all that... did I accomplish nothing? *sigh* Maybe I should pay mum a visit",
    screen,
    { x: 0.668, y: 0.39, width: 0.27, height: 0.12 },
  );
}

function getSpeech3(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    '"Welcome home son, I\'ve missed you. Help me bring in the groceries, would you?"',
    screen,
    { x: 0.65, y: 0.78, width: 0.18, height: 0.14 },
  );
}

function getSpeech4(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "In that moment it was clear. The power I could use for good meant so much more to me than any competition.",
    screen,
    { x: 0.85, y: 0.57, width: 0.1, height: 0.365 },
  );
}

function getSpeech5(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "Fin.",
    screen,
    {
      x: 0.92,
      y: 0.93,
      width: 0.05,
      height: 0.05,
    },
    /* drawBubble= */ false,
  );
}

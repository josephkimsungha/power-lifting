import { Application, Rectangle } from "pixi.js";
import { FrameData, GetFrames } from "./types";
import {
  addClickIndicator,
  getRelativelyPositionedSpeech,
  spriteFrame,
} from "./helpers";

export const getIntroFrames: GetFrames = async (app: Application) => {
  if (new URLSearchParams(window.location.search).get("skipIntro")) return [];

  const { screen } = app;

  const allFrames: FrameData[] = [
    await spriteFrame(app, "intro1", [
      getSpeech1(screen),
      await addClickIndicator(app),
    ]),
    await spriteFrame(app, "intro2", [
      getSpeech1(screen),
      getSpeech2(screen),
      await addClickIndicator(app),
    ]),
    await spriteFrame(app, "intro3", [
      getSpeech1(screen),
      getSpeech2(screen),
      getSpeech3(screen),
      await addClickIndicator(app),
    ]),
    await spriteFrame(app, "intro4", [], "auto"),
    await spriteFrame(app, "intro5", [], "auto"),
    await spriteFrame(app, "intro6", [], "auto"),
    await spriteFrame(app, "intro7", [], "auto"),
    await spriteFrame(app, "intro8", [], "auto"),
    await spriteFrame(app, "intro9", [
      getSpeech4(screen),
      await addClickIndicator(app),
    ]),
    await spriteFrame(app, "intro10", [
      getSpeech5(screen),
      await addClickIndicator(app),
    ]),
    await spriteFrame(app, "intro11", [
      getSpeech5(screen),
      getSpeech6(screen),
      await addClickIndicator(app),
    ]),
    await spriteFrame(app, "intro12", [
      getSpeech5(screen),
      getSpeech6(screen),
      getSpeech7(screen),
      await addClickIndicator(app),
    ]),
    await spriteFrame(app, "intro13", [], "auto", 1200),
    await spriteFrame(app, "intro14", [
      getSpeech8(screen),
      await addClickIndicator(app),
    ]),
    await spriteFrame(app, "intro15", [
      getSpeech8(screen),
      getSpeech9(screen),
      await addClickIndicator(app),
    ]),
  ];

  return allFrames;
};

function getSpeech1(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "These days I just feel so powerless.",
    screen,
    { x: 0.465, y: 0.075, width: 0.12, height: 0.21 },
  );
}

function getSpeech2(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "They say that the gym is a good place to get stronger.",
    screen,
    { x: 0.345, y: 0.41, width: 0.225, height: 0.165 },
  );
}

function getSpeech3(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "Ever since moving out I haven't been able to motivate myself to do anything. I've never exercised before, but there's not harm in trying, right?",
    screen,
    { x: 0.65, y: 0.11, width: 0.3, height: 0.23 },
  );
}

function getSpeech4(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "Nope, it's no good. Exercising is harder than it looks - it just makes me feel even weaker than I already did. Maybe there's no hope for me...",
    screen,
    { x: 0.76, y: 0.495, width: 0.21, height: 0.435 },
  );
}

function getSpeech5(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "Snap out of it! Rome wasn't built in a day, I just need to keep at it!",
    screen,
    { x: 0.747, y: 0.32, width: 0.215, height: 0.12 },
  );
}

function getSpeech6(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "I might not be able to see it now, but I need to keep going! If I can build up a good routine, with a healthy diet, surely some day, somehow, I can...!",
    screen,
    { x: 0.09, y: 0.69, width: 0.36, height: 0.19 },
  );
}

function getSpeech7(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    '"Hey kiddo. Looks like you are struggling pretty hard over there! *snicker* I know just what you need-"',
    screen,
    { x: 0.56, y: 0.545, width: 0.18, height: 0.17 },
  );
}

function getSpeech8(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "No thanks. That seems super shady. I'm going to get stronger through my own hard work, just you watch.",
    screen,
    { x: 0.835, y: 0.1, width: 0.12, height: 0.33 },
    // { x: 0.73, y: 0.1, width: 0.2, height: 0.33 },
  );
}

function getSpeech9(screen: Rectangle) {
  return getRelativelyPositionedSpeech(
    "I need to do my best to prove just how powerful I can be!",
    screen,
    { x: 0.777, y: 0.54, width: 0.175, height: 0.14 },
  );
}

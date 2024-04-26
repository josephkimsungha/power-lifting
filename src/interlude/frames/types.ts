import { Application, Container } from "pixi.js";

export type FrameData = {
  container: Container;
  advanceMode: "auto" | "click";
  autoAdvanceMs?: number;
};

export type GetFrame = (app: Application) => Promise<FrameData>;
export type GetFrames = (app: Application) => Promise<FrameData[]>;

import { Application, Container } from "pixi.js";

export type GetFrames = (app: Application) => Promise<Container[]>;

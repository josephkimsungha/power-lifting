import { Assets } from "pixi.js";

export enum MINIGAME_ASSET_ALIASES {
  PHONE_SCREEN = "phone-screen",
}

export const MINIGAME_ASSET_FILENAMES = {
  [MINIGAME_ASSET_ALIASES.PHONE_SCREEN]: getAssetPath("phonescreen.png"),
};

function getAssetPath(filename: string) {
  return `./assets/sprites/minigames/${filename}`;
}

export function backgroundLoadMinigameAssets() {
  const aliases = Object.keys(MINIGAME_ASSET_FILENAMES);
  aliases.forEach((alias) => {
    Assets.add({
      alias,
      src: MINIGAME_ASSET_FILENAMES[alias],
    });
  });

  Assets.backgroundLoad(aliases);
}

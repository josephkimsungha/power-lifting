import { Assets } from "pixi.js";

export enum MINIGAME_ASSET_ALIASES {
  /* Typing minigame */
  PHONE_SCREEN = "phone-screen",
  /* Shopping minigame */
  SHOPPING_BACKGROUND = "shopping-background",
  SHOPPING_PHONE = "shopping-phone",
  BASKET = "basket",
  SECURITY_ON = "security-on",
  SECURITY_OFF = "security-off",
  TILL = "till",
  /* Common sprites */
  BANANA = "banana",
  MILK = "milk",
  PEANUT_BUTTER = "peanut-butter",
  PROTEIN = "protein",
  STRAWBERRIES = "strawberries",
  YOGHURT = "yoghurt",
  /* Browser game sprites */
  BLOG_POST_1 = "blog-post-1",
  BLOG_POST_2 = "blog-post-2",
  BLOG_POST_3 = "blog-post-3",
  POPUP_1 = "popup-1",
  POPUP_2 = "popup-2",
  POPUP_3 = "popup-3",
  POPUP_4 = "popup-4",
  POPUP_5 = "popup-5",
}

const MINIGAME_ASSET_FILENAMES = {
  [MINIGAME_ASSET_ALIASES.PHONE_SCREEN]: getAssetPath("phonescreen.png"),
  [MINIGAME_ASSET_ALIASES.SHOPPING_BACKGROUND]: getAssetPath(
    "shopping_background.png",
  ),
  [MINIGAME_ASSET_ALIASES.SHOPPING_PHONE]: getAssetPath("shopping_phone.png"),
  [MINIGAME_ASSET_ALIASES.BASKET]: getAssetPath("basket.png"),
  [MINIGAME_ASSET_ALIASES.SECURITY_ON]: getAssetPath("security_on.png"),
  [MINIGAME_ASSET_ALIASES.SECURITY_OFF]: getAssetPath("security_off.png"),
  [MINIGAME_ASSET_ALIASES.TILL]: getAssetPath("till.png"),
  [MINIGAME_ASSET_ALIASES.BANANA]: getAssetPath("banana.png"),
  [MINIGAME_ASSET_ALIASES.MILK]: getAssetPath("milk.png"),
  [MINIGAME_ASSET_ALIASES.PEANUT_BUTTER]: getAssetPath("peanutbutter.png"),
  [MINIGAME_ASSET_ALIASES.PROTEIN]: getAssetPath("protein.png"),
  [MINIGAME_ASSET_ALIASES.STRAWBERRIES]: getAssetPath("strawberries.png"),
  [MINIGAME_ASSET_ALIASES.YOGHURT]: getAssetPath("yoghurt.png"),
  [MINIGAME_ASSET_ALIASES.BLOG_POST_1]: getAssetPath("blog_post_1.png"),
  [MINIGAME_ASSET_ALIASES.BLOG_POST_2]: getAssetPath("blog_post_2.png"),
  [MINIGAME_ASSET_ALIASES.BLOG_POST_3]: getAssetPath("blog_post_3.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_1]: getAssetPath("popup_1.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_2]: getAssetPath("popup_2.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_3]: getAssetPath("popup_3.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_4]: getAssetPath("popup_4.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_5]: getAssetPath("popup_5.png"),
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

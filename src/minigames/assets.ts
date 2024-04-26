import { Assets } from "pixi.js";

export enum MINIGAME_ASSET_ALIASES {
  /* Typing minigame */
  PHONE_SCREEN = "phone-screen",
  /* Bath minigame */
  BATH_BG_1 = "bath-bg-1",
  BATH_DIRT_1 = "bath-dirt-1",
  BATH_DIRT_2 = "bath-dirt-2",
  BATH_DIRT_3 = "bath-dirt-3",
  BATH_DIRT_4 = "bath-dirt-4",
  BATH_MC_1 = "bath-mc-1",
  BATH_MC_2 = "bath-mc-2",
  BATH_MC_3 = "bath-mc-3",
  /* Shopping minigame */
  SHOPPING_BACKGROUND = "shopping-background",
  SHOPPING_PHONE = "shopping-phone",
  BASKET = "basket",
  SECURITY_ON = "security-on",
  SECURITY_OFF = "security-off",
  TILL = "till",
  /* Pose minigame */
  POSE_BACKGROUND = "pose-backgound",
  POSE_1_DOWN = "pose-1-down",
  POSE_1_LEFT = "pose-1-left",
  POSE_1_RIGHT = "pose-1-right",
  POSE_1_UP = "pose-1-up",
  POSE_2_DOWN = "pose-2-down",
  POSE_2_LEFT = "pose-2-left",
  POSE_2_RIGHT = "pose-2-right",
  POSE_2_UP = "pose-2-up",
  POSE_3_DOWN = "pose-3-down",
  POSE_3_LEFT = "pose-3-left",
  POSE_3_RIGHT = "pose-3-right",
  POSE_3_UP = "pose-3-up",
  POSE_PROGRESS_CONTAINER = "pose-progress-container",
  /* Checkpoint sprites */
  CHECKPOINT_1_1 = "check-1-1",
  CHECKPOINT_1_2 = "check-1-2",
  CHECKPOINT_1_3 = "check-1-3",
  CHECKPOINT_1_4 = "check-1-4",
  ROOMBA = "roomba",
  CHECKPOINT_2_1 = "check-2-1",
  CHECKPOINT_2_2 = "check-2-2",
  CHECKPOINT_2_3 = "check-2-3",
  CHECKPOINT_2_4 = "check-2-4",
  CHECKPOINT_2_5 = "check-2-5",
  RABBIT = "rabbit",
  CHECKPOINT_3_1 = "check-3-1",
  CHECKPOINT_3_2 = "check-3-2",
  CHECKPOINT_3_3 = "check-3-3",
  CHECKPOINT_3_4 = "check-3-4",
  CHECKPOINT_3_5 = "check-3-5",
  BAR = "bar",
  /* Common sprites */
  BANANA = "banana",
  MILK = "milk",
  PEANUT_BUTTER = "peanut-butter",
  PROTEIN = "protein",
  STRAWBERRIES = "strawberries",
  YOGHURT = "yoghurt",
  PROGRESS_BAR = "progress-bar",
  UP_ARROW = "up-arrow",
  DOWN_ARROW = "down-arrow",
  LEFT_ARROW = "left-arrow",
  RIGHT_ARROW = "right-arrow",
  /* Browser game sprites */
  BLOG_POST_1 = "blog-post-1",
  BLOG_POST_2 = "blog-post-2",
  BLOG_POST_3 = "blog-post-3",
  POPUP_1 = "popup-1",
  POPUP_2 = "popup-2",
  POPUP_3 = "popup-3",
  POPUP_4 = "popup-4",
  POPUP_5 = "popup-5",
  LEARNING_PROGRESS_CONTAINER = "learning-progress-container",
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
  [MINIGAME_ASSET_ALIASES.BATH_BG_1]: getAssetPath("bath_bg_1.png"),
  [MINIGAME_ASSET_ALIASES.BATH_DIRT_1]: getAssetPath("bath_dirt_1.png"),
  [MINIGAME_ASSET_ALIASES.BATH_DIRT_2]: getAssetPath("bath_dirt_2.png"),
  [MINIGAME_ASSET_ALIASES.BATH_DIRT_3]: getAssetPath("bath_dirt_3.png"),
  [MINIGAME_ASSET_ALIASES.BATH_DIRT_4]: getAssetPath("bath_dirt_4.png"),
  [MINIGAME_ASSET_ALIASES.BATH_MC_1]: getAssetPath("bath_mc_1.png"),
  [MINIGAME_ASSET_ALIASES.BATH_MC_2]: getAssetPath("bath_mc_2.png"),
  [MINIGAME_ASSET_ALIASES.BATH_MC_3]: getAssetPath("bath_mc_3.png"),
  [MINIGAME_ASSET_ALIASES.POSE_BACKGROUND]: getAssetPath("pose_background.png"),
  [MINIGAME_ASSET_ALIASES.POSE_1_DOWN]: getAssetPath("pose_1_down.png"),
  [MINIGAME_ASSET_ALIASES.POSE_1_LEFT]: getAssetPath("pose_1_left.png"),
  [MINIGAME_ASSET_ALIASES.POSE_1_RIGHT]: getAssetPath("pose_1_right.png"),
  [MINIGAME_ASSET_ALIASES.POSE_1_UP]: getAssetPath("pose_1_up.png"),
  [MINIGAME_ASSET_ALIASES.POSE_2_DOWN]: getAssetPath("pose_2_down.png"),
  [MINIGAME_ASSET_ALIASES.POSE_2_LEFT]: getAssetPath("pose_2_left.png"),
  [MINIGAME_ASSET_ALIASES.POSE_2_RIGHT]: getAssetPath("pose_2_right.png"),
  [MINIGAME_ASSET_ALIASES.POSE_2_UP]: getAssetPath("pose_2_up.png"),
  [MINIGAME_ASSET_ALIASES.POSE_3_DOWN]: getAssetPath("pose_3_down.png"),
  [MINIGAME_ASSET_ALIASES.POSE_3_LEFT]: getAssetPath("pose_3_left.png"),
  [MINIGAME_ASSET_ALIASES.POSE_3_RIGHT]: getAssetPath("pose_3_right.png"),
  [MINIGAME_ASSET_ALIASES.POSE_3_UP]: getAssetPath("pose_3_up.png"),
  [MINIGAME_ASSET_ALIASES.POSE_PROGRESS_CONTAINER]:
    getAssetPath("progress_pose.png"),
  [MINIGAME_ASSET_ALIASES.UP_ARROW]: getAssetPath("uparrow.png"),
  [MINIGAME_ASSET_ALIASES.DOWN_ARROW]: getAssetPath("downarrow.png"),
  [MINIGAME_ASSET_ALIASES.LEFT_ARROW]: getAssetPath("leftarrow.png"),
  [MINIGAME_ASSET_ALIASES.RIGHT_ARROW]: getAssetPath("rightarrow.png"),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_1_1]: getAssetPath(
    "checkpoints/check1.1.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_1_2]: getAssetPath(
    "checkpoints/check1.2.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_1_3]: getAssetPath(
    "checkpoints/check1.3.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_1_4]: getAssetPath(
    "checkpoints/check1.4.png",
  ),
  [MINIGAME_ASSET_ALIASES.ROOMBA]: getAssetPath("checkpoints/roomba.png"),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_2_1]: getAssetPath(
    "checkpoints/check2.1.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_2_2]: getAssetPath(
    "checkpoints/check2.2.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_2_3]: getAssetPath(
    "checkpoints/check2.3.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_2_4]: getAssetPath(
    "checkpoints/check2.4.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_2_5]: getAssetPath(
    "checkpoints/check2.5.png",
  ),
  [MINIGAME_ASSET_ALIASES.RABBIT]: getAssetPath(
    "checkpoints/rabbit-flying.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_3_1]: getAssetPath(
    "checkpoints/check-3.1.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_3_2]: getAssetPath(
    "checkpoints/check-3.2.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_3_3]: getAssetPath(
    "checkpoints/check-3.3.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_3_4]: getAssetPath(
    "checkpoints/check-3.4.png",
  ),
  [MINIGAME_ASSET_ALIASES.CHECKPOINT_3_5]: getAssetPath(
    "checkpoints/check-3.5.png",
  ),
  [MINIGAME_ASSET_ALIASES.BAR]: getAssetPath("checkpoints/bar.png"),
  [MINIGAME_ASSET_ALIASES.BLOG_POST_1]: getAssetPath("blog_post_1.png"),
  [MINIGAME_ASSET_ALIASES.BLOG_POST_2]: getAssetPath("blog_post_2.png"),
  [MINIGAME_ASSET_ALIASES.BLOG_POST_3]: getAssetPath("blog_post_3.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_1]: getAssetPath("popup_1.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_2]: getAssetPath("popup_2.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_3]: getAssetPath("popup_3.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_4]: getAssetPath("popup_4.png"),
  [MINIGAME_ASSET_ALIASES.POPUP_5]: getAssetPath("popup_5.png"),
  [MINIGAME_ASSET_ALIASES.LEARNING_PROGRESS_CONTAINER]: getAssetPath(
    "progress_learning.png",
  ),
  [MINIGAME_ASSET_ALIASES.PROGRESS_BAR]: getAssetPath("progress_bar.png"),
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

import { Assets, Graphics, Point, Rectangle, Sprite, Ticker } from "pixi.js";
import { KeyboardMinigame } from "../keyboardMinigame";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { ProgressBar } from "@pixi/ui";

const POSE_ASSETS = [
  {
    up: MINIGAME_ASSET_ALIASES.POSE_1_UP,
    down: MINIGAME_ASSET_ALIASES.POSE_1_DOWN,
    left: MINIGAME_ASSET_ALIASES.POSE_1_LEFT,
    right: MINIGAME_ASSET_ALIASES.POSE_1_RIGHT,
  },
  {
    up: MINIGAME_ASSET_ALIASES.POSE_2_UP,
    down: MINIGAME_ASSET_ALIASES.POSE_2_DOWN,
    left: MINIGAME_ASSET_ALIASES.POSE_2_LEFT,
    right: MINIGAME_ASSET_ALIASES.POSE_2_RIGHT,
  },
  {
    up: MINIGAME_ASSET_ALIASES.POSE_3_UP,
    down: MINIGAME_ASSET_ALIASES.POSE_3_DOWN,
    left: MINIGAME_ASSET_ALIASES.POSE_3_LEFT,
    right: MINIGAME_ASSET_ALIASES.POSE_3_RIGHT,
  },
];

const ARROW_ASSETS = {
  up: MINIGAME_ASSET_ALIASES.UP_ARROW,
  down: MINIGAME_ASSET_ALIASES.DOWN_ARROW,
  left: MINIGAME_ASSET_ALIASES.LEFT_ARROW,
  right: MINIGAME_ASSET_ALIASES.RIGHT_ARROW,
};

enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

type ArrowData = {
  sprite: Sprite;
  direction: Direction;
};

export class PoseMinigame extends KeyboardMinigame {
  private timeUntilNextPose = 0;

  private poseProgress = 0;
  private goal = [5, 10, 20][this.week];

  private characterDirection = Direction.DOWN;
  private character: Sprite;

  private progressBar: ProgressBar;

  protected override async populateContainer() {
    const appDimensions = this.app.screen;

    this.container.addChild(await this.constructBackground(appDimensions));
    this.container.addChild(...(await this.constructTimeline(appDimensions)));
    this.container.addChild(await this.constructProgressBar(appDimensions));

    this.ticker.add((time) => this.periodicallyAddArrow(time));

    this.container.addChild(await this.constructCharacter(appDimensions));
  }

  protected override async onKeyDown(key: string) {
    if (!this.character) return;

    if (key === "ArrowUp" || key === "Up") {
      this.changeCharacterDirection(Direction.UP);
    } else if (key === "ArrowDown" || key === "Down") {
      this.changeCharacterDirection(Direction.DOWN);
    } else if (key === "ArrowLeft" || key === "Left") {
      this.changeCharacterDirection(Direction.LEFT);
    } else if (key === "ArrowRight" || key === "Right") {
      this.changeCharacterDirection(Direction.RIGHT);
    }
  }

  private async changeCharacterDirection(direction: Direction) {
    this.characterDirection = direction;
    this.character.texture = await Assets.load(
      POSE_ASSETS[this.week][direction],
    );
  }

  private async periodicallyAddArrow(time: Ticker) {
    const { screen } = this.app;
    this.timeUntilNextPose -= time.deltaMS;
    if (this.timeUntilNextPose > 0) return;

    this.timeUntilNextPose = [1000, 600, 300][this.week];

    const directions = [
      Direction.UP,
      Direction.DOWN,
      Direction.LEFT,
      Direction.RIGHT,
    ];
    const arrow = await this.constructTimelineArrow(
      screen,
      directions[Math.floor(Math.random() * directions.length)],
    );

    this.container.addChild(arrow.sprite);

    this.ticker.add((time) => {
      if (!arrow.sprite.parent) return;

      const speed = [
        screen.width * 0.008,
        screen.width * 0.012,
        screen.width * 0.02,
      ][this.week];
      arrow.sprite.x -= speed * time.deltaTime;
      if (
        arrow.sprite.x < screen.width * 0.125 &&
        arrow.sprite.x > screen.width * 0.1
      ) {
        // Check the current player's direction.
        if (this.characterDirection === arrow.direction) {
          this.poseProgress++;

          this.progressBar.progress = (this.poseProgress / this.goal) * 100;
          if (this.poseProgress >= this.goal) {
            this.finishMinigame(true);
            return;
          }

          arrow.sprite.removeFromParent();
        }
      }
      if (arrow.sprite.x < screen.width * -0.1) {
        arrow.sprite.removeFromParent();
      }
    });
  }

  private async constructBackground(appDimensions: Rectangle) {
    const texture = await Assets.load(MINIGAME_ASSET_ALIASES.POSE_BACKGROUND);
    const background = new Sprite(texture);
    background.setSize(appDimensions);
    background.zIndex = -1;

    return background;
  }

  private async constructTimeline(appDimensions: Rectangle) {
    const line = new Graphics();
    line.rect(0, 0, appDimensions.width * 1.1, appDimensions.height * 0.15);
    line.fill(0xe8e8e8);
    line.stroke({ color: 0x485054, width: screen.height / 200 });
    line.position = new Point(
      appDimensions.width * -0.05,
      appDimensions.height * 0.75,
    );

    const box = new Graphics();
    box.roundRect(
      appDimensions.width * 0.11,
      appDimensions.height * 0.74,
      appDimensions.height * 0.17,
      appDimensions.height * 0.17,
      appDimensions.height * 0.015,
    );
    box.stroke({ color: 0x9fb278, width: screen.height / 150 });
    box.zIndex = 2;

    return [line, box];
  }

  private async constructTimelineArrow(
    appDimensions: Rectangle,
    direction: Direction,
  ): Promise<ArrowData> {
    const texture = await Assets.load(ARROW_ASSETS[direction]);
    const arrow = new Sprite(texture);
    const aspectRatio = arrow.width / arrow.height;
    arrow.height = appDimensions.height * 0.1;
    arrow.width = arrow.height * aspectRatio;
    arrow.zIndex = 1;

    arrow.position = new Point(
      appDimensions.width * 1.2,
      appDimensions.height * (0.75 + 0.025),
    );

    return { sprite: arrow, direction };
  }

  private async constructCharacter(appDimensions: Rectangle) {
    const texture = await Assets.load(POSE_ASSETS[this.week].down);
    const character = new Sprite(texture);
    const aspectRatio = character.width / character.height;
    character.height = appDimensions.height * [0.3, 0.4, 0.5][this.week];
    character.width = character.height * aspectRatio;
    character.anchor = new Point(0.5, 1);
    character.position = new Point(
      appDimensions.width * 0.5,
      appDimensions.height * 0.67,
    );

    this.character = character;

    return this.character;
  }

  private async constructProgressBar(appDimensions: Rectangle) {
    const progressBar = new ProgressBar({
      bg: new Sprite(
        await Assets.load(MINIGAME_ASSET_ALIASES.POSE_PROGRESS_CONTAINER),
      ),
      fill: new Sprite(await Assets.load(MINIGAME_ASSET_ALIASES.PROGRESS_BAR)),
      progress: 0,
      fillPaddings: {
        top: 75,
        bottom: 0,
        right: 0,
        left: 228,
      },
    });
    const aspectRatio = progressBar.width / progressBar.height;
    progressBar.height = 48;
    progressBar.width = aspectRatio * 48;
    progressBar.x = 16;
    progressBar.y = 16;

    this.progressBar = progressBar;
    return this.progressBar;
  }
}

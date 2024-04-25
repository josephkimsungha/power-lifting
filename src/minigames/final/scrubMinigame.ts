import {
  Application,
  Graphics,
  Sprite,
  Point,
  Assets,
  Rectangle,
} from "pixi.js";
import { Minigame } from "../minigame";
import { MINIGAME_ASSET_FILENAMES, MINIGAME_ASSET_ALIASES } from "../assets";

interface DirtySpotDelegate {
  isPointerDown(): boolean;
  markCleaned(spot: DirtySpot): void;
}

const DIRT_ASSETS = [
  MINIGAME_ASSET_ALIASES.BATH_DIRT_1,
  MINIGAME_ASSET_ALIASES.BATH_DIRT_2,
  MINIGAME_ASSET_ALIASES.BATH_DIRT_3,
  MINIGAME_ASSET_ALIASES.BATH_DIRT_4,
];

const DIRT_SIZE = 50;

class DirtySpot {
  private health = 100;

  constructor(
    private readonly app: Application,
    private readonly delegate: DirtySpotDelegate,
  ) {}

  async getObject(characterArea: Rectangle) {
    const dirtAssetId =
      DIRT_ASSETS[Math.floor(DIRT_ASSETS.length * Math.random())];
    const dirtAsset = await Assets.load(MINIGAME_ASSET_FILENAMES[dirtAssetId]);
    const spot = new Sprite(dirtAsset);
    const x = characterArea.x + characterArea.width * Math.random();
    const y = characterArea.y + characterArea.height * Math.random();
    spot.width = DIRT_SIZE;
    spot.height = DIRT_SIZE;
    spot.anchor = 0.5;
    spot.position = new Point(x, y);

    spot.eventMode = "static";
    spot.on("mousemove", (event) => {
      if (!this.delegate.isPointerDown()) return;

      this.health = Math.max(this.health - event.movement.magnitude() * 0.1, 0);
      spot.alpha = this.health / 100;
      if (this.health === 0) {
        this.delegate.markCleaned(this);
        spot.removeFromParent();
      }
    });

    return spot;
  }
}

export class ScrubMinigame extends Minigame implements DirtySpotDelegate {
  private pointerDown = false;
  private remainingDirtySpots: Set<DirtySpot> = new Set();

  override async attach() {
    await super.attach();
    this.app.canvas.style.cursor = `url('./assets/sprites/minigames/loofa.png'), auto`;
  }

  override detach() {
    super.detach();

    this.app.canvas.style.cursor = "auto";
  }

  protected override async populateContainer() {
    const bgAsset = await Assets.load(
      MINIGAME_ASSET_FILENAMES[MINIGAME_ASSET_ALIASES.BATH_BG_1],
    );
    const characterAsset = await Assets.load(
      MINIGAME_ASSET_FILENAMES[MINIGAME_ASSET_ALIASES.BATH_MC_1],
    );

    const { screen } = this.app;

    const bg = new Sprite(bgAsset);
    bg.width = this.app.screen.width;
    bg.height = this.app.screen.height;
    bg.zIndex = -1;
    this.container.addChild(bg);

    const mc = new Sprite(characterAsset);
    const characterSize = {
      width: mc.width * 0.7,
      height: mc.height * 0.7,
    };
    mc.width = characterSize.width;
    mc.height = characterSize.height;
    mc.anchor = 0.5;
    mc.x = screen.width / 2;
    mc.y = screen.height / 2;
    this.container.addChild(mc);

    const numSpots = 3;
    const characterArea = new Rectangle(
      screen.width / 2 - characterSize.width / 2,
      screen.height / 2 - characterSize.height / 2,
      characterSize.width - DIRT_SIZE,
      characterSize.height - DIRT_SIZE,
    );
    for (let i = 0; i < numSpots; i++) {
      const spot = new DirtySpot(this.app, this);
      this.remainingDirtySpots.add(spot);
      this.container.addChild(await spot.getObject(characterArea));
    }

    this.container.eventMode = "static";
    this.container.hitArea = this.app.screen;
    this.container
      .on("pointerdown", () => (this.pointerDown = true))
      .on("pointerup", () => (this.pointerDown = false))
      .on("pointerupoutside", () => (this.pointerDown = false));
  }

  isPointerDown() {
    return this.pointerDown;
  }

  markCleaned(spot: DirtySpot) {
    this.remainingDirtySpots.delete(spot);
    if (this.remainingDirtySpots.size === 0) {
      this.finishMinigame(true);
    }
  }
}

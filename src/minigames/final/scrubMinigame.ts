import { Sprite, Point, Assets, Rectangle } from "pixi.js";
import { Minigame } from "../minigame";
import { MINIGAME_ASSET_ALIASES } from "../assets";

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

  constructor(private readonly delegate: DirtySpotDelegate) {}

  async getObject(area: Rectangle) {
    const dirtAssetId =
      DIRT_ASSETS[Math.floor(DIRT_ASSETS.length * Math.random())];
    const dirtAsset = await Assets.load(dirtAssetId);
    const spot = new Sprite(dirtAsset);
    const x = area.x + area.width * Math.random();
    const y = area.y + area.height * Math.random();
    spot.width = DIRT_SIZE;
    spot.height = DIRT_SIZE;
    spot.anchor = 0.5;
    spot.position = new Point(x, y);

    spot.eventMode = "static";
    spot.on("mousemove", (event) => {
      if (!this.delegate.isPointerDown()) return;

      this.health = Math.max(this.health - event.movement.magnitude() * 0.4, 0);
      spot.alpha = 0.15 + 0.7 * (this.health / 100);
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
  protected override lifetime = 15_000;

  override async attach() {
    await super.attach();
    // Sometimes attach gets called before canvas sets it's own cursor state.
    // Only update the cursor _after_ this to make sure we don't get overriden.
    await new Promise((resolve) => void setTimeout(resolve, 200));
    this.app.canvas.style.cursor = `url('./assets/sprites/minigames/loofa.png'), auto`;
  }

  override detach() {
    super.detach();

    this.app.canvas.style.cursor = "auto";
  }

  protected override async populateContainer() {
    const bgAsset = await Assets.load(MINIGAME_ASSET_ALIASES.BATH_BG_1);
    const characterAssetId = [
      MINIGAME_ASSET_ALIASES.BATH_MC_1,
      MINIGAME_ASSET_ALIASES.BATH_MC_2,
      MINIGAME_ASSET_ALIASES.BATH_MC_3,
    ][this.week];
    const numSpots = 3 + 2 * this.week;
    const characterAsset = await Assets.load(characterAssetId);

    const { screen } = this.app;

    const bg = new Sprite(bgAsset);
    bg.width = this.app.screen.width;
    bg.height = this.app.screen.height;
    bg.zIndex = -1;
    this.container.addChild(bg);

    const mc = new Sprite(characterAsset);
    const heightScale = [0.8, 0.9, 1][this.week];
    const characterSize = {
      width: screen.height * heightScale * (mc.width / mc.height),
      height: screen.height * heightScale,
    };
    mc.width = characterSize.width;
    mc.height = characterSize.height;
    mc.anchor = 0.5;
    mc.x = screen.width / 2;
    mc.y = screen.height / 2;
    this.container.addChild(mc);

    const torsoRatio = [0.5, 0.4, 0.35][this.week];
    const dirtableSize = {
      width: characterSize.width * torsoRatio,
      height: characterSize.height * torsoRatio,
    };
    const dirtableArea = new Rectangle(
      screen.width / 2 - dirtableSize.width / 2,
      screen.height / 2 - dirtableSize.height / 2,
      dirtableSize.width,
      dirtableSize.height,
    );
    for (let i = 0; i < numSpots; i++) {
      const spot = new DirtySpot(this);
      this.remainingDirtySpots.add(spot);
      this.container.addChild(await spot.getObject(dirtableArea));
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

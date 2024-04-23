import { Application, Graphics, Point } from "pixi.js";
import { Minigame } from "./minigame";

interface DirtySpotDelegate {
  markCleaned(spot: DirtySpot): void;
}

class DirtySpot {
  private health = 100;
  private pointerDown = false;

  constructor(
    private readonly app: Application,
    private readonly delegate: DirtySpotDelegate,
  ) {}

  getObject() {
    const spot = new Graphics();

    const x = (this.app.screen.width - 100) * Math.random() + 50;
    const y = (this.app.screen.height - 100) * Math.random() + 50;
    spot.rect(-50, -50, 100, 100);
    spot.fill(0xabcdef);
    spot.position = new Point(x, y);

    spot.eventMode = "static";
    spot.on("mousemove", (event) => {
      if (!this.pointerDown) return;

      this.health = Math.max(this.health - event.movement.magnitude() * 0.1, 0);
      spot.alpha = this.health / 100;
      if (this.health === 0) {
        this.delegate.markCleaned(this);
        spot.removeFromParent();
      }
    });

    return spot;
  }

  updatePointerDown(isDown: boolean) {
    this.pointerDown = isDown;
  }
}

export class ScrubMinigame extends Minigame implements DirtySpotDelegate {
  private remainingDirtySpots: Set<DirtySpot> = new Set();
  protected override populateContainer(): void {
    const dirtySpots = [
      new DirtySpot(this.app, this),
      new DirtySpot(this.app, this),
      new DirtySpot(this.app, this),
    ];
    dirtySpots.forEach((spot) => {
      this.remainingDirtySpots.add(spot);
      this.container.addChild(spot.getObject());
    });

    this.container.eventMode = "static";
    this.container.hitArea = this.app.screen;
    const updateSpotsPointerDown = (isDown: boolean) => {
      this.remainingDirtySpots.forEach(
        (spot) => void spot.updatePointerDown(isDown),
      );
    };
    this.container
      .on("pointerdown", () => void updateSpotsPointerDown(true))
      .on("pointerup", () => void updateSpotsPointerDown(false))
      .on("pointerupoutside", () => void updateSpotsPointerDown(false));
  }

  markCleaned(spot: DirtySpot) {
    this.remainingDirtySpots.delete(spot);
    if (this.remainingDirtySpots.size === 0) {
      this.finishMinigame(true);
    }
  }
}

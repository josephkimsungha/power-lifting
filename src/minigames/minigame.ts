import { Application, Container, Graphics, Ticker } from "pixi.js";
import { game } from "../game";

export interface MinigameDelegate {
  onMinigameEnd: (passed: boolean) => void;
}

const CLOCK_PADDING = 16;
const CLOCK_RADIUS = 16;

/** Base class for all minigames to extend. */
export class Minigame {
  protected container: Container;
  /**
   * How long this minigame should go for before timing out
   * and failing the player. In milliseconds. Set to
   * undefined for a minigame with no time limit.
   */
  protected lifetime = 10_000;
  protected cumulativeMS = 0;
  protected ticker: Ticker;
  protected succeedOnTimeout: boolean = false;

  private clock: Graphics;
  private clockArc: Graphics;
  private transitionOverlay = document.createElement("div");

  constructor(
    protected readonly app: Application,
    protected readonly delegate: MinigameDelegate,
    /** Uses zero indexing (0 === first week). */
    protected readonly week: number,
    protected readonly isLastInPhase: boolean,
  ) {
    const { screen } = app;
    this.container = new Container();

    this.clock = new Graphics();
    this.clock.zIndex = 9999998;
    this.clockArc = new Graphics();
    this.clockArc.zIndex = 9999999;
    this.clock.fillStyle = "#f0cfbb";
    const x = ((CLOCK_PADDING + CLOCK_RADIUS) * screen.width) / 1000;
    const y =
      screen.height - ((CLOCK_PADDING + CLOCK_RADIUS) * screen.width) / 1000;
    this.clock.circle(x, y, (CLOCK_RADIUS * screen.width) / 1000);
    this.clock.fill();
  }

  async attach() {
    this.ticker = new Ticker();
    this.playAudio();
    if (this.lifetime !== undefined) {
      this.ticker.add(() => void this.onTick());
      this.app.stage.addChild(this.clock);
    }
    this.ticker.start();

    await this.populateContainer();
    this.app.stage.addChild(this.container);

    const canvasBB = this.app.canvas.getBoundingClientRect();
    this.transitionOverlay.style.position = "fixed";
    this.transitionOverlay.style.left = `${canvasBB.left}px`;
    this.transitionOverlay.style.top = `${canvasBB.top}px`;
    this.transitionOverlay.style.width = `${this.app.screen.width}px`;
    this.transitionOverlay.style.height = `${this.app.screen.height}px`;
    this.transitionOverlay.style.background = "#F0CFBB";
    this.transitionOverlay.style.display = "grid";
    this.transitionOverlay.style.placeItems = "end start";
    this.transitionOverlay.style.padding = "8px";
    this.transitionOverlay.style.boxSizing = "border-box";
    this.transitionOverlay.style.zIndex = "99999";

    const sprite = document.createElement("div");
    sprite.style.width = "124px";
    sprite.style.height = "124px";
    sprite.style.backgroundPosition = "left";
    sprite.style.backgroundRepeat = "no-repeat";
    sprite.style.backgroundSize = "cover";

    this.transitionOverlay.append(sprite);
  }

  detach() {
    this.ticker?.destroy();
    this.ticker = null;
    this.app.stage.removeChild(this.container);
    if (this.lifetime !== undefined) {
      this.app.stage.removeChild(this.clock);
      this.app.stage.removeChild(this.clockArc);
    }
  }

  protected async populateContainer() {
    const square = new Graphics();
    const x = (this.app.screen.width - 100) * Math.random();
    const y = (this.app.screen.height - 100) * Math.random();

    square.rect(x, y, 100, 100);
    square.fill(0xde3249);
    square.eventMode = "static";
    square.on("pointerdown", () => {
      square.removeFromParent();
      this.finishMinigame(true);
    });
    this.container.addChild(square);
  }

  // It's recommended to not use `this.ticker()` for these final promises.
  // Create your own.
  protected async finishMinigame(
    passed: boolean,
    pendingPromises?: Promise<void>,
  ) {
    this.ticker.stop();
    await pendingPromises;

    const sprite = this.transitionOverlay.children[0] as HTMLElement;
    if (this.isLastInPhase) {
      sprite.style.backgroundImage = [
        "url('./assets/sprites/transitions/sleep_1.png')",
        "url('./assets/sprites/transitions/sleep_2.png')",
        "url('./assets/sprites/transitions/sleep_3.png')",
      ][this.week];
      sprite.style.animation = "spritewalk-2 1s steps(1, end) infinite";
    } else {
      sprite.style.backgroundImage = [
        "url('./assets/sprites/transitions/pump.png')",
        "url('./assets/sprites/transitions/pump_2.png')",
        "url('./assets/sprites/transitions/pump_3.png')",
      ][this.week];
      sprite.style.animation = [
        "spritewalk 2s steps(3, end) infinite",
        "spritewalk-2 2s steps(1, end) infinite",
        "spritewalk 2s steps(3, end) infinite",
      ][this.week];
    }

    document.body.appendChild(this.transitionOverlay);
    await new Promise((r) => setTimeout(r, 2_000));
    this.delegate.onMinigameEnd(passed);
    this.transitionOverlay.remove();
  }

  private onTick() {
    this.cumulativeMS += this.ticker.elapsedMS;

    this.clockArc.removeFromParent();
    this.clockArc = new Graphics();
    this.clockArc.zIndex = 9999999;
    const percentage = this.cumulativeMS / this.lifetime;
    const start = -Math.PI / 2 + percentage * 2 * Math.PI;

    const { screen } = this.app;

    const x = ((CLOCK_PADDING + CLOCK_RADIUS) * screen.width) / 1000;
    const y =
      screen.height - ((CLOCK_PADDING + CLOCK_RADIUS) * screen.width) / 1000;

    this.clockArc.arc(
      x,
      y,
      ((CLOCK_RADIUS - 2) * screen.width) / 1000,
      start,
      -Math.PI / 2,
    );
    this.clockArc.lineTo(x, y);
    this.clockArc.fill("#A0484C");
    this.app.stage.addChild(this.clockArc);

    if (this.cumulativeMS > this.lifetime) {
      this.delegate.onMinigameEnd(this.succeedOnTimeout);
    }
  }

  playAudio() {
    game.audioController.playMinigameMusic(this.week);
  }
}

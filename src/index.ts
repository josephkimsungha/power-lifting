import { Application } from 'pixi.js';
import { Minigame } from './Minigame';

class Game {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  async start(): Promise<void> {
    await this.app.init({ antialias: true, resizeTo: window });

    // Import minigames.
    const basicMinigame = new Minigame(this.app);
    document.body.appendChild(this.app.canvas);

    basicMinigame.populateContainer();
    basicMinigame.attach();
  }
}


const game = new Game();
game.start();

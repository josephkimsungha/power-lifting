import { Graphics, Text, Ticker, TextStyle, Point } from "pixi.js";
import { KeyboardMinigame } from "./keyboardMinigame";

export class MashMinigame extends KeyboardMinigame {

    //private keyDownListener = (e: KeyboardEvent) => void this.onKeyDown(e.key);
    protected text: Text | null = null;
    private waitingForPress: boolean = false;
    private square: Graphics | null = null;

    currentScore: number = 0;
    totalScore: number = 0;
    decrementSpeed: number = 2;
    incrementSpeed: number = 0.2;
    incrementAmount: number = 50;
    size: number = 100;

    
    override attach() {
      super.attach();
      this.app.ticker.add(this.update)
    }

    override detach() {
        
        super.detach();
    }
    
    protected override populateContainer(): void {

        this.text = new Text({
            text: this.currentScore,
            style: new TextStyle({ fill: "#abcdef" }),
        });
        this.square = new Graphics();

        const x = (this.app.screen.width/2)
        const y = (this.app.screen.height / 2)
        
        this.text.position = new Point(x, y);
        
        this.square.rect(x, y, this.size, this.size);
        this.square.fill(0xde3249);
        this.square.eventMode = "static";
        this.container.addChild(this.square);
        
        this.container.addChild(this.text);
        
    }

    protected override onTick() {
        super.onTick();
        this.totalScore -= this.decrementSpeed * this.ticker.deltaTime;
        if (this.totalScore < 0) {
                this.totalScore = 0;
            }
        this.currentScore += (this.totalScore - this.currentScore) * this.incrementSpeed * this.ticker.deltaTime;
        this.square.setSize((this.size + this.currentScore / 10), (this.size + this.currentScore / 10));
        this.text.text = this.currentScore;
        
        
    }

    async waitFor(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    protected override onKeyDown(key: string) {
        if (key == "d") {
            this.totalScore += this.incrementAmount;
        }
        
  }

}
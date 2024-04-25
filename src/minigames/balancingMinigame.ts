import { TextStyle, Text, Graphics, Point, Ticker } from "pixi.js";
import { KeyboardMinigame } from "./keyboardMinigame";

export class BalancingMinigame extends KeyboardMinigame{
   
    private balancingObject: Graphics | null = null;
    private pos: Point = new Point(1300, 700);
    private flag: boolean;
    private currentForce: number = 0;
    private forceAmount: number = 0.5;
    
    //temporary pos for the graphic instantiation
    override async attach() {
        super.attach();
        
        this.ticker.add((time)=> this.onUpdate(time))
    }

    protected override async populateContainer() {
        this.balancingObject = new Graphics();
        this.balancingObject.circle(0, 0, 300)
        this.balancingObject.position = this.pos;
        this.balancingObject.fill(0xde3249);
        this.container.addChild(this.balancingObject);
        const square = new Graphics();
        square.rect(-50, -325, 100, 100);
        square.fill(0x0000);
        this.balancingObject.addChild(square);
        
        
    }

    protected override onKeyDown(key: string, e: KeyboardEvent): void {
        if (key == "ArrowRight") { 
            this.addRotForce(this.forceAmount);
        }
        if (key == "ArrowLeft") {
            this.addRotForce(-this.forceAmount);
         }
    }

    private addRotForce(amount: number) {
        if (this.currentForce * amount > 0) {
            this.currentForce += amount;
        }
        else {
            this.currentForce = amount;
        }
        console.log(this.currentForce);
        
    }
    
    protected onUpdate(time: Ticker): void {
        console.log(this.balancingObject.rotation);
        const increment = this.currentForce * time.deltaTime;
        this.balancingObject.rotation += increment;
        this.currentForce -= increment;
        if (Math.abs(this.balancingObject.rotation) >= 2) {
            this.finishMinigame(false);
        }

        

        if (this.balancingObject.rotation >= 0) {
            this.balancingObject.rotation += 0.003 + Math.abs(this.balancingObject.rotation)*0.008;
        }
        else {
            this.balancingObject.rotation -= 0.003 + Math.abs(this.balancingObject.rotation)*0.008;
            
        }
    }


}
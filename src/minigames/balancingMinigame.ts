import { TextStyle, Text, Graphics, Point, Ticker, Sprite, Assets, assignWithIgnore } from "pixi.js";
import { KeyboardMinigame } from "./keyboardMinigame";
import { MINIGAME_ASSET_ALIASES } from "./assets";

export class BalancingMinigame extends KeyboardMinigame{
   
    private balancingObject: Sprite | null = null;
    private pos: Point = new Point(1300, 1200);
    private flag: boolean;
    private currentForce: number = 0;
    private forceAmount: number = 0.8;
    protected override succeedOnTimeout: boolean = true;
    private gravityAmount: number;
    private randomFuckAssNumber: number;
    
    //temporary pos for the graphic instantiation
    override async attach() {
        super.attach();
        
        const texture = await Assets.load(
            MINIGAME_ASSET_ALIASES.BALANCE_BG,
         );
        const background = new Sprite(texture);
        background.setSize(this.app.screen);
        background.zIndex = -1;
        this.container.addChild(background);
        this.ticker.add((time) => this.onUpdate(time))
    }

    protected override async populateContainer() {
        let tex;
        let anchorPoint;
        switch (this.week) {
            case 0:
                this.forceAmount = 0.8;
                this.gravityAmount = 0.003;
                this.randomFuckAssNumber = 0.008;
                tex = MINIGAME_ASSET_ALIASES.BALANCE_C1;
                this.pos = new Point(this.app.screen.width / 2, this.app.screen.height / 6 * 4.5);
                anchorPoint = new Point(0.5,0.75);
                break;
            case 1:
                this.forceAmount = 1.5;
                this.gravityAmount = 0.005;
                this.randomFuckAssNumber = 0.01;
                tex = MINIGAME_ASSET_ALIASES.BALANCE_C2;
                this.pos = new Point(this.app.screen.width / 2, this.app.screen.height / 6 * 4.9);
                anchorPoint = new Point(0.5,0.8)
                break;
            case 2: 
                this.forceAmount = 2;
                this.gravityAmount = 0.01;
                this.randomFuckAssNumber = 0.015;
                tex = MINIGAME_ASSET_ALIASES.BALANCE_C3;
                this.pos = new Point(this.app.screen.width / 2, this.app.screen.height / 6 * 5.3);
                anchorPoint = new Point(0.5,0.9)
                break;
        }

        this.balancingObject = new Sprite(await Assets.load(tex))
        this.balancingObject.position = this.pos;
        this.balancingObject.anchor = anchorPoint;
        
        this.container.addChild(this.balancingObject);
        
    
        
        
    }

    protected override onKeyDown(key: string, e: KeyboardEvent): void {
        if(e.repeat){return}
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
        const increment = this.currentForce * time.deltaTime* 0.1;
        this.balancingObject.rotation += increment;
        this.currentForce -= increment;
        if (Math.abs(this.balancingObject.rotation) >= 2) {
            this.finishMinigame(false);
        }

        if (this.balancingObject.rotation >= 0) {
            this.balancingObject.rotation += this.gravityAmount + Math.abs(this.balancingObject.rotation)*this.randomFuckAssNumber;
        }
        else {
            this.balancingObject.rotation -= this.gravityAmount + Math.abs(this.balancingObject.rotation)*this.randomFuckAssNumber;
            
        }
    }


}
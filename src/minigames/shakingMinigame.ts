import {
  Graphics,
  FederatedMouseEvent,
  Texture,
  Assets,
  Point,
  Text,
  Sprite,
  TextStyle,
} from "pixi.js";
import { Minigame } from "./minigame";

export class ShakingMinigame extends Minigame{

    protected dragObject: Graphics | null = null;
    private dragListener = (e: FederatedMouseEvent) => void this.onDrag(e);
    private vel: Point;
    private score: number = 0;
    private scoreText: Text | null = null;;


    
    override attach() {
        super.attach();
        
        this.container.eventMode = 'static';
        this.container.hitArea = this.app.screen;
        this.container.on('pointerup', ()=> void this.onDragEnd());
        this.container.on('pointerupoutside', ()=> void this.onDragEnd());
    }
    


    protected override populateContainer(): void {
        const shakeAble = new Graphics();
        const x = (this.app.screen.width - 100) * Math.random();
        const y = (this.app.screen.height - 100) * Math.random();
        
        shakeAble.rect(-50, -50, 60, 60);
        shakeAble.fill(0xde3249);
        shakeAble.scale.set(10);
        
        shakeAble.eventMode = 'static';
        shakeAble.on('pointerdown', () => { 
            this.dragObject = shakeAble;
            this.container.on("pointermove", this.dragListener);
            
        });
        this.container.addChild(shakeAble);

        this.scoreText = new Text({
            label: "text",
            text: "SHAKE THE BOX :D",
            style: new TextStyle({ fill: "#ffffff" }),
        });
        this.container.addChild(this.scoreText);
        
    }
    
    

    private onDragEnd() {
        if (this.dragObject)
        {
            console.log("ENDED");
            this.container.off('pointermove', this.dragListener);
            this.dragObject = null;
        }
    }

    private onDrag(event: FederatedMouseEvent) {
        if (!this.dragObject) return;

        const previousPos = this.dragObject.position.clone();
        this.dragObject.position = event.getLocalPosition(this.dragObject.parent);

        this.vel = this.dragObject.position.subtract(previousPos);
        this.score += Math.floor((Math.abs(this.vel.x) + Math.abs(this.vel.y))/10);
        //console.log(this.score);
        this.scoreText.text = this.score;
        if (this.score > 4000) {
            this.finishMinigame(true);
        }
        
        
        
    }
}
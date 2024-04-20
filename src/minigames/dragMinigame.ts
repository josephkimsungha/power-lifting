import { Minigame } from "./minigame";
import { Application, Assets, FederatedMouseEvent, Graphics, Sprite, Texture } from "pixi.js";
export class DragMinigame extends Minigame{

    protected dragObject: Sprite | null = null;
    private texture: Texture | null = null;
    private dragListener = (e: FederatedMouseEvent) => void this.onDrag(e);

    override async preLoad(): Promise<void> {
        this.texture = await Assets.load('https://pixijs.com/assets/bunny.png');
        
    }
    
    override attach() {
        super.attach();
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerup', ()=> void this.onDragEnd());
        this.app.stage.on('pointerupoutside', ()=> void this.onDragEnd());
    }

    protected override populateContainer(): void {
        const square = new Sprite(this.texture);
        const x = (this.app.screen.width - 100) * Math.random();
        const y = (this.app.screen.height - 100) * Math.random();
        square.anchor.set(0.5);
        //square.rect(x, y, 100, 100);
        //square.fill(0xde3249);
        square.x = x;
        square.y = y;
        square.scale.set(10);
        
        square.eventMode = 'static';
        square.on('pointerdown', () => { 
            this.dragObject = square;
            this.app.stage.on("pointermove", this.dragListener);
            console.log(this.dragObject);
        });
        this.container.addChild(square);
    }
    //private dragObject: Graphics;
    

    private onDragEnd() {
        if (this.dragObject)
        {
            console.log("ENDED");
            this.app.stage.off('pointermove', this.dragListener);
            this.dragObject = null;
        }
    }

    private onDrag(event: FederatedMouseEvent) {
        console.log(this.dragObject);
        if (this.dragObject) {
            this.dragObject.parent.toLocal(event.global, null, this.dragObject.position);
        }
    }
}
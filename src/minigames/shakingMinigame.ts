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
import { ProgressBar } from '@pixi/ui';
import { Minigame } from "./minigame";
import { MINIGAME_ASSET_ALIASES } from "./assets";


export class ShakingMinigame extends Minigame{

    protected dragObject: Sprite | null = null;
    private dragListener = (e: FederatedMouseEvent) => void this.onDrag(e);
    private vel: Point;
    private score: number = 0;
    private scoreText: Text | null = null;
    private prog: ProgressBar;
    private scoreToPass: number;


    
    override async attach() {
        super.attach();
        this.scoreToPass = 3000;

        this.container.eventMode = 'static';
        this.container.hitArea = this.app.screen;
        this.container.on('pointerup', ()=> void this.onDragEnd());
        this.container.on('pointerupoutside', ()=> void this.onDragEnd());
    }
    


    protected override async populateContainer() {
        const shakeAble = new Sprite(await Assets.load(MINIGAME_ASSET_ALIASES.BLENDER));
        const x = (this.app.screen.width - 100) * Math.random();
        const y = (this.app.screen.height - 100) * Math.random();

        const loadSprite = new Sprite(await Assets.load(MINIGAME_ASSET_ALIASES.BLENDERFILL));
        const progSprite = new Sprite(await Assets.load(MINIGAME_ASSET_ALIASES.BLENDERPROG));

        this.prog = new ProgressBar({
            bg: progSprite,
            fill: loadSprite,
            fillPaddings: {
                top: 75,
                bottom: 0,
                right: 0,
                left: 228
                
            },
            progress: 0
        });
        
        var aspect = this.prog.height / this.prog.width;
        this.prog.width = this.app.screen.width / 6;
        this.prog.height = this.prog.width * aspect;
        //shakeAble.rect(0, 0, 60, 60);
        //shakeAble.fill(0xde3249);
        //shakeAble.scale.set(10);
        aspect = shakeAble.height / shakeAble.width;
        shakeAble.width = this.app.screen.width / 4;
        shakeAble.height = shakeAble.width * aspect;
        shakeAble.anchor = 0.5;
        shakeAble.position = new Point(this.app.screen.width / 2, this.app.screen.height / 2);

        
        shakeAble.eventMode = 'static';
        shakeAble.on('pointerdown', () => { 
            this.dragObject = shakeAble;
            this.container.on("pointermove", this.dragListener);
            
        });
        this.container.addChild(shakeAble);
        this.container.addChild(this.prog);
        
        
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
        //this.scoreText.text = this.score;
        this.prog.progress = (this.score/this.scoreToPass)*100;
        if (this.score > this.scoreToPass) {
            this.finishMinigame(true);
        }
    }
}
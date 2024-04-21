import { TextStyle, Text } from "pixi.js";
import { Minigame } from "./minigame";

export class RhythmMinigame extends Minigame {

    private keyDownListener = (e: KeyboardEvent) => void this.onKeyDown(e.key);
    protected text: Text | null = null;
    private waitingForPress: boolean = false;

    override attach() {
        super.attach();
        window.addEventListener("keydown", this.keyDownListener);
    }
    
    override detach() {
        window.removeEventListener("keydown", this.keyDownListener);
        super.detach();
    }

    protected override populateContainer(): void {
        this.text = new Text({
            label: "text",
            text: "3",
            style: new TextStyle({ fill: "#de3249" }),
        });
        this.container.addChild(this.text);
        
        this.countdown();
    }

    async countdown() {
        await this.waitFor(1000);
        this.text.text = "2";
        await this.waitFor(1000);
        this.text.text = "1";
        await this.waitFor(1000);
        this.text.text = "NOW";
        this.waitingForPress = true;
        console.log("bf");
        await this.waitFor(500);
        console.log("af");
        this.waitingForPress = false;
    }

    async waitFor(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    

    protected onKeyDown(key: string) {
        console.log(key, "pressed");
        if (this.waitingForPress == true) {
            this.app.renderer.background.color = "#00FF00"
            this.waitingForPress = false;
        }
        else {
            this.app.renderer.background.color = "#de3249"
        }
  }

}
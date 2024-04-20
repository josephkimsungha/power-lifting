import { Application, Container, Text, TextStyle } from "pixi.js";

export interface InterludeDelegate {
    onInterludeEnd: () => void;
}

/** Base class for all interludes to extend. */
export class Interlude {
    protected container: Container;

    constructor(protected readonly app: Application, protected readonly delegate: InterludeDelegate) {
        this.container = new Container();
    }

    attach() {
        this.populateContainer();
        this.app.stage.addChild(this.container);
    }

    detach() {
        this.app.stage.removeChild(this.container);
    }

    protected populateContainer(): void {
        const text = new Text({
            text: 'Rest time... (click to proceed)',
            style: new TextStyle({ fill: '#de3249' })
        });

        this.container.addChild(text);

        this.container.eventMode = 'static';
        this.container.width = this.app.screen.width;
        this.container.height = this.app.screen.height;
        this.container.on('click', () => {
            this.delegate.onInterludeEnd();
        });
    }
}

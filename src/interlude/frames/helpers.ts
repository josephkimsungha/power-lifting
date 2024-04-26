import {
  Application,
  Assets,
  Container,
  Graphics,
  Point,
  Rectangle,
  Sprite,
  Text,
  TextStyle,
} from "pixi.js";

export async function spriteFrame(
  app: Application,
  assetAlias: string,
  additionalObjects: Container[] = [],
  advanceMode: "auto" | "click" = "click",
  autoAdvanceMs = 400,
) {
  const frame = new Container();
  frame.hitArea = app.screen;

  const texture = await Assets.load(assetAlias);
  const sprite = new Sprite(texture);
  sprite.setSize(app.screen);
  sprite.zIndex = -1;

  frame.addChild(sprite, ...additionalObjects);

  return { container: frame, advanceMode, autoAdvanceMs };
}

export function getRelativelyPositionedSpeech(
  content: string,
  screen: Rectangle,
  relativeBounds: { x: number; y: number; width: number; height: number },
  drawBubble = true,
) {
  const { x, y, width, height } = relativeBounds;
  const borderWidth = screen.height / 150;
  const container = new Container();

  const bubble = new Graphics();
  bubble.rect(0, 0, screen.width * width, screen.height * height);
  bubble.fill(0xffffff);
  bubble.stroke({ color: 0x000000, width: borderWidth });

  if (drawBubble) {
    container.addChild(bubble);
  }

  const textStyle = new TextStyle({
    fontFamily: '"Poppins", sans-serif',
    fontSize: screen.height / 40,
    wordWrap: true,
    wordWrapWidth: bubble.width - borderWidth * 4,
  });
  const text = new Text({
    text: content,
    style: textStyle,
  });
  text.zIndex = 1;
  text.position = new Point(borderWidth * 2, borderWidth * 2);

  container.addChild(text);
  container.position = new Point(screen.width * x, screen.height * y);
  return container;
}

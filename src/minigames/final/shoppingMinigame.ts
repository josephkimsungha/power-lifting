import {
  Assets,
  BoundsData,
  Container,
  FederatedMouseEvent,
  Point,
  Polygon,
  Rectangle,
  Sprite,
} from "pixi.js";
import { Minigame } from "../minigame";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { devPreviewHitArea } from "../../util/devHelpers";

/* This needs to match up 1:1 with the strings in `minigames/assets.ts`. */
enum GroceryItemType {
  BANANA = "banana",
  MILK = "milk",
  PEANUT_BUTTER = "peanut-butter",
  PROTEIN = "protein",
  STRAWBERRIES = "strawberries",
  YOGHURT = "yoghurt",
}

type GroceryItem = {
  type: GroceryItemType;
  originalPosition: Point;
  sprite: Sprite;
};

export class ShoppingMinigame extends Minigame {
  private dragTarget?: GroceryItem;
  private readonly shoppingList: Record<GroceryItemType, number> = {
    [GroceryItemType.BANANA]: 0,
    [GroceryItemType.MILK]: 0,
    [GroceryItemType.PEANUT_BUTTER]: 0,
    [GroceryItemType.PROTEIN]: 0,
    [GroceryItemType.STRAWBERRIES]: 0,
    [GroceryItemType.YOGHURT]: 0,
  };
  private readonly shelves: Record<string, GroceryItem> = {};
  private timeUntilNextStockMs = 0;

  private dragListener = (e: FederatedMouseEvent) => void this.onDragMove(e);

  protected override async populateContainer() {
    const appDimensions = this.app.screen;

    this.container.eventMode = "static";
    this.container.hitArea = appDimensions;
    this.container.on("pointerup", () => this.onDragEnd());
    this.container.on("pointerupoutside", () => this.onDragEnd());

    this.container.addChild(await this.constructBackground(appDimensions));

    const basket = await this.constructBasket(appDimensions);
    basket.on("pointerup", () => this.onBasketDrop());
    basket.on("pointerupoutside", () => this.onBasketDrop());
    this.container.addChild(basket);

    const allItems = [
      GroceryItemType.BANANA,
      GroceryItemType.MILK,
      GroceryItemType.PEANUT_BUTTER,
      GroceryItemType.PROTEIN,
      GroceryItemType.STRAWBERRIES,
      GroceryItemType.YOGHURT,
    ];
    for (let i = 0; i < 5; i++) {
      const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
      this.shoppingList[randomItem]++;
    }
    // TODO: Display this graphically.
    console.log(
      "Your shopping list is:",
      Object.keys(this.shoppingList)
        .map((item) => `${item}: ${this.shoppingList[item]}`)
        .join(", "),
    );

    const allPositions = [
      new Point(appDimensions.width * 0.1, appDimensions.height * 0.15),
      new Point(appDimensions.width * 0.3, appDimensions.height * 0.15),
      new Point(appDimensions.width * 0.5, appDimensions.height * 0.15),
      new Point(appDimensions.width * 0.1, appDimensions.height * 0.4),
      new Point(appDimensions.width * 0.3, appDimensions.height * 0.4),
      new Point(appDimensions.width * 0.5, appDimensions.height * 0.4),
      new Point(appDimensions.width * 0.7, appDimensions.height * 0.4),
    ];
    this.ticker.add(async (time) => {
      this.timeUntilNextStockMs -= time.deltaMS;
      if (this.timeUntilNextStockMs > 0) return;

      this.timeUntilNextStockMs = 400;

      // Find an item that needs to be purchased which is not already accounted
      // for by stock on the shelves.
      const currentlyOnShelf: Record<GroceryItemType, number> = {
        [GroceryItemType.BANANA]: 0,
        [GroceryItemType.MILK]: 0,
        [GroceryItemType.PEANUT_BUTTER]: 0,
        [GroceryItemType.PROTEIN]: 0,
        [GroceryItemType.STRAWBERRIES]: 0,
        [GroceryItemType.YOGHURT]: 0,
      };
      Object.values(this.shelves).forEach(
        (item) => void currentlyOnShelf[item.type]++,
      );
      const requiredUnstockedItems = [];
      Object.keys(this.shoppingList).forEach((item) => {
        for (
          let i = 0;
          i < this.shoppingList[item] - currentlyOnShelf[item];
          i++
        ) {
          requiredUnstockedItems.push(item);
        }
      });

      if (requiredUnstockedItems.length === 0) return;

      // Look for a free spot on the shelves.
      const availablePositions = allPositions.filter(
        (position) =>
          !Object.keys(this.shelves).includes(stringifyPoint(position)),
      );

      if (availablePositions.length === 0) return;

      // Choose an item to add, and a shelf position to place it.
      const itemType =
        requiredUnstockedItems[
          Math.floor(Math.random() * requiredUnstockedItems.length)
        ];
      const position =
        availablePositions[
          Math.floor(Math.random() * availablePositions.length)
        ];

      const itemSprite = await this.constructItem(
        itemType,
        position,
        appDimensions,
      );
      const item = {
        type: itemType,
        originalPosition: position,
        sprite: itemSprite,
      };
      itemSprite.on("pointerdown", () => this.onDragStart(item));

      this.container.addChild(itemSprite);

      this.shelves[stringifyPoint(position)] = item;
    });
  }

  private onDragStart(item: GroceryItem) {
    if (!!this.dragTarget) return;

    this.dragTarget = item;
    this.container.on("pointermove", this.dragListener);
  }

  private onDragEnd() {
    if (!this.dragTarget) return;

    this.container.off("pointermove", this.dragListener);
    this.dragTarget = undefined;
  }

  private onBasketDrop() {
    if (!this.dragTarget) return;

    delete this.shelves[stringifyPoint(this.dragTarget.originalPosition)];
    this.shoppingList[this.dragTarget.type]--;
    this.dragTarget.sprite.destroy();

    if (
      Object.values(this.shoppingList).filter((remaining) => remaining > 0)
        .length === 0
    ) {
      this.finishMinigame(true);
    }
  }

  private onDragMove(event: FederatedMouseEvent) {
    if (!this.dragTarget) return;

    this.dragTarget.sprite.position = event.getLocalPosition(
      this.dragTarget.sprite.parent,
    );
  }

  private async constructBackground(appDimensions: Rectangle) {
    const texture = await Assets.load(
      MINIGAME_ASSET_ALIASES.SHOPPING_BACKGROUND,
    );
    const background = new Sprite(texture);
    background.setSize(appDimensions);
    background.zIndex = -1;

    return background;
  }

  private async constructBasket(appDimensions: Rectangle) {
    const texture = await Assets.load(MINIGAME_ASSET_ALIASES.BASKET);
    const basket = new Sprite(texture);
    const aspectRatio = basket.width / basket.height;
    basket.height = appDimensions.height * 0.4;
    basket.width = basket.height * aspectRatio;
    basket.anchor = new Point(0, 1);
    basket.position = new Point(
      appDimensions.width * 0.05,
      appDimensions.height * 1.05,
    );
    basket.zIndex = 1;
    // minY because we've set the anchor to be at the bottom left corner.
    const { maxX: boundsWidth, minY: boundsHeight } = basket.bounds;
    const hitArea = new Polygon(
      new Point(0, boundsHeight),
      new Point(0, boundsHeight * 0.89),
      new Point(boundsWidth * 0.06, boundsHeight * 0.89),
      new Point(boundsWidth * 0.17, 0),
      new Point(boundsWidth * 0.83, 0),
      new Point(boundsWidth * 0.94, boundsHeight * 0.89),
      new Point(boundsWidth, boundsHeight * 0.89),
      new Point(boundsWidth, boundsHeight),
    );
    devPreviewHitArea(basket, hitArea);
    basket.hitArea = hitArea;
    basket.eventMode = "static";

    return basket;
  }

  private async constructItem(
    itemType: GroceryItemType,
    position: Point,
    appDimensions: Rectangle,
  ) {
    const texture = await Assets.load(itemType);
    const item = new Sprite(texture);
    const aspectRatio = item.width / item.height;
    item.height = appDimensions.height * 0.2;
    item.width = item.height * aspectRatio;
    item.anchor = 0.5;
    item.position = position;
    const hitArea = getHitAreaForItem(itemType, item.bounds);
    devPreviewHitArea(item, hitArea);
    item.hitArea = hitArea;
    item.eventMode = "static";

    return item;
  }
}

function getHitAreaForItem(type: GroceryItemType, bounds: BoundsData) {
  const left = bounds.minX;
  const top = bounds.minY;
  const width = bounds.maxX - left;
  const height = bounds.maxY - top;
  function relativePoint(x: number, y: number) {
    return new Point(left + width * x, top + height * y);
  }
  switch (type) {
    case GroceryItemType.BANANA:
      return new Polygon(
        relativePoint(0.09, 0.31),
        relativePoint(0.02, 0.46),
        relativePoint(0, 0.7),
        relativePoint(0.18, 0.91),
        relativePoint(0.4, 1),
        relativePoint(0.58, 0.99),
        relativePoint(0.72, 0.92),
        relativePoint(0.81, 0.86),
        relativePoint(0.93, 0.7),
        relativePoint(0.98, 0.5),
        relativePoint(0.98, 0.42),
        relativePoint(0.94, 0.2),
        relativePoint(1, 0.12),
        relativePoint(0.97, 0.04),
        relativePoint(0.84, 0),
        relativePoint(0.8, 0.04),
        relativePoint(0.82, 0.13),
        relativePoint(0.64, 0.33),
        relativePoint(0.45, 0.39),
      );
    case GroceryItemType.MILK:
      return new Polygon(
        relativePoint(0.11, 0),
        relativePoint(0.11, 0.16),
        relativePoint(0.0, 0.34),
        relativePoint(0.0, 0.85),
        relativePoint(0.13, 0.94),
        relativePoint(0.75, 1),
        relativePoint(1, 0.86),
        relativePoint(1, 0.34),
        relativePoint(0.85, 0.14),
        relativePoint(0.84, 0),
      );
    case GroceryItemType.PEANUT_BUTTER:
      return new Polygon(
        relativePoint(0.3, 0),
        relativePoint(0.12, 0.05),
        relativePoint(0.08, 0.1),
        relativePoint(0.08, 0.28),
        relativePoint(0.0, 0.4),
        relativePoint(0.0, 0.75),
        relativePoint(0.12, 0.93),
        relativePoint(0.55, 1),
        relativePoint(0.94, 0.97),
        relativePoint(1, 0.86),
        relativePoint(1, 0.6),
        relativePoint(0.94, 0.35),
        relativePoint(0.9, 0.3),
        relativePoint(0.86, 0.06),
        relativePoint(0.7, 0),
      );
    case GroceryItemType.PROTEIN:
      return new Polygon(
        relativePoint(0.3, 0),
        relativePoint(0.12, 0.05),
        relativePoint(0.08, 0.1),
        relativePoint(0.08, 0.18),
        relativePoint(0, 0.4),
        relativePoint(0.02, 0.85),
        relativePoint(0.08, 0.96),
        relativePoint(0.55, 1),
        relativePoint(0.87, 0.97),
        relativePoint(0.99, 0.88),
        relativePoint(1, 0.38),
        relativePoint(0.96, 0.28),
        relativePoint(0.89, 0.2),
        relativePoint(0.89, 0.06),
        relativePoint(0.73, 0),
      );
    case GroceryItemType.STRAWBERRIES:
      return new Polygon(
        relativePoint(0.28, 0),
        relativePoint(0.12, 0.23),
        relativePoint(0, 0.52),
        relativePoint(0.03, 0.63),
        relativePoint(0.38, 1),
        relativePoint(0.47, 1),
        relativePoint(0.6, 0.92),
        relativePoint(0.9, 0.6),
        relativePoint(0.98, 0.5),
        relativePoint(1, 0.38),
        relativePoint(0.96, 0.24),
        relativePoint(0.83, 0),
      );
    case GroceryItemType.YOGHURT:
      return new Polygon(
        relativePoint(0.25, 0),
        relativePoint(0, 0.1),
        relativePoint(0, 0.16),
        relativePoint(0.12, 0.82),
        relativePoint(0.22, 0.94),
        relativePoint(0.31, 0.99),
        relativePoint(0.72, 1),
        relativePoint(0.83, 0.95),
        relativePoint(0.91, 0.82),
        relativePoint(1, 0.18),
        relativePoint(1, 0.08),
        relativePoint(0.7, 0),
      );
    default:
      return new Polygon();
  }
}

function stringifyPoint(position: Point) {
  return `x${position.x},y${position.y}`;
}

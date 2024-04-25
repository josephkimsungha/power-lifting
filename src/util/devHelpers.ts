import { Container, Graphics, Polygon } from "pixi.js";

/**
 * Renders the polygon for a custom hit area. Only shows with the `dev` URL
 * param enabled.
 */
export function devPreviewHitArea(container: Container, hitArea: Polygon) {
  if (!new URLSearchParams(window.location.search).get("dev")) return;

  const graphics = new Graphics();
  graphics.poly(hitArea.points);
  graphics.fill(0xde3249);
  graphics.alpha = 0.3;
  container.addChild(graphics);
}

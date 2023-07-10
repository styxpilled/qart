import type { Version } from "$lib/patterns/types";

export const reserveFormat = (ctx: CanvasRenderingContext2D, version: Version) => {
  ctx.fillStyle = 'blue';

  // horizontal reserved areas
  ctx.fillRect(0, 8, 9, 1);
  ctx.fillRect(4 * version + 9, 8, 8, 1);

  // vertical reserved areas
  ctx.fillRect(8, 0, 1, 8);
  ctx.fillRect(8, 4 * version + 10, 1, 7);
}

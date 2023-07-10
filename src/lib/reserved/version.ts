import type { Version } from "$lib/patterns/types";

export const reserveVersion = (ctx: CanvasRenderingContext2D, version: Version) => {
  ctx.fillStyle = 'blue';

  // horizontal reserved areas
  // ctx.fillRect(0, 8, 9, 1);
  ctx.fillRect(4 * version + 6, 0, 3, 6);

  // vertical reserved areas
  // ctx.fillRect(8, 0, 1, 8);
  ctx.fillRect(0, 4 * version + 6, 6, 3);
}

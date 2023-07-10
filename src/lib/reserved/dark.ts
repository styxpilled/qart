import type { Version } from "$lib/patterns/types";

export const darkModule = (ctx: CanvasRenderingContext2D, version: Version) => {
  ctx.fillStyle = 'black';
  ctx.fillRect(8, 4 * version + 9, 1, 1);
}

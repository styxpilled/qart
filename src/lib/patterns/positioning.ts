import type { Version } from "./types";

export const positioningPattern = (ctx: CanvasRenderingContext2D, version: Version) => {
  const corners: [number, number][] = [
    [0, 0],
    [21 + (version - 1) * 4 - 7, 0],
    [0, 21 + (version - 1) * 4 - 7]
  ];

  for (const corner of corners) {
    const w = corner[0];
    const h = corner[1];
    ctx.fillStyle = 'white';
    ctx.fillRect(h === 0 ? 0 : h - 1, w === 0 ? 0 : w - 1, 8, 8);
    ctx.fillStyle = 'black';
    ctx.fillRect(h, w, 7, 7);
    ctx.fillStyle = 'white';
    ctx.fillRect(h + 1, w + 1, 5, 5);
    ctx.fillStyle = 'black';
    ctx.fillRect(h + 2, w + 2, 3, 3);
  }
}
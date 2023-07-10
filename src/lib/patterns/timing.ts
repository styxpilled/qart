import type { Version } from "./types";

export const timingPattern = (ctx: CanvasRenderingContext2D, version: Version) => {
  const max = 21 + (version - 1) * 4 - 7;
  drawTimingPattern(ctx, max, 'vertical');
  drawTimingPattern(ctx, max, 'diagonal');
}

const drawTimingPattern = (
  ctx: CanvasRenderingContext2D,
  max: number,
  direction: 'vertical' | 'diagonal'
) => {
  const dir = direction === 'diagonal';
  let incrementor = 8;
  let fillStyle = false;

  while (incrementor < max) {
    ctx.fillStyle = fillStyle ? 'white' : 'black';
    if (dir) {
      ctx.fillRect(incrementor, 6, 1, 1);
    } else {
      ctx.fillRect(6, incrementor, 1, 1);
    }
    fillStyle = !fillStyle;
    incrementor++;
  }
}
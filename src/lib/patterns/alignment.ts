import type { Version } from "./types";

const alignmentPatters: number[][] = [
  [],
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170]
];

export const alignmentPattern = (ctx: CanvasRenderingContext2D, version: Version) => {
  // QR code size
  // 21 + (version - 1) * 4;
  const newPattern = alignmentPatters[version];
  for (const h of newPattern) {
    for (const w of newPattern) {
      if (w === 6 && h === 6) continue;
      if (w === 6 && h === 21 + (version - 1) * 4 - 7) continue;
      if (w === 21 + (version - 1) * 4 - 7 && h === 6) continue;
      ctx.fillStyle = 'black';
      ctx.fillRect(h - 2, w - 2, 5, 5);
      ctx.fillStyle = 'white';
      ctx.fillRect(h - 1, w - 1, 3, 3);
      ctx.fillStyle = 'black';
      ctx.fillRect(h, w, 1, 1);
    }
  }
}
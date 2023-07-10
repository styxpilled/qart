<script lang="ts">
	import { onMount } from 'svelte';

	import QRCode from 'qrcode';
	import { positioningPattern } from '$lib/patterns/positioning';
	import { alignmentPattern } from '$lib/patterns/alignment';
	import type { Version } from '$lib/patterns/types';
	import { timingPattern } from '$lib/patterns/timing';
	import { darkModule } from '$lib/reserved/dark';
	import { reserveFormat } from '$lib/reserved/format';
	import { reserveVersion } from '$lib/reserved/version';

	let canvas: HTMLCanvasElement;
	let qrcode: HTMLCanvasElement;

	let version: Version = 7;

	let width = 21 + (version - 1) * 4;
	let height = 21 + (version - 1) * 4;
	let size = 16;
	let brush = false;

	// @ts-ignore
	let canvas_grid: boolean[][] = Array.from({ length: height });

	onMount(async () => {
		reset();

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		reserveVersion(ctx, version);
		reserveFormat(ctx, version);

		alignmentPattern(ctx, version);
		positioningPattern(ctx, version);
		timingPattern(ctx, version);

		darkModule(ctx, version);

		const opts = [
			{ data: 'styx.gay', mode: 'alphanumeric' },
			{ data: '0123456', mode: 'numeric' }
		];

		// const c = document.createElement('canvas');

		// const g = await QRCode.toDataURL(c, '1', {
		// 	version,
		// 	color: {
		// 		dark: '#ff0000',
		// 		light: '#ffffff'
		// 	},
		// 	errorCorrectionLevel: 'L'
		// });
		// const img = new Image();
		// img.src = g;
		// // ctx.drawImage(img, 0, 0);

		// ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width / 4, img.height / 4);

		// const g = await QRCode.toString('https://styx.gay');
		// console.log(g);
	});

	const reset = () => {
		canvas_grid = Array.from({ length: height });
		for (let i = 0; i < canvas_grid.length; i++) {
			// @ts-ignore
			canvas_grid[i] = Array.from({ length: width }).fill(true);
		}
		drawFull();
	};

	const drawFull = () => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		let lastColor = false;

		ctx.fillStyle = 'black';

		ctx.clearRect(0, 0, width, height);

		// for (let h = 0; h < canvas_grid.length; h++) {
		// 	const row = canvas_grid[h];
		// 	for (let w = 0; w < row.length; w++) {
		// 		const element = row[w];
		// 		if (lastColor !== element) {
		// 			lastColor = element;
		// 			ctx.fillStyle = lastColor ? 'white' : 'black';
		// 		}
		// 		// console.log(w, h);

		// 		ctx.fillRect(w, h, 1, 10);
		// 	}
		// }
	};

	const draw = (h: number, w: number) => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.fillStyle = canvas_grid[h][w] ? 'white' : 'black';

		ctx.fillRect(w, h, 1, 1);
	};

	const onClick = (e: MouseEvent) => {
		if ((e.buttons & 1) !== 1) return;

		// x = left
		const offsetLeft = canvas.offsetLeft;
		// y = top
		const offsetTop = canvas.offsetTop;

		const w = Math.floor((e.x - offsetLeft) / size);
		const h = Math.floor((e.y - offsetTop) / size);

		canvas_grid[h][w] = brush;

		// console.log(canvas_grid);
		draw(h, w);
		// drawFull();
	};
</script>

<div id="root">
	<canvas
		bind:this={qrcode}
		id="qrcode-canvas"
		{width}
		{height}
		style:--width="{width * size}px"
		style:--height="{height * size}px"
	/>
	<canvas
		bind:this={canvas}
		id="drawing-canvas"
		on:click={onClick}
		on:mousemove={onClick}
		{width}
		{height}
		style:--width="{width * size}px"
		style:--height="{height * size}px"
	/>
</div>
<div class="buttons">
	<input type="checkbox" bind:checked={brush} />
	<button on:click={reset}>reset </button>
</div>

<style>
	#root {
		background-color: #181a1b;
		height: 100svh;
	}

	.buttons {
		position: absolute;
		top: 0;
		right: 0;
	}

	canvas {
		position: absolute;
		top: 0;
		width: var(--width);
		height: var(--height);
		image-rendering: pixelated;
	}

	#qrcode-canvas {
		left: calc(var(--width));
	}

	#drawing-canvas {
		/* opacity: 0.5; */
		left: 0;

		outline: red solid 2px;
	}
</style>

import { Application } from 'pixi.js'
import { Scene } from './scene';
import { Settings } from './Settings';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0xffffff,
	antialias: true,
	width: Settings.App.width,
	height: Settings.App.height
});

const scene = new Scene();

app.stage.addChild(scene);

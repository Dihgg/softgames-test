import { Application, loader } from 'pixi.js';
import assets from '@assets/assets.json';
import {ScenesManager} from "@code/engine/ScenesManager.class";

import {MenuScene} from '@code/scenes/MenuScene.class';
import {CardsScene} from '@code/scenes/CardsScene.class';
import {MixedTextScene} from '@code/scenes/MixedTextScene.class';
import {FireScene} from '@code/scenes/FireScene.class';

class Game {
	private app: Application;
	constructor() {

		// instantiate app
	    this.app = new Application({
	      width				: window.innerWidth,
	      height			: window.innerHeight,
	      backgroundColor	: 0x1099bb
	    });

		// create view in DOM
		document.body.appendChild( this.app.view );

		// Create scene ScenesManager (this guy is super cool)
		ScenesManager.create(this.app);

		// preaload them'all
		this.preload();

		// lauch app
		loader.load( this.setup.bind( this ) );
	}

	preload(): void {
		// load all the assets
		assets.forEach( ( asset ) => {
			loader.add( asset.key, asset.src );
		} );
	}

	setup(): void {
		// let menuScene = new MenuScene();
		// console.log(menuScene);
		// this.app.stage.addChild(menuScene);

		// CREATE All the scenes
		ScenesManager.createScene( 'menu', MenuScene ),
		ScenesManager.createScene( 'cards', CardsScene ),
		ScenesManager.createScene( 'mixedText', MixedTextScene ),
		ScenesManager.createScene( 'fire', FireScene );

		// set The ScenesManager to first scene
		ScenesManager.goTo('menu');

	}
}
new Game();

import { Application, loader } from 'pixi.js';
import assets from '@assets/assets.json';

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

		// resize listener
		window.addEventListener( "resize", () => {
			this.app.renderer.resize( window.innerWidth, window.innerHeight );
		} );


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

	setup(): void {}
}
new Game();

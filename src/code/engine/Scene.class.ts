import { ScenesManager } from '@code/engine/ScenesManager.class';
import { UIButton } from '@code/engine/UI.class'
import PixiFps from "pixi-fps";

export class Scene extends PIXI.Container {

	// renderer object for all the scenes
	protected renderer	= PIXI.autoDetectRenderer( window.innerWidth, window.innerHeight, {} );
	// ticker for gameloop logic
	protected ticker	= new PIXI.ticker.Ticker();

	// constructor, accepts two booleans, for backBtn and fps counter
	constructor( hasBack?: boolean, hasFPS?: boolean ) {
		super();

		if ( hasBack ) {
			// make the button
			let backBtn = new UIButton("Back");

			backBtn.position.x = (backBtn.width/2) + 12;
			backBtn.position.y = (this.renderer.height) - (backBtn.height/2) - 12;

			this.addChild(backBtn);

			// on click, go to menu Scene
			backBtn.on( 'pointerdown', () => ScenesManager.goTo('menu') );
		}

		if ( hasFPS ) {

			// create the fps counter
			let fpsCounter = new PixiFps(new PIXI.TextStyle({
				fontSize	: 24,
				fontFamily	: "Arial",
				fill		: '#ffffff',
				fontWeight	: 'bold',
		  	}));
			fpsCounter.position.x = 12;
			fpsCounter.position.y = 12;

			this.addChild(fpsCounter);

		}

		// create the ticker
		this.ticker.add((dt:number) => this.update(dt), PIXI.UPDATE_PRIORITY.LOW );
		this.ticker.start();
	}

	// gameloop function, should be inherited
	public update( dt:number ) {}
}

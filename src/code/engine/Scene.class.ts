// import { loader } from 'pixi.js';

import { ScenesManager } from '@code/engine/ScenesManager.class';

import { UIButton } from '@code/engine/UI.class'

import PixiFps from "pixi-fps";

export class Scene extends PIXI.Container {

	protected renderer	= PIXI.autoDetectRenderer( window.innerWidth, window.innerHeight, {} );
	protected ticker	= new PIXI.ticker.Ticker();

	// private fpsCounter : PIXI.Text;

	constructor( hasBack?: boolean, hasFPS?: boolean ) {
		super();
		if ( hasBack ) {
			let backBtn = new UIButton("Back");


			backBtn.position.x = (backBtn.width/2) + 12;
			backBtn.position.y = (this.renderer.height) - (backBtn.height/2) - 12;

			this.addChild(backBtn);

			backBtn.on( 'pointerdown', () => ScenesManager.goTo('menu') );
		}

		if ( hasFPS ) {

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

		this.ticker.add((dt:number) => this.update(dt), PIXI.UPDATE_PRIORITY.LOW );
		this.ticker.start();
	}

	public update( dt:number ) {}
}

import { loader } from 'pixi.js';

import { ScenesManager } from '@code/engine/ScenesManager.class';

import { UIButton } from '@code/engine/UI.class'

export class Scene extends PIXI.Container {

	public renderer = PIXI.autoDetectRenderer( window.innerWidth, window.innerHeight, {} );

	constructor( hasBack?: boolean ) {
		super();
		if ( hasBack ) {
			let backBtn = new UIButton("Back");


			backBtn.position.x = (backBtn.width/2) + 12;
			backBtn.position.y = (this.renderer.height) - (backBtn.height/2) - 12;

			this.addChild(backBtn);

			backBtn.on( 'pointerdown', () => ScenesManager.goTo('menu') );

		}
	}
}

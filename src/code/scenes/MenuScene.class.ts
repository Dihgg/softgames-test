import { Scene } from '@code/engine/Scene.class';
import { ScenesManager } from '@code/engine/ScenesManager.class';

import { loader } from 'pixi.js';

import { UIButton } from '@code/engine/UI.class'

export class MenuScene extends Scene {
	constructor() {
		super();
		[
			{ label: "Cards Stack", scene: "cards", y: (this.renderer.height / 2) - 150  },
			{ label: "Mixed Text", scene: "mixed", y: (this.renderer.height / 2) },
			{ label: "Fire", scene: "fire", y: (this.renderer.height / 2) + 150 }
		].map(({label, scene, y}) => {

			let button = new UIButton(label, {
				color		: "black",
				fontFamily	: "Verdana"
			});

			button.position.x = (this.renderer.width / 2);
			button.position.y = y;

			button.on( 'pointerdown', () => ScenesManager.goTo(scene) );

			this.addChild(button);
		});
	}
}

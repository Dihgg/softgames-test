import { Scene } from '@code/engine/Scene.class';
import { ScenesManager } from '@code/engine/ScenesManager.class';
import { UIButton } from '@code/engine/UI.class'

export class MenuScene extends Scene {
	constructor() {
		super(); // create the scene

		// create the buttons
		[
			{ label: "Cards Stack", scene: "cards", y: (this.renderer.height / 2) - 150  },
			{ label: "Mixed Text", scene: "mixedText", y: (this.renderer.height / 2) },
			{ label: "Fire", scene: "fire", y: (this.renderer.height / 2) + 150 }
		].map(({label, scene, y}) => {

			let button = new UIButton(label, {
				color		: "black",
				fontFamily	: "Verdana"
			});

			button.position.x = (this.renderer.width / 2);
			button.position.y = y;

			// on click, change scene
			button.on( 'pointerdown', () => ScenesManager.goTo(scene) );

			this.addChild(button);
		});
	}
}

import {Scene} from '@code/engine/Scene.class';

import {Card} from '@code/components/card.class';

import * as TWEEN from '@tweenjs/tween.js'

export class CardsScene extends Scene {
	constructor() {
		super(true, true); // create the scene

		let cards	= [];

		// create 144 cards
		for(let i = 144;i > 0;i--) {
			let card = new Card(i);

			// position
			card.sprite.position.x = 84;
			card.sprite.position.y = this.renderer.height/2 + (i*0.5);

			cards.push(card);

			this.addChild(card);

			// Make them dance!
			new TWEEN.Tween(card)
			.to({x: this.renderer.width - card.sprite.width - 108, y: (144-i) }, 2000)
			.easing(TWEEN.Easing.Quadratic.Out)
			.delay(i*1000)
			.start();
		}
	}
	// extends the update and call the Tween update
	public update() {
		TWEEN.update(this.ticker.lastTime);
	}
}

import {Scene} from '@code/engine/Scene.class';

import {Card} from '@code/components/card.class';

import * as TWEEN from '@tweenjs/tween.js'

// import 'pixi-display';

export class CardsScene extends Scene {
	constructor() {
		super(true, true);

		let cards	= [];
			// cardsY	= [];

		// let cardsL = new PIXI.DisplayGroup(0, true);

		// for(let i = 144;i > 0; i--) cardsY.push((this.renderer.height) + (i * 2));
		// cardsY = cardsY.reverse()


		for(let i = 144;i > 0;i--) {
			let card = new Card(i);
			card.sprite.position.x = 84;
			card.sprite.position.y = this.renderer.height/2 + (i*0.5);

			cards.push(card);

			this.addChild(card);

			// console.log(cardsY[i]);
			new TWEEN.Tween(card)
			.to({x: this.renderer.width - card.sprite.width - 108, y: (144-i) }, 2000)
			.easing(TWEEN.Easing.Quadratic.Out)
			.delay(i*1000)
			.start();
		}
	}
	public update() {
		TWEEN.update(this.ticker.lastTime);
	}
}

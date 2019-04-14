import { loader } from 'pixi.js';

export class Card extends PIXI.Container {

	public sprite : PIXI.Sprite;

	constructor( frame: number, x?:number, y?:number ) {
		super();
		// let faces = [];
		// this.sprite = new PIXI.Sprite.fromFrame(loader.resources['cards'].texture);
		if (frame > 50 ) frame	= frame%50;
		if (frame === 0 ) frame	= 1;

		this.sprite = PIXI.Sprite.fromFrame(`cards_${frame}.png`);
		this.sprite.scale.set(0.35);
		this.sprite.position.x = x || 0;
		this.sprite.position.y = y || 0;

		this.addChild(this.sprite);
	}
}

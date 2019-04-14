export class Card extends PIXI.Container {

	// Variables
	// sprite of card
	public sprite : PIXI.Sprite;

	constructor( frame: number, x?:number, y?:number ) {
		super();

		// assign a valid frame of the Texture
		if (frame > 50 ) frame	= frame%50;
		if (frame === 0 ) frame	= 1;

		// create the sprite
		this.sprite = PIXI.Sprite.fromFrame(`cards_${frame}.png`);
		// positionate
		this.sprite.scale.set(0.35);
		this.sprite.position.x = x || 0;
		this.sprite.position.y = y || 0;

		this.addChild(this.sprite);
	}
}

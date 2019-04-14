import {Utils} from '@code/engine/Utils.class';
import {Scene} from '@code/engine/Scene.class';

import {MixedText} from '@code/components/MixedText.class';

export class MixedTextScene extends Scene {
	// private _intervalTicker		= new PIXI.ticker.Ticker();
	private mixedText: MixedText;
	constructor() {
		super(true);

		this.mixedText = new MixedText(this.rndTxt(), this.rndTxtStyle());
		// this.mixedText = new PIXI.Text(this.rndTxt(), this.rndTxtStyle());
		// this
		// this.mixedText.width	= this.renderer.width;
		// this.mixedText.height	= this.renderer.height;
		// this.mixedText.scale.set(1);
		this.mixedText.position.x = 12;
		this.mixedText.position.y = 12;
		this.addChild(this.mixedText);

		// this._intervalTicker.add((dt:number) => this.updateText(dt), 2000);
		// this._intervalTicker.start();
		setInterval(() => this.updateText(), 2000);
	}

	private rndTxtStyle() : PIXI.TextStyle {
		return new PIXI.TextStyle({
			fontSize	: Utils.rndInt(20, 36),
			fontFamily	: Utils.rndArray(["Arial", "Tahoma", "Times", "Verdana"]),
			fill		: Utils.rndArray(["white", "black", "pink", "red", "yellow", "cyan"]),
			fontWeight	: Utils.rndArray(["bold", "normal", "lighter"]),
			wordWrap	: true,
			wordWrapWidth	: this.renderer.width - 24
		});
	}

	private rndTxt() : string {
		let rdnStr = Utils.rndArray([
			`$IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$ Mussum Ipsum, cacilds vidis litro abertis.`,
			`Manduma pindureta quium dia nois paga. $IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$`,
			`Admodum accumsan Manduma pindureta quium dia nois paga.$IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$ disputationi eu sit.`,
			"Interagi no mé, cursus quis, vehicula",
			`$IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$ $IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$ $IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$ $IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$`,
			`Suco de $IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$ cevadiss, é um leite divinis $IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$, qui tem lupuliz, matis, aguis e fermentis.`,
			`Posuere libero varius. $IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$ Nullam a nisl ut $IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$ ante blandit hendrerit. Aenean sit amet nisi.`
		]);

		/*let words		= rdnStr.split( " " );
		// let n_images	= Utils.rndInt(0, words.length - 1);
		let n_images	= Utils.rndInt(0, 3);
		for( let i = 0; i < n_images; i++ ) {
			words[Utils.rndInt(0, words.length-1)] = `$IMAGE(emoji_${Utils.rndInt(0,100)}.png)END$`;
		}
		return words.join( " " );*/
		// rdnStr.split( " " ).forEach((word:string) => {
		// 	console.log(word);
		// });

		return rdnStr;
	}

	private updateText() {
		this.mixedText.style	= this.rndTxtStyle();
		this.mixedText.text		= this.rndTxt();
	}
}

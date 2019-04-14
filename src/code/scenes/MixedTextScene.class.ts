import {Utils} from '@code/engine/Utils.class';
import {Scene} from '@code/engine/Scene.class';
import {MixedText} from '@code/components/MixedText.class';

export class MixedTextScene extends Scene {

	// Variables
	// mixedText component
	private mixedText: MixedText;

	constructor() {
		super(true); // create scene

		// create the mixedText, it extend the PIXI.Text, and accepts a String and Style
		this.mixedText = new MixedText(this.rndTxt(), this.rndTxtStyle());
		// positionate it
		this.mixedText.position.x = 12;
		this.mixedText.position.y = 12;

		this.addChild(this.mixedText);

		// every 2s update the text
		setInterval(() => this.updateText(), 2000);
	}

	// method for get some random styling
	private rndTxtStyle() : PIXI.TextStyle {
		return new PIXI.TextStyle({
			fontSize	: Utils.rndInt(20, 36),
			fontFamily	: Utils.rndArray(["Arial", "Tahoma", "Times", "Verdana"]),
			fontWeight	: Utils.rndArray(["bold", "normal", "lighter"]),
			wordWrap	: true,
			wordWrapWidth	: this.renderer.width - 24
		});
	}

	// method for get some random text, the  $IMAGE()END$ will be repalced by tge image (and it's name is cached using the pixi loader (see the assets/assets.json file))
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

		return rdnStr;
	}

	// method for update the text
	private updateText() {
		this.mixedText.style	= this.rndTxtStyle();
		this.mixedText.text		= this.rndTxt();
	}
}

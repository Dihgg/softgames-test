// SOME UI COMPONENTS

// button extends Graphics has some styles
export class UIButton extends PIXI.Graphics {

	private text: PIXI.Text;

	constructor(label: string, options?: any ) {
		super();

		if (!options) options = {};

		options.fontFamily	= options.fontFamily || "Arial";
		options.fontSize	= options.fontSize || 12;
		options.color		= options.color || "black";
		options.background	= options.background || 0xFFFFFF
		options.stroke		= options.stroke || 0xFF0000
		options.fontWeight	= options.fontWeight || "bold"
		options.padding		= options.padding || 20

		this.text = new PIXI.Text(label, new PIXI.TextStyle({
			fontFamily	: options.fontFamily,
			fontSize	: options.fontSize,
			fill		: options.color,
			fontWeight	: options.fontWeight,
			padding		: 20
		}));

		// this.anchor.set(0.5);
		this.pivot.x =  this.text.width/2;
		this.pivot.y =  this.text.height/2;


		// button background
		this.beginFill(options.background);
		this.lineStyle(5,options.stroke);
		this.drawRect((-options.padding/2), (-options.padding/2), this.text.width + options.padding, this.text.height + options.padding);
		this.endFill();



		// interactivity
		this.interactive = true;
		this.buttonMode = true;

		this.addChild(this.text);
	}
}

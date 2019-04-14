import { TextMetrics } from 'pixi.js';

export class MixedText extends PIXI.Text {

	// variables
	private imageRegex: RegExp;
	private metrics: TextMetrics;

	constructor( text: string, style: PIXI.TextStyle ) {
		super(text, style); // extend Text

		// regex of image
		this.imageRegex = /\$IMAGE\(.+?\)END\$/g;

		// assign the style
		this.style = style;
	}

	// override the update text
	public updateText( respectDirty:boolean ) {

		let style = this._style; // get style

		// take care of respectDirty
		if (this.localStyleID !== style.styleID) {
	      this.dirty = true;
	      this.localStyleID = style.styleID;
	    }
	    if (!this.dirty && respectDirty) return;

		this._font = this._style.toFontString(); // assign font

		let context = this.context; // get the context

		this.metrics = PIXI.TextMetrics.measureText(this.text, style); // get metrics


		// variables for the string parts
		let linesParts: string[][] 		= [],
			linesMatches: string[][]	= [];

		this.metrics.lines.forEach(  line => {
			// get the images matches
			if ( line.toString().split(this.imageRegex) ) {
				linesParts.push(line.toString().split(this.imageRegex));
			}

			if (line.toString().match(this.imageRegex) ) {
				linesMatches.push(line.toString().match(this.imageRegex));
			}
		});

		// set the canvas
		this.canvas.width = Math.ceil((Math.max(1, this.metrics.width) + style.padding * 2) * this.resolution);
	    this.canvas.height = Math.ceil((Math.max(1, this.metrics.height) + style.padding * 2) * this.resolution);

		context.scale(this.resolution, this.resolution);
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// assign font
		context.font = this._font;
	    context.lineWidth = style.strokeThickness;
	    context.miterLimit = style.miterLimit;


		this.metrics.lines.forEach( (line,i) => {
			// get values of positions
			let linePositionX = style.strokeThickness/2;
			let linePositionY = style.strokeThickness / 2 + i * this.metrics.lineHeight + this.metrics.fontProperties.ascent;

			let parts 	= linesParts[i],
				matches	= linesMatches[i];

			// only if we have fill
			if ( style.fill ) parts.forEach( (part, j) => {
				let partX = 0,

				// get texture name
				match 	= matches && matches[j],
				textureName = match && this.getFrameName(match);

				// getX
				partX += context.measureText(part).width + (part.length -1) * style.letterSpacing;

				// draw the part
				this.drawLetterSpacing(part, linePositionX, linePositionY);

				// if has texture
				if (textureName) {
					// assign texture
					let texture = PIXI.Texture.fromFrame(textureName);

					// get some sizing
					let matchH = 30,
						matchW	= 30;
					let {frame, trim} = texture;
					let cx		= frame.x,
						cy		= frame.y,
						cw		= frame.width,
						ch		= frame.height,
						trimX	= trim? trim.x : 0,
						trimY	= trim? trim.y : 0,
						x		= linePositionX + style.padding + partX + trimX,
						y		= linePositionY + style.padding + trimY - this.metrics.fontProperties.ascent;

					// draw image using context
					context.drawImage(texture.baseTexture.source, cx,cy,cw,ch, x, y, matchW, matchH);

					// add to partX
					partX += matchW;
				}
			} );

		} );

		this.updateTexture(); // update the texture of TEXT
	}

	// method to get texture name form match
	private getFrameName(match:string):string {
		return match.slice(7,-5);
	}
}

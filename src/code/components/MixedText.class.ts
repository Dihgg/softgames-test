// import {MixedTextMetrics} from '@code/components/MixedTextMetrics.class';
import { TextMetrics } from 'pixi.js';

export class MixedText extends PIXI.Text {
	private imageRegex: RegExp;
	private metrics: TextMetrics;
	// private style: PIXI.TextStyle;
	// private imageOffset: PIXI.Point;

	constructor( text: string, style: PIXI.TextStyle ) {
		super(text, style);

		this.imageRegex = /\$IMAGE\(.+?\)END\$/g;

		// this.texturesCache = {};
	    // this.imageOffset = new PIXI.Point(0, 0);
		this.style = style;
		// this._self = this;
		// this.changeText(text);
	}

	public updateText( respectDirty:boolean ) {
		// let context		= this.context;
		// this.text		= "";

		let style = this._style;

		if (this.localStyleID !== style.styleID) {
	      this.dirty = true;
	      this.localStyleID = style.styleID;
	    }
	    if (!this.dirty && respectDirty) return;

		this._font = this._style.toFontString();

		let context = this.context;

		this.metrics = PIXI.TextMetrics.measureText(this.text, style);


		let linesParts: string[][] 		= [],
			linesMatches: string[][]	= [];

		this.metrics.lines.forEach(  line => {
			if ( line.toString().split(this.imageRegex) ) {
				linesParts.push(line.toString().split(this.imageRegex));
			}

			if (line.toString().match(this.imageRegex) ) {
				linesMatches.push(line.toString().match(this.imageRegex));
			}
		});

		this.canvas.width = Math.ceil((Math.max(1, this.metrics.width) + style.padding * 2) * this.resolution);
	    this.canvas.height = Math.ceil((Math.max(1, this.metrics.height) + style.padding * 2) * this.resolution);

		context.scale(this.resolution, this.resolution);
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		context.font = this._font;

		// context.fillStyle = this._generateFillStyle(style, this.metrics.lines.join("!!").split("!!"));
		// context.fill = style.fill;
	    // context.strokeStyle = style.stroke;
	    context.lineWidth = style.strokeThickness;
	    // context.textBaseline = style.textBaseline;
	    // context.lineJoin = style.lineJoin;
	    context.miterLimit = style.miterLimit;


		this.metrics.lines.forEach( (line,i) => {
			let linePositionX = style.strokeThickness/2;
			// linePositionX += (this.metrics.maxLineWidth - this.metrics.lineWidths[i]) / 2;
			let linePositionY = style.strokeThickness / 2 + i * this.metrics.lineHeight + this.metrics.fontProperties.ascent;

			let parts 	= linesParts[i],
				matches	= linesMatches[i];

			if ( style.fill ) parts.forEach( (part, j) => {
				let partX = 0,
				match 	= matches && matches[j],
					// texture	= match && this.texturesCache[match.slice(7,-5)];
					// texture	= match && this.texturesCache[this.getFrameName(match)];
				textureName = match && this.getFrameName(match);
				// if (match) console.log(match.slice(7,-5));

				partX += context.measureText(part).width + (part.length -1) * style.letterSpacing;

				this.drawLetterSpacing(part, linePositionX, linePositionY);

				// console.log(part);
				if (textureName) {
					let texture = PIXI.Texture.fromFrame(textureName);
					// console.log(texture);

					// let partX = part.width + (part.length - 1) * style.letterSpacing;

					// let matchH = +style.fontSize,
					let matchH = 30,
						// matchW	= (this.texture.width * matchH) / (texture.height);
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

					// console.log(cx, cy,cw,ch,trimX,trimY,x,y,matchH, matchW);
					context.drawImage(texture.baseTexture.source, cx,cy,cw,ch, x, y, matchW, matchH);
					// console.log(texture.baseTexture.source);
					partX += matchW;

				}
			} );

		} );

		this.updateTexture();




		// for( let i = 0; i < this.metrics.lines.length; i++) {
		// 	let liness : string = this.metrics.lines[i];
		// 	console.log(liness)
		// 	// linesParts.push(this.metrics.lines[i].split(this.imageRegex));
	    //     // linesMatches.push(this.metrics.lines[i].match(this.imageRegex));
		// }

		// this.text = text;

	}

	getFrameName(match:string):string {
		return match.slice(7,-5);
	}
}

import {Scene} from '@code/engine/Scene.class';
import * as Particles from 'pixi-particles';

export class FireScene extends Scene {

	private emitter: Particles.Emitter;

	constructor() {
		super(true, true);

		let emitterContainer = new PIXI.Container();
		emitterContainer.position.x = this.renderer.width/2;
		emitterContainer.position.y = this.renderer.height/2;
		this.addChild(emitterContainer);

		this.emitter = new Particles.Emitter(
			emitterContainer,
			new Array(2).fill(0).map((v,i) => PIXI.Texture.fromFrame(`fire_${i}.png`)),
			{
	          alpha: {
	            list: [
	              { value: 0.5, time: 0 },
	              { value: 0, time: 1 },
	            ],
	            isStepped: false,
	          },
	          scale: {
	            list: [
	              { value: 2, time: 0 },
	              { value: 40, time: 1 },
	            ],
	            isStepped: false,
	          },
	          speed: {
	            list: [
	              { value: 3000, time: 0 },
	              { value: 3400, time: 1 },
	            ],
	            isStepped: false,
	          },
	          startRotation: { min: 265, max: 275 },
	          rotationSpeed: { min: 0, max: 0 },
	          lifetime: { min: 0.04, max: 0.05 },
	          frequency: 0.005,
	          spawnChance: 1,
	          particlesPerWave: 1,
	          emitterLifetime: Infinity,
	          maxParticles: 10,
	          addAtBack: false,
	          spawnType: 'circle',
	          spawnCircle: { x: 0, y: 0, r: 30 },
	          pos: { x: 0, y: 0 },
	        }
		);
		this.emitter.particleBlendMode = PIXI.BLEND_MODES.MULTIPLY;
		this.emitter.emit = true;
	}

	public update( dt:number ) {
		this.emitter.update(dt * 0.001);
	}
}

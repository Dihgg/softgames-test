import {Scene} from '@code/engine/Scene.class';
import { Application } from 'pixi.js';


export class ScenesManager {

	// Variables
	private static scenes: any = {};
	public	static currentScene: Scene;
	public	static renderer: any;
	public	static app: Application;

	public static create( app: Application ) {
		// if alrealdy exists, return itself
		if (ScenesManager.renderer) return this;

		// start some stuff
		this.app = app;
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

		return this;
	}

	// Scene Creator
	public static createScene( id: string, TScene: new() => Scene = Scene ): any {
		// basically, add the sceneClass in a array of scenesClasses
		if (ScenesManager.scenes[id]) return undefined;

		ScenesManager.scenes[id] = TScene;

		return TScene;
	}

	// scene changer
	public static goTo( id: string ): boolean {
		// if scene exits
		if (this.scenes[id]) {
			// destroy currentScene and instantiate the new one
			if (this.currentScene) this.currentScene.destroy();
			this.currentScene = new this.scenes[id];
			this.app.stage.addChild(this.currentScene);

			return true;
		}
		return false;
	}

}

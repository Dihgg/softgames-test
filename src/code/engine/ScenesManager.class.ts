import {Scene} from '@code/engine/Scene.class';
import { Application } from 'pixi.js';

export class ScenesManager {

	private static scenes: any = {};
	public	static currentScene: Scene;
	public	static renderer: any;
	public	static app: Application;

	public static create( app: Application ) {
		if (ScenesManager.renderer) return this;

		this.app = app;
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
		// document.body.appendChild(ScenesManager.renderer.view);

		// app.stage.addChild(ScenesManager.currentScene);
		// ScenesManager.app = app;
		return this;
	}

	public static createScene( id: string, TScene: new() => Scene = Scene ): any {
		if (ScenesManager.scenes[id]) return undefined;

		var scene = new TScene();
		ScenesManager.scenes[id] = scene;

		// if (!ScenesManager.currentScene) ScenesManager.currentScene =  scene;
		return scene;
	}

	public static goTo( id: string ): boolean {
		// console.log(ScenesManager.currentScene, id);
		// console.log(ScenesManager.scenes[id]);
		if (this.scenes[id]) {
			// if (this.currentScene) this.currentScene.destroy();
			if (this.currentScene) this.currentScene.alpha = 0;
			// this.createScene(id);
			this.app.stage.addChild(this.scenes[id]);
			// else ScenesManager.app.stage.addChild(ScenesManager.scenes[id]);
			this.currentScene = this.scenes[id];
			this.currentScene.alpha = 1;
			return true;
		}
		return false;
	}

}

import {Scene} from '@code/engine/Scene.class';
import { Application } from 'pixi.js';

// import {MenuScene} from '@code/scenes/MenuScene.class';
// import {CardsScene} from '@code/scenes/CardsScene.class';

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

		// var scene = new TScene();
		ScenesManager.scenes[id] = TScene;

		// if (!ScenesManager.currentScene) ScenesManager.currentScene =  scene;
		return TScene;
	}

	public static goTo( id: string ): boolean {
		if (this.scenes[id]) {
			if (this.currentScene) this.currentScene.destroy();
			this.currentScene = new this.scenes[id];
			this.app.stage.addChild(this.currentScene);

			return true;
		}
		return false;
	}

}

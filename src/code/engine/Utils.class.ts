export class Utils {
	public static rndInt( min:number, max:number ): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	public static rndArray( array:any[] ): any {
		return array[ Utils.rndInt( 0, array.length-1 ) ];
	}
}

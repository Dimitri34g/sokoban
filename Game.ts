import { Display } from "./Display.js";

export class Game{
    private width:number;
    private height:number;
    private display : Display;
    
    constructor(width:number, height:number, scale:number) {
        this.width = width;
        this.height = height;
        this.display = new Display(width,height,scale);
    }
}
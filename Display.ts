import Drawer from "./Drawer.js";
import { Game } from "./Game.js";


export class Display{
    private drawer : Drawer;
  
    constructor(width:number, height:number, scale:number = 10) {
        this.drawer = new Drawer(width,height,scale)
    }
  
    public refreshScore(){
        let score : HTMLElement|null = document.getElementById("score");
        if(score!=null) score.innerHTML = "0";
    }
  
    public draw(game:Game):void {

    }        
}
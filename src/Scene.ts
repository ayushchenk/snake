import { Container, Graphics, Ticker } from "pixi.js";
import { Direction } from "./Direction";
import { Snake } from "./Snake";

export class Scene extends Container {
    private direction: Direction = Direction.Right;
    private readonly snake: Snake; 

    constructor(width: number, height: number) {
        super();

        this.width = width;
        this.height = height;

        document.addEventListener("keydown", this.handleKeyDown.bind(this));

        this.snake = new Snake(200, 200);
        this.snake.grow();
        this.snake.grow();
        this.snake.grow();

        this.addChild(this.snake.container);

        Ticker.shared.maxFPS = 59.99;
        Ticker.shared.add(this.tick, this);
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if(Direction.AllDirections.filter(dir => dir.keyCode == e.code).length > 0){
            this.direction = Direction.AllDirections.find(dir => dir.keyCode == e.code);
        }
    }

    private tick(deltaTime: number) {
        console.log(Ticker.shared.FPS);

        //true if illegal
        if(this.snake.move(this.direction)){
            alert("You lost");
            Ticker.shared.stop();
        }
    }
}
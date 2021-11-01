import { Container, Ticker } from "pixi.js";
import { Direction } from "./Direction";
import { Fruit } from "./Fruit";
import { Settings } from "./Settings";
import { Snake } from "./Snake";

export class Scene extends Container {
    private score: number = 0;
    private direction: Direction = Direction.Right;
    private readonly snake: Snake;
    private readonly fruit: Fruit;

    constructor() {
        super();

        document.addEventListener("keydown", this.handleKeyDown.bind(this));

        this.snake = new Snake(Settings.App.startingX, Settings.App.startingY, Settings.Snake.defaultLength);
        this.fruit = new Fruit();

        this.addChild(this.fruit.graphics);
        this.addChild(this.snake.container);

        Ticker.shared.minFPS = 1;
        Ticker.shared.maxFPS = Settings.App.FPS;
        Ticker.shared.add(this.tick, this);
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (Direction.AllDirections.filter(dir => dir.keyCode == e.code).length > 0) {
            const newDirection = Direction.AllDirections.find(dir => dir.keyCode == e.code);

            if ((newDirection == Direction.Right && this.direction == Direction.Left)
                || (newDirection == Direction.Left && this.direction == Direction.Right)
                || (newDirection == Direction.Up && this.direction == Direction.Down)
                || (newDirection == Direction.Down && this.direction == Direction.Up)) {
                return;
            }

            this.direction = newDirection;
        }
    }

    private tick(): void {
        //true if illegal
        if (this.snake.move(this.direction)) {
            alert("You scored: " + this.score);
            Ticker.shared.stop();
        }

        this.checkFruit();
    }

    private checkFruit(): void {
        if (this.snake.head.graphics.x == this.fruit.graphics.x && this.snake.head.graphics.y == this.fruit.graphics.y) {
            this.snake.grow();
            this.fruit.move();
            Ticker.shared.maxFPS+= Settings.Fruit.fpsIncrement;
            document.title = (++this.score).toString();
        }
    }
}

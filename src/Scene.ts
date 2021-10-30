import { Container, Graphics, Ticker } from "pixi.js";
import { Direction } from "./Snake";

export class Scene extends Container {
    private readonly body: Graphics = new Graphics();
    private direction: Direction = Direction.Right;

    constructor(width: number, height: number) {
        super();

        this.width = width;
        this.height = height;

        this.body.beginFill(0x111111);
        this.body.drawRect(100, 100, 10, 10);
        this.body.endFill()
        this.addChild(this.body);

        document.addEventListener("keydown", this.onKeyDown.bind(this));

        Ticker.shared.add(this.tick, this);
    }

    private onKeyDown(e: KeyboardEvent): void {
        console.log("KeyDown event fired!", e);

        switch (e.code) {
            case "ArrowUp":
                this.direction = Direction.Up;
                break;
            case "ArrowDown":
                this.direction = Direction.Down;
                break;
            case "ArrowLeft":
                this.direction = Direction.Left;
                break;
            case "ArrowRight":
                this.direction = Direction.Right;
                break;
        }
    }

    private tick(deltaTime: number) {
        console.log(deltaTime);
        switch (this.direction) {
            case Direction.Up:
                this.body.y -= deltaTime;
                break;
            case Direction.Down:
                this.body.y += deltaTime;
                break;
            case Direction.Left:
                this.body.x -= deltaTime;
                break;
            case Direction.Right:
                this.body.x += deltaTime;
                break;
        }
    }
}
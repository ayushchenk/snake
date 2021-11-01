import { Container } from "@pixi/display";
import { Body } from "./Body";
import { Direction } from "./Direction";
import { Settings } from "./Settings";

export class Snake {
    private direction: Direction = Direction.Right;
    private readonly tail: Body[] = [];

    public readonly container: Container = new Container();
    public readonly head: Body;

    constructor(x: number, y: number, length: number) {
        this.container.width = Settings.App.width;
        this.container.height = Settings.App.height;

        this.head = new Body(x, y);

        this.container.addChild(this.head.graphics);

        for (let i = 1; i < length; i++) {
            this.grow();
        }
    }

    public grow(): void {
        const lastBodyPart = this.tail[this.tail.length - 1] ?? this.head;

        const newBodyPart = new Body(lastBodyPart.graphics.x, lastBodyPart.graphics.y, this.direction);

        this.container.addChild(newBodyPart.graphics);
        this.tail.push(newBodyPart);
    }

    public move(direction: Direction): boolean {
        this.direction = direction;

        let oldLocation = this.head.moveIn(this.direction);

        this.tail.forEach(part => {
            oldLocation = part.moveTo(oldLocation);
        });

        return this.checkRules();
    }

    private checkRules(): boolean {
        return this.checkBoundaries() || this.checkCollision();
    }

    private checkCollision(): boolean {
        let flag = false;

        this.tail.forEach(part => {
            if (this.head.graphics.x == part.graphics.x && this.head.graphics.y == part.graphics.y) {
                flag = true;
            }
        });

        return flag;
    }

    private checkBoundaries(): boolean {
        return this.head.graphics.x >= Settings.App.width || this.head.graphics.x < 0 || this.head.graphics.y >= Settings.App.height || this.head.graphics.y < 0;
    }
}

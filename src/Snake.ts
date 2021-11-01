import { Container } from "@pixi/display";
import { Body } from "./Body";
import { Direction } from "./Direction";

export class Snake {
    private readonly bodies: Body[] = [];
    private direction: Direction = Direction.Right;

    public readonly container: Container = new Container();

    constructor(x: number, y: number) {
        this.container.width = window.innerWidth;
        this.container.height = window.innerHeight;

        const head = new Body(x, y);

        this.container.addChild(head.graphics);
        this.bodies.push(head);
    }

    public grow() {
        const lastBodyPart = this.bodies[this.bodies.length - 1];

        const newBodyPart = new Body(lastBodyPart.graphics.x, lastBodyPart.graphics.y, this.direction);

        this.container.addChild(newBodyPart.graphics);
        this.bodies.push(newBodyPart);
    }

    public move(direction: Direction): boolean {
        this.direction = direction;

        let oldLocation = this.head.moveIn(this.direction);

        this.bodies.filter(part => part != this.head).forEach(part => {
            oldLocation = part.moveTo(oldLocation);
        });

        return this.checkRules();
    }

    private get head(): Body {
        return this.bodies[0];
    }

    private checkRules(): boolean {
        return this.checkBoundaries();
    }

    private checkBoundaries(): boolean {
        return this.head.graphics.x >= Math.floor(window.innerWidth / 10) * 10 || this.head.graphics.x < 0 || this.head.graphics.y >= Math.floor(window.innerHeight / 10) * 10 || this.head.graphics.y < 0;
    }
}
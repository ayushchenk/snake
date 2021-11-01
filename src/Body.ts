import { Graphics } from "@pixi/graphics";
import { Direction } from "./Direction";

export class Body {
    public readonly graphics: Graphics;
    public readonly next: Body;

    constructor(x: number, y: number, direction?: Direction) {
        this.graphics = new Graphics();
        this.graphics.x = x;
        this.graphics.y = y;

        if (direction) {
            this.graphics.x += direction.xDrawOffset;
            this.graphics.y += direction.yDrawOffset;
        }

        this.graphics.lineStyle(1, 0xaaa);
        this.graphics.beginFill(0x111);
        this.graphics.drawRect(0, 0, 10, 10);
        this.graphics.endFill();
    }

    public moveIn(direction: Direction): [number, number] {
        this.graphics.x += direction.xMoveOffset;
        this.graphics.y += direction.yMoveOffset;

        return [this.graphics.x - direction.xMoveOffset, this.graphics.y - direction.yMoveOffset];
    }

    public moveTo(location: [number, number]): [number, number] {
        const oldX = this.graphics.x;
        const oldY = this.graphics.y;

        this.graphics.x = location[0];
        this.graphics.y = location[1];

        return [oldX, oldY];
    }
}
import { Graphics } from "@pixi/graphics";
import { Settings } from "./Settings";

export class Fruit {
    public readonly graphics: Graphics = new Graphics();

    constructor() {
        this.move();

        this.graphics.lineStyle(Settings.Fruit.borderWidth, Settings.Fruit.borderColor);
        this.graphics.beginFill(Settings.Fruit.color);
        this.graphics.drawRect(0, 0, Settings.Fruit.size, Settings.Fruit.size);
        this.graphics.endFill();
    }

    public move(): void {
        this.graphics.x = Math.floor(Math.random() * Settings.App.width / Settings.Snake.size) * Settings.Snake.size;
        this.graphics.y = Math.floor(Math.random() * Settings.App.height / Settings.Snake.size) * Settings.Snake.size;
    }
}

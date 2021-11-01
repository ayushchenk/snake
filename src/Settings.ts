export class Settings {
    static Snake = class {
        public static readonly size: number = 20;
        public static readonly borderColor: number = 0xffd000;
        public static readonly color: number = 0x145c00;
        public static readonly borderWidth: number = 1;
        public static readonly defaultLength: number = 5;
    }

    static App = class {
        public static readonly width: number = Math.floor(window.innerWidth / Settings.Snake.size) * Settings.Snake.size;
        public static readonly height: number = Math.floor(window.innerHeight / Settings.Snake.size) * Settings.Snake.size;
        public static readonly FPS: number = 10;
        public static readonly startingX: number = 200;
        public static readonly startingY: number = 200;
    }

    static Fruit = class {
        public static readonly size: number = Settings.Snake.size;
        public static readonly borderColor: number = 0x0;
        public static readonly color: number = 0xff0000;
        public static readonly borderWidth: number = 1;
        public static readonly fpsIncrement: number = 0.2;
    }
}
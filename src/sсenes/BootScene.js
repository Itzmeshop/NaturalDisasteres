import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {
        // Здесь позже можно грузить минимальные ассеты (логотип, шрифты)
    }

    create() {

        // Текст загрузки
        const text = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "Загрузка природы...",
            {
                fontSize: "28px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        // Переход к следующей сцене
        this.time.delayedCall(800, () => {
            this.scene.start("PreloadScene");
        });
    }
}

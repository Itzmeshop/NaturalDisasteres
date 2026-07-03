import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.add.text(
            width / 2,
            height / 2,
            "🌳 Загрузка мира...",
            {
                fontSize: "28px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        this.load.on("complete", () => {
            loadingText.setText("Готово!");
        });

        // Пока ничего не загружаем
    }

    create() {
        this.time.delayedCall(800, () => {
            this.scene.start("MenuScene");
        });
    }
}

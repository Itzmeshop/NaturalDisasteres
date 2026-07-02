import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Фон загрузки
        const bg = this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x0b1d1a
        );

        // Текст загрузки
        const loadingText = this.add.text(
            width / 2,
            height / 2 - 50,
            "🌳 Загрузка мира...",
            {
                fontSize: "28px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        // Прогресс бар
        const progressBox = this.add.rectangle(
            width / 2,
            height / 2 + 20,
            400,
            30,
            0x222222
        );

        const progressBar = this.add.rectangle(
            width / 2 - 190,
            height / 2 + 20,
            0,
            20,
            0x2e8b57
        ).setOrigin(0, 0.5);

        // Обновление прогресса
        this.load.on("progress", (value) => {
            progressBar.width = 380 * value;
        });

        this.load.on("complete", () => {
            loadingText.setText("Загрузка завершена!");
        });

        // =========================
        // Пока ассетов нет — добавим заглушки
        // =========================

        this.load.image("tree", "assets/sprites/trees/tree.png");
        this.load.image("grass", "assets/sprites/terrain/grass.png");
        this.load.image("animal", "assets/sprites/animals/animal.png");
        this.load.image("water", "assets/sprites/terrain/water.png");

        // (файлы пока можно не добавлять — позже заменим на реальные)
    }

    create() {

        this.time.delayedCall(800, () => {
            this.scene.start("MenuScene");
        });

    }
}

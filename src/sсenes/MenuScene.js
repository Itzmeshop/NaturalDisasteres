import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Фон
        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x0b1d1a
        );

        // Название игры
        this.add.text(
            width / 2,
            height / 2 - 120,
            "🌳 Nature Guardian",
            {
                fontSize: "42px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        // Подзаголовок
        this.add.text(
            width / 2,
            height / 2 - 60,
            "Спаси природу от катастроф",
            {
                fontSize: "20px",
                color: "#a0d6b4"
            }
        ).setOrigin(0.5);

        // Кнопка "Играть"
        const playButton = this.add.text(
            width / 2,
            height / 2 + 20,
            "▶ Играть",
            {
                fontSize: "28px",
                color: "#ffffff",
                backgroundColor: "#2e8b57",
                padding: {
                    left: 20,
                    right: 20,
                    top: 10,
                    bottom: 10
                }
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        playButton.on("pointerover", () => {
            playButton.setStyle({ backgroundColor: "#37a866" });
        });

        playButton.on("pointerout", () => {
            playButton.setStyle({ backgroundColor: "#2e8b57" });
        });

        playButton.on("pointerdown", () => {
            this.scene.start("GameScene");
        });

        // Небольшая анимация "живой природы"
        this.tweens.add({
            targets: playButton,
            scale: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }
}

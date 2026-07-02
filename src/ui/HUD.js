export default class HUD {

    constructor(scene) {

        this.scene = scene;

        this.container = null;

        this.healthText = null;

        this.dayText = null;

        this.seasonText = null;

        this.scoreText = null;
    }

    // =========================
    // СОЗДАНИЕ UI
    // =========================

    create() {

        this.container = this.scene.add.container(0, 0);

        this.healthText = this.scene.add.text(20, 20, "", {
            fontSize: "18px",
            color: "#ffffff"
        });

        this.dayText = this.scene.add.text(20, 45, "", {
            fontSize: "18px",
            color: "#ffffff"
        });

        this.seasonText = this.scene.add.text(20, 70, "", {
            fontSize: "18px",
            color: "#ffffff"
        });

        this.scoreText = this.scene.add.text(20, 95, "", {
            fontSize: "18px",
            color: "#ffffff"
        });

        this.container.add([
            this.healthText,
            this.dayText,
            this.seasonText,
            this.scoreText
        ]);
    }

    // =========================
    // ОБНОВЛЕНИЕ
    // =========================

    update() {

        this.healthText.setText(
            `🌿 Природа: ${Math.round(this.scene.natureHealth)}%`
        );

        this.dayText.setText(
            `📅 День: ${this.scene.day}`
        );

        this.seasonText.setText(
            `🌸 Сезон: ${this.scene.seasons?.current || "—"}`
        );

        this.scoreText.setText(
            `🏆 Очки: ${Math.floor(this.scene.scoreSystem?.score || 0)}`
        );
    }
}

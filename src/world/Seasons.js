export default class Seasons {

    constructor(scene) {

        this.scene = scene;

        this.current = "spring"; // spring | summer | autumn | winter

        this.timer = 0;

        this.interval = 20000; // смена сезона каждые 20 сек (для теста)
    }

    update() {

        this.timer += this.scene.game.loop.delta;

        if (this.timer > this.interval) {

            this.timer = 0;

            this.nextSeason();
        }

        this.applySeasonEffects();
    }

    // =========================
    // СМЕНА СЕЗОНА
    // =========================

    nextSeason() {

        const order = ["spring", "summer", "autumn", "winter"];

        const index = order.indexOf(this.current);

        this.current = order[(index + 1) % order.length];

        this.showSeasonMessage();
    }

    showSeasonMessage() {

        const messages = {
            spring: "🌸 Наступила весна",
            summer: "☀ Лето в разгаре",
            autumn: "🍂 Осень пришла",
            winter: "❄ Наступила зима"
        };

        const text = this.scene.add.text(
            this.scene.cameras.main.centerX,
            100,
            messages[this.current],
            {
                fontSize: "26px",
                color: "#ffffff",
                backgroundColor: "#000000aa",
                padding: { left: 10, right: 10, top: 5, bottom: 5 }
            }
        ).setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            alpha: 0,
            delay: 1500,
            duration: 1500,
            onComplete: () => text.destroy()
        });
    }

    // =========================
    // ЭФФЕКТЫ СЕЗОНА
    // =========================

    applySeasonEffects() {

        switch (this.current) {

            case "spring":
                this.scene.natureHealth += 0.01;
                break;

            case "summer":
                this.scene.natureHealth += 0.005;
                break;

            case "autumn":
                this.scene.natureHealth -= 0.002;
                break;

            case "winter":
                this.scene.natureHealth -= 0.01;

                this.freezeTrees();
                break;
        }
    }

    freezeTrees() {

        for (const tree of this.scene.trees) {

            tree.setTint(0xaec6cf);
            tree.scale *= 0.999;
        }
    }
}

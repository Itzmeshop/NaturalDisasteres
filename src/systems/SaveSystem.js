export default class SaveSystem {

    constructor(scene) {

        this.scene = scene;

        this.key = "nature_guardian_save";
    }

    // =========================
    // СОХРАНЕНИЕ
    // =========================

    save() {

        const data = {

            natureHealth: this.scene.natureHealth,

            day: this.scene.day,

            season: this.scene.seasons?.current || "spring",

            trees: this.serializeTrees(),

            animals: this.serializeAnimals()
        };

        localStorage.setItem(this.key, JSON.stringify(data));

        this.showMessage("💾 Игра сохранена");
    }

    // =========================
    // ЗАГРУЗКА
    // =========================

    load() {

        const raw = localStorage.getItem(this.key);

        if (!raw) return;

        const data = JSON.parse(raw);

        this.scene.natureHealth = data.natureHealth || 100;

        this.scene.day = data.day || 1;

        if (this.scene.seasons) {
            this.scene.seasons.current = data.season || "spring";
        }

        this.restoreTrees(data.trees || []);

        this.restoreAnimals(data.animals || []);

        this.showMessage("📂 Игра загружена");
    }

    // =========================
    // TREES
    // =========================

    serializeTrees() {

        return this.scene.trees.map(t => ({
            x: t.x,
            y: t.y,
            health: t.health
        }));
    }

    restoreTrees(data) {

        for (const t of this.scene.trees) {
            t.destroy();
        }

        this.scene.trees = [];

        for (const t of data) {

            const tree = this.scene.add.circle(t.x, t.y, 8, 0x1b5e20);

            tree.health = t.health;

            this.scene.trees.push(tree);
        }
    }

    // =========================
    // ANIMALS
    // =========================

    serializeAnimals() {

        return this.scene.animals.map(a => ({
            x: a.x,
            y: a.y,
            vx: a.vx,
            vy: a.vy
        }));
    }

    restoreAnimals(data) {

        for (const a of this.scene.animals) {
            a.destroy();
        }

        this.scene.animals = [];

        for (const a of data) {

            const animal = this.scene.add.circle(a.x, a.y, 5, 0xffcc80);

            animal.vx = a.vx;
            animal.vy = a.vy;

            this.scene.animals.push(animal);
        }
    }

    // =========================
    // UI
    // =========================

    showMessage(text) {

        const msg = this.scene.add.text(
            this.scene.cameras.main.centerX,
            80,
            text,
            {
                fontSize: "22px",
                color: "#ffffff",
                backgroundColor: "#000000aa",
                padding: { left: 10, right: 10, top: 5, bottom: 5 }
            }
        ).setOrigin(0.5);

        this.scene.tweens.add({
            targets: msg,
            alpha: 0,
            delay: 1500,
            duration: 1500,
            onComplete: () => msg.destroy()
        });
    }
}

import Phaser from "phaser";

export default class DisasterManager {

    constructor(scene) {

        this.scene = scene;

        this.active = [];

        this.timer = 0;

        this.interval = 12000;
    }

    update() {

        this.timer += this.scene.game.loop.delta;

        if (this.timer > this.interval) {

            this.timer = 0;

            this.spawnRandomDisaster();
        }

        this.updateDisasters();
    }

    spawnRandomDisaster() {

        const r = Math.random();

        if (r < 0.4) {
            this.createFire();
        }
        else if (r < 0.7) {
            this.createTornado();
        }
        else {
            this.createDrought();
        }
    }

    // =========================
    // ПОЖАР
    // =========================

    createFire() {

        const fire = {

            type: "fire",

            x: Phaser.Math.Between(100, this.scene.cameras.main.width - 100),

            y: Phaser.Math.Between(100, this.scene.cameras.main.height - 100),

            radius: 40,

            life: 8000
        };

        fire.graphics = this.scene.add.circle(
            fire.x,
            fire.y,
            fire.radius,
            0xff4500,
            0.6
        );

        this.active.push(fire);

        this.scene.audio?.playFire();
    }

    // =========================
    // ТОРНАДО
    // =========================

    createTornado() {

        const tornado = {

            type: "tornado",

            x: 0,

            y: Phaser.Math.Between(0, this.scene.cameras.main.height),

            speed: Phaser.Math.FloatBetween(2, 4),

            life: 10000
        };

        tornado.graphics = this.scene.add.rectangle(
            tornado.x,
            tornado.y,
            20,
            60,
            0xaaaaaa,
            0.7
        );

        this.active.push(tornado);
    }

    // =========================
    // ЗАСУХА
    // =========================

    createDrought() {

        const drought = {

            type: "drought",

            life: 8000
        };

        this.active.push(drought);
    }

    // =========================
    // ОБНОВЛЕНИЕ
    // =========================

    updateDisasters() {

        for (let i = this.active.length - 1; i >= 0; i--) {

            const d = this.active[i];

            d.life -= this.scene.game.loop.delta;

            if (d.type === "tornado") {

                d.x += d.speed;

                d.graphics.x = d.x;
            }

            if (d.type === "fire") {

                this.damageTrees(d);
            }

            if (d.type === "drought") {

                this.applyDrought();
            }

            if (d.life <= 0) {

                this.destroyDisaster(i);
            }
        }
    }

    // =========================
    // ВЛИЯНИЕ НА МИР
    // =========================

    damageTrees(fire) {

        for (const tree of this.scene.trees) {

            const dx = tree.x - fire.x;
            const dy = tree.y - fire.y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < fire.radius) {

                tree.health -= 0.3;

                tree.setScale(tree.scaleX * 0.999);
            }
        }
    }

    applyDrought() {

        this.scene.natureHealth -= 0.02;

        for (const tree of this.scene.trees) {

            tree.health -= 0.01;

            tree.setAlpha(0.9);
        }
    }

    // =========================
    // УДАЛЕНИЕ
    // =========================

    destroyDisaster(index) {

        const d = this.active[index];

        if (d.graphics) {
            d.graphics.destroy();
        }

        this.active.splice(index, 1);
    }
}

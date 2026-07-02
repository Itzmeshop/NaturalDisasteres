import Phaser from "phaser";

export default class ParticleSystem {

    constructor(scene) {

        this.scene = scene;

        this.particles = [];
    }

    // =========================
    // ОБНОВЛЕНИЕ
    // =========================

    update() {

        for (const p of this.particles) {

            p.x += p.vx;
            p.y += p.vy;

            p.life -= this.scene.game.loop.delta;

            if (p.type === "wind") {
                p.x += Math.sin(p.y * 0.01);
            }

            if (p.y > this.scene.cameras.main.height || p.life <= 0) {
                this.resetParticle(p);
            }
        }
    }

    // =========================
    // СОЗДАНИЕ ЭФФЕКТОВ
    // =========================

    createRain(x, y) {

        const drop = this.createParticle(x, y, "rain");

        drop.vx = 0;
        drop.vy = Phaser.Math.FloatBetween(6, 10);
        drop.size = 2;

        drop.graphics = this.scene.add.rectangle(x, y, 2, 10, 0x8ecae6);

        this.particles.push(drop);
    }

    createSnow(x, y) {

        const flake = this.createParticle(x, y, "snow");

        flake.vx = Phaser.Math.FloatBetween(-1, 1);
        flake.vy = Phaser.Math.FloatBetween(1, 3);

        flake.graphics = this.scene.add.circle(x, y, 2, 0xffffff);

        this.particles.push(flake);
    }

    createFire(x, y) {

        const fire = this.createParticle(x, y, "fire");

        fire.vx = Phaser.Math.FloatBetween(-1, 1);
        fire.vy = Phaser.Math.FloatBetween(-2, 0);

        fire.graphics = this.scene.add.circle(x, y, 3, 0xff4500);

        this.particles.push(fire);
    }

    createWind(x, y) {

        const wind = this.createParticle(x, y, "wind");

        wind.vx = Phaser.Math.FloatBetween(2, 5);
        wind.vy = Phaser.Math.FloatBetween(-1, 1);

        wind.graphics = this.scene.add.rectangle(x, y, 6, 2, 0xffffff, 0.3);

        this.particles.push(wind);
    }

    // =========================
    // БАЗОВЫЙ ПАРТИКЛ
    // =========================

    createParticle(x, y, type) {

        return {
            x,
            y,
            vx: 0,
            vy: 0,
            type,
            life: 5000,
            graphics: null
        };
    }

    resetParticle(p) {

        p.x = Phaser.Math.Between(0, this.scene.cameras.main.width);
        p.y = 0;
        p.life = 5000;
    }

    // =========================
    // ОЧИСТКА
    // =========================

    clear() {

        for (const p of this.particles) {
            p.graphics?.destroy();
        }

        this.particles = [];
    }
}

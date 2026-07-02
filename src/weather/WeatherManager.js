import Phaser from "phaser";

export default class WeatherManager {

    constructor(scene) {

        this.scene = scene;

        this.current = "clear"; // clear | rain | storm | fog | snow

        this.timer = 0;

        this.interval = 8000;

        this.overlay = null;

        this.particles = [];
    }

    init() {

        const width = this.scene.cameras.main.width;
        const height = this.scene.cameras.main.height;

        // затемнение/эффекты погоды
        this.overlay = this.scene.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x000000,
            0
        ).setDepth(10);

        this.changeWeather("clear");
    }

    update() {

        this.timer += this.scene.game.loop.delta;

        if (this.timer > this.interval) {

            this.timer = 0;

            this.randomWeather();
        }

        this.updateEffects();
    }

    randomWeather() {

        const types = ["clear", "rain", "storm", "fog", "snow"];

        const next = Phaser.Utils.Array.GetRandom(types);

        this.changeWeather(next);
    }

    changeWeather(type) {
        
        this.scene.audio?.playWeather(type);

        this.current = type;

        // очистка старых эффектов
        this.clearParticles();

        switch (type) {

            case "rain":
                this.createRain();
                this.overlay.setAlpha(0.05);
                break;

            case "storm":
                this.createRain();
                this.overlay.setAlpha(0.15);
                break;

            case "fog":
                this.overlay.setFillStyle(0xffffff, 0.08);
                break;

            case "snow":
                this.createSnow();
                this.overlay.setAlpha(0.03);
                break;

            default:
                this.overlay.setAlpha(0);
                break;
        }
    }

    // =========================
    // ЭФФЕКТЫ
    // =========================

    createRain() {

        for (let i = 0; i < 120; i++) {

            const drop = this.scene.add.rectangle(
                Phaser.Math.Between(0, this.scene.cameras.main.width),
                Phaser.Math.Between(0, this.scene.cameras.main.height),
                2,
                10,
                0x8ecae6
            );

            drop.speed = Phaser.Math.FloatBetween(6, 12);

            this.particles.push(drop);
        }
    }

    createSnow() {

        for (let i = 0; i < 80; i++) {

            const flake = this.scene.add.circle(
                Phaser.Math.Between(0, this.scene.cameras.main.width),
                Phaser.Math.Between(0, this.scene.cameras.main.height),
                Phaser.Math.Between(1, 3),
                0xffffff
            );

            flake.speed = Phaser.Math.FloatBetween(1, 3);

            this.particles.push(flake);
        }
    }

    updateEffects() {

        for (const p of this.particles) {

            p.y += p.speed;

            if (p.y > this.scene.cameras.main.height) {
                p.y = 0;
                p.x = Phaser.Math.Between(0, this.scene.cameras.main.width);
            }
        }
    }

    clearParticles() {

        for (const p of this.particles) {
            p.destroy();
        }

        this.particles = [];
    }
}

import EventSystem from "../utils/EventSystem.js";
import HUD from "../ui/HUD.js";
import ScoreSystem from "../systems/ScoreSystem.js";
import AudioSystem from "../systems/AudioSystem.js";
import ParticleSystem from "../systems/ParticleSystem.js";
import SaveSystem from "../systems/SaveSystem.js";
import Seasons from "../world/Seasons.js";
import Generator from "../world/Generator.js";
import DisasterManager from "../disasters/DisasterManager.js";
import WeatherManager from "../weather/WeatherManager.js";
import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");

        this.trees = [];
        this.animals = [];

        this.natureHealth = 100;
        this.day = 1;
    }

    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // фон
        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x2e8b57
        );

        // UI
        this.healthText = this.add.text(20, 20, "", {
            fontSize: "18px",
            color: "#ffffff"
        });

        this.dayText = this.add.text(20, 45, "", {
            fontSize: "18px",
            color: "#ffffff"
        });

        this.controlsText = this.add.text(
            20,
            height - 30,
            "ЛКМ — посадить дерево | S — сохранить | L — загрузить",
            {
                fontSize: "14px",
                color: "#ffffff"
            }
        );

        // системы
        this.generator = new Generator(this);
        this.generator.generate();

        this.weather = new WeatherManager(this);
        this.weather.init();

        this.disasters = new DisasterManager(this);

        this.seasons = new Seasons(this);

        this.saveSystem = new SaveSystem(this);
        this.saveSystem.load();

        this.particles = new ParticleSystem(this);

        this.audio = new AudioSystem(this);
        this.audio.init();

        this.scoreSystem = new ScoreSystem(this);

        this.hud = new HUD(this);
        this.hud.create();

        this.eventsBus = new EventSystem();

        // мир
        this.generateWorld();

        // сохранение
        this.input.keyboard.on("keydown-S", () => {
            this.saveSystem.save();
        });

        this.input.keyboard.on("keydown-L", () => {
            this.saveSystem.load();
        });

        // день
        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: () => {
                this.day++;
                this.randomEvent();
            }
        });

        // клик — дерево
        this.input.on("pointerdown", (pointer) => {
            this.plantTree(pointer.x, pointer.y);
        });
    }

    update() {

        this.updateTrees();

        this.hud.update();
        this.scoreSystem.update();
        this.particles.update();
        this.seasons.update();
        this.disasters.update();
        this.weather.update();

        this.updateAnimals();
        this.updateUI();

        this.natureHealth = Phaser.Math.Clamp(this.natureHealth, 0, 100);

        if (this.natureHealth <= 0) {
            this.scene.restart();
        }
    }

    // =========================
    // МИР
    // =========================

    generateWorld() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        for (let i = 0; i < 30; i++) {
            this.plantTree(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(0, height)
            );
        }

        for (let i = 0; i < 8; i++) {
            this.spawnAnimal();
        }
    }

    plantTree(x, y) {

        const tree = this.add.circle(x, y, 8, 0x1b5e20);

        tree.health = 100;

        this.trees.push(tree);

        this.natureHealth += 0.5;

        this.scoreSystem.onTreePlanted();
    }

    spawnAnimal() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const animal = this.add.circle(
            Phaser.Math.Between(0, width),
            Phaser.Math.Between(0, height),
            5,
            0xffcc80
        );

        animal.vx = Phaser.Math.FloatBetween(-1, 1);
        animal.vy = Phaser.Math.FloatBetween(-1, 1);

        this.animals.push(animal);
    }

    updateAnimals() {

        for (const a of this.animals) {

            a.x += a.vx;
            a.y += a.vy;

            if (a.x < 0 || a.x > this.cameras.main.width) a.vx *= -1;
            if (a.y < 0 || a.y > this.cameras.main.height) a.vy *= -1;
        }
    }

    updateTrees() {

        for (let i = this.trees.length - 1; i >= 0; i--) {

            const tree = this.trees[i];

            if (tree.health > 60) {
                tree.scaleX = Math.min(tree.scaleX + 0.0005, 1.5);
                tree.scaleY = tree.scaleX;
            }

            if (tree.health <= 0) {
                tree.destroy();
                this.trees.splice(i, 1);
            }
        }
    }

    randomEvent() {

        const r = Math.random();

        if (r < 0.33) {
            this.natureHealth -= 10;
        } else if (r < 0.66) {
            this.natureHealth += 5;
        } else {
            this.destroyRandomTrees();
            this.natureHealth -= 15;
        }
    }

    destroyRandomTrees() {

        for (let i = this.trees.length - 1; i >= 0; i--) {

            if (Math.random() < 0.3) {
                this.trees[i].destroy();
                this.trees.splice(i, 1);
            }
        }
    }

    updateUI() {

        this.healthText.setText(
            "🌿 Природа: " + Math.round(this.natureHealth) + "%"
        );

        this.dayText.setText(
            "📅 День: " + this.day
        );
    }
}

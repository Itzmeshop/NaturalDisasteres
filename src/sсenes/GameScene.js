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

        // Фон мира
        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x2e8b57
        );

        // Заголовок UI
        this.healthText = this.add.text(20, 20, "", {
            fontSize: "18px",
            color: "#ffffff"
        });

        this.dayText = this.add.text(20, 45, "", {
            fontSize: "18px",
            color: "#ffffff"
        });

        // Генерация мира
        this.generateWorld();
        this.weather = new WeatherManager(this);
this.weather.init();
        this.disasters = new DisasterManager(this);

        // Таймер дней
        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: () => {
                this.day++;
                this.randomEvent();
            }
        });

        // Клик = посадить дерево
        this.input.on("pointerdown", (pointer) => {
            this.plantTree(pointer.x, pointer.y);
        });
    }

    update() {
        
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

        // деревья
        for (let i = 0; i < 30; i++) {
            this.plantTree(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(0, height)
            );
        }

        // животные
        for (let i = 0; i < 8; i++) {
            this.spawnAnimal();
        }
    }

    plantTree(x, y) {

        const tree = this.add.circle(x, y, 8, 0x1b5e20);

        tree.health = 100;

        this.trees.push(tree);

        this.natureHealth += 0.5;
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

    // =========================
    // ЛОГИКА
    // =========================

    updateAnimals() {

        for (const a of this.animals) {

            a.x += a.vx;
            a.y += a.vy;

            if (a.x < 0 || a.x > this.cameras.main.width) a.vx *= -1;
            if (a.y < 0 || a.y > this.cameras.main.height) a.vy *= -1;
        }
    }

    randomEvent() {

        const r = Math.random();

        if (r < 0.33) {
            // засуха
            this.natureHealth -= 10;
        }
        else if (r < 0.66) {
            // дождь
            this.natureHealth += 5;
        }
        else {
            // пожар
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

    // =========================
    // UI
    // =========================

    updateUI() {

        this.healthText.setText(
            "🌿 Природа: " + Math.round(this.natureHealth) + "%"
        );

        this.dayText.setText(
            "📅 День: " + this.day
        );
    }
}

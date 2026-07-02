import Phaser from "phaser";

export default class Generator {

    constructor(scene) {

        this.scene = scene;

        this.tileSize = 20;

        this.cols = Math.ceil(scene.cameras.main.width / this.tileSize);

        this.rows = Math.ceil(scene.cameras.main.height / this.tileSize);

        this.grid = [];
    }

    generate() {

        this.generateBiomes();

        this.spawnFromMap();
    }

    // =========================
    // ГЕНЕРАЦИЯ БИОМОВ
    // =========================

    generateBiomes() {

        for (let y = 0; y < this.rows; y++) {

            this.grid[y] = [];

            for (let x = 0; x < this.cols; x++) {

                const noise = Math.random();

                let type = "grass";

                if (noise < 0.15) type = "water";
                else if (noise < 0.30) type = "forest";
                else if (noise < 0.40) type = "rock";
                else type = "grass";

                this.grid[y][x] = type;
            }
        }
    }

    // =========================
    // СОЗДАНИЕ ОБЪЕКТОВ
    // =========================

    spawnFromMap() {

        for (let y = 0; y < this.rows; y++) {

            for (let x = 0; x < this.cols; x++) {

                const type = this.grid[y][x];

                const worldX = x * this.tileSize;
                const worldY = y * this.tileSize;

                if (type === "grass") {

                    const grass = this.scene.add.rectangle(
                        worldX,
                        worldY,
                        this.tileSize,
                        this.tileSize,
                        0x4caf50,
                        1
                    );

                    grass.setOrigin(0);

                }

                else if (type === "water") {

                    const water = this.scene.add.rectangle(
                        worldX,
                        worldY,
                        this.tileSize,
                        this.tileSize,
                        0x2196f3,
                        1
                    );

                    water.setOrigin(0);
                }

                else if (type === "forest") {

                    const tree = this.scene.add.circle(
                        worldX + this.tileSize / 2,
                        worldY + this.tileSize / 2,
                        5,
                        0x1b5e20
                    );

                    tree.health = 100;

                    this.scene.trees.push(tree);
                }

                else if (type === "rock") {

                    this.scene.add.rectangle(
                        worldX,
                        worldY,
                        this.tileSize,
                        this.tileSize,
                        0x757575
                    ).setOrigin(0);
                }
            }
        }
    }
}

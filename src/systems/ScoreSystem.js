export default class ScoreSystem {

    constructor(scene) {

        this.scene = scene;

        this.score = 0;

        this.achievements = new Set();

        this.goals = {
            treesPlanted: 0,
            disastersSurvived: 0,
            daysSurvived: 0
        };
    }

    // =========================
    // ОБНОВЛЕНИЕ ОЧКОВ
    // =========================

    update() {

        this.score =
            this.scene.natureHealth +
            this.scene.trees.length * 2 +
            this.scene.day * 5;

        this.checkAchievements();
    }

    // =========================
    // СОБЫТИЯ
    // =========================

    onTreePlanted() {
        this.goals.treesPlanted++;
    }

    onDisasterSurvived() {
        this.goals.disastersSurvived++;
    }

    onDayPassed() {
        this.goals.daysSurvived++;
    }

    // =========================
    // ДОСТИЖЕНИЯ
    // =========================

    checkAchievements() {

        this.unlock("first_tree", this.goals.treesPlanted >= 1);
        this.unlock("forest_builder", this.goals.treesPlanted >= 50);
        this.unlock("survivor", this.goals.daysSurvived >= 10);
        this.unlock("nature_keeper", this.scene.natureHealth >= 90);
        this.unlock("chaos_master", this.goals.disastersSurvived >= 5);
    }

    unlock(key, condition) {

        if (condition && !this.achievements.has(key)) {

            this.achievements.add(key);

            this.showAchievement(key);
        }
    }

    // =========================
    // UI
    // =========================

    showAchievement(key) {

        const names = {

            first_tree: "🌱 Первое дерево",
            forest_builder: "🌳 Создатель леса",
            survivor: "⏳ Выживший",
            nature_keeper: "🌍 Хранитель природы",
            chaos_master: "🔥 Повелитель хаоса"
        };

        const text = this.scene.add.text(
            this.scene.cameras.main.centerX,
            120,
            `🏆 Достижение: ${names[key]}`,
            {
                fontSize: "20px",
                color: "#ffffff",
                backgroundColor: "#000000aa",
                padding: { left: 10, right: 10, top: 5, bottom: 5 }
            }
        ).setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            alpha: 0,
            delay: 2000,
            duration: 1500,
            onComplete: () => text.destroy()
        });
    }
}

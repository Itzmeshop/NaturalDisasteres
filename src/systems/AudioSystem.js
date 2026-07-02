export default class AudioSystem {

    constructor(scene) {

        this.scene = scene;

        this.sounds = {};

        this.music = null;

        this.currentWeatherSound = null;
    }

    // =========================
    // ЗАГРУЗКА ЗВУКОВ (позже добавим файлы)
    // =========================

    init() {

        // Пока без реальных файлов — просто структура
        // Позже сюда добавим .mp3 / .ogg

        this.sounds = {
            rain: null,
            fire: null,
            wind: null,
            snow: null,
            thunder: null
        };

        this.playMusic();
    }

    // =========================
    // ФОНОВАЯ МУЗЫКА
    // =========================

    playMusic() {

        // Заглушка (позже подключим файл)
        this.music = this.scene.sound.add("music", {
            loop: true,
            volume: 0.3
        });

        if (this.music) {
            this.music.play();
        }
    }

    // =========================
    // ЭФФЕКТЫ ПОГОДЫ
    // =========================

    playWeather(type) {

        this.stopWeather();

        switch (type) {

            case "rain":
                this.playLoop("rain", 0.4);
                break;

            case "storm":
                this.playLoop("rain", 0.5);
                this.playOnce("thunder");
                break;

            case "wind":
                this.playLoop("wind", 0.3);
                break;

            case "snow":
                this.playLoop("snow", 0.2);
                break;
        }
    }

    // =========================
    // ПОЖАР
    // =========================

    playFire() {

        this.playLoop("fire", 0.5);
    }

    // =========================
    // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
    // =========================

    playLoop(key, volume = 1) {

        if (!this.sounds[key]) return;

        this.sounds[key].stop();

        this.sounds[key].play({
            loop: true,
            volume
        });
    }

    playOnce(key) {

        if (!this.sounds[key]) return;

        this.sounds[key].play({
            volume: 1
        });
    }

    stopWeather() {

        for (const key in this.sounds) {

            if (this.sounds[key]) {
                this.sounds[key].stop();
            }
        }
    }

    // =========================
    // ГРОМКОСТЬ
    // =========================

    setVolume(value) {

        this.scene.sound.volume = value;
    }
}

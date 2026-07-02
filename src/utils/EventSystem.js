export default class EventSystem {

    constructor() {

        this.events = {};
    }

    // =========================
    // ПОДПИСКА
    // =========================

    on(event, callback) {

        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(callback);
    }

    // =========================
    // УДАЛЕНИЕ ПОДПИСКИ
    // =========================

    off(event, callback) {

        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }

    // =========================
    // ВЫЗОВ СОБЫТИЙ
    // =========================

    emit(event, data) {

        if (!this.events[event]) return;

        for (const cb of this.events[event]) {
            cb(data);
        }
    }

    // =========================
    // ОЧИСТКА
    // =========================

    clear() {

        this.events = {};
    }
}

const STORAGE_KEY = "lyra_v1_memory";

export const Memory = {
    history: [],

    init() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            this.history = JSON.parse(saved);
        }
    },

    saveMessage(role, content) {
        this.history.push({ role, content });
        // Keep last 30 messages as requested
        if (this.history.length > 30) this.history.shift();
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
    },

    getHistory() {
        return this.history;
    }
};
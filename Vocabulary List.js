class VocabularyListApp {
    constructor() {
        this.words = [];
        this.nextId = 1;
        this.loadFromStorage();
    }

    addWord(word, meaning, example) {
        if (!word || !meaning) {
            alert('Vui lòng nhập từ và nghĩa!');
            return;
        }
        const item = {
            id: this.nextId++,
            word: word.trim(),
            meaning: meaning.trim(),
            example: example ? example.trim() : '',
            learned: false,
            createdAt: new Date().toISOString(),
        };
        this.words.push(item);
        this.saveToStorage();
    }

    toggleLearned(id) {
        const item = this.words.find(w => w.id === id);
        if (item) {
            item.learned = !item.learned;
            this.saveToStorage();
        }
    }

    getAllWords() {
        return this.words;
    }

    getUnlearnedWords() {
        return this.words.filter(w => !w.learned);
    }

    getLearnedWords() {
        return this.words.filter(w => w.learned);
    }

    getRandomWord() {
        if (this.words.length === 0) return null;
        const idx = Math.floor(Math.random() * this.words.length);
        return this.words[idx];
    }

    saveToStorage() {
        localStorage.setItem('vocabList', JSON.stringify({
            words: this.words,
            nextId: this.nextId
        }));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('vocabList');
        if (saved) {
            const data = JSON.parse(saved);
            this.words = data.words || [];
            this.nextId = data.nextId || 1;
        }
    }
}

// Khởi tạo ứng dụng
const vocabApp = new VocabularyListApp();
window.vocabApp = vocabApp; // Để tiện debug

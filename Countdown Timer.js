let time = 600; // 10 minutes in seconds
let interval;
let isPaused = false;

const countdownElement = document.getElementById('countdown');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    countdownElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!isPaused) {
        interval = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }
    isPaused = false;
}

function pauseTimer() {
    clearInterval(interval);
    isPaused = true;
}

function resetTimer() {
    clearInterval(interval);
    time = 600; // Reset to 10 minutes
    updateDisplay();
    isPaused = false;
}

// Initialize display
updateDisplay();

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

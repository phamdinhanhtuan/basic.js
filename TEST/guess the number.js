let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let isCorrect = false; // Thêm biến này

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

guessBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", restartGame);

function checkGuess() {
  if (isCorrect) return; // Nếu đã đúng thì không làm gì nữa

  const guess = Number(guessInput.value);
  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "Vui lòng nhập số từ 1 đến 100!";
    return;
  }
  attempts++;
  if (guess === secretNumber) {
    isCorrect = true; // Đánh dấu đã đoán đúng
    message.textContent = `Chúc mừng! Bạn đã đoán đúng số ${secretNumber} sau ${attempts} lần thử.`;
    guessBtn.disabled = true;
    guessInput.disabled = true;
    restartBtn.style.display = "inline-block";
  } else if (guess < secretNumber) {
    message.textContent = "Số bạn đoán nhỏ hơn!";
  } else {
    message.textContent = "Số bạn đoán lớn hơn!";
  }
  guessInput.value = "";
  guessInput.focus();
}

function restartGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  isCorrect = false; // Reset lại biến này
  message.textContent = "";
  guessBtn.disabled = false;
  guessInput.disabled = false;
  guessInput.value = "";
  restartBtn.style.display = "none";
  guessInput.focus();
}

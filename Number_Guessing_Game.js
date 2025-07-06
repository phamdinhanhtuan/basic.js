const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const min = 1;
const max = 100;
const answer = Math.floor(Math.random() * (max - min + 1)) + min;
let attempts = 0;

console.log(`Tôi đã chọn một số từ ${min} đến ${max}. Hãy thử đoán!`);

function askGuess() {
  rl.question('Nhập số bạn đoán: ', (input) => {
    const guess = parseInt(input, 10);
    attempts++;
    if (isNaN(guess)) {
      console.log('Vui lòng nhập một số hợp lệ.');
      askGuess();
    } else if (guess < answer) {
      console.log('Số của bạn nhỏ hơn.');
      askGuess();
    } else if (guess > answer) {
      console.log('Số của bạn lớn hơn.');
      askGuess();
    } else {
      console.log(`Chúc mừng! Bạn đã đoán đúng sau ${attempts} lần thử.`);
      rl.close();
    }
  });
}

askGuess();

rl.on('close', () => {
  console.log('Kết thúc trò chơi.');
  process.exit(0);
});

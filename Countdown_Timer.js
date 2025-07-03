const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function countdown(seconds) {
  let remaining = seconds;
  const timer = setInterval(() => {
    if (remaining > 0) {
      console.log(`Còn lại: ${remaining} giây`);
      remaining--;
    } else {
      clearInterval(timer);
      console.log('Hết giờ!');
      rl.close();
    }
  }, 1000);
}

rl.question('Nhập số giây đếm ngược: ', (input) => {
  const seconds = parseInt(input, 10);
  if (isNaN(seconds) || seconds <= 0) {
    console.log('Vui lòng nhập số nguyên dương.');
    rl.close();
  } else {
    countdown(seconds);
  }
});

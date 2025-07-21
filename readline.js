const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Nhập số nguyên a: ', (a) => {
  rl.question('Nhập số nguyên b: ', (b) => {
    a = Number(a);
    b = Number(b);
    console.log("Tổng:", a + b);
    console.log("Hiệu:", a - b);
    console.log("Tích:", a * b);
    console.log("Thương:", a / b);

    rl.question('Nhập một số để kiểm tra chẵn lẻ: ', (n) => {
      n = Number(n);
      if (n % 2 === 0) {
        console.log(n + " là số chẵn");
      } else {
        console.log(n + " là số lẻ");
      }
      rl.close();
    });
  });
});

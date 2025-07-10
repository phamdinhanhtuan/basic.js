const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Tỷ giá cố định (có thể cập nhật theo thực tế)
const rates = {
  VND: { USD: 0.000042, EUR: 0.000038, VND: 1 },
  USD: { VND: 23800, EUR: 0.89, USD: 1 },
  EUR: { VND: 26700, USD: 1.12, EUR: 1 }
};

const currencies = Object.keys(rates);

function showMenu() {
  console.log('\n--- BẢNG CHUYỂN ĐỔI TIỀN TỆ ---');
  console.log('Các loại tiền tệ:');
  currencies.forEach((cur, idx) => {
    console.log(`${idx + 1}. ${cur}`);
  });
  rl.question('Chọn loại tiền bạn có (nhập số): ', (fromIdx) => {
    const from = currencies[Number(fromIdx) - 1];
    if (!from) {
      console.log('Lựa chọn không hợp lệ.');
      showMenu();
      return;
    }
    rl.question('Nhập số tiền: ', (amountStr) => {
      const amount = parseFloat(amountStr);
      if (isNaN(amount) || amount < 0) {
        console.log('Số tiền không hợp lệ.');
        showMenu();
        return;
      }
      rl.question('Chọn loại tiền muốn chuyển sang (nhập số): ', (toIdx) => {
        const to = currencies[Number(toIdx) - 1];
        if (!to) {
          console.log('Lựa chọn không hợp lệ.');
          showMenu();
          return;
        }
        const result = amount * rates[from][to];
        console.log(`${amount} ${from} = ${result.toFixed(2)} ${to}`);
        rl.question('Bạn có muốn chuyển đổi tiếp? (y/n): ', (ans) => {
          if (ans.trim().toLowerCase() === 'y') {
            showMenu();
          } else {
            rl.close();
          }
        });
      });
    });
  });
}

rl.on('close', () => {
  console.log('Đã thoát chương trình.');
  process.exit(0);
});

showMenu();

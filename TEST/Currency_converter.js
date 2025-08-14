
const readline = require('readline');
const https = require('https');

// Hàm lấy tỷ giá từ exchangerate.host (không cần API key)
function getExchangeRate(from, to, callback) {
  const url = `https://api.exchangerate.host/latest?base=${from}&symbols=${to}`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.success === false || !json.rates[to]) {
          callback(new Error('Không lấy được tỷ giá.'));
        } else {
          callback(null, json.rates[to]);
        }
      } catch (e) {
        callback(new Error('Lỗi khi phân tích dữ liệu.'));
      }
    });
  }).on('error', (err) => {
    callback(err);
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('--- ỨNG DỤNG CHUYỂN ĐỔI TIỀN TỆ ---');
  const amount = parseFloat(await askQuestion('Nhập số tiền: '));
  const from = (await askQuestion('Từ loại tiền tệ (ví dụ: USD, VND, EUR): ')).toUpperCase();
  const to = (await askQuestion('Sang loại tiền tệ (ví dụ: USD, VND, EUR): ')).toUpperCase();

  getExchangeRate(from, to, (err, rate) => {
    if (err) {
      console.error('Lỗi:', err.message);
    } else {
      const result = amount * rate;
      console.log(`${amount} ${from} = ${result.toFixed(2)} ${to} (Tỷ giá: 1 ${from} = ${rate} ${to})`);
    }
    rl.close();
  });
}

main();

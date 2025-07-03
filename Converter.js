const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n--- ỨNG DỤNG CHUYỂN ĐỔI ĐƠN VỊ ---');
  console.log('1. Mét → Feet');
  console.log('2. Feet → Mét');
  console.log('3. Kg → Pound');
  console.log('4. Pound → Kg');
  console.log('5. Độ C → Độ F');
  console.log('6. Độ F → Độ C');
  console.log('0. Thoát');
  rl.question('Chọn chức năng: ', handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      convert('m', 'ft', 3.28084);
      break;
    case '2':
      convert('ft', 'm', 1 / 3.28084);
      break;
    case '3':
      convert('kg', 'lb', 2.20462);
      break;
    case '4':
      convert('lb', 'kg', 1 / 2.20462);
      break;
    case '5':
      convertCtoF();
      break;
    case '6':
      convertFtoC();
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('Lựa chọn không hợp lệ.');
      showMenu();
  }
}

function convert(from, to, factor) {
  rl.question(`Nhập giá trị (${from}): `, (input) => {
    const value = parseFloat(input);
    if (isNaN(value)) {
      console.log('Vui lòng nhập số hợp lệ.');
    } else {
      const result = value * factor;
      console.log(`${value} ${from} = ${result.toFixed(4)} ${to}`);
    }
    showMenu();
  });
}

function convertCtoF() {
  rl.question('Nhập nhiệt độ (°C): ', (input) => {
    const c = parseFloat(input);
    if (isNaN(c)) {
      console.log('Vui lòng nhập số hợp lệ.');
    } else {
      const f = c * 9 / 5 + 32;
      console.log(`${c}°C = ${f.toFixed(2)}°F`);
    }
    showMenu();
  });
}

function convertFtoC() {
  rl.question('Nhập nhiệt độ (°F): ', (input) => {
    const f = parseFloat(input);
    if (isNaN(f)) {
      console.log('Vui lòng nhập số hợp lệ.');
    } else {
      const c = (f - 32) * 5 / 9;
      console.log(`${f}°F = ${c.toFixed(2)}°C`);
    }
    showMenu();
  });
}

rl.on('close', () => {
  console.log('Đã thoát chương trình.');
  process.exit(0);
});

showMenu();

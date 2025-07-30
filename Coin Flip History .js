// Ứng dụng tạo lịch sử lật đồng xu (Coin Flip History)
// Lật đồng xu ngẫu nhiên, lưu lại lịch sử các lần lật (ngửa/sấp)

const readline = require('readline');

// Class đại diện cho một lần lật đồng xu
class CoinFlip {
  constructor(id, result, timestamp) {
    this.id = id;
    this.result = result; // 'heads' hoặc 'tails'
    this.timestamp = timestamp;
  }
}

// Class quản lý lịch sử lật đồng xu
class CoinFlipHistory {
  constructor() {
    this.flips = [];
    this.nextId = 1;
  }

  // Lật đồng xu và lưu vào lịch sử
  flipCoin() {
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const timestamp = new Date();
    const flip = new CoinFlip(this.nextId++, result, timestamp);
    this.flips.push(flip);
    
    const resultText = result === 'heads' ? 'NGỬA' : 'SẤP';
    console.log(`\n🪙 Lật đồng xu... Kết quả: ${resultText} (${result})`);
    console.log(`📅 Thời gian: ${timestamp.toLocaleString('vi-VN')}`);
    
    return flip;
  }

  // Hiển thị lịch sử tất cả các lần lật
  showHistory() {
    if (this.flips.length === 0) {
      console.log('\n📋 Chưa có lịch sử lật đồng xu nào.');
      return;
    }

    console.log('\n📋 LỊCH SỬ LẬT ĐỒNG XU:');
    console.log('─'.repeat(60));
    
    this.flips.forEach((flip, index) => {
      const resultText = flip.result === 'heads' ? 'NGỬA' : 'SẤP';
      const timeStr = flip.timestamp.toLocaleString('vi-VN');
      console.log(`${index + 1}. ID: ${flip.id} | ${resultText} | ${timeStr}`);
    });
  }

  // Hiển thị thống kê
  showStats() {
    if (this.flips.length === 0) {
      console.log('\n📊 Chưa có dữ liệu để thống kê.');
      return;
    }

    const headsCount = this.flips.filter(f => f.result === 'heads').length;
    const tailsCount = this.flips.filter(f => f.result === 'tails').length;
    const totalFlips = this.flips.length;
    
    const headsPercentage = ((headsCount / totalFlips) * 100).toFixed(1);
    const tailsPercentage = ((tailsCount / totalFlips) * 100).toFixed(1);

    console.log('\n📊 THỐNG KÊ:');
    console.log('─'.repeat(40));
    console.log(`Tổng số lần lật: ${totalFlips}`);
    console.log(`Ngửa (Heads): ${headsCount} lần (${headsPercentage}%)`);
    console.log(`Sấp (Tails): ${tailsCount} lần (${tailsPercentage}%)`);
    
    // Chuỗi kết quả gần nhất
    const recentResults = this.flips.slice(-5).map(f => f.result === 'heads' ? 'H' : 'T').join(' ');
    console.log(`5 lần gần nhất: ${recentResults}`);
  }

  // Xóa lịch sử
  clearHistory() {
    const count = this.flips.length;
    this.flips = [];
    this.nextId = 1;
    console.log(`\n🗑️ Đã xóa ${count} lần lật khỏi lịch sử.`);
  }

  // Lật đồng xu nhiều lần
  flipMultiple(times) {
    if (times <= 0 || times > 100) {
      console.log('❌ Số lần lật phải từ 1 đến 100.');
      return;
    }

    console.log(`\n🪙 Lật đồng xu ${times} lần...`);
    const results = [];
    
    for (let i = 0; i < times; i++) {
      const flip = this.flipCoin();
      results.push(flip.result);
      
      // Tạm dừng nhỏ để tạo hiệu ứng
      if (i < times - 1) {
        setTimeout(() => {}, 100);
      }
    }

    // Hiển thị kết quả tổng hợp
    const headsCount = results.filter(r => r === 'heads').length;
    const tailsCount = results.filter(r => r === 'tails').length;
    
    console.log(`\n📊 Kết quả ${times} lần lật:`);
    console.log(`Ngửa: ${headsCount} lần | Sấp: ${tailsCount} lần`);
  }

  // Tìm kiếm trong lịch sử
  searchHistory(keyword) {
    const filtered = this.flips.filter(flip => {
      const resultText = flip.result === 'heads' ? 'ngửa' : 'sấp';
      const timeStr = flip.timestamp.toLocaleString('vi-VN');
      return resultText.includes(keyword.toLowerCase()) || 
             timeStr.includes(keyword) ||
             flip.id.toString().includes(keyword);
    });

    if (filtered.length === 0) {
      console.log(`\n🔍 Không tìm thấy kết quả nào cho "${keyword}"`);
      return;
    }

    console.log(`\n🔍 Kết quả tìm kiếm cho "${keyword}":`);
    filtered.forEach((flip, index) => {
      const resultText = flip.result === 'heads' ? 'NGỬA' : 'SẤP';
      const timeStr = flip.timestamp.toLocaleString('vi-VN');
      console.log(`${index + 1}. ID: ${flip.id} | ${resultText} | ${timeStr}`);
    });
  }
}

// Khởi tạo ứng dụng
const coinFlipApp = new CoinFlipHistory();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Hiển thị menu chính
function showMainMenu() {
  console.log('\n🪙 COIN FLIP HISTORY');
  console.log('─'.repeat(30));
  console.log('1. Lật đồng xu 1 lần');
  console.log('2. Lật đồng xu nhiều lần');
  console.log('3. Xem lịch sử');
  console.log('4. Xem thống kê');
  console.log('5. Tìm kiếm trong lịch sử');
  console.log('6. Xóa lịch sử');
  console.log('0. Thoát');
  console.log('─'.repeat(30));
  rl.question('Chọn chức năng: ', handleMainMenu);
}

// Xử lý menu chính
function handleMainMenu(choice) {
  switch (choice.trim()) {
    case '1':
      coinFlipApp.flipCoin();
      showMainMenu();
      break;
      
    case '2':
      rl.question('Nhập số lần lật (1-100): ', (input) => {
        const times = parseInt(input);
        if (isNaN(times)) {
          console.log('❌ Vui lòng nhập số hợp lệ.');
        } else {
          coinFlipApp.flipMultiple(times);
        }
        showMainMenu();
      });
      break;
      
    case '3':
      coinFlipApp.showHistory();
      showMainMenu();
      break;
      
    case '4':
      coinFlipApp.showStats();
      showMainMenu();
      break;
      
    case '5':
      rl.question('Nhập từ khóa tìm kiếm: ', (keyword) => {
        coinFlipApp.searchHistory(keyword);
        showMainMenu();
      });
      break;
      
    case '6':
      rl.question('Bạn có chắc muốn xóa toàn bộ lịch sử? (y/n): ', (confirm) => {
        if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
          coinFlipApp.clearHistory();
        } else {
          console.log('❌ Đã hủy xóa lịch sử.');
        }
        showMainMenu();
      });
      break;
      
    case '0':
      console.log('\n👋 Cảm ơn bạn đã sử dụng Coin Flip History!');
      rl.close();
      break;
      
    default:
      console.log('❌ Lựa chọn không hợp lệ.');
      showMainMenu();
  }
}

// Xử lý khi đóng chương trình
rl.on('close', () => {
  console.log('Đã thoát chương trình.');
  process.exit(0);
});

// Demo dữ liệu mẫu
console.log('🎲 Khởi tạo ứng dụng Coin Flip History...');
console.log('💡 Thêm một số lần lật mẫu để demo...');

// Thêm một số lần lật mẫu
for (let i = 0; i < 5; i++) {
  const flip = coinFlipApp.flipCoin();
  // Tạm dừng nhỏ
  setTimeout(() => {}, 200);
}

// Bắt đầu ứng dụng
setTimeout(() => {
  showMainMenu();
}, 1000);

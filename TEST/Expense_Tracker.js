// Ứng dụng quản lý chi tiêu (Expense Tracker)
// Ghi lại các khoản chi tiêu với danh mục, số tiền, ngày
// Tính tổng chi tiêu theo tháng/tuần

const readline = require('readline');

// 1. Class đại diện cho một khoản chi tiêu
class Expense {
  constructor(id, category, description, amount, date) {
    this.id = id;
    this.category = category;
    this.description = description;
    this.amount = amount;
    this.date = date;
  }
}

// 2. Class quản lý chi tiêu
class ExpenseTracker {
  constructor() {
    this.expenses = [];
    this.nextId = 1;
    this.categories = [
      'Ăn uống',
      'Di chuyển',
      'Mua sắm',
      'Giải trí',
      'Sức khỏe',
      'Học tập',
      'Nhà cửa',
      'Khác'
    ];
  }

  // Thêm khoản chi tiêu mới
  addExpense(category, description, amount, date) {
    if (!this.categories.includes(category)) {
      throw new Error('Danh mục không hợp lệ.');
    }
    if (amount <= 0) {
      throw new Error('Số tiền phải lớn hơn 0.');
    }
    if (!description || description.trim() === '') {
      throw new Error('Mô tả không được để trống.');
    }

    const expense = new Expense(
      this.nextId++,
      category,
      description.trim(),
      Number(amount),
      date || new Date()
    );
    
    this.expenses.push(expense);
    console.log(`✅ Đã thêm chi tiêu: ${description} - ${amount.toLocaleString('vi-VN')}đ`);
  }

  // Xóa khoản chi tiêu
  removeExpense(id) {
    const index = this.expenses.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy khoản chi tiêu với ID ${id}.`);
    }
    const [removed] = this.expenses.splice(index, 1);
    console.log(`🗑️ Đã xóa chi tiêu: ${removed.description}`);
  }

  // Hiển thị tất cả chi tiêu
  listExpenses() {
    if (this.expenses.length === 0) {
      console.log('📝 Chưa có khoản chi tiêu nào.');
      return;
    }

    console.log('\n📋 DANH SÁCH CHI TIÊU');
    console.log('─'.repeat(100));
    console.log('ID  | Danh mục'.padEnd(15) + '| Mô tả'.padEnd(25) + '| Số tiền'.padEnd(15) + '| Ngày');
    console.log('─'.repeat(100));

    this.expenses.forEach(expense => {
      const id = expense.id.toString().padEnd(4);
      const category = expense.category.padEnd(12);
      const description = expense.description.padEnd(22);
      const amount = expense.amount.toLocaleString('vi-VN').padEnd(12);
      const date = expense.date.toLocaleDateString('vi-VN');
      console.log(`${id} | ${category} | ${description} | ${amount}đ | ${date}`);
    });
    console.log('─'.repeat(100));
  }

  // Tính tổng chi tiêu theo tháng
  getMonthlyTotal(year, month) {
    const filtered = this.expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === year && 
             expenseDate.getMonth() === month - 1;
    });

    const total = filtered.reduce((sum, expense) => sum + expense.amount, 0);
    const monthName = new Date(year, month - 1).toLocaleDateString('vi-VN', { month: 'long' });
    
    console.log(`\n📊 CHI TIÊU THÁNG ${monthName.toUpperCase()} ${year}`);
    console.log(`Tổng chi tiêu: ${total.toLocaleString('vi-VN')}đ`);
    console.log(`Số khoản chi tiêu: ${filtered.length}`);
    
    // Thống kê theo danh mục
    const categoryStats = {};
    filtered.forEach(expense => {
      categoryStats[expense.category] = (categoryStats[expense.category] || 0) + expense.amount;
    });

    if (Object.keys(categoryStats).length > 0) {
      console.log('\nChi tiêu theo danh mục:');
      Object.entries(categoryStats)
        .sort(([,a], [,b]) => b - a)
        .forEach(([category, amount]) => {
          const percentage = ((amount / total) * 100).toFixed(1);
          console.log(`  ${category}: ${amount.toLocaleString('vi-VN')}đ (${percentage}%)`);
        });
    }
  }

  // Tính tổng chi tiêu theo tuần
  getWeeklyTotal(year, week) {
    const startOfYear = new Date(year, 0, 1);
    const startOfWeek = new Date(startOfYear);
    startOfWeek.setDate(startOfYear.getDate() + (week - 1) * 7);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const filtered = this.expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
    });

    const total = filtered.reduce((sum, expense) => sum + expense.amount, 0);
    
    console.log(`\n📊 CHI TIÊU TUẦN ${week} NĂM ${year}`);
    console.log(`Từ: ${startOfWeek.toLocaleDateString('vi-VN')} đến: ${endOfWeek.toLocaleDateString('vi-VN')}`);
    console.log(`Tổng chi tiêu: ${total.toLocaleString('vi-VN')}đ`);
    console.log(`Số khoản chi tiêu: ${filtered.length}`);
  }

  // Tìm kiếm chi tiêu
  searchExpenses(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    const found = this.expenses.filter(expense =>
      expense.description.toLowerCase().includes(lowerKeyword) ||
      expense.category.toLowerCase().includes(lowerKeyword)
    );

    if (found.length === 0) {
      console.log(`🔍 Không tìm thấy khoản chi tiêu nào chứa "${keyword}"`);
      return;
    }

    console.log(`\n🔍 KẾT QUẢ TÌM KIẾM CHO "${keyword}":`);
    console.log('─'.repeat(100));
    found.forEach(expense => {
      const id = expense.id.toString().padEnd(4);
      const category = expense.category.padEnd(12);
      const description = expense.description.padEnd(22);
      const amount = expense.amount.toLocaleString('vi-VN').padEnd(12);
      const date = expense.date.toLocaleDateString('vi-VN');
      console.log(`${id} | ${category} | ${description} | ${amount}đ | ${date}`);
    });
    console.log('─'.repeat(100));
  }

  // Thống kê tổng quan
  getOverallStats() {
    if (this.expenses.length === 0) {
      console.log('📊 Chưa có dữ liệu thống kê.');
      return;
    }

    const total = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const avg = total / this.expenses.length;
    const maxExpense = this.expenses.reduce((max, expense) => 
      expense.amount > max.amount ? expense : max
    );
    const minExpense = this.expenses.reduce((min, expense) => 
      expense.amount < min.amount ? expense : min
    );

    console.log('\n📊 THỐNG KÊ TỔNG QUAN');
    console.log(`Tổng số khoản chi tiêu: ${this.expenses.length}`);
    console.log(`Tổng chi tiêu: ${total.toLocaleString('vi-VN')}đ`);
    console.log(`Chi tiêu trung bình: ${avg.toLocaleString('vi-VN')}đ`);
    console.log(`Chi tiêu cao nhất: ${maxExpense.amount.toLocaleString('vi-VN')}đ (${maxExpense.description})`);
    console.log(`Chi tiêu thấp nhất: ${minExpense.amount.toLocaleString('vi-VN')}đ (${minExpense.description})`);
  }

  // Hiển thị danh mục có sẵn
  showCategories() {
    console.log('\n📂 DANH MỤC CHI TIÊU:');
    this.categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category}`);
    });
  }
}

// 3. Giao diện người dùng
const tracker = new ExpenseTracker();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n💰 QUẢN LÝ CHI TIÊU 💰');
  console.log('1. Thêm khoản chi tiêu');
  console.log('2. Xem danh sách chi tiêu');
  console.log('3. Xóa khoản chi tiêu');
  console.log('4. Tìm kiếm chi tiêu');
  console.log('5. Thống kê theo tháng');
  console.log('6. Thống kê theo tuần');
  console.log('7. Thống kê tổng quan');
  console.log('8. Xem danh mục');
  console.log('0. Thoát');
  rl.question('Chọn chức năng: ', handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      addExpenseFlow();
      break;
    case '2':
      tracker.listExpenses();
      showMenu();
      break;
    case '3':
      removeExpenseFlow();
      break;
    case '4':
      searchExpenseFlow();
      break;
    case '5':
      monthlyStatsFlow();
      break;
    case '6':
      weeklyStatsFlow();
      break;
    case '7':
      tracker.getOverallStats();
      showMenu();
      break;
    case '8':
      tracker.showCategories();
      showMenu();
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('❌ Lựa chọn không hợp lệ.');
      showMenu();
  }
}

function addExpenseFlow() {
  tracker.showCategories();
  rl.question('Chọn danh mục (nhập số): ', (categoryChoice) => {
    const categoryIndex = parseInt(categoryChoice) - 1;
    if (categoryIndex < 0 || categoryIndex >= tracker.categories.length) {
      console.log('❌ Danh mục không hợp lệ.');
      showMenu();
      return;
    }
    
    const category = tracker.categories[categoryIndex];
    rl.question('Nhập mô tả: ', (description) => {
      rl.question('Nhập số tiền: ', (amount) => {
        rl.question('Nhập ngày (dd/mm/yyyy, bỏ trống để dùng hôm nay): ', (dateStr) => {
          let date = new Date();
          if (dateStr.trim()) {
            const [day, month, year] = dateStr.split('/');
            date = new Date(year, month - 1, day);
          }
          
          try {
            tracker.addExpense(category, description, amount, date);
          } catch (e) {
            console.error('❌ Lỗi:', e.message);
          }
          showMenu();
        });
      });
    });
  });
}

function removeExpenseFlow() {
  rl.question('Nhập ID khoản chi tiêu cần xóa: ', (id) => {
    try {
      tracker.removeExpense(parseInt(id));
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMenu();
  });
}

function searchExpenseFlow() {
  rl.question('Nhập từ khóa tìm kiếm: ', (keyword) => {
    tracker.searchExpenses(keyword);
    showMenu();
  });
}

function monthlyStatsFlow() {
  const currentDate = new Date();
  rl.question(`Nhập năm (mặc định ${currentDate.getFullYear()}): `, (year) => {
    rl.question(`Nhập tháng (1-12, mặc định ${currentDate.getMonth() + 1}): `, (month) => {
      const y = year || currentDate.getFullYear();
      const m = month || currentDate.getMonth() + 1;
      tracker.getMonthlyTotal(y, m);
      showMenu();
    });
  });
}

function weeklyStatsFlow() {
  const currentDate = new Date();
  const currentWeek = Math.ceil((currentDate.getDate() + new Date(currentDate.getFullYear(), 0, 1).getDay()) / 7);
  
  rl.question(`Nhập năm (mặc định ${currentDate.getFullYear()}): `, (year) => {
    rl.question(`Nhập tuần (1-52, mặc định ${currentWeek}): `, (week) => {
      const y = year || currentDate.getFullYear();
      const w = week || currentWeek;
      tracker.getWeeklyTotal(y, w);
      showMenu();
    });
  });
}

// 4. Demo dữ liệu mẫu
function addSampleData() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  try {
    tracker.addExpense('Ăn uống', 'Ăn trưa tại nhà hàng', 150000, today);
    tracker.addExpense('Di chuyển', 'Xăng xe máy', 50000, today);
    tracker.addExpense('Mua sắm', 'Mua quần áo', 300000, yesterday);
    tracker.addExpense('Giải trí', 'Xem phim', 120000, yesterday);
    tracker.addExpense('Sức khỏe', 'Khám bệnh', 200000, lastWeek);
    tracker.addExpense('Học tập', 'Mua sách', 250000, lastWeek);
    console.log('\n✅ Đã thêm dữ liệu mẫu!');
  } catch (e) {
    console.error('❌ Lỗi khi thêm dữ liệu mẫu:', e.message);
  }
}

rl.on('close', () => {
  console.log('\n👋 Cảm ơn bạn đã sử dụng ứng dụng quản lý chi tiêu!');
  process.exit(0);
});

// Bắt đầu ứng dụng
console.log('💰 CHÀO MỪNG ĐẾN VỚI ỨNG DỤNG QUẢN LÝ CHI TIÊU 💰');
addSampleData();
showMenu();

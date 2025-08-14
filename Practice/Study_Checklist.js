// ... existing code ...
// --- Ứng dụng Study Checklist ---
class StudyItem {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    this.completed = false;
  }
}

class StudyChecklist {
  constructor() {
    this.items = [];
    this.nextId = 1;
  }

  addItem(content) {
    const item = new StudyItem(this.nextId++, content);
    this.items.push(item);
    console.log(`Đã thêm mục tiêu: ${content}`);
  }

  listItems() {
    if (this.items.length === 0) {
      console.log('Chưa có mục tiêu nào.');
      return;
    }
    this.items.forEach(item => {
      const status = item.completed ? '[x]' : '[ ]';
      console.log(`${item.id}. ${status} ${item.content}`);
    });
  }

  markCompleted(id) {
    const item = this.items.find(i => i.id === id);
    if (!item) {
      console.log('Không tìm thấy mục tiêu với ID này.');
      return;
    }
    if (item.completed) {
      console.log('Mục tiêu đã hoàn thành trước đó.');
      return;
    }
    item.completed = true;
    console.log(`Đã đánh dấu hoàn thành: ${item.content}`);
  }
}

const checklist = new StudyChecklist();
const rl3 = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function showChecklistMenu() {
  console.log('\n--- STUDY CHECKLIST ---');
  console.log('1. Thêm mục tiêu học tập');
  console.log('2. Hiển thị danh sách mục tiêu');
  console.log('3. Đánh dấu hoàn thành mục tiêu');
  console.log('0. Thoát');
  rl3.question('Chọn chức năng: ', handleChecklistMenu);
}

function handleChecklistMenu(choice) {
  switch (choice.trim()) {
    case '1':
      rl3.question('Nhập nội dung mục tiêu: ', (content) => {
        checklist.addItem(content);
        showChecklistMenu();
      });
      break;
    case '2':
      checklist.listItems();
      showChecklistMenu();
      break;
    case '3':
      rl3.question('Nhập ID mục tiêu cần đánh dấu hoàn thành: ', (id) => {
        checklist.markCompleted(Number(id));
        showChecklistMenu();
      });
      break;
    case '0':
      rl3.close();
      break;
    default:
      console.log('Lựa chọn không hợp lệ.');
      showChecklistMenu();
  }
}

rl3.on('close', () => {
  console.log('Đã thoát Study Checklist.');
});

// Bỏ comment dòng sau để chạy thử Study Checklist độc lập
// showChecklistMenu();
// ... existing code ...

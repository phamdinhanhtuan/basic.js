// Ứng dụng quản lý danh sách sách đã đọc (Reading List)
const readline = require('readline');

// 1. Định nghĩa class Sách
class Book {
  constructor(id, title, author, status = 'chưa đọc') {
    this.id = id;
    this.title = title;
    this.author = author;
    this.status = status; // 'đã đọc', 'đang đọc', 'chưa đọc'
    this.dateAdded = new Date().toLocaleDateString('vi-VN');
    this.dateCompleted = null;
  }
}

// 2. Quản lý danh sách sách đã đọc
class ReadingList {
  constructor() {
    this.books = [];
    this.nextId = 1;
  }

  // Thêm sách mới vào danh sách
  addBook(title, author, status = 'chưa đọc') {
    if (!title || title.trim() === '') {
      throw new Error('Tên sách không được để trống.');
    }
    if (!author || author.trim() === '') {
      throw new Error('Tên tác giả không được để trống.');
    }
    
    const book = new Book(this.nextId++, title.trim(), author.trim(), status);
    this.books.push(book);
    console.log(`✅ Đã thêm sách: "${book.title}" - ${book.author}`);
    return book;
  }

  // Cập nhật trạng thái đọc
  updateStatus(id, newStatus) {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      throw new Error(`Không tìm thấy sách với ID ${id}.`);
    }
    
    const validStatuses = ['đã đọc', 'đang đọc', 'chưa đọc'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error('Trạng thái không hợp lệ. Chọn: đã đọc, đang đọc, chưa đọc');
    }
    
    const oldStatus = book.status;
    book.status = newStatus;
    
    // Cập nhật ngày hoàn thành nếu đã đọc
    if (newStatus === 'đã đọc') {
      book.dateCompleted = new Date().toLocaleDateString('vi-VN');
    } else {
      book.dateCompleted = null;
    }
    
    console.log(`📖 Đã cập nhật trạng thái "${book.title}": ${oldStatus} → ${newStatus}`);
  }

  // Xóa sách khỏi danh sách
  removeBook(id) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy sách với ID ${id}.`);
    }
    const [removed] = this.books.splice(index, 1);
    console.log(`🗑️ Đã xóa sách: "${removed.title}"`);
  }

  // Hiển thị toàn bộ danh sách
  displayAllBooks() {
    if (this.books.length === 0) {
      console.log('📚 Danh sách sách trống.');
      return;
    }

    console.log('\n📚 DANH SÁCH SÁCH ĐÃ ĐỌC');
    console.log('─'.repeat(80));
    console.log('ID | Tên sách'.padEnd(35) + '| Tác giả'.padEnd(20) + '| Trạng thái'.padEnd(12) + '| Ngày thêm');
    console.log('─'.repeat(80));

    this.books.forEach(book => {
      const statusIcon = book.status === 'đã đọc' ? '✅' : 
                       book.status === 'đang đọc' ? '📖' : '⏳';
      const title = book.title.length > 30 ? book.title.substring(0, 27) + '...' : book.title;
      const author = book.author.length > 18 ? book.author.substring(0, 15) + '...' : book.author;
      
      console.log(`${book.id.toString().padEnd(3)} | ${title.padEnd(30)} | ${author.padEnd(15)} | ${statusIcon} ${book.status.padEnd(8)} | ${book.dateAdded}`);
    });
    console.log('─'.repeat(80));
  }

  // Hiển thị sách theo trạng thái
  displayByStatus(status) {
    const filtered = this.books.filter(b => b.status === status);
    if (filtered.length === 0) {
      console.log(`📚 Không có sách nào ở trạng thái "${status}".`);
      return;
    }

    console.log(`\n📚 SÁCH ${status.toUpperCase()}`);
    console.log('─'.repeat(80));
    filtered.forEach(book => {
      const statusIcon = status === 'đã đọc' ? '✅' : 
                       status === 'đang đọc' ? '📖' : '⏳';
      console.log(`ID: ${book.id} | "${book.title}" - ${book.author} | ${statusIcon} ${book.status}`);
      if (book.status === 'đã đọc' && book.dateCompleted) {
        console.log(`   Hoàn thành: ${book.dateCompleted}`);
      }
    });
    console.log('─'.repeat(80));
  }

  // Tìm kiếm sách
  searchBooks(keyword) {
    const lower = keyword.toLowerCase();
    const found = this.books.filter(b =>
      b.title.toLowerCase().includes(lower) ||
      b.author.toLowerCase().includes(lower)
    );
    
    if (found.length === 0) {
      console.log(`🔍 Không tìm thấy sách nào chứa "${keyword}"`);
      return;
    }
    
    console.log(`\n🔍 KẾT QUẢ TÌM KIẾM: "${keyword}"`);
    console.log('─'.repeat(80));
    found.forEach(book => {
      const statusIcon = book.status === 'đã đọc' ? '✅' : 
                       book.status === 'đang đọc' ? '📖' : '⏳';
      console.log(`ID: ${book.id} | "${book.title}" - ${book.author} | ${statusIcon} ${book.status}`);
    });
    console.log('─'.repeat(80));
  }

  // Thống kê
  getStats() {
    if (this.books.length === 0) {
      console.log('📊 Chưa có dữ liệu thống kê.');
      return;
    }

    const total = this.books.length;
    const completed = this.books.filter(b => b.status === 'đã đọc').length;
    const reading = this.books.filter(b => b.status === 'đang đọc').length;
    const pending = this.books.filter(b => b.status === 'chưa đọc').length;
    const completionRate = ((completed / total) * 100).toFixed(1);

    console.log('\n📊 THỐNG KÊ ĐỌC SÁCH');
    console.log('─'.repeat(40));
    console.log(`📚 Tổng số sách: ${total}`);
    console.log(`✅ Đã đọc: ${completed}`);
    console.log(`📖 Đang đọc: ${reading}`);
    console.log(`⏳ Chưa đọc: ${pending}`);
    console.log(`📈 Tỷ lệ hoàn thành: ${completionRate}%`);
    console.log('─'.repeat(40));
  }

  // Sắp xếp theo tên sách
  sortByTitle() {
    this.books.sort((a, b) => a.title.localeCompare(b.title));
    console.log('📚 Đã sắp xếp theo tên sách.');
  }

  // Sắp xếp theo tác giả
  sortByAuthor() {
    this.books.sort((a, b) => a.author.localeCompare(b.author));
    console.log('📚 Đã sắp xếp theo tác giả.');
  }

  // Sắp xếp theo ngày thêm
  sortByDate() {
    this.books.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    console.log('📚 Đã sắp xếp theo ngày thêm.');
  }
}

// 3. Giao diện người dùng
const readingList = new ReadingList();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n📚 QUẢN LÝ DANH SÁCH SÁCH ĐÃ ĐỌC 📚');
  console.log('1. Thêm sách mới');
  console.log('2. Xem tất cả sách');
  console.log('3. Xem sách theo trạng thái');
  console.log('4. Cập nhật trạng thái đọc');
  console.log('5. Xóa sách');
  console.log('6. Tìm kiếm sách');
  console.log('7. Thống kê');
  console.log('8. Sắp xếp danh sách');
  console.log('0. Thoát');
  rl.question('Chọn chức năng: ', handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      addBookFlow();
      break;
    case '2':
      readingList.displayAllBooks();
      showMenu();
      break;
    case '3':
      showStatusMenu();
      break;
    case '4':
      updateStatusFlow();
      break;
    case '5':
      removeBookFlow();
      break;
    case '6':
      searchBookFlow();
      break;
    case '7':
      readingList.getStats();
      showMenu();
      break;
    case '8':
      showSortMenu();
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('❌ Lựa chọn không hợp lệ.');
      showMenu();
  }
}

function addBookFlow() {
  rl.question('📖 Nhập tên sách: ', (title) => {
    rl.question('✍️ Nhập tên tác giả: ', (author) => {
      console.log('\n📋 Chọn trạng thái:');
      console.log('1. Chưa đọc');
      console.log('2. Đang đọc');
      console.log('3. Đã đọc');
      rl.question('Chọn trạng thái (1-3): ', (statusChoice) => {
        let status = 'chưa đọc';
        switch (statusChoice.trim()) {
          case '2':
            status = 'đang đọc';
            break;
          case '3':
            status = 'đã đọc';
            break;
        }
        
        try {
          readingList.addBook(title, author, status);
        } catch (e) {
          console.error('❌ Lỗi:', e.message);
        }
        showMenu();
      });
    });
  });
}

function showStatusMenu() {
  console.log('\n📋 Chọn trạng thái để xem:');
  console.log('1. Chưa đọc');
  console.log('2. Đang đọc');
  console.log('3. Đã đọc');
  rl.question('Chọn trạng thái (1-3): ', (choice) => {
    let status = 'chưa đọc';
    switch (choice.trim()) {
      case '2':
        status = 'đang đọc';
        break;
      case '3':
        status = 'đã đọc';
        break;
    }
    readingList.displayByStatus(status);
    showMenu();
  });
}

function updateStatusFlow() {
  rl.question('📖 Nhập ID sách cần cập nhật: ', (id) => {
    console.log('\n📋 Chọn trạng thái mới:');
    console.log('1. Chưa đọc');
    console.log('2. Đang đọc');
    console.log('3. Đã đọc');
    rl.question('Chọn trạng thái (1-3): ', (statusChoice) => {
      let status = 'chưa đọc';
      switch (statusChoice.trim()) {
        case '2':
          status = 'đang đọc';
          break;
        case '3':
          status = 'đã đọc';
          break;
      }
      
      try {
        readingList.updateStatus(Number(id), status);
      } catch (e) {
        console.error('❌ Lỗi:', e.message);
      }
      showMenu();
    });
  });
}

function removeBookFlow() {
  rl.question('🗑️ Nhập ID sách cần xóa: ', (id) => {
    try {
      readingList.removeBook(Number(id));
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMenu();
  });
}

function searchBookFlow() {
  rl.question('🔍 Nhập từ khóa tìm kiếm: ', (keyword) => {
    readingList.searchBooks(keyword);
    showMenu();
  });
}

function showSortMenu() {
  console.log('\n📚 Chọn cách sắp xếp:');
  console.log('1. Theo tên sách');
  console.log('2. Theo tác giả');
  console.log('3. Theo ngày thêm');
  rl.question('Chọn cách sắp xếp (1-3): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        readingList.sortByTitle();
        break;
      case '2':
        readingList.sortByAuthor();
        break;
      case '3':
        readingList.sortByDate();
        break;
      default:
        console.log('❌ Lựa chọn không hợp lệ.');
    }
    showMenu();
  });
}

rl.on('close', () => {
  console.log('👋 Cảm ơn bạn đã sử dụng ứng dụng Reading List!');
  process.exit(0);
});

// 4. Demo dữ liệu mẫu
console.log('📚 KHỞI TẠO ỨNG DỤNG READING LIST');
console.log('─'.repeat(50));

// Thêm một số sách mẫu
try {
  readingList.addBook('Dế Mèn Phiêu Lưu Ký', 'Tô Hoài', 'đã đọc');
  readingList.addBook('Tuổi Thơ Dữ Dội', 'Phùng Quán', 'đang đọc');
  readingList.addBook('Harry Potter và Hòn Đá Phù Thủy', 'J.K. Rowling', 'chưa đọc');
  readingList.addBook('Lão Hạc', 'Nam Cao', 'đã đọc');
  readingList.addBook('Số Đỏ', 'Vũ Trọng Phụng', 'chưa đọc');
} catch (e) {
  console.error('❌ Lỗi:', e.message);
}

// Hiển thị menu chính
showMenu();

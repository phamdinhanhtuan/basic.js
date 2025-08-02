// ... existing code ...

// --- Ứng dụng Danh sách phim đã xem (Movie Watchlist) ---
class Movie {
  constructor(id, title, year, rating, status = 'chưa xem') {
    this.id = id;
    this.title = title;
    this.year = year;
    this.rating = rating; // Đánh giá từ 1-10
    this.status = status; // 'đã xem' hoặc 'chưa xem'
    this.dateAdded = new Date().toLocaleDateString('vi-VN');
  }
}

class MovieWatchlist {
  constructor() {
    this.movies = [];
    this.nextId = 1;
  }

  // Thêm phim mới
  addMovie(title, year, rating, status = 'chưa xem') {
    if (!title || title.trim() === '') {
      throw new Error('Tên phim không được để trống.');
    }
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
      throw new Error('Năm phim không hợp lệ.');
    }
    if (isNaN(rating) || rating < 1 || rating > 10) {
      throw new Error('Đánh giá phải từ 1 đến 10.');
    }
    if (!['đã xem', 'chưa xem'].includes(status)) {
      throw new Error('Trạng thái phải là "đã xem" hoặc "chưa xem".');
    }

    const movie = new Movie(this.nextId++, title.trim(), Number(year), Number(rating), status);
    this.movies.push(movie);
    console.log(`✅ Đã thêm phim: "${movie.title}" (${movie.year}) - ${movie.rating}/10 ⭐`);
  }

  // Hiển thị danh sách phim
  displayMovies() {
    if (this.movies.length === 0) {
      console.log('📽️ Danh sách phim trống.');
      return;
    }

    console.log('\n📽️ DANH SÁCH PHIM');
    console.log('─'.repeat(80));
    console.log('ID | Tên phim'.padEnd(35) + '| Năm | Đánh giá | Trạng thái | Ngày thêm');
    console.log('─'.repeat(80));

    this.movies.forEach(movie => {
      const statusIcon = movie.status === 'đã xem' ? '✅' : '⏳';
      const ratingStars = '⭐'.repeat(Math.floor(movie.rating));
      const title = movie.title.length > 30 ? movie.title.substring(0, 27) + '...' : movie.title.padEnd(30);
      
      console.log(`${movie.id.toString().padEnd(3)} | ${title} | ${movie.year.toString().padEnd(4)} | ${movie.rating}/10 ${ratingStars.padEnd(5)} | ${statusIcon} ${movie.status.padEnd(8)} | ${movie.dateAdded}`);
    });
    console.log('─'.repeat(80));
  }

  // Sắp xếp theo năm (tăng dần)
  sortByYear() {
    this.movies.sort((a, b) => a.year - b.year);
    console.log('📅 Đã sắp xếp theo năm (tăng dần).');
  }

  // Sắp xếp theo năm (giảm dần)
  sortByYearDesc() {
    this.movies.sort((a, b) => b.year - a.year);
    console.log('📅 Đã sắp xếp theo năm (giảm dần).');
  }

  // Sắp xếp theo đánh giá (cao nhất trước)
  sortByRating() {
    this.movies.sort((a, b) => b.rating - a.rating);
    console.log('⭐ Đã sắp xếp theo đánh giá (cao nhất trước).');
  }

  // Sắp xếp theo đánh giá (thấp nhất trước)
  sortByRatingAsc() {
    this.movies.sort((a, b) => a.rating - b.rating);
    console.log('⭐ Đã sắp xếp theo đánh giá (thấp nhất trước).');
  }

  // Tìm kiếm phim
  searchMovies(keyword) {
    const lower = keyword.toLowerCase();
    const found = this.movies.filter(movie => 
      movie.title.toLowerCase().includes(lower) ||
      movie.year.toString().includes(keyword)
    );

    if (found.length === 0) {
      console.log(`🔍 Không tìm thấy phim nào chứa "${keyword}"`);
      return;
    }

    console.log(`\n🔍 Kết quả tìm kiếm cho "${keyword}":`);
    found.forEach(movie => {
      const statusIcon = movie.status === 'đã xem' ? '✅' : '⏳';
      console.log(`ID ${movie.id}: "${movie.title}" (${movie.year}) - ${movie.rating}/10 ⭐ - ${statusIcon} ${movie.status}`);
    });
  }

  // Đánh dấu đã xem
  markAsWatched(id) {
    const movie = this.movies.find(m => m.id === id);
    if (!movie) {
      throw new Error(`Không tìm thấy phim với ID ${id}.`);
    }
    if (movie.status === 'đã xem') {
      throw new Error(`Phim "${movie.title}" đã được đánh dấu đã xem.`);
    }
    movie.status = 'đã xem';
    console.log(`✅ Đã đánh dấu xem: "${movie.title}"`);
  }

  // Đánh dấu chưa xem
  markAsUnwatched(id) {
    const movie = this.movies.find(m => m.id === id);
    if (!movie) {
      throw new Error(`Không tìm thấy phim với ID ${id}.`);
    }
    if (movie.status === 'chưa xem') {
      throw new Error(`Phim "${movie.title}" đã được đánh dấu chưa xem.`);
    }
    movie.status = 'chưa xem';
    console.log(`⏳ Đã đánh dấu chưa xem: "${movie.title}"`);
  }

  // Cập nhật đánh giá
  updateRating(id, newRating) {
    const movie = this.movies.find(m => m.id === id);
    if (!movie) {
      throw new Error(`Không tìm thấy phim với ID ${id}.`);
    }
    if (isNaN(newRating) || newRating < 1 || newRating > 10) {
      throw new Error('Đánh giá phải từ 1 đến 10.');
    }
    
    const oldRating = movie.rating;
    movie.rating = Number(newRating);
    console.log(`⭐ Đã cập nhật đánh giá "${movie.title}": ${oldRating}/10 → ${movie.rating}/10`);
  }

  // Xóa phim
  removeMovie(id) {
    const index = this.movies.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy phim với ID ${id}.`);
    }
    const [removed] = this.movies.splice(index, 1);
    console.log(`🗑️ Đã xóa phim: "${removed.title}"`);
  }

  // Thống kê
  getStats() {
    if (this.movies.length === 0) {
      console.log('📊 Chưa có dữ liệu thống kê.');
      return;
    }

    const totalMovies = this.movies.length;
    const watchedMovies = this.movies.filter(m => m.status === 'đã xem').length;
    const unwatchedMovies = totalMovies - watchedMovies;
    const avgRating = this.movies.reduce((sum, m) => sum + m.rating, 0) / totalMovies;
    const topRated = this.movies.reduce((max, m) => m.rating > max.rating ? m : max);
    const recentMovies = this.movies.filter(m => m.year >= new Date().getFullYear() - 5).length;

    console.log('\n📊 THỐNG KÊ DANH SÁCH PHIM');
    console.log(`📽️ Tổng số phim: ${totalMovies}`);
    console.log(`✅ Đã xem: ${watchedMovies} phim`);
    console.log(`⏳ Chưa xem: ${unwatchedMovies} phim`);
    console.log(`⭐ Đánh giá trung bình: ${avgRating.toFixed(1)}/10`);
    console.log(`🏆 Phim đánh giá cao nhất: "${topRated.title}" (${topRated.rating}/10)`);
    console.log(`📅 Phim trong 5 năm gần đây: ${recentMovies} phim`);
  }

  // Hiển thị phim theo trạng thái
  displayByStatus(status) {
    const filtered = this.movies.filter(m => m.status === status);
    if (filtered.length === 0) {
      console.log(`📽️ Không có phim nào ${status}.`);
      return;
    }

    const statusText = status === 'đã xem' ? 'ĐÃ XEM' : 'CHƯA XEM';
    console.log(`\n📽️ PHIM ${statusText.toUpperCase()}`);
    console.log('─'.repeat(60));
    
    filtered.forEach(movie => {
      const ratingStars = '⭐'.repeat(Math.floor(movie.rating));
      console.log(`ID ${movie.id}: "${movie.title}" (${movie.year}) - ${movie.rating}/10 ${ratingStars}`);
    });
    console.log('─'.repeat(60));
  }
}

// Khởi tạo watchlist và giao diện
const watchlist = new MovieWatchlist();
const rl5 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMovieMenu() {
  console.log('\n📽️ QUẢN LÝ DANH SÁCH PHIM');
  console.log('1. Thêm phim mới');
  console.log('2. Hiển thị danh sách phim');
  console.log('3. Tìm kiếm phim');
  console.log('4. Đánh dấu đã xem');
  console.log('5. Đánh dấu chưa xem');
  console.log('6. Cập nhật đánh giá');
  console.log('7. Xóa phim');
  console.log('8. Sắp xếp theo năm (tăng dần)');
  console.log('9. Sắp xếp theo năm (giảm dần)');
  console.log('10. Sắp xếp theo đánh giá (cao nhất)');
  console.log('11. Sắp xếp theo đánh giá (thấp nhất)');
  console.log('12. Hiển thị phim đã xem');
  console.log('13. Hiển thị phim chưa xem');
  console.log('14. Thống kê');
  console.log('0. Thoát');
  rl5.question('Chọn chức năng: ', handleMovieMenu);
}

function handleMovieMenu(choice) {
  switch (choice.trim()) {
    case '1':
      addMovieFlow();
      break;
    case '2':
      watchlist.displayMovies();
      showMovieMenu();
      break;
    case '3':
      searchMovieFlow();
      break;
    case '4':
      markWatchedFlow();
      break;
    case '5':
      markUnwatchedFlow();
      break;
    case '6':
      updateRatingFlow();
      break;
    case '7':
      removeMovieFlow();
      break;
    case '8':
      watchlist.sortByYear();
      showMovieMenu();
      break;
    case '9':
      watchlist.sortByYearDesc();
      showMovieMenu();
      break;
    case '10':
      watchlist.sortByRating();
      showMovieMenu();
      break;
    case '11':
      watchlist.sortByRatingAsc();
      showMovieMenu();
      break;
    case '12':
      watchlist.displayByStatus('đã xem');
      showMovieMenu();
      break;
    case '13':
      watchlist.displayByStatus('chưa xem');
      showMovieMenu();
      break;
    case '14':
      watchlist.getStats();
      showMovieMenu();
      break;
    case '0':
      rl5.close();
      break;
    default:
      console.log('❌ Lựa chọn không hợp lệ.');
      showMovieMenu();
  }
}

function addMovieFlow() {
  rl5.question('Nhập tên phim: ', (title) => {
    rl5.question('Nhập năm phim: ', (year) => {
      rl5.question('Nhập đánh giá (1-10): ', (rating) => {
        rl5.question('Trạng thái (đã xem/chưa xem): ', (status) => {
          try {
            watchlist.addMovie(title, year, rating, status);
          } catch (e) {
            console.error('❌ Lỗi:', e.message);
          }
          showMovieMenu();
        });
      });
    });
  });
}

function searchMovieFlow() {
  rl5.question('Nhập từ khóa tìm kiếm: ', (keyword) => {
    watchlist.searchMovies(keyword);
    showMovieMenu();
  });
}

function markWatchedFlow() {
  rl5.question('Nhập ID phim cần đánh dấu đã xem: ', (id) => {
    try {
      watchlist.markAsWatched(Number(id));
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMovieMenu();
  });
}

function markUnwatchedFlow() {
  rl5.question('Nhập ID phim cần đánh dấu chưa xem: ', (id) => {
    try {
      watchlist.markAsUnwatched(Number(id));
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMovieMenu();
  });
}

function updateRatingFlow() {
  rl5.question('Nhập ID phim cần cập nhật đánh giá: ', (id) => {
    rl5.question('Nhập đánh giá mới (1-10): ', (rating) => {
      try {
        watchlist.updateRating(Number(id), rating);
      } catch (e) {
        console.error('❌ Lỗi:', e.message);
      }
      showMovieMenu();
    });
  });
}

function removeMovieFlow() {
  rl5.question('Nhập ID phim cần xóa: ', (id) => {
    try {
      watchlist.removeMovie(Number(id));
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMovieMenu();
  });
}

rl5.on('close', () => {
  console.log('👋 Đã thoát ứng dụng Danh sách phim.');
});

// Bỏ comment dòng sau để chạy thử Movie Watchlist độc lập
// showMovieMenu();

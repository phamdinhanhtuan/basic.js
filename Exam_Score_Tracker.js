// ... existing code ...

// --- Ứng dụng Quản lý Điểm Thi (Exam Score Tracker) ---
class Student {
  constructor(id, name, className) {
    this.id = id;
    this.name = name;
    this.className = className;
    this.examScores = [];
  }

  // Thêm điểm thi
  addExamScore(examName, score) {
    if (score < 0 || score > 10) {
      throw new Error('Điểm thi phải từ 0 đến 10.');
    }
    this.examScores.push({ examName, score, date: new Date().toLocaleDateString('vi-VN') });
    console.log(`Đã thêm điểm ${examName}: ${score} cho ${this.name}`);
  }

  // Tính điểm trung bình
  getAverageScore() {
    if (this.examScores.length === 0) return 0;
    const total = this.examScores.reduce((sum, exam) => sum + exam.score, 0);
    return (total / this.examScores.length).toFixed(2);
  }

  // Lấy điểm cao nhất
  getHighestScore() {
    if (this.examScores.length === 0) return 0;
    return Math.max(...this.examScores.map(exam => exam.score));
  }

  // Lấy điểm thấp nhất
  getLowestScore() {
    if (this.examScores.length === 0) return 0;
    return Math.min(...this.examScores.map(exam => exam.score));
  }

  // Hiển thị thông tin học sinh
  displayInfo() {
    console.log(`\n📚 HỌC SINH: ${this.name} (ID: ${this.id})`);
    console.log(`Lớp: ${this.className}`);
    console.log(`Điểm trung bình: ${this.getAverageScore()}`);
    console.log(`Điểm cao nhất: ${this.getHighestScore()}`);
    console.log(`Điểm thấp nhất: ${this.getLowestScore()}`);
    
    if (this.examScores.length > 0) {
      console.log('\n📝 Chi tiết điểm thi:');
      this.examScores.forEach(exam => {
        console.log(`  ${exam.examName}: ${exam.score} (${exam.date})`);
      });
    }
  }
}

class ExamTracker {
  constructor() {
    this.students = [];
    this.nextStudentId = 1;
  }

  // Thêm học sinh mới
  addStudent(name, className) {
    if (!name || name.trim() === '') {
      throw new Error('Tên học sinh không được để trống.');
    }
    
    const student = new Student(this.nextStudentId++, name.trim(), className || 'Chưa phân lớp');
    this.students.push(student);
    console.log(`✅ Đã thêm học sinh: ${student.name} (ID: ${student.id})`);
  }

  // Tìm học sinh theo ID
  findStudent(id) {
    return this.students.find(s => s.id === id);
  }

  // Tìm học sinh theo tên
  findStudentByName(name) {
    const lowerName = name.toLowerCase();
    return this.students.filter(s => 
      s.name.toLowerCase().includes(lowerName)
    );
  }

  // Thêm điểm thi cho học sinh
  addExamScore(studentId, examName, score) {
    const student = this.findStudent(studentId);
    if (!student) {
      throw new Error(`Không tìm thấy học sinh với ID ${studentId}.`);
    }
    student.addExamScore(examName, score);
  }

  // Hiển thị bảng xếp hạng
  displayRanking() {
    if (this.students.length === 0) {
      console.log('Chưa có học sinh nào.');
      return;
    }

    // Sắp xếp theo điểm trung bình giảm dần
    const rankedStudents = [...this.students].sort((a, b) => 
      parseFloat(b.getAverageScore()) - parseFloat(a.getAverageScore())
    );

    console.log('\n🏆 BẢNG XẾP HẠNG THEO ĐIỂM TRUNG BÌNH 🏆');
    console.log('─'.repeat(80));
    console.log('Hạng | ID  | Tên học sinh'.padEnd(30) + '| Lớp'.padEnd(15) + '| ĐTB'.padEnd(8) + '| Cao nhất | Thấp nhất');
    console.log('─'.repeat(80));

    rankedStudents.forEach((student, index) => {
      const rank = index + 1;
      const rankSymbol = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
      const name = student.name.padEnd(25);
      const className = student.className.padEnd(12);
      const avgScore = student.getAverageScore().padEnd(6);
      const highest = student.getHighestScore().toString().padEnd(8);
      const lowest = student.getLowestScore().toString();
      
      console.log(`${rankSymbol.padEnd(5)} | ${student.id.toString().padEnd(3)} | ${name} | ${className} | ${avgScore} | ${highest} | ${lowest}`);
    });
    console.log('─'.repeat(80));
  }

  // Thống kê lớp
  getClassStats() {
    if (this.students.length === 0) {
      console.log('Chưa có dữ liệu thống kê.');
      return;
    }

    const totalStudents = this.students.length;
    const studentsWithScores = this.students.filter(s => s.examScores.length > 0);
    
    if (studentsWithScores.length === 0) {
      console.log('Chưa có điểm thi nào.');
      return;
    }

    const allScores = studentsWithScores.flatMap(s => s.examScores.map(exam => exam.score));
    const avgClassScore = (allScores.reduce((sum, score) => sum + score, 0) / allScores.length).toFixed(2);
    const highestClassScore = Math.max(...allScores);
    const lowestClassScore = Math.min(...allScores);

    console.log('\n📊 THỐNG KÊ LỚP');
    console.log(`Tổng số học sinh: ${totalStudents}`);
    console.log(`Số học sinh có điểm: ${studentsWithScores.length}`);
    console.log(`Điểm trung bình lớp: ${avgClassScore}`);
    console.log(`Điểm cao nhất lớp: ${highestClassScore}`);
    console.log(`Điểm thấp nhất lớp: ${lowestClassScore}`);
    
    // Phân loại học lực
    const excellent = studentsWithScores.filter(s => parseFloat(s.getAverageScore()) >= 8).length;
    const good = studentsWithScores.filter(s => {
      const avg = parseFloat(s.getAverageScore());
      return avg >= 6.5 && avg < 8;
    }).length;
    const average = studentsWithScores.filter(s => {
      const avg = parseFloat(s.getAverageScore());
      return avg >= 5 && avg < 6.5;
    }).length;
    const below = studentsWithScores.filter(s => parseFloat(s.getAverageScore()) < 5).length;

    console.log('\n📈 PHÂN LOẠI HỌC LỰC:');
    console.log(`Giỏi (≥8.0): ${excellent} học sinh`);
    console.log(`Khá (6.5-7.9): ${good} học sinh`);
    console.log(`Trung bình (5.0-6.4): ${average} học sinh`);
    console.log(`Yếu (<5.0): ${below} học sinh`);
  }

  // Tìm kiếm học sinh
  searchStudents(keyword) {
    const found = this.findStudentByName(keyword);
    if (found.length === 0) {
      console.log(`Không tìm thấy học sinh nào có tên chứa "${keyword}"`);
      return;
    }
    
    console.log(`\n🔍 Kết quả tìm kiếm cho "${keyword}":`);
    found.forEach(student => {
      student.displayInfo();
    });
  }

  // Xóa học sinh
  removeStudent(id) {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy học sinh với ID ${id}.`);
    }
    const [removed] = this.students.splice(index, 1);
    console.log(`🗑️ Đã xóa học sinh: ${removed.name} (ID: ${removed.id})`);
  }

  // Hiển thị tất cả học sinh
  listAllStudents() {
    if (this.students.length === 0) {
      console.log('Chưa có học sinh nào.');
      return;
    }

    console.log('\n📋 DANH SÁCH TẤT CẢ HỌC SINH:');
    this.students.forEach(student => {
      console.log(`ID: ${student.id} | ${student.name} | Lớp: ${student.className} | ĐTB: ${student.getAverageScore()}`);
    });
  }
}

// Khởi tạo Exam Tracker và giao diện
const examTracker = new ExamTracker();
const rl5 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showExamTrackerMenu() {
  console.log('\n📚 QUẢN LÝ ĐIỂM THI 📚');
  console.log('1. Thêm học sinh mới');
  console.log('2. Thêm điểm thi');
  console.log('3. Hiển thị bảng xếp hạng');
  console.log('4. Xem thông tin học sinh');
  console.log('5. Tìm kiếm học sinh');
  console.log('6. Thống kê lớp');
  console.log('7. Danh sách tất cả học sinh');
  console.log('8. Xóa học sinh');
  console.log('0. Thoát');
  rl5.question('Chọn chức năng: ', handleExamTrackerMenu);
}

function handleExamTrackerMenu(choice) {
  switch (choice.trim()) {
    case '1':
      addStudentFlow();
      break;
    case '2':
      addExamScoreFlow();
      break;
    case '3':
      examTracker.displayRanking();
      showExamTrackerMenu();
      break;
    case '4':
      viewStudentInfoFlow();
      break;
    case '5':
      searchStudentFlow();
      break;
    case '6':
      examTracker.getClassStats();
      showExamTrackerMenu();
      break;
    case '7':
      examTracker.listAllStudents();
      showExamTrackerMenu();
      break;
    case '8':
      removeStudentFlow();
      break;
    case '0':
      rl5.close();
      break;
    default:
      console.log('Lựa chọn không hợp lệ.');
      showExamTrackerMenu();
  }
}

function addStudentFlow() {
  rl5.question('Nhập tên học sinh: ', (name) => {
    rl5.question('Nhập tên lớp (bỏ qua nếu không có): ', (className) => {
      try {
        examTracker.addStudent(name, className);
      } catch (e) {
        console.error('Lỗi:', e.message);
      }
      showExamTrackerMenu();
    });
  });
}

function addExamScoreFlow() {
  rl5.question('Nhập ID học sinh: ', (studentId) => {
    rl5.question('Nhập tên bài thi: ', (examName) => {
      rl5.question('Nhập điểm (0-10): ', (score) => {
        try {
          examTracker.addExamScore(Number(studentId), examName, Number(score));
        } catch (e) {
          console.error('Lỗi:', e.message);
        }
        showExamTrackerMenu();
      });
    });
  });
}

function viewStudentInfoFlow() {
  rl5.question('Nhập ID học sinh cần xem: ', (studentId) => {
    const student = examTracker.findStudent(Number(studentId));
    if (student) {
      student.displayInfo();
    } else {
      console.log('Không tìm thấy học sinh với ID này.');
    }
    showExamTrackerMenu();
  });
}

function searchStudentFlow() {
  rl5.question('Nhập tên học sinh cần tìm: ', (keyword) => {
    examTracker.searchStudents(keyword);
    showExamTrackerMenu();
  });
}

function removeStudentFlow() {
  rl5.question('Nhập ID học sinh cần xóa: ', (studentId) => {
    try {
      examTracker.removeStudent(Number(studentId));
    } catch (e) {
      console.error('Lỗi:', e.message);
    }
    showExamTrackerMenu();
  });
}

rl5.on('close', () => {
  console.log('Đã thoát ứng dụng Quản lý Điểm Thi.');
});

// Bỏ comment dòng sau để chạy thử Exam Score Tracker độc lập
// showExamTrackerMenu();

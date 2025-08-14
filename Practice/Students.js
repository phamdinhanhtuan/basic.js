// 1. Khai báo mảng học sinh
let students = [
  { name: "An", age: 18, avgScore: 7.5 },
  { name: "Bình", age: 17, avgScore: 4.8 },
  { name: "Chi", age: 18, avgScore: 8.2 }
];

// 2. Hàm thêm học sinh mới
function addStudent(name, age, avgScore) {
  students.push({ name, age, avgScore });
}

// 3. Tìm học sinh có điểm cao nhất
function findTopStudent(students) {
  if (students.length === 0) return null;
  let topStudent = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].avgScore > topStudent.avgScore) {
      topStudent = students[i];
    }
  }
  return topStudent;
}

// 4. Tính điểm trung bình cả lớp
function calcClassAvg(students) {
  if (students.length === 0) return 0;
  let total = 0;
  for (let i = 0; i < students.length; i++) {
    total += students[i].avgScore;
  }
  return total / students.length;
}

// 5. In danh sách đạt và không đạt
function printPassFail(students) {
  console.log("Danh sách học sinh ĐẠT (>=5):");
  for (let i = 0; i < students.length; i++) {
    if (students[i].avgScore >= 5) {
      console.log(`- ${students[i].name} (${students[i].avgScore})`);
    }
  }
  console.log("Danh sách học sinh KHÔNG ĐẠT (<5):");
  for (let i = 0; i < students.length; i++) {
    if (students[i].avgScore < 5) {
      console.log(`- ${students[i].name} (${students[i].avgScore})`);
    }
  }
}

// Gọi thử các hàm
addStudent("Dũng", 17, 6.5);
console.log("Học sinh điểm cao nhất:", findTopStudent(students));
console.log("Điểm trung bình cả lớp:", calcClassAvg(students));
printPassFail(students);

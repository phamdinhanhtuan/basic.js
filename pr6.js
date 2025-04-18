// Tạo đối tượng học sinh
const student = {
    name: "Nguyễn Văn An",
    age: 18,
    scores: {
        math: 8.5,
        literature: 7.5,
        english: 9
    }
};

// Hàm tính điểm trung bình
function calculateAverage(student) {
    const scores = student.scores;
    let sum = 0;
    let count = 0;
    
    // Duyệt qua tất cả điểm số
    for (let subject in scores) {
        sum += scores[subject];
        count++;
    }
    
    return (count > 0) ? (sum / count).toFixed(2) : 0;
}

// In thông tin học sinh
console.log("Thông tin học sinh:");
console.log("Tên:", student.name);
console.log("Tuổi:", student.age);
console.log("Điểm số:", student.scores);
console.log("Điểm trung bình:", calculateAverage(student));

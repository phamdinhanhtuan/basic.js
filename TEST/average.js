// Khai báo mảng điểm số
const scores = [8, 7, 9, 6.5, 8.5];

// C1: Dùng vòng lặp for thông thường
let sum1 = 0;
for (let i = 0; i < scores.length; i++) {
  sum1 += scores[i];
}
let average1 = sum1 / scores.length;

// C 2: Dùng vòng lặp for...of
let sum2 = 0;
for (let score of scores) {
  sum2 += score;
}
let average2 = sum2 / scores.length;

// Hiển thị kết quả ra màn hình
const resultDiv = document.getElementById("result");
resultDiv.innerHTML = `
    <p>Điểm số: ${scores.join(", ")}</p>
    <p>Điểm trung bình (cách 1): ${average1.toFixed(2)}</p>
    <p>Điểm trung bình (cách 2): ${average2.toFixed(2)}</p>
`;

// Vẫn giữ console.log để kiểm tra trong Developer Tools
console.log("Điểm số:", scores);
console.log("Điểm trung bình (cách 1):", average1.toFixed(2));
console.log("Điểm trung bình (cách 2):", average2.toFixed(2));

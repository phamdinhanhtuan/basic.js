function Tong(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Hàm kiểm tra
function kiemTra(n, ketQuaMongDoi) {
  const ketQua = Tong(n);
  console.log(`Test với n = ${n}:`);
  console.log(`- Kết quả nhận được: ${ketQua}`);
  console.log(`- Kết quả mong đợi: ${ketQuaMongDoi}`);
  console.log(`- ${ketQua === ketQuaMongDoi ? "ĐÚNG ✓" : "SAI ✗"}`);
  console.log("------------------------");
}

// Chạy các test case
kiemTra(1, 2);
kiemTra(10, 55);
kiemTra(4, 6);

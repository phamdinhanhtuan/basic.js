console.log("\n=== Bài 2: Kiểm tra số chẵn lẻ ===");

// Hàm kiểm tra số chẵn
function checkEvenOdd(number) {
  if (typeof number !== "number") {
    return "Không phải là số";
  }

  if (number % 2 === 0) {
    return "Số chẵn";
  } else {
    return "Số lẻ";
  }
}

// Test
const testNumbers = [5, 10, "15", -4, 7.5];

for (let num of testNumbers) {
  console.log(`${num} là ${checkEvenOdd(num)}`);
}

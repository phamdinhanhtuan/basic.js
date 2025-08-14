function numberToWords(num) {
  const ones = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const tens = ["", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];

  if (num === 0) return ones[0];

  let result = "";

  if (num >= 1000) {
    result += ones[Math.floor(num / 1000)] + " nghìn ";
    num = num % 1000;
  }
  if (num >= 100) {
    result += ones[Math.floor(num / 100)] + " trăm ";
    num = num % 100;
  } else if (result !== "" && num > 0) {
    result += "không trăm ";
  }
  if (num >= 10) {
    if (num < 20) {
      result += "mười ";
      if (num % 10 === 5) result += "lăm";
      else if (num % 10 !== 0) result += ones[num % 10];
    } else {
      result += tens[Math.floor(num / 10)] + " ";
      if (num % 10 === 1) result += "mốt";
      else if (num % 10 === 5) result += "lăm";
      else if (num % 10 !== 0) result += ones[num % 10];
    }
  } else if (num > 0) {
    result += ones[num];
  }

  return result.trim().replace(/\s+/g, " ");
}

// Ví dụ sử dụng:
console.log(numberToWords(123)); // "một trăm hai mươi ba"
console.log(numberToWords(1005)); // "một nghìn không trăm lăm"
console.log(numberToWords(2019)); // "hai nghìn không trăm mười chín"
console.log(numberToWords(0)); // "không"

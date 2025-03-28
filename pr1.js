// Bài 1: Kiểm tra số chẵn lẻ
function check_oddEven(so) {
  if (so % 2 == 0) {
    console.log(so + "even_number:");
  } else {
    console.log(so + "odd_number: ");
  }
}
// Bài 2: Xếp loại học sinh
function xepLoaiHocSinh(diem) {
  if (diem >= 9) {
    return "Xuất sắc";
  } else if (diem >= 8) {
    return "Giỏi";
  } else if (diem >= 7) {
    return "Khá";
  } else if (diem >= 5) {
    return "Trung bình";
  } else {
    return "Yếu";
  }
}

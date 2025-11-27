const average = (toan, van, anh) => {
  return (toan + van + anh) / 3;
};

const average_score_ranking = (diemTB) => {
  if (diemTB >= 9) {
    return "Excellent";
  } else if (diemTB >= 8) {
    return " Very Good";
  } else if (diemTB >= 6.5) {
    return "Good";
  } else return "Pass";
};

const diemToan = 9;
const diemVan = 8;
const diemAnh = 7;

const my_TB = average(diemToan, diemVan, diemAnh);
console.log(`
DiemTB : ${my_TB}
XepLoai: ${average_score_ranking(my_TB)}`);

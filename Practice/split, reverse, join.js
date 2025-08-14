function daoNguocChuoi1(str) {
    return str.split('').reverse().join('');
}

// Cách 2: Dùng vòng lặp
function daoNguocChuoi2(str) {
    let ketQua = '';
    for (let i = str.length - 1; i >= 0; i--) {
        ketQua += str[i];
    }
    return ketQua;
}

const chuoiTest = "Hello World";
console.log("Chuỗi gốc:", chuoiTest);
console.log("Đảo ngược (Cách 1):", daoNguocChuoi1(chuoiTest));
console.log("Đảo ngược (Cách 2):", daoNguocChuoi2(chuoiTest));

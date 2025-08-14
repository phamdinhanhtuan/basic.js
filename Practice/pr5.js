function kiemTraSoNguyenTo(n) {
    // Số nguyên tố phải lớn hơn 1
    if (n <= 1) return false;
    
    // Kiểm tra từ 2 đến căn bậc 2 của n
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

console.log("Số 7 có phải số nguyên tố?", kiemTraSoNguyenTo(7));
console.log("Số 4 có phải số nguyên tố?", kiemTraSoNguyenTo(4));

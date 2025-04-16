Dùng vòng lặp for thông thường
function tinhTong1(n) {
    let tong = 0;
    for (let i = 1; i <= n; i++) {
        tong += i;
    }
    return tong;
}

// Cách 2: Dùng công thức toán học (công thức Gauss)
function tinhTong2(n) {
    return (n * (n + 1)) / 2;
}

console.log("Kết quả với n = 5:");
console.log("Cách 1:", tinhTong1(5));
console.log("Cách 2:", tinhTong2(5));

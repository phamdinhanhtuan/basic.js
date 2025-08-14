function timSoLonNhat1(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Cách 2: Dùng Math.max
function timSoLonNhat2(arr) {
    return Math.max(...arr);
}

const mang = [5, 2, 9, 1, 7, 6, 3];
console.log("Mảng:", mang);
console.log("Số lớn nhất (Cách 1):", timSoLonNhat1(mang));
console.log("Số lớn nhất (Cách 2):", timSoLonNhat2(mang)); 

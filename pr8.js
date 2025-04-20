function calculateSumAndAverage(arr) {
    let sum = 0;

    for (let num of arr) {
        if (typeof num !== "number") {
            return "Tất cả các phần tử phải là số.";
        }
        sum += num;
    }

    const average = sum / arr.length;
    return { sum, average };
}

// Thử nghiệm hàm
const testArray = [10, 20, 30, 40, 50];
const result = calculateSumAndAverage(testArray);
console.log(result); // { sum: 150, average: 30 }

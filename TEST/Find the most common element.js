const arr = [1, 2, 2, 3, 3, 3, 4];
let freq = {};
let maxFreq = 0;
let mostFrequent;
for (let num of arr) {
    freq[num] = (freq[num] || 0) + 1;
    if (freq[num] > maxFreq) {
        maxFreq = freq[num];
        mostFrequent = num;
    }
}
console.log("Phần tử xuất hiện nhiều nhất là:", mostFrequent);

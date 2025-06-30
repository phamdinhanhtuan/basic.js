const num = 153;
const digits = num.toString().split('');
const sum = digits.reduce((acc, d) => acc + Math.pow(Number(d), digits.length), 0);
console.log(num, sum === num ? "là số Armstrong" : "không phải là số Armstrong");

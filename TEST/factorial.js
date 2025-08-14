function factorial(n) {
    if (n < 0) return undefined;
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

const numbers = [0, 1, 2, 3, 4, 5];
numbers.forEach(num => {
    console.log(`Giai thừa của ${num} là: ${factorial(num)}`);
});

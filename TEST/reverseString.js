function reverseString(str) {
    return str.split('').reverse().join('');
}

const strings = ["hello", "world", "JavaScript"];
strings.forEach(str => {
    console.log(`Chuỗi "${str}" sau khi đảo ngược là: "${reverseString(str)}"`);
});

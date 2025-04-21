function isPalindrome(str) {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

const strings = ["madam", "hello", "racecar"];
strings.forEach(str => {
    console.log(`Chuỗi "${str}" là palindrome: ${isPalindrome(str)}`);
});

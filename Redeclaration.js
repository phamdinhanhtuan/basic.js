// var: Có thể khai báo lại
var x = 10;
var x = 20; // Hợp lệ
console.log(x); // 20

// let: Không thể khai báo lại trong cùng phạm vi
let y = 10;
let y = 20; // SyntaxError: Identifier 'y' has already been declared

// const: Không thể khai báo lại
const z = 10;
const z = 20; // SyntaxError: Identifier 'z' has already been declared

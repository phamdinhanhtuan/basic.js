// var: Hoisting, nhưng giá trị ban đầu là undefined
console.log(a); // undefined
var a = 5;
console.log(a); // 5

// let: Hoisting, nhưng không thể truy cập trước khi khai báo (Temporal Dead Zone)
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

// var: Có thể gán lại
var a = 10;
a = 20; // Hợp lệ
console.log(a); // 20

// let: Có thể gán lại
let b = 10;
b = 20; // Hợp lệ
console.log(b); // 20

// const: Không thể gán lại (nhưng với object/array, có thể thay đổi thuộc tính/phần tử)
const c = 10;
c = 20; // TypeError: Assignment to constant variable

// Với object, có thể thay đổi thuộc tính
const obj = { name: "Grok" };
obj.name = "xAI"; // Hợp lệ
console.log(obj.name); // xAI

// Nhưng không thể gán lại toàn bộ object
obj = { name: "New" }; // TypeError: Assignment to constant variable

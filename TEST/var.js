// var: Phạm vi toàn cục (global) hoặc phạm vi hàm (function)
function testVar() {
    var x = 1;
    if (true) {
        var x = 2; // Ghi đè biến x ở phạm vi hàm
        console.log(x); // 2
    }
    console.log(x); // 2
}
testVar();

// let: Phạm vi khối (block scope)
function testLet() {
    let y = 1;
    if (true) {
        let y = 2; // Biến y mới, không ảnh hưởng đến y bên ngoài
        console.log(y); // 2
    }
    console.log(y); // 1
}
testLet();

// const: Cũng có phạm vi khối (block scope)
function testConst() {
    const z = 1;
    if (true) {
        const z = 2; // Biến z mới, không ảnh hưởng đến z bên ngoài
        console.log(z); // 2
    }
    console.log(z); // 1
}
testConst();

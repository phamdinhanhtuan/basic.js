function sayHello(callback) {
  console.log("Xin chào");
  callback();
}

async function fetchData() {
  const data = await fakeRequest();
  console.log(data);
}

// Bài 1: Viết callback in "Hoàn thành!" sau khi gọi sayHello.
// Bài 2: Tạo hàm async giả lập fetch dữ liệu (dùng setTimeout).

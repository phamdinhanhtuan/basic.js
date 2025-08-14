// Shopping List App sử dụng LocalStorage

// Lấy danh sách từ LocalStorage hoặc khởi tạo mảng rỗng
function getShoppingList() {
  const data = localStorage.getItem('shoppingList');
  return data ? JSON.parse(data) : [];
}

// Lưu danh sách vào LocalStorage
function saveShoppingList(list) {
  localStorage.setItem('shoppingList', JSON.stringify(list));
}

// Thêm mặt hàng mới
function addItem(name) {
  const list = getShoppingList();
  const newItem = {
    id: Date.now(),
    name,
    bought: false
  };
  list.push(newItem);
  saveShoppingList(list);
  console.log(`Đã thêm: ${name}`);
}

// Xóa mặt hàng theo id
function removeItem(id) {
  let list = getShoppingList();
  const lengthBefore = list.length;
  list = list.filter(item => item.id !== id);
  saveShoppingList(list);
  if (list.length < lengthBefore) {
    console.log(`Đã xóa mặt hàng có id: ${id}`);
  } else {
    console.log(`Không tìm thấy mặt hàng có id: ${id}`);
  }
}

// Đánh dấu đã mua
function toggleBought(id) {
  const list = getShoppingList();
  const item = list.find(item => item.id === id);
  if (item) {
    item.bought = !item.bought;
    saveShoppingList(list);
    console.log(`Đã ${item.bought ? 'đánh dấu đã mua' : 'bỏ đánh dấu'}: ${item.name}`);
  } else {
    console.log(`Không tìm thấy mặt hàng có id: ${id}`);
  }
}

// Hiển thị danh sách
function showList() {
  const list = getShoppingList();
  if (list.length === 0) {
    console.log('Danh sách mua sắm trống.');
    return;
  }
  list.forEach(item => {
    console.log(
      `ID: ${item.id} | ${item.name} | ${item.bought ? 'Đã mua' : 'Chưa mua'}`
    );
  });
}

// Ví dụ sử dụng:
// addItem('Sữa');
// addItem('Bánh mì');
// showList();
// toggleBought(123456789); // Thay id bằng id thực tế
// removeItem(123456789);   // Thay id bằng id thực tế
// showList();

<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quản lý sản phẩm (Console)</title>
  </head>
  <body>
    <h1>Xem kết quả trong Console</h1>
    <p>Mở Developer Tools (F12) và chọn tab Console để xem kết quả</p>

    <script>
      // 1. Tạo mảng products chứa các object sản phẩm (có name, price, quantity)
      let products = [
        { name: "LapTop", price: "1000", quantity: "5" },
        { name: "Điện thoại", price: "500", quantity: "10" },
        { name: "Tai nghe", price: "50", quantity: "20" },
      ];

      // 2. Hiển thị tất cả sản phẩm
      function displayProducts() {
        console.log("----- DANH SÁCH SẢN PHẨM -----");
        products.forEach((product, index) => {
          console.log(
            `${index + 1}. Tên: ${product.name} - Giá: ${parseInt(
              product.price
            ).toLocaleString()} VND - Số lượng: ${product.quantity}`
          );
        });
        console.log("-----------------------------");
      }
      // 3. Thêm sản phẩm mới

      function addProduct(name, price, quantity) {
        const newProduct = { name, price, quantity };
        products.push(newProduct);
        console.log(`Đã thêm sản phẩm "${name}" vào danh sách.`);
      }

      // 4. Tìm sản phẩm theo tên
      function findProductByName(name) {
        return products.find((product) =>
          product.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      // 5. Tính tổng giá trị tất cả sản phẩm
      function calculateTotalValue() {
        return products.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);
      }

      // Gọi hàm hiển thị khi trang được tải
      displayProducts();
    </script>
  </body>
</html>

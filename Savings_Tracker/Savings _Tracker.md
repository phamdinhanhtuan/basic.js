# 💰 Savings Tracker - Ứng dụng theo dõi tiết kiệm

Ứng dụng web đơn giản để theo dõi và quản lý tiết kiệm cá nhân với giao diện đẹp và dễ sử dụng.

## ✨ Tính năng chính

### 📊 Thống kê tổng quan
- **Tổng tiết kiệm**: Hiển thị tổng số tiền đã tiết kiệm
- **Mục tiêu tiết kiệm**: Đặt và theo dõi mục tiêu tiết kiệm
- **Số tiền còn lại**: Tính toán số tiền cần tiết kiệm thêm
- **Thanh tiến độ**: Hiển thị trực quan tiến độ đạt mục tiêu

### 💾 Quản lý dữ liệu
- **Thêm khoản tiết kiệm**: Ghi lại số tiền, ngày và ghi chú
- **Lịch sử tiết kiệm**: Xem tất cả các khoản tiết kiệm theo thời gian
- **Xóa khoản tiết kiệm**: Xóa các khoản tiết kiệm không cần thiết
- **Lưu trữ local**: Dữ liệu được lưu trong localStorage của trình duyệt

### 🎯 Thiết lập mục tiêu
- Đặt mục tiêu tiết kiệm tổng thể
- Theo dõi tiến độ đạt mục tiêu
- Thay đổi màu sắc thanh tiến độ theo mức độ hoàn thành

### 📱 Giao diện thân thiện
- Thiết kế responsive, hoạt động tốt trên mọi thiết bị
- Giao diện hiện đại với gradient và animation
- Thông báo toast khi thực hiện các hành động
- Định dạng tiền tệ Việt Nam (VND)

## 🚀 Cách sử dụng

### 1. Thêm khoản tiết kiệm
1. Nhập số tiền vào ô "Số tiền"
2. Chọn ngày tiết kiệm (mặc định là hôm nay)
3. Thêm ghi chú tùy chọn
4. Nhấn "Thêm khoản tiết kiệm"

### 2. Đặt mục tiêu tiết kiệm
1. Nhấn nút "Đặt mục tiêu"
2. Nhập số tiền mục tiêu
3. Nhấn OK để lưu

### 3. Xem thống kê
- Tổng tiết kiệm hiển thị ở thẻ đầu tiên
- Mục tiêu hiển thị ở thẻ thứ hai
- Số tiền còn lại hiển thị ở thẻ thứ ba
- Tiến độ hiển thị ở thẻ cuối với thanh progress

### 4. Quản lý lịch sử
- Xem tất cả khoản tiết kiệm theo thứ tự thời gian
- Xóa khoản tiết kiệm bằng nút 🗑️
- Mỗi khoản hiển thị ngày, số tiền và ghi chú

## ⌨️ Phím tắt

- **Ctrl/Cmd + Enter**: Thêm khoản tiết kiệm (khi đang ở trong form)
- **Ctrl/Cmd + T**: Mở dialog đặt mục tiêu

## 💾 Lưu trữ dữ liệu

Ứng dụng sử dụng localStorage để lưu trữ:
- Danh sách các khoản tiết kiệm
- Mục tiêu tiết kiệm
- Dữ liệu được tự động lưu khi có thay đổi

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling với Flexbox, Grid, và animations
- **JavaScript ES6+**: Logic ứng dụng với classes và modules
- **LocalStorage API**: Lưu trữ dữ liệu local
- **Intl API**: Định dạng tiền tệ và ngày tháng

## 📁 Cấu trúc file

```
savings-tracker/
├── savings-tracker.html    # Giao diện chính
├── savings-tracker.js      # Logic ứng dụng
└── README-savings-tracker.md  # Tài liệu này
```

## 🎨 Tính năng giao diện

### Responsive Design
- Tự động điều chỉnh layout trên mobile
- Grid system linh hoạt
- Typography responsive

### Visual Feedback
- Hover effects trên buttons
- Progress bar với màu sắc động
- Toast notifications
- Smooth transitions

### Color Scheme
- Primary: Blue gradient (#4facfe → #00f2fe)
- Secondary: Purple gradient (#667eea → #764ba2)
- Success: Green (#28a745)
- Warning: Orange (#ffc107)
- Danger: Red (#dc3545)

## 🔧 Tùy chỉnh

### Thay đổi đơn vị tiền tệ
Trong file `savings-tracker.js`, tìm hàm `formatCurrency()` và thay đổi:
```javascript
return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',  // Thay đổi thành USD, EUR, etc.
    minimumFractionDigits: 0
}).format(amount);
```

### Thay đổi màu sắc
Chỉnh sửa CSS variables trong file HTML hoặc thay đổi trực tiếp các giá trị màu.

## 🚀 Chạy ứng dụng

1. Mở file `savings-tracker.html` trong trình duyệt web
2. Hoặc sử dụng local server:
   ```bash
   # Với Python
   python -m http.server 8000
   
   # Với Node.js
   npx serve .
   ```

## 📝 Ghi chú

- Dữ liệu được lưu trong trình duyệt, không gửi lên server
- Ứng dụng hoạt động offline
- Tương thích với tất cả trình duyệt hiện đại
- Không cần cài đặt thêm dependencies

## 🤝 Đóng góp

Nếu bạn muốn cải thiện ứng dụng, hãy:
1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa.

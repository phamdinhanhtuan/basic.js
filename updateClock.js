function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  // Xóa màn hình console (hoạt động trên một số terminal)
  console.clear();
  
  console.log('╔══════════════════════════════════════╗');
  console.log('║           ĐỒNG HỒ SỐ                ║');
  console.log('╠══════════════════════════════════════╣');
  console.log(`║            ${hours}:${minutes}:${seconds}              ║`);
  console.log('╚══════════════════════════════════════╝');
  
  // Hiển thị thông tin ngày tháng
  const date = now.toLocaleDateString('vi-VN');
  console.log(`\nNgày: ${date}`);
  
  // Hiển thị thời gian theo định dạng 12h
  const hours12 = now.getHours() % 12 || 12;
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  console.log(`Thời gian (12h): ${hours12}:${minutes}:${seconds} ${ampm}`);
}

// Cập nhật đồng hồ mỗi giây
setInterval(updateClock, 1000);

// Hiển thị đồng hồ ngay lập tức
updateClock();

console.log('\nNhấn Ctrl+C để thoát...');

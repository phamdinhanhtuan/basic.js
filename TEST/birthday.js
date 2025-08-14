<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Đồng hồ đếm ngược sinh nhật</title>
    <style>function getNextBirthday(birthdayStr) {
  const today = new Date();
  const [year, month, day] = birthdayStr.split('-').map(Number);
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);

  // Nếu sinh nhật năm nay đã qua, lấy năm sau
  if (
    nextBirthday < today ||
    (nextBirthday.getDate() === today.getDate() &&
      nextBirthday.getMonth() === today.getMonth())
  ) {
    nextBirthday = new Date(today.getFullYear() + 1, month - 1, day);
  }
  return nextBirthday;
}

function updateCountdown() {
  const birthday = localStorage.getItem('birthday');
  if (!birthday) return;

  const now = new Date();
  const nextBirthday = getNextBirthday(birthday);

  const diff = nextBirthday - now;
  if (diff <= 0) {
    document.getElementById('result').textContent = 'Chúc mừng sinh nhật!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('result').textContent =
    `Còn ${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây đến sinh nhật tiếp theo của bạn!`;
}

document.getElementById('birthdayForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const birthday = document.getElementById('birthdayInput').value;
  if (!birthday) {
    document.getElementById('result').textContent = 'Vui lòng nhập ngày sinh nhật!';
    return;
  }
  localStorage.setItem('birthday', birthday);
  document.getElementById('birthdayForm').style.display = 'none';
  document.getElementById('changeBtn').style.display = 'inline-block';
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

document.getElementById('changeBtn').addEventListener('click', function () {
  localStorage.removeItem('birthday');
  document.getElementById('birthdayForm').style.display = 'block';
  document.getElementById('result').textContent = '';
  document.getElementById('changeBtn').style.display = 'none';
});

// Khi tải trang, nếu đã lưu ngày sinh thì tự động hiển thị countdown
window.onload = function () {
  const birthday = localStorage.getItem('birthday');
  if (birthday) {
    document.getElementById('birthdayForm').style.display = 'none';
    document.getElementById('changeBtn').style.display = 'inline-block';
    updateCountdown();
    setInterval(updateCountdown, 1000);
  } else {
    document.getElementById('birthdayForm').style.display = 'block';
    document.getElementById('changeBtn').style.display = 'none';
  }
};
      body {
        font-family: Arial;
        max-width: 500px;
        margin: 40px auto;
      }
      #result {
        margin-top: 20px;
        font-size: 20px;
        color: #2d6a4f;
      }
      #changeBtn {
        margin-top: 20px;
        display: none;
      }
    </style>
  </head>
  <body>
    <h2>Đồng hồ đếm ngược sinh nhật</h2>
    <form id="birthdayForm">
      <label>Nhập ngày sinh nhật của bạn:</label>
      <input type="date" id="birthdayInput" required />
      <button type="submit">Bắt đầu đếm ngược</button>
    </form>
    <div id="result"></div>
    <button id="changeBtn">Đổi ngày sinh nhật</button>
    <script src="birthday.js"></script>
  </body>
</html>

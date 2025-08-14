function getRandomColor() {
  // Tạo mã màu hex ngẫu nhiên
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const btn = document.getElementById('changeColorBtn');
const colorCode = document.getElementById('colorCode');

btn.addEventListener('click', function() {
  const randomColor = getRandomColor();
  document.body.style.backgroundColor = randomColor;
  colorCode.textContent = randomColor;
});

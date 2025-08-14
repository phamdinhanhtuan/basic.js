const ACCESS_KEY = 'YOUR_ACCESS_KEY'; // <-- Thay bằng Access Key của bạn

const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const resultDiv = document.getElementById('result');
const msgDiv = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = queryInput.value.trim();
  if (!query) return;
  resultDiv.innerHTML = '';
  msgDiv.textContent = 'Đang tìm kiếm...';

  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&client_id=${ACCESS_KEY}`);
    if (!res.ok) throw new Error('Lỗi khi gọi API');
    const data = await res.json();
    if (data.results.length === 0) {
      msgDiv.textContent = 'Không tìm thấy ảnh nào.';
      return;
    }
    msgDiv.textContent = '';
    resultDiv.innerHTML = data.results.map(photo => `
      <a href="${photo.links.html}" target="_blank" title="Xem trên Unsplash">
        <img src="${photo.urls.small}" alt="${photo.alt_description || 'Unsplash Photo'}">
      </a>
    `).join('');
  } catch (err) {
    msgDiv.textContent = 'Có lỗi xảy ra. Vui lòng thử lại.';
  }
});

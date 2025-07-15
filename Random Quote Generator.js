const quotes = [
  "Học, học nữa, học mãi. – V.I. Lenin",
  "Thành công là một hành trình, không phải là đích đến.",
  "Không có thang máy nào dẫn đến thành công, bạn phải đi cầu thang bộ.",
  "Cuộc sống là 10% những gì xảy ra với bạn và 90% cách bạn phản ứng với nó.",
  "Chỉ cần không dừng lại, bạn sẽ tiến lên.",
  "Người lạc quan nhìn thấy cơ hội trong mọi khó khăn.",
  "Đừng sợ thất bại, hãy sợ không thử.",
  "Kiên trì là mẹ của thành công.",
  "Hãy là chính mình, mọi người khác đã có người đóng vai rồi. – Oscar Wilde"
];

function getRandomQuote() {
  const idx = Math.floor(Math.random() * quotes.length);
  return quotes[idx];
}

function showQuote() {
  document.getElementById('quote').textContent = getRandomQuote();
}

document.getElementById('new-quote').addEventListener('click', showQuote);

// Hiển thị câu đầu tiên khi tải trang
showQuote();

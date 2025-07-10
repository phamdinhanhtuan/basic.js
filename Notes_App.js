// Khởi tạo mảng notes từ LocalStorage hoặc rỗng nếu chưa có
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Hàm hiển thị danh sách ghi chú
function renderNotes() {
  const notesDiv = document.getElementById('notes');
  notesDiv.innerHTML = '';
  notes.forEach((note, idx) => {
    notesDiv.innerHTML += `
      <div class="note">
        <span id="note-text-${idx}">${note}</span>
        <div class="actions">
          <button onclick="editNote(${idx})">Sửa</button>
          <button onclick="deleteNote(${idx})">Xóa</button>
        </div>
      </div>
    `;
  });
}

// Hàm thêm ghi chú mới
function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (text) {
    notes.push(text);
    localStorage.setItem('notes', JSON.stringify(notes));
    input.value = '';
    renderNotes();
  }
}

// Hàm xóa ghi chú
function deleteNote(idx) {
  notes.splice(idx, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

// Hàm sửa ghi chú
function editNote(idx) {
  const newText = prompt('Sửa ghi chú:', notes[idx]);
  if (newText !== null && newText.trim() !== '') {
    notes[idx] = newText.trim();
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  }
}

// Hiển thị ghi chú khi tải trang
renderNotes();

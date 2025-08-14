// BƯỚC 1: Tạo mảng để lưu trữ danh sách công việc
let todos = [];

// BƯỚC 2: Lấy các elements cần thiết
const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

// BƯỚC 3: Thêm event listeners
addButton.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

// BƯỚC 4: Hàm thêm công việc mới
function addTodo() {
  // Lấy giá trị người dùng nhập và xóa khoảng trắng thừa
  const text = todoInput.value.trim();

  // Kiểm tra nếu có nội dung (không rỗng)
  if (text) {
    // Tạo object công việc mới với 3 thuộc tính:
    const newTodo = {
      id: Date.now(), // id duy nhất dựa trên thời gian
      text: text, // nội dung công việc
      completed: false, // trạng thái hoàn thành (mặc định là false)
    };

    // Thêm công việc mới vào cuối mảng todos
    todos.push(newTodo);

    // Xóa nội dung trong input để người dùng nhập công việc mới
    todoInput.value = "";

    // Gọi hàm hiển thị để cập nhật giao diện
    displayTodos();
  }
}

// BƯỚC 5: Hàm hiển thị danh sách công việc
function displayTodos() {
  // Xóa nội dung cũ của ul
  todoList.innerHTML = "";

  // Duyệt qua từng công việc trong mảng todos
  todos.forEach(function (todo) {
    // Tạo element li mới
    const li = document.createElement("li");

    // Thêm class để styling
    li.className = "todo-item";

    // Tạo nội dung HTML cho mỗi công việc
    li.innerHTML = `
            <span class="${todo.completed ? "completed" : ""}">${
      todo.text
    }</span>
            <div>
                <button onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? "Hoàn tác" : "Hoàn thành"}
                </button>
                <button onclick="deleteTodo(${todo.id})">Xóa</button>
            </div>
        `;

    // Thêm li vào ul
    todoList.appendChild(li);
  });
}

// BƯỚC 6: Hàm xóa công việc
function deleteTodo(id) {
  // Lọc ra các công việc không có id cần xóa
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  // Hiển thị lại danh sách sau khi xóa
  displayTodos();
}

// BƯỚC 7: Hàm đánh dấu hoàn thành/chưa hoàn thành
function toggleTodo(id) {
  // Duyệt qua mảng todos và thay đổi trạng thái completed
  todos = todos.map(function (todo) {
    // Nếu là công việc cần thay đổi
    if (todo.id === id) {
      // Tạo bản sao mới với trạng thái đã đảo ngược
      return {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed,
      };
    }
    // Nếu không phải công việc cần thay đổi, giữ nguyên
    return todo;
  });

  // Hiển thị lại danh sách sau khi thay đổi
  displayTodos();
}

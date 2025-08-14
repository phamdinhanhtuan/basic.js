<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List Đơn Giản</title>
    <style>
        /* CSS đơn giản để làm đẹp giao diện */
        .completed {
            text-decoration: line-through;
            color: gray;
        }
        .todo-item {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>Todo List</h1>
    
    <!-- Phần nhập công việc mới -->
    <input type="text" id="todoInput" placeholder="Nhập công việc mới">
    <button onclick="addTodo()">Thêm</button>
    
    <!-- Phần hiển thị danh sách công việc -->
    <ul id="todoList"></ul>

    <script>
        // BƯỚC 1: Tạo mảng để lưu trữ danh sách công việc
        // Mảng này sẽ chứa tất cả công việc
        let todos = [];

        // BƯỚC 2: Hàm thêm công việc mới
        function addTodo() {
            // Lấy element input theo id
            let input = document.getElementById('todoInput');
            
            // Lấy giá trị người dùng nhập và xóa khoảng trắng thừa
            let text = input.value.trim();
            
            // Kiểm tra nếu có nội dung (không rỗng)
            if (text) {
                // Tạo object công việc mới với 3 thuộc tính:
                let newTodo = {
                    id: Date.now(),     // id duy nhất dựa trên thời gian
                    text: text,         // nội dung công việc
                    completed: false    // trạng thái hoàn thành (mặc định là false)
                };
                
                // Thêm công việc mới vào cuối mảng todos
                todos.push(newTodo);
                
                // Xóa nội dung trong input để người dùng nhập công việc mới
                input.value = '';
                
                // Gọi hàm hiển thị để cập nhật giao diện
                displayTodos();
            }
        }

        // BƯỚC 3: Hàm hiển thị danh sách công việc
        function displayTodos() {
            // Lấy element ul theo id
            let todoList = document.getElementById('todoList');
            
            // Xóa nội dung cũ của ul
            todoList.innerHTML = '';
            
            // Duyệt qua từng công việc trong mảng todos
            todos.forEach(function(todo) {
                // Tạo element li mới
                let li = document.createElement('li');
                
                // Thêm class để styling
                li.className = 'todo-item';
                
                // Tạo nội dung HTML cho mỗi công việc
                li.innerHTML = `
                    <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                    <button onclick="toggleTodo(${todo.id})">
                        ${todo.completed ? 'Hoàn tác' : 'Hoàn thành'}
                    </button>
                    <button onclick="deleteTodo(${todo.id})">Xóa</button>
                `;
                
                // Thêm li vào ul
                todoList.appendChild(li);
            });
        }

        // BƯỚC 4: Hàm xóa công việc
        function deleteTodo(id) {
            // Lọc ra các công việc không có id cần xóa
            todos = todos.filter(function(todo) {
                return todo.id !== id;
            });
            
            // Hiển thị lại danh sách sau khi xóa
            displayTodos();
        }

        // BƯỚC 5: Hàm đánh dấu hoàn thành/chưa hoàn thành
        function toggleTodo(id) {
            // Duyệt qua mảng todos và thay đổi trạng thái completed
            todos = todos.map(function(todo) {
                // Nếu là công việc cần thay đổi
                if (todo.id === id) {
                    // Tạo bản sao mới với trạng thái đã đảo ngược
                    return {
                        id: todo.id,
                        text: todo.text,
                        completed: !todo.completed
                    };
                }
                // Nếu không phải công việc cần thay đổi, giữ nguyên
                return todo;
            });
            
            // Hiển thị lại danh sách sau khi thay đổi
            displayTodos();
        }
    </script>
</body>
</html>

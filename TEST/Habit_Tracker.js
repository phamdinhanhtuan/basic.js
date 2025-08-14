// Habit Tracker Application
class HabitTrackerApp {
    constructor() {
        this.habits = [];
        this.nextId = 1;
        this.currentDate = new Date();
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
        this.updateStats();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('addForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addHabit();
        });
    }

    addHabit() {
        const title = document.getElementById('title').value.trim();
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value.trim();
        const targetTime = parseInt(document.getElementById('targetTime').value) || 0;
        const frequency = document.getElementById('frequency').value;

        if (!title || !category) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        const habit = {
            id: this.nextId++,
            title: title,
            category: category,
            description: description,
            targetTime: targetTime,
            frequency: frequency,
            createdAt: new Date().toISOString(),
            completedDates: [],
            currentStreak: 0,
            longestStreak: 0,
            lastCompletedDate: null
        };

        this.habits.push(habit);
        this.saveToStorage();
        this.render();
        this.updateStats();
        this.resetForm();

        this.showNotification('✅ Đã thêm thói quen mới: ' + title);
    }

    resetForm() {
        document.getElementById('addForm').reset();
        document.getElementById('frequency').value = 'daily';
    }

    toggleHabitCompletion(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        const today = this.getDateString(new Date());
        const isCompletedToday = habit.completedDates.includes(today);

        if (isCompletedToday) {
            // Bỏ hoàn thành hôm nay
            habit.completedDates = habit.completedDates.filter(date => date !== today);
            this.showNotification('🔄 Đã bỏ hoàn thành: ' + habit.title);
        } else {
            // Hoàn thành hôm nay
            habit.completedDates.push(today);
            habit.lastCompletedDate = today;
            this.showNotification('🎉 Chúc mừng! Đã hoàn thành: ' + habit.title);
        }

        // Cập nhật streak
        this.updateStreak(habit);
        
        this.saveToStorage();
        this.render();
        this.updateStats();
    }

    updateStreak(habit) {
        const sortedDates = habit.completedDates.sort();
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        // Tính streak hiện tại
        const today = new Date();
        for (let i = 0; i < 365; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateString = this.getDateString(checkDate);
            
            if (habit.completedDates.includes(dateString)) {
                currentStreak++;
            } else {
                break;
            }
        }

        // Tính streak dài nhất
        for (let i = 0; i < sortedDates.length; i++) {
            if (i === 0) {
                tempStreak = 1;
            } else {
                const prevDate = new Date(sortedDates[i - 1]);
                const currDate = new Date(sortedDates[i]);
                const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    tempStreak++;
                } else {
                    longestStreak = Math.max(longestStreak, tempStreak);
                    tempStreak = 1;
                }
            }
        }
        longestStreak = Math.max(longestStreak, tempStreak);

        habit.currentStreak = currentStreak;
        habit.longestStreak = Math.max(habit.longestStreak, longestStreak);
    }

    deleteHabit(id) {
        if (confirm('Bạn có chắc chắn muốn xóa thói quen này?')) {
            const habit = this.habits.find(h => h.id === id);
            this.habits = this.habits.filter(h => h.id !== id);
            this.saveToStorage();
            this.render();
            this.updateStats();
            this.showNotification('🗑️ Đã xóa: ' + habit.title);
        }
    }

    editHabit(id) {
        const habit = this.habits.find(h => h.id === id);
        if (habit) {
            // Điền form với dữ liệu hiện tại
            document.getElementById('title').value = habit.title;
            document.getElementById('category').value = habit.category;
            document.getElementById('description').value = habit.description;
            document.getElementById('targetTime').value = habit.targetTime;
            document.getElementById('frequency').value = habit.frequency;

            // Xóa habit cũ
            this.habits = this.habits.filter(h => h.id !== id);
            this.saveToStorage();
            this.render();
            this.updateStats();

            // Scroll to form
            document.querySelector('.add-section').scrollIntoView({ behavior: 'smooth' });
            this.showNotification('✏️ Đã tải dữ liệu để chỉnh sửa. Hãy cập nhật và nhấn "Thêm thói quen"');
        }
    }

    render() {
        const container = document.getElementById('habitsList');

        if (this.habits.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>🎯 Chưa có thói quen nào</h3>
                    <p>Hãy thêm những thói quen bạn muốn xây dựng mỗi ngày!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="habits-grid">
                ${this.habits.map(habit => this.renderHabit(habit)).join('')}
            </div>
        `;
    }

    renderHabit(habit) {
        const categoryLabels = {
            'suc-khoe': '💪 Sức khỏe',
            'hoc-tap': '📚 Học tập',
            'the-thao': '⚽ Thể thao',
            'am-nhac': '🎵 Âm nhạc',
            'doc-sach': '📖 Đọc sách',
            'thiền': '🧘 Thiền',
            'nau-an': '👨‍🍳 Nấu ăn',
            'khac': '✨ Khác'
        };

        const today = this.getDateString(new Date());
        const isCompletedToday = habit.completedDates.includes(today);
        const createdDate = new Date(habit.createdAt).toLocaleDateString('vi-VN');

        // Tạo calendar cho 7 ngày gần nhất
        const calendarDays = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = this.getDateString(date);
            const isCompleted = habit.completedDates.includes(dateString);
            const isToday = dateString === today;
            
            calendarDays.push({
                date: dateString,
                day: date.getDate(),
                completed: isCompleted,
                today: isToday
            });
        }

        return `
            <div class="habit-card ${isCompletedToday ? 'completed' : ''}">
                <div class="habit-header">
                    <div class="habit-title">${habit.title}</div>
                    <div class="habit-category">${categoryLabels[habit.category]}</div>
                </div>
                
                ${habit.description ? `<div class="habit-description">${habit.description}</div>` : ''}
                
                <div class="streak-info">
                    <div class="streak-count">🔥 ${habit.currentStreak} ngày liên tiếp</div>
                    <small>Chuỗi dài nhất: ${habit.longestStreak} ngày</small>
                </div>
                
                <div class="calendar-grid">
                    ${calendarDays.map(day => `
                        <div class="calendar-day ${day.completed ? 'completed' : ''} ${day.today ? 'today' : ''}" 
                             title="${day.date}">
                            ${day.day}
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-bottom: 15px; font-size: 0.9rem; color: #666;">
                    📅 Tạo ngày: ${createdDate}
                    ${habit.targetTime > 0 ? ` | ⏱️ Mục tiêu: ${habit.targetTime} phút` : ''}
                </div>
                
                <div class="habit-actions">
                    <button class="btn ${isCompletedToday ? 'btn-secondary' : 'btn-success'}" 
                            onclick="app.toggleHabitCompletion(${habit.id})">
                        ${isCompletedToday ? '🔄 Bỏ hoàn thành' : '✅ Hoàn thành hôm nay'}
                    </button>
                    <button class="btn btn-secondary" onclick="app.editHabit(${habit.id})">
                        ✏️ Chỉnh sửa
                    </button>
                    <button class="btn btn-danger" onclick="app.deleteHabit(${habit.id})">
                        🗑️ Xóa
                    </button>
                </div>
            </div>
        `;
    }

    updateStats() {
        const totalHabits = this.habits.length;
        const today = this.getDateString(new Date());
        const completedToday = this.habits.filter(habit => 
            habit.completedDates.includes(today)
        ).length;
        
        const totalStreak = this.habits.reduce((max, habit) => 
            Math.max(max, habit.longestStreak), 0
        );
        
        const completionRate = totalHabits > 0 
            ? Math.round((completedToday / totalHabits) * 100) 
            : 0;

        document.getElementById('totalHabits').textContent = totalHabits;
        document.getElementById('completedToday').textContent = completedToday;
        document.getElementById('totalStreak').textContent = totalStreak;
        document.getElementById('completionRate').textContent = `${completionRate}%`;
    }

    getDateString(date) {
        return date.toISOString().split('T')[0];
    }

    showNotification(message) {
        // Tạo notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Hiển thị notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Ẩn notification sau 3 giây
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    saveToStorage() {
        localStorage.setItem('habitTracker', JSON.stringify({
            habits: this.habits,
            nextId: this.nextId
        }));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('habitTracker');
        if (saved) {
            const data = JSON.parse(saved);
            this.habits = data.habits || [];
            this.nextId = data.nextId || 1;
            
            // Cập nhật streak cho tất cả habits
            this.habits.forEach(habit => this.updateStreak(habit));
        }
    }

    // Thêm dữ liệu mẫu
    addSampleData() {
        const sampleHabits = [
            {
                id: this.nextId++,
                title: 'Uống 8 ly nước',
                category: 'suc-khoe',
                description: 'Uống đủ 8 ly nước mỗi ngày để cơ thể khỏe mạnh',
                targetTime: 0,
                frequency: 'daily',
                createdAt: new Date().toISOString(),
                completedDates: this.generateSampleDates(25),
                currentStreak: 5,
                longestStreak: 15,
                lastCompletedDate: this.getDateString(new Date())
            },
            {
                id: this.nextId++,
                title: 'Tập thể dục 30 phút',
                category: 'the-thao',
                description: 'Chạy bộ hoặc tập yoga để giữ dáng và tăng cường sức khỏe',
                targetTime: 30,
                frequency: 'daily',
                createdAt: new Date().toISOString(),
                completedDates: this.generateSampleDates(18),
                currentStreak: 3,
                longestStreak: 12,
                lastCompletedDate: this.getDateString(new Date())
            },
            {
                id: this.nextId++,
                title: 'Đọc sách 20 phút',
                category: 'doc-sach',
                description: 'Đọc sách để mở rộng kiến thức và thư giãn',
                targetTime: 20,
                frequency: 'daily',
                createdAt: new Date().toISOString(),
                completedDates: this.generateSampleDates(30),
                currentStreak: 8,
                longestStreak: 25,
                lastCompletedDate: this.getDateString(new Date())
            },
            {
                id: this.nextId++,
                title: 'Thiền 10 phút',
                category: 'thiền',
                description: 'Thiền để giảm stress và tăng cường sự tập trung',
                targetTime: 10,
                frequency: 'daily',
                createdAt: new Date().toISOString(),
                completedDates: this.generateSampleDates(12),
                currentStreak: 2,
                longestStreak: 8,
                lastCompletedDate: this.getDateString(new Date())
            },
            {
                id: this.nextId++,
                title: 'Học tiếng Anh',
                category: 'hoc-tap',
                description: 'Học từ vựng và ngữ pháp tiếng Anh mỗi ngày',
                targetTime: 15,
                frequency: 'daily',
                createdAt: new Date().toISOString(),
                completedDates: this.generateSampleDates(22),
                currentStreak: 6,
                longestStreak: 18,
                lastCompletedDate: this.getDateString(new Date())
            }
        ];

        this.habits = [...this.habits, ...sampleHabits];
        this.saveToStorage();
        this.render();
        this.updateStats();
        this.showNotification('📝 Đã thêm dữ liệu mẫu vào Habit Tracker!');
    }

    generateSampleDates(count) {
        const dates = [];
        const today = new Date();
        
        for (let i = 0; i < count; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - Math.floor(Math.random() * 30));
            dates.push(this.getDateString(date));
        }
        
        return dates;
    }

    // Xóa tất cả dữ liệu
    clearAllData() {
        if (confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác!')) {
            this.habits = [];
            this.nextId = 1;
            this.saveToStorage();
            this.render();
            this.updateStats();
            this.showNotification('🗑️ Đã xóa tất cả dữ liệu!');
        }
    }

    // Xuất dữ liệu
    exportData() {
        const data = {
            habits: this.habits,
            exportDate: new Date().toISOString(),
            totalHabits: this.habits.length,
            totalCompletedToday: this.habits.filter(habit => 
                habit.completedDates.includes(this.getDateString(new Date()))
            ).length
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `habit-tracker-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('📤 Đã xuất dữ liệu thành công!');
    }

    // Nhập dữ liệu
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (data.habits && Array.isArray(data.habits)) {
                            this.habits = data.habits;
                            this.nextId = Math.max(...this.habits.map(habit => habit.id), 0) + 1;
                            
                            // Cập nhật streak cho tất cả habits
                            this.habits.forEach(habit => this.updateStreak(habit));
                            
                            this.saveToStorage();
                            this.render();
                            this.updateStats();
                            this.showNotification('📥 Đã nhập dữ liệu thành công!');
                        } else {
                            alert('File không đúng định dạng!');
                        }
                    } catch (error) {
                        alert('Lỗi khi đọc file: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
}

// Khởi tạo ứng dụng
const app = new HabitTrackerApp();

// Thêm các chức năng tiện ích vào window object
window.addSampleData = () => app.addSampleData();
window.clearAllData = () => app.clearAllData();
window.exportData = () => app.exportData();
window.importData = () => app.importData();

// Thêm menu tiện ích vào console
console.log(`
🎯 HABIT TRACKER - CÁC LỆNH TIỆN ÍCH:
• addSampleData() - Thêm dữ liệu mẫu
• clearAllData() - Xóa tất cả dữ liệu
• exportData() - Xuất dữ liệu
• importData() - Nhập dữ liệu
• app - Truy cập đối tượng ứng dụng
`);

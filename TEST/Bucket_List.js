// Bucket List Application
class BucketListApp {
    constructor() {
        this.items = [];
        this.currentFilter = 'all';
        this.nextId = 1;
        
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
            this.addItem();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
    }

    addItem() {
        const title = document.getElementById('title').value.trim();
        const category = document.getElementById('category').value;
        const priority = document.getElementById('priority').value;
        const targetDate = document.getElementById('targetDate').value;
        const description = document.getElementById('description').value.trim();

        if (!title || !category) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        const item = {
            id: this.nextId++,
            title: title,
            category: category,
            priority: priority,
            targetDate: targetDate,
            description: description,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.items.push(item);
        this.saveToStorage();
        this.render();
        this.updateStats();
        this.resetForm();

        // Hiển thị thông báo thành công
        this.showNotification('✅ Đã thêm mục tiêu mới vào Bucket List!');
    }

    resetForm() {
        document.getElementById('addForm').reset();
        document.getElementById('priority').value = 'medium';
    }

    toggleComplete(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.completed = !item.completed;
            item.completedAt = item.completed ? new Date().toISOString() : null;
            this.saveToStorage();
            this.render();
            this.updateStats();

            const message = item.completed 
                ? `🎉 Chúc mừng! Bạn đã hoàn thành: ${item.title}`
                : `🔄 Đã đánh dấu chưa hoàn thành: ${item.title}`;
            this.showNotification(message);
        }
    }

    deleteItem(id) {
        if (confirm('Bạn có chắc chắn muốn xóa mục tiêu này?')) {
            const item = this.items.find(item => item.id === id);
            this.items = this.items.filter(item => item.id !== id);
            this.saveToStorage();
            this.render();
            this.updateStats();
            this.showNotification(`🗑️ Đã xóa: ${item.title}`);
        }
    }

    editItem(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            // Điền form với dữ liệu hiện tại
            document.getElementById('title').value = item.title;
            document.getElementById('category').value = item.category;
            document.getElementById('priority').value = item.priority;
            document.getElementById('targetDate').value = item.targetDate;
            document.getElementById('description').value = item.description;

            // Xóa item cũ
            this.items = this.items.filter(item => item.id !== id);
            this.saveToStorage();
            this.render();
            this.updateStats();

            // Scroll to form
            document.querySelector('.add-section').scrollIntoView({ behavior: 'smooth' });
            this.showNotification('✏️ Đã tải dữ liệu để chỉnh sửa. Hãy cập nhật và nhấn "Thêm vào Bucket List"');
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }

    getFilteredItems() {
        let filtered = this.items;

        if (this.currentFilter === 'completed') {
            filtered = this.items.filter(item => item.completed);
        } else if (this.currentFilter === 'pending') {
            filtered = this.items.filter(item => !item.completed);
        } else if (this.currentFilter !== 'all') {
            filtered = this.items.filter(item => item.category === this.currentFilter);
        }

        // Sắp xếp: chưa hoàn thành trước, sau đó theo ngày tạo
        return filtered.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }

    render() {
        const container = document.getElementById('bucketList');
        const filteredItems = this.getFilteredItems();

        if (filteredItems.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>🎯 ${this.currentFilter === 'all' ? 'Chưa có mục tiêu nào' : 'Không có kết quả'}</h3>
                    <p>${this.currentFilter === 'all' ? 'Hãy thêm những việc bạn muốn làm trong đời vào Bucket List!' : 'Không có mục tiêu nào phù hợp với bộ lọc hiện tại.'}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredItems.map(item => this.renderItem(item)).join('');
    }

    renderItem(item) {
        const categoryLabels = {
            'du-lich': '🌍 Du lịch',
            'hoc-tap': '📚 Học tập',
            'the-thao': '⚽ Thể thao',
            'am-nhac': '🎵 Âm nhạc',
            'nau-an': '👨‍🍳 Nấu ăn',
            'cong-nghe': '💻 Công nghệ',
            'suc-khoe': '💪 Sức khỏe',
            'giai-tri': '🎬 Giải trí',
            'khac': '✨ Khác'
        };

        const priorityLabels = {
            'high': 'Cao',
            'medium': 'Trung bình',
            'low': 'Thấp'
        };

        const priorityColors = {
            'high': 'priority-high',
            'medium': 'priority-medium',
            'low': 'priority-low'
        };

        const createdDate = new Date(item.createdAt).toLocaleDateString('vi-VN');
        const completedDate = item.completedAt ? new Date(item.completedAt).toLocaleDateString('vi-VN') : '';
        const targetDate = item.targetDate ? new Date(item.targetDate).toLocaleDateString('vi-VN') : '';

        return `
            <div class="bucket-item ${item.completed ? 'completed' : ''} ${priorityColors[item.priority]}">
                <div class="item-header">
                    <div>
                        <div class="item-title">${item.title}</div>
                        <div class="item-category">${categoryLabels[item.category]}</div>
                    </div>
                    <div style="text-align: right;">
                        <small style="color: #666;">${priorityLabels[item.priority]}</small>
                    </div>
                </div>
                
                ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
                
                <div class="item-date">
                    <div>📅 Tạo ngày: ${createdDate}</div>
                    ${targetDate ? `<div>🎯 Mục tiêu: ${targetDate}</div>` : ''}
                    ${item.completed ? `<div>✅ Hoàn thành: ${completedDate}</div>` : ''}
                </div>
                
                <div class="item-actions">
                    <button class="btn ${item.completed ? 'btn-secondary' : 'btn-success'}" 
                            onclick="app.toggleComplete(${item.id})">
                        ${item.completed ? '🔄 Chưa hoàn thành' : '✅ Hoàn thành'}
                    </button>
                    <button class="btn btn-secondary" onclick="app.editItem(${item.id})">
                        ✏️ Chỉnh sửa
                    </button>
                    <button class="btn btn-danger" onclick="app.deleteItem(${item.id})">
                        🗑️ Xóa
                    </button>
                </div>
            </div>
        `;
    }

    updateStats() {
        const total = this.items.length;
        const completed = this.items.filter(item => item.completed).length;
        const pending = total - completed;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('progressPercent').textContent = `${progress}%`;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }

    showNotification(message) {
        // Tạo notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
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
        localStorage.setItem('bucketList', JSON.stringify({
            items: this.items,
            nextId: this.nextId
        }));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('bucketList');
        if (saved) {
            const data = JSON.parse(saved);
            this.items = data.items || [];
            this.nextId = data.nextId || 1;
        }
    }

    // Thêm dữ liệu mẫu
    addSampleData() {
        const sampleItems = [
            {
                id: this.nextId++,
                title: 'Đi du lịch Nhật Bản',
                category: 'du-lich',
                priority: 'high',
                targetDate: '2024-12-31',
                description: 'Khám phá Tokyo, Kyoto và Osaka. Thưởng thức ẩm thực Nhật Bản và ngắm hoa anh đào.',
                completed: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.nextId++,
                title: 'Học chơi guitar',
                category: 'am-nhac',
                priority: 'medium',
                targetDate: '2024-06-30',
                description: 'Học chơi guitar cơ bản và biết đánh ít nhất 10 bài hát.',
                completed: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.nextId++,
                title: 'Chạy marathon 42km',
                category: 'the-thao',
                priority: 'medium',
                targetDate: '2024-10-15',
                description: 'Tham gia và hoàn thành cuộc thi marathon đầu tiên trong đời.',
                completed: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.nextId++,
                title: 'Học lập trình Python',
                category: 'hoc-tap',
                priority: 'high',
                targetDate: '2024-08-31',
                description: 'Thành thạo Python cơ bản và làm được ít nhất 5 dự án nhỏ.',
                completed: true,
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                completedAt: new Date().toISOString()
            },
            {
                id: this.nextId++,
                title: 'Nấu món phở bò',
                category: 'nau-an',
                priority: 'low',
                targetDate: '2024-05-15',
                description: 'Học cách nấu phở bò truyền thống từ bà nội.',
                completed: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            }
        ];

        this.items = [...this.items, ...sampleItems];
        this.saveToStorage();
        this.render();
        this.updateStats();
        this.showNotification('📝 Đã thêm dữ liệu mẫu vào Bucket List!');
    }

    // Xóa tất cả dữ liệu
    clearAllData() {
        if (confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác!')) {
            this.items = [];
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
            items: this.items,
            exportDate: new Date().toISOString(),
            totalItems: this.items.length,
            completedItems: this.items.filter(item => item.completed).length
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bucket-list-${new Date().toISOString().split('T')[0]}.json`;
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
                        if (data.items && Array.isArray(data.items)) {
                            this.items = data.items;
                            this.nextId = Math.max(...this.items.map(item => item.id), 0) + 1;
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
const app = new BucketListApp();

// Thêm các chức năng tiện ích vào window object
window.addSampleData = () => app.addSampleData();
window.clearAllData = () => app.clearAllData();
window.exportData = () => app.exportData();
window.importData = () => app.importData();

// Thêm menu tiện ích vào console
console.log(`
🌟 BUCKET LIST - CÁC LỆNH TIỆN ÍCH:
• addSampleData() - Thêm dữ liệu mẫu
• clearAllData() - Xóa tất cả dữ liệu
• exportData() - Xuất dữ liệu
• importData() - Nhập dữ liệu
• app - Truy cập đối tượng ứng dụng
`);

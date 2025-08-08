class SavingsTracker {
    constructor() {
        this.savings = this.loadSavings();
        this.target = this.loadTarget();
        this.init();
    }

    // Initialize the application
    init() {
        this.setDefaultDate();
        this.updateStats();
        this.renderHistory();
        this.setupEventListeners();
    }

    // Set default date to today
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }

    // Setup event listeners
    setupEventListeners() {
        document.getElementById('savingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addSavings();
        });

        document.getElementById('setTargetBtn').addEventListener('click', () => {
            this.setTarget();
        });
    }

    // Add new savings entry
    addSavings() {
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;
        const note = document.getElementById('note').value;

        if (amount <= 0) {
            alert('Vui lòng nhập số tiền hợp lệ!');
            return;
        }

        const savingsEntry = {
            id: Date.now(),
            amount: amount,
            date: date,
            note: note,
            timestamp: new Date().toISOString()
        };

        this.savings.push(savingsEntry);
        this.saveSavings();
        this.updateStats();
        this.renderHistory();
        
        // Reset form
        document.getElementById('savingsForm').reset();
        this.setDefaultDate();
        
        // Show success message
        this.showNotification('Đã thêm khoản tiết kiệm thành công!', 'success');
    }

    // Set savings target
    setTarget() {
        const targetAmount = prompt('Nhập mục tiêu tiết kiệm (₫):');
        
        if (targetAmount === null) return; // User cancelled
        
        const amount = parseFloat(targetAmount);
        
        if (isNaN(amount) || amount < 0) {
            alert('Vui lòng nhập số tiền hợp lệ!');
            return;
        }

        this.target = amount;
        this.saveTarget();
        this.updateStats();
        this.showNotification('Đã cập nhật mục tiêu tiết kiệm!', 'success');
    }

    // Delete savings entry
    deleteSavings(id) {
        if (confirm('Bạn có chắc chắn muốn xóa khoản tiết kiệm này?')) {
            this.savings = this.savings.filter(entry => entry.id !== id);
            this.saveSavings();
            this.updateStats();
            this.renderHistory();
            this.showNotification('Đã xóa khoản tiết kiệm!', 'info');
        }
    }

    // Calculate total savings
    getTotalSavings() {
        return this.savings.reduce((total, entry) => total + entry.amount, 0);
    }

    // Calculate remaining amount to target
    getRemainingAmount() {
        return Math.max(0, this.target - this.getTotalSavings());
    }

    // Calculate progress percentage
    getProgressPercentage() {
        if (this.target === 0) return 0;
        return Math.min(100, (this.getTotalSavings() / this.target) * 100);
    }

    // Update statistics display
    updateStats() {
        const totalSavings = this.getTotalSavings();
        const remainingAmount = this.getRemainingAmount();
        const progressPercent = this.getProgressPercentage();

        document.getElementById('totalSavings').textContent = this.formatCurrency(totalSavings);
        document.getElementById('targetAmount').textContent = this.formatCurrency(this.target);
        document.getElementById('remainingAmount').textContent = this.formatCurrency(remainingAmount);
        document.getElementById('progressPercent').textContent = `${progressPercent.toFixed(1)}%`;
        document.getElementById('progressFill').style.width = `${progressPercent}%`;

        // Change progress bar color based on progress
        const progressFill = document.getElementById('progressFill');
        if (progressPercent >= 100) {
            progressFill.style.background = 'linear-gradient(90deg, #28a745, #20c997)';
        } else if (progressPercent >= 75) {
            progressFill.style.background = 'linear-gradient(90deg, #ffc107, #fd7e14)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #4facfe, #00f2fe)';
        }
    }

    // Render savings history
    renderHistory() {
        const historyList = document.getElementById('historyList');
        
        if (this.savings.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <h3>📝 Chưa có khoản tiết kiệm nào</h3>
                    <p>Hãy thêm khoản tiết kiệm đầu tiên của bạn!</p>
                </div>
            `;
            return;
        }

        // Sort by date (newest first)
        const sortedSavings = [...this.savings].sort((a, b) => new Date(b.date) - new Date(a.date));

        historyList.innerHTML = sortedSavings.map(entry => `
            <div class="history-item">
                <div class="history-info">
                    <div class="history-date">${this.formatDate(entry.date)}</div>
                    <div class="history-amount">+${this.formatCurrency(entry.amount)}</div>
                    ${entry.note ? `<div class="history-note">${entry.note}</div>` : ''}
                </div>
                <button class="delete-btn" onclick="savingsTracker.deleteSavings(${entry.id})">
                    🗑️
                </button>
            </div>
        `).join('');
    }

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Get monthly statistics
    getMonthlyStats() {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        return this.savings.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
        });
    }

    // Get yearly statistics
    getYearlyStats() {
        const currentYear = new Date().getFullYear();
        
        return this.savings.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate.getFullYear() === currentYear;
        });
    }

    // Export data to JSON
    exportData() {
        const data = {
            savings: this.savings,
            target: this.target,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `savings-tracker-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Import data from JSON
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.savings && Array.isArray(data.savings)) {
                    this.savings = data.savings;
                    this.target = data.target || 0;
                    this.saveSavings();
                    this.saveTarget();
                    this.updateStats();
                    this.renderHistory();
                    this.showNotification('Đã import dữ liệu thành công!', 'success');
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                this.showNotification('Lỗi khi import dữ liệu!', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Local storage methods
    saveSavings() {
        localStorage.setItem('savings-tracker-data', JSON.stringify(this.savings));
    }

    loadSavings() {
        const saved = localStorage.getItem('savings-tracker-data');
        return saved ? JSON.parse(saved) : [];
    }

    saveTarget() {
        localStorage.setItem('savings-tracker-target', JSON.stringify(this.target));
    }

    loadTarget() {
        const saved = localStorage.getItem('savings-tracker-target');
        return saved ? JSON.parse(saved) : 0;
    }

    // Clear all data
    clearAllData() {
        if (confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác!')) {
            this.savings = [];
            this.target = 0;
            this.saveSavings();
            this.saveTarget();
            this.updateStats();
            this.renderHistory();
            this.showNotification('Đã xóa tất cả dữ liệu!', 'info');
        }
    }
}

// Initialize the application
const savingsTracker = new SavingsTracker();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('savingsForm');
        if (document.activeElement.closest('form') === form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Ctrl/Cmd + T to set target
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        savingsTracker.setTarget();
    }
});

// Add some sample data for demonstration (remove in production)
if (savingsTracker.savings.length === 0) {
    // Add sample data only if no existing data
    const sampleData = [
        { id: 1, amount: 500000, date: '2024-01-15', note: 'Tiết kiệm tháng 1', timestamp: '2024-01-15T00:00:00.000Z' },
        { id: 2, amount: 300000, date: '2024-01-20', note: 'Tiết kiệm từ lương', timestamp: '2024-01-20T00:00:00.000Z' },
        { id: 3, amount: 200000, date: '2024-01-25', note: 'Tiết kiệm từ thưởng', timestamp: '2024-01-25T00:00:00.000Z' }
    ];
    
    savingsTracker.savings = sampleData;
    savingsTracker.target = 10000000; // 10 million VND target
    savingsTracker.saveSavings();
    savingsTracker.saveTarget();
    savingsTracker.updateStats();
    savingsTracker.renderHistory();
}

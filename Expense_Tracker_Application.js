document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    const expenseForm = document.getElementById('expense-form');
    const expensesBody = document.getElementById('expenses-body');
    const todayTotal = document.getElementById('today-total');
    const weekTotal = document.getElementById('week-total');
    const monthTotal = document.getElementById('month-total');
    const filterCategory = document.getElementById('filter-category');
    const filterPeriod = document.getElementById('filter-period');
    const customDateRange = document.getElementById('custom-date-range');
    
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    // Set default date to today
    document.getElementById('date').valueAsDate = new Date();
    
    // Initialize category filter options
    updateCategoryFilter();
    
    // Event listeners
    expenseForm.addEventListener('submit', addExpense);
    filterPeriod.addEventListener('change', toggleCustomDateRange);
    filterCategory.addEventListener('change', renderExpenses);
    filterPeriod.addEventListener('change', renderExpenses);
    document.getElementById('start-date')?.addEventListener('change', renderExpenses);
    document.getElementById('end-date')?.addEventListener('change', renderExpenses);
    
    // Initial render
    renderExpenses();
    updateSummary();
    
    function addExpense(e) {
        e.preventDefault();
        
        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        
        if (!category || isNaN(amount) {
            alert('Please fill in all required fields');
            return;
        }
        
        const expense = {
            id: Date.now(),
            category,
            amount,
            date,
            description: description || ''
        };
        
        expenses.push(expense);
        saveExpenses();
        
        // Reset form
        expenseForm.reset();
        document.getElementById('date').valueAsDate = new Date();
        
        // Update UI
        renderExpenses();
        updateSummary();
        updateCategoryFilter();
    }
    
    function renderExpenses() {
        const categoryFilter = filterCategory.value;
        const periodFilter = filterPeriod.value;
        
        let filteredExpenses = [...expenses];
        
        // Apply category filter
        if (categoryFilter !== 'all') {
            filteredExpenses = filteredExpenses.filter(exp => exp.category === categoryFilter);
        }
        
        // Apply period filter
        if (periodFilter !== 'all') {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            if (periodFilter === 'today') {
                filteredExpenses = filteredExpenses.filter(exp => {
                    const expDate = new Date(exp.date);
                    return expDate >= today;
                });
            } else if (periodFilter === 'week') {
                const dayOfWeek = now.getDay();
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - dayOfWeek);
                
                filteredExpenses = filteredExpenses.filter(exp => {
                    const expDate = new Date(exp.date);
                    return expDate >= startOfWeek;
                });
            } else if (periodFilter === 'month') {
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                
                filteredExpenses = filteredExpenses.filter(exp => {
                    const expDate = new Date(exp.date);
                    return expDate >= startOfMonth;
                });
            } else if (periodFilter === 'custom') {
                const startDate = document.getElementById('start-date').value;
                const endDate = document.getElementById('end-date').value;
                
                if (startDate && endDate) {
                    filteredExpenses = filteredExpenses.filter(exp => {
                        return exp.date >= startDate && exp.date <= endDate;
                    });
                }
            }
        }
        
        // Sort by date (newest first)
        filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Clear table
        expensesBody.innerHTML = '';
        
        if (filteredExpenses.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="5" style="text-align: center;">No expenses found</td>`;
            expensesBody.appendChild(row);
            return;
        }
        
        // Add expenses to table
        filteredExpenses.forEach(expense => {
            const row = document.createElement('tr');
            
            const formattedDate = new Date(expense.date).toLocaleDateString();
            const formattedAmount = `$${expense.amount.toFixed(2)}`;
            
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${formattedAmount}</td>
                <td class="actions">
                    <button class="delete-btn" data-id="${expense.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            expensesBody.appendChild(row);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', deleteExpense);
        });
    }
    
    function deleteExpense(e) {
        const id = parseInt(e.target.closest('button').getAttribute('data-id'));
        expenses = expenses.filter(exp => exp.id !== id);
        saveExpenses();
        renderExpenses();
        updateSummary();
        updateCategoryFilter();
    }
    
    function updateSummary() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dayOfWeek = now.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const todayExpenses = expenses.filter(exp => {
            const expDate = new Date(exp.date);
            return expDate >= today;
        });
        
        const weekExpenses = expenses.filter(exp => {
            const expDate = new Date(exp.date);
            return expDate >= startOfWeek;
        });
        
        const monthExpenses = expenses.filter(exp => {
            const expDate = new Date(exp.date);
            return expDate >= startOfMonth;
        });
        
        const todayTotalAmount = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const weekTotalAmount = weekExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const monthTotalAmount = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        
        todayTotal.textContent = `$${todayTotalAmount.toFixed(2)}`;
        weekTotal.textContent = `$${weekTotalAmount.toFixed(2)}`;
        monthTotal.textContent = `$${monthTotalAmount.toFixed(2)}`;
    }
    
    function updateCategoryFilter() {
        // Get all unique categories from expenses
        const categories = [...new Set(expenses.map(exp => exp.category))];
        
        // Save current selection
        const currentSelection = filterCategory.value;
        
        // Clear and rebuild options
        filterCategory.innerHTML = '<option value="all">All Categories</option>';
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterCategory.appendChild(option);
        });
        
        // Restore selection if it still exists
        if (categories.includes(currentSelection)) {
            filterCategory.value = currentSelection;
        }
    }
    
    function toggleCustomDateRange() {
        if (filterPeriod.value === 'custom') {
            customDateRange.style.display = 'flex';
        } else {
            customDateRange.style.display = 'none';
        }
    }
    
    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
});

// Mobile Menu Bar with All Sidebar Navigation
(function() {
    'use strict';

    // Create mobile menu bar
    function createMobileMenuBar() {
        // Check if menu bar already exists
        if (document.querySelector('.mobile-menu-bar')) {
            return;
        }

        // Create menu bar container
        const menuBar = document.createElement('div');
        menuBar.className = 'mobile-menu-bar';
        
        // Create menu items with all sidebar navigation
        menuBar.innerHTML = `
            <div class="mobile-menu-items">
                <a href="#" onclick="showDashboardSection('profile'); return false;" class="mobile-menu-item">
                    <span class="menu-icon">👤</span>
                    <span class="menu-label">Profile</span>
                </a>
                <a href="#" onclick="showDashboardSection('dashboard'); return false;" class="mobile-menu-item">
                    <span class="menu-icon">📊</span>
                    <span class="menu-label">Dashboard</span>
                </a>
                <a href="#" onclick="showPage('page2'); return false;" class="mobile-menu-item">
                    <span class="menu-icon">💰</span>
                    <span class="menu-label">Budgets</span>
                </a>
                <a href="budget-calculator.html" class="mobile-menu-item">
                    <span class="menu-icon">🧮</span>
                    <span class="menu-label">Calculator</span>
                </a>
                <a href="expense-tracker.html" class="mobile-menu-item">
                    <span class="menu-icon">📊</span>
                    <span class="menu-label">Expenses</span>
                </a>
                <a href="financial-planning.html" class="mobile-menu-item">
                    <span class="menu-icon">💰</span>
                    <span class="menu-label">Planning</span>
                </a>
                <a href="#" onclick="showDashboardSection('reminders'); return false;" class="mobile-menu-item">
                    <span class="menu-icon">🔔</span>
                    <span class="menu-label">Reminders</span>
                </a>
                <a href="#" onclick="showDashboardSection('analytics'); return false;" class="mobile-menu-item">
                    <span class="menu-icon">📈</span>
                    <span class="menu-label">Analytics</span>
                </a>
                <a href="#" onclick="showDashboardSection('support'); return false;" class="mobile-menu-item">
                    <span class="menu-icon">📧</span>
                    <span class="menu-label">Support</span>
                </a>
                <a href="#" onclick="showDashboardSection('money-guide'); return false;" class="mobile-menu-item">
                    <span class="menu-icon">💡</span>
                    <span class="menu-label">Guide</span>
                </a>
                <a href="#" onclick="showDashboardSection('subscription'); return false;" class="mobile-menu-item">
                    <span class="menu-icon">💳</span>
                    <span class="menu-label">Premium</span>
                </a>
                <a href="#" onclick="document.getElementById('languageSelect')?.scrollIntoView({behavior: 'smooth'}); return false;" class="mobile-menu-item">
                    <span class="menu-icon">🌐</span>
                    <span class="menu-label">Language</span>
                </a>
            </div>
        `;

        document.body.appendChild(menuBar);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMobileMenuBar);
    } else {
        createMobileMenuBar();
    }
})();
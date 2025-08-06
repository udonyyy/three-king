// admin.js - 管理后台JavaScript

class AdminManager {
    constructor() {
        // 存储当前用户信息
        this.currentUser = null;
        // API基础URL
        this.apiBaseUrl = '/api';
        // JWT令牌
        this.token = localStorage.getItem('token') || null;

        // 初始化
        this.init();
    }

    /**
     * 初始化函数
     */
    init() {
        // 检查用户是否已登录
        this.checkAuth();

        // 初始化事件监听
        this.initEventListeners();
    }

    /**
     * 检查用户认证状态
     */
    checkAuth() {
        if (!this.token) {
            // 未登录，重定向到登录页面
            window.location.href = 'login.html';
            return;
        }

        // 验证令牌并获取用户信息
        this.getUserInfo()
            .then(user => {
                this.currentUser = user;
                // 更新用户界面
                this.updateUserInterface();
            })
            .catch(error => {
                console.error('认证失败:', error);
                // 令牌无效，清除并重定向
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            });
    }

    /**
     * 获取当前用户信息
     */
    async getUserInfo() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('获取用户信息失败');
            }

            return await response.json();
        } catch (error) {
            console.error('获取用户信息错误:', error);
            throw error;
        }
    }

    /**
     * 更新用户界面
     */
    updateUserInterface() {
        // 更新用户名
        if (this.currentUser && this.currentUser.username) {
            document.getElementById('currentUserName').textContent = this.currentUser.username;
        }

        // 根据用户角色显示/隐藏菜单
        this.updateMenuBasedOnRole();
    }

    /**
     * 根据用户角色更新菜单
     */
    updateMenuBasedOnRole() {
        if (!this.currentUser) return;

        const role = this.currentUser.role;
        const permissions = this.currentUser.permissions || {};

        // 示例：根据角色隐藏某些菜单
        if (role !== 'admin') {
            // 非管理员隐藏用户管理菜单
            const usersMenu = document.querySelector('a[href="#users"]').parentElement;
            if (usersMenu) {
                usersMenu.style.display = 'none';
            }
        }

        // 根据权限隐藏某些功能
        if (!permissions.canApprove) {
            // 没有审批权限隐藏审批中心
            const approvalsMenu = document.querySelector('a[href="#approvals"]').parentElement;
            if (approvalsMenu) {
                approvalsMenu.style.display = 'none';
            }
        }
    }

    /**
     * 初始化事件监听
     */
    initEventListeners() {
        // 登出按钮事件
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // 侧边栏下拉菜单事件
        this.initSidebarDropdown();

        // 通知和用户菜单事件
        this.initDropdownMenus();

        // 加载数据按钮事件
        this.initDataLoaders();
    }

    /**
     * 初始化侧边栏下拉菜单
     */
    initSidebarDropdown() {
        const dropdownBtns = document.querySelectorAll('.sidebar-dropdown-btn');
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const dropdown = btn.nextElementSibling;
                const icon = btn.querySelector('.fa-caret-down');

                dropdown.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        });
    }

    /**
     * 初始化下拉菜单
     */
    initDropdownMenus() {
        // 用户下拉菜单
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');

        if (userMenuBtn && userDropdown) {
            userMenuBtn.addEventListener('click', () => {
                userDropdown.classList.toggle('hidden');
            });
        }

        // 通知下拉菜单
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationDropdown = document.getElementById('notificationDropdown');

        if (notificationBtn && notificationDropdown) {
            notificationBtn.addEventListener('click', () => {
                notificationDropdown.classList.toggle('hidden');
            });
        }

        // 点击页面其他区域关闭下拉菜单
        document.addEventListener('click', (e) => {
            if (userMenuBtn && !userMenuBtn.contains(e.target) && userDropdown && !userDropdown.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }

            if (notificationBtn && !notificationBtn.contains(e.target) && notificationDropdown && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.add('hidden');
            }
        });
    }

    /**
     * 初始化数据加载器
     */
    initDataLoaders() {
        // 页面加载完成后加载数据
        document.addEventListener('DOMContentLoaded', () => {
            this.loadDashboardStats();
            this.loadRecentRevisions();
            this.loadPendingApprovals();
        });
    }

    /**
     * 加载仪表盘统计数据
     */
    async loadDashboardStats() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/stats/dashboard`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('获取仪表盘数据失败');
            }

            const stats = await response.json();

            // 更新统计数据
            document.getElementById('totalUsers').textContent = stats.totalUsers || '0';
            document.getElementById('totalNotes').textContent = stats.totalNotes || '0';
            document.getElementById('totalTodos').textContent = stats.totalTodos || '0';
            document.getElementById('pendingApprovals').textContent = stats.pendingApprovals || '0';

            // 初始化图表
            this.initCharts(stats.chartData);
        } catch (error) {
            console.error('加载仪表盘数据错误:', error);
            // 显示模拟数据
            this.showMockDashboardStats();
        }
    }

    /**
     * 显示模拟仪表盘数据（当API请求失败时）
     */
    showMockDashboardStats() {
        document.getElementById('totalUsers').textContent = '24';
        document.getElementById('totalNotes').textContent = '156';
        document.getElementById('totalTodos').textContent = '89';
        document.getElementById('pendingApprovals').textContent = '2';

        // 初始化模拟图表
        this.initCharts({
            contentGrowth: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                notesData: [12, 19, 15, 22, 25, 30],
                todosData: [8, 12, 10, 15, 18, 20]
            },
            userActivity: {
                labels: ['学习笔记', '待办事项', '技能进度', '其他'],
                data: [45, 30, 15, 10]
            }
        });
    }

    /**
     * 初始化图表
     */
    initCharts(chartData) {
        // 确保Chart.js已加载
        if (typeof Chart === 'undefined') {
            console.error('Chart.js未加载');
            return;
        }

        // 内容增长趋势图表
        const contentGrowthCtx = document.getElementById('contentGrowthChart');
        if (contentGrowthCtx) {
            const ctx = contentGrowthCtx.getContext('2d');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData?.contentGrowth?.labels || ['1月', '2月', '3月', '4月', '5月', '6月'],
                    datasets: [
                        {
                            label: '学习笔记',
                            data: chartData?.contentGrowth?.notesData || [12, 19, 15, 22, 25, 30],
                            borderColor: '#3B82F6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: '待办事项',
                            data: chartData?.contentGrowth?.todosData || [8, 12, 10, 15, 18, 20],
                            borderColor: '#10B981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // 用户活动分布图
        const userActivityCtx = document.getElementById('userActivityChart');
        if (userActivityCtx) {
            const ctx = userActivityCtx.getContext('2d');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: chartData?.userActivity?.labels || ['学习笔记', '待办事项', '技能进度', '其他'],
                    datasets: [
                        {
                            data: chartData?.userActivity?.data || [45, 30, 15, 10],
                            backgroundColor: [
                                '#3B82F6',
                                '#10B981',
                                '#8B5CF6',
                                '#94A3B8'
                            ],
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                        }
                    },
                    cutout: '70%'
                }
            });
        }
    }

    /**
     * 加载最近修订记录
     */
    async loadRecentRevisions() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/revision?limit=5`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('获取修订记录失败');
            }

            const revisions = await response.json();
            this.renderRevisionsTable(revisions);
        } catch (error) {
            console.error('加载修订记录错误:', error);
            // 显示模拟数据
            this.showMockRevisions();
        }
    }

    /**
     * 渲染修订记录表格
     */
    renderRevisionsTable(revisions) {
        const tableBody = document.getElementById('recentRevisionsTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        if (!revisions || revisions.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                        暂无修订记录
                    </td>
                </tr>
            `;
            return;
        }

        revisions.forEach(revision => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';

            // 状态样式
            let statusClass = 'px-2 py-1 text-xs rounded-full';
            let statusText = '';

            if (revision.status === 'approved') {
                statusClass += ' bg-green-100 text-green-800';
                statusText = '已批准';
            } else if (revision.status === 'pending') {
                statusClass += ' bg-yellow-100 text-yellow-800';
                statusText = '待审批';
            } else if (revision.status === 'rejected') {
                statusClass += ' bg-red-100 text-red-800';
                statusText = '已拒绝';
            }

            // 操作类型文本
            let changeTypeText = '';
            if (revision.changeType === 'create') {
                changeTypeText = '创建';
            } else if (revision.changeType === 'update') {
                changeTypeText = '更新';
            } else if (revision.changeType === 'delete') {
                changeTypeText = '删除';
            }

            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${revision._id.substring(0, 8)}...</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${revision.documentType}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${changeTypeText}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                        <img class="h-8 w-8 rounded-full mr-2" src="https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/40/40" alt="${revision.author?.username || '未知用户'}">
                        ${revision.author?.username || '未知用户'}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(revision.createdAt).toLocaleString()}</td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="${statusClass}">${statusText}</span></td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" class="text-primary hover:text-primary/80 mr-3" onclick="event.preventDefault(); adminManager.viewRevision('${revision._id}')">查看</a>
                    ${revision.status === 'pending' ? `<a href="#" class="text-green-600 hover:text-green-800 mr-3" onclick="event.preventDefault(); adminManager.approveRevision('${revision._id}')">批准</a><a href="#" class="text-red-600 hover:text-red-800" onclick="event.preventDefault(); adminManager.rejectRevision('${revision._id}')">拒绝</a>` : ''}
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    /**
     * 显示模拟修订记录
     */
    showMockRevisions() {
        const revisions = [
            {
                _id: '60a1b2c3d4e5f6g7h8i9j0k1',
                documentType: 'StudyNote',
                changeType: 'update',
                author: { username: '张三' },
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                status: 'approved'
            },
            {
                _id: '60a1b2c3d4e5f6g7h8i9j0k2',
                documentType: 'Todo',
                changeType: 'delete',
                author: { username: '李四' },
                createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
                status: 'pending'
            },
            {
                _id: '60a1b2c3d4e5f6g7h8i9j0k3',
                documentType: 'StudyNote',
                changeType: 'create',
                author: { username: '王五' },
                createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
                status: 'approved'
            }
        ];

        this.renderRevisionsTable(revisions);
    }

    /**
     * 加载待审批项
     */
    async loadPendingApprovals() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/revision?status=pending&limit=10`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('获取待审批项失败');
            }

            const approvals = await response.json();
            this.renderApprovalsTable(approvals);

            // 更新待审批数量
            document.getElementById('pendingApprovals').textContent = approvals.length || '0';
        } catch (error) {
            console.error('加载待审批项错误:', error);
            // 显示模拟数据
            this.showMockApprovals();
        }
    }

    /**
     * 渲染待审批表格
     */
    renderApprovalsTable(approvals) {
        const tableBody = document.getElementById('pendingApprovalsTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        if (!approvals || approvals.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                        暂无待审批项
                    </td>
                </tr>
            `;
            return;
        }

        approvals.forEach(approval => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';

            // 操作类型文本
            let changeTypeText = '';
            if (approval.changeType === 'create') {
                changeTypeText = '创建';
            } else if (approval.changeType === 'update') {
                changeTypeText = '更新';
            } else if (approval.changeType === 'delete') {
                changeTypeText = '删除';
            }

            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${approval._id.substring(0, 8)}...</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${approval.documentType}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${changeTypeText}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                        <img class="h-8 w-8 rounded-full mr-2" src="https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/40/40" alt="${approval.author?.username || '未知用户'}">
                        ${approval.author?.username || '未知用户'}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(approval.createdAt).toLocaleString()}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" class="text-green-600 hover:text-green-800 mr-3" onclick="event.preventDefault(); adminManager.approveRevision('${approval._id}')">批准</a>
                    <a href="#" class="text-red-600 hover:text-red-800" onclick="event.preventDefault(); adminManager.rejectRevision('${approval._id}')">拒绝</a>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    /**
     * 显示模拟待审批项
     */
    showMockApprovals() {
        const approvals = [
            {
                _id: '60a1b2c3d4e5f6g7h8i9j0k2',
                documentType: 'Todo',
                changeType: 'delete',
                author: { username: '李四' },
                createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
            },
            {
                _id: '60a1b2c3d4e5f6g7h8i9j0k4',
                documentType: 'StudyNote',
                changeType: 'update',
                author: { username: '管理员' },
                createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
            }
        ];

        this.renderApprovalsTable(approvals);

        // 更新待审批数量
        document.getElementById('pendingApprovals').textContent = approvals.length;
    }

    /**
     * 查看修订详情
     */
    async viewRevision(revisionId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/revision/${revisionId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('获取修订详情失败');
            }

            const revision = await response.json();
            // 显示修订详情模态框
            this.showRevisionModal(revision);
        } catch (error) {
            console.error('查看修订详情错误:', error);
            alert('查看修订详情失败: ' + error.message);
        }
    }

    /**
     * 显示修订详情模态框
     */
    showRevisionModal(revision) {
        // 这里应该实现模态框显示逻辑
        // 为简化示例，这里仅使用alert
        alert(`修订ID: ${revision._id}\n文档类型: ${revision.documentType}\n操作类型: ${revision.changeType}\n创建时间: ${new Date(revision.createdAt).toLocaleString()}\n状态: ${revision.status}`);
    }

    /**
     * 批准修订
     */
    async approveRevision(revisionId) {
        if (!confirm('确定要批准此修订吗？')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/revision/${revisionId}/approve`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('批准修订失败');
            }

            // 更新表格
            this.loadRecentRevisions();
            this.loadPendingApprovals();

            alert('修订已成功批准');
        } catch (error) {
            console.error('批准修订错误:', error);
            alert('批准修订失败: ' + error.message);
        }
    }

    /**
     * 拒绝修订
     */
    async rejectRevision(revisionId) {
        const reason = prompt('请输入拒绝原因:');
        if (reason === null) {
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/revision/${revisionId}/reject`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reason })
            });

            if (!response.ok) {
                throw new Error('拒绝修订失败');
            }

            // 更新表格
            this.loadRecentRevisions();
            this.loadPendingApprovals();

            alert('修订已成功拒绝');
        } catch (error) {
            console.error('拒绝修订错误:', error);
            alert('拒绝修订失败: ' + error.message);
        }
    }

    /**
     * 登出
     */
    logout() {
        // 清除令牌
        localStorage.removeItem('token');
        // 重定向到登录页面
        window.location.href = 'login.html';
    }
}

// 页面加载完成后初始化管理后台
document.addEventListener('DOMContentLoaded', () => {
    // 创建全局实例
    window.adminManager = new AdminManager();
});
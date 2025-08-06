// 任务数据管理
let tasks = [];
const tasksContainer = document.getElementById('taskList');
const taskFilter = document.getElementById('taskFilter');
const taskSearch = document.getElementById('taskSearch');
const newTaskForm = document.getElementById('newTaskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskPrioritySelect = document.getElementById('taskPriority');
const taskDueDateInput = document.getElementById('taskDueDate');

// 统计元素
const totalTasksEl = document.getElementById('totalTasks');
const pendingTasksCountEl = document.getElementById('pendingTasksCount');
const completedTasksCountEl = document.getElementById('completedTasksCount');
const highPriorityCountEl = document.getElementById('highPriorityCount');

// 初始化
function initTasks() {
    loadTasks();
    renderTasks();
    updateTaskCounts();

    // 绑定事件
    newTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask();
    });

    taskFilter.addEventListener('change', renderTasks);
    taskSearch.addEventListener('input', renderTasks);
}

// 加载任务
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    } else {
        tasks = [];
    }
}

// 保存任务
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 添加任务
function addTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const priority = taskPrioritySelect.value;
    const dueDate = taskDueDateInput.value;

    if (!title) {
        showNotification('任务标题不能为空', 'error');
        return;
    }

    const newTask = {
        id: Date.now(),
        title,
        description,
        priority,
        dueDate,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    updateTaskCounts();

    // 重置表单
    newTaskForm.reset();
    showNotification('任务添加成功', 'success');
}

// 切换任务状态
function toggleTaskStatus(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateTaskCounts();
        showNotification(task.completed ? '任务已完成' : '任务已激活', 'success');
    }
}

// 编辑任务
function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (!task) return;

    // 创建编辑表单
    const editFormHtml = `
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto overflow-hidden animate-fade-in">
                <div class="p-6 border-b">
                    <h3 class="text-xl font-bold">编辑任务</h3>
                </div>
                <div class="p-6">
                    <form id="edit-task-form" class="space-y-4">
                        <input type="hidden" id="edit-task-id" value="${task.id}">
                        <div>
                            <label for="edit-task-title" class="block text-sm font-medium text-gray-700 mb-1">任务标题</label>
                            <input type="text" id="edit-task-title" class="input-field" value="${escapeHtml(task.title)}" required>
                        </div>
                        <div>
                            <label for="edit-task-description" class="block text-sm font-medium text-gray-700 mb-1">任务描述</label>
                            <textarea id="edit-task-description" class="input-field" rows="2">${escapeHtml(task.description || '')}
</textarea>
                        </div>
                        <div>
                            <label for="edit-task-priority" class="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                            <select id="edit-task-priority" class="input-field">
                                <option value="high" ${task.priority === 'high' ? 'selected' : ''}>高</option>
                                <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>中</option>
                                <option value="low" ${task.priority === 'low' ? 'selected' : ''}>低</option>
                            </select>
                        </div>
                        <div>
                            <label for="edit-task-due-date" class="block text-sm font-medium text-gray-700 mb-1">截止日期</label>
                            <input type="date" id="edit-task-due-date" class="input-field" value="${task.dueDate || ''}
">
                        </div>
                        <div class="pt-2 flex justify-end space-x-3">
                            <button type="button" id="cancel-edit-btn" class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">取消</button>
                            <button type="submit" class="btn-primary">保存修改</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // 添加到DOM
    document.body.insertAdjacentHTML('beforeend', editFormHtml);

    // 获取编辑表单元素
    const editForm = document.getElementById('edit-task-form');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');

    // 编辑表单提交事件
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const taskId = parseInt(document.getElementById('edit-task-id').value);
        const taskTitle = document.getElementById('edit-task-title').value.trim();
        const taskDescription = document.getElementById('edit-task-description').value.trim();
        const taskPriority = document.getElementById('edit-task-priority').value;
        const taskDueDate = document.getElementById('edit-task-due-date').value;


        if (!taskTitle) {
            showNotification('任务标题不能为空', 'error');
            return;
        }

        // 更新任务
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title: taskTitle,
                description: taskDescription,
                priority: taskPriority,
                dueDate: taskDueDate
            };

            // 保存到本地存储
            saveTasks();

            // 重新渲染任务列表
            renderTasks();
            updateTaskCounts();

            // 关闭编辑模态框
            document.querySelector('.fixed.inset-0.bg-black\/50.z-50').remove();

            // 显示成功通知
            showNotification('任务更新成功', 'success');
        }
    });

    // 取消编辑事件
    cancelEditBtn.addEventListener('click', function() {
        document.querySelector('.fixed.inset-0.bg-black\/50.z-50').remove();
    });
}

// 删除任务
function deleteTask(taskId) {
    if (confirm('确定要删除这个任务吗？')) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
        updateTaskCounts();
        showNotification('任务已删除', 'success');
    }
}

// 渲染任务列表
function renderTasks() {
    // 清空任务容器
    tasksContainer.innerHTML = '';

    // 获取过滤条件
    const filterValue = taskFilter.value;
    const searchTerm = taskSearch.value.toLowerCase();

    // 筛选任务（已删除用户相关过滤）
    let filteredTasks = tasks;

    // 应用状态过滤
    if (filterValue === 'pending') {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    } else if (filterValue === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.completed);
    } else if (filterValue === 'high') {
        filteredTasks = filteredTasks.filter(task => task.priority === 'high');
    } else if (filterValue === 'medium') {
        filteredTasks = filteredTasks.filter(task => task.priority === 'medium');
    } else if (filterValue === 'low') {
        filteredTasks = filteredTasks.filter(task => task.priority === 'low');
    }

    // 应用搜索过滤
    if (searchTerm) {
        filteredTasks = filteredTasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm) || 
            (task.description && task.description.toLowerCase().includes(searchTerm))
        );
    }

    // 排序任务（高优先级和未完成的任务排在前面）
    filteredTasks.sort((a, b) => {
        // 先按完成状态排序
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        // 再按优先级排序
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // 如果没有任务，显示空状态
    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = `
            <div class="text-center py-12">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <i class="fa fa-tasks text-xl text-gray-400"></i>
                </div>
                <p class="text-gray-500">暂无任务，添加你的第一条任务吧</p>
            </div>
        `;
        return;
    }

    // 渲染每个任务
    filteredTasks.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = `todo-item ${task.completed ? 'todo-completed' : ''} ${task.priority === 'high' ? 'todo-high' : task.priority === 'medium' ? 'todo-medium' : 'todo-low'}`;
        taskEl.dataset.taskId = task.id;

        // 优先级图标（修复：确保所有优先级都有图标）
        let priorityIcon = '';
        if (task.priority === 'high') {
            priorityIcon = '<i class="fa fa-exclamation-circle text-danger ml-1"></i>';
        } else if (task.priority === 'medium') {
            priorityIcon = '<i class="fa fa-exclamation-circle text-warning ml-1"></i>';
        } else if (task.priority === 'low') {
            priorityIcon = '<i class="fa fa-check-circle text-secondary ml-1"></i>';
        }

        // 截止日期显示
        let dueDateHtml = '';
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const formattedDate = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, '0')}-${String(dueDate.getDate()).padStart(2, '0')}`;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isOverdue = dueDate < today && !task.completed;

            dueDateHtml = `
                <div class="flex items-center text-sm mt-1 ${isOverdue ? 'text-danger' : 'text-gray-500'}
">
                    <i class="fa fa-calendar-o mr-1"></i>
                    <span>${formattedDate} ${isOverdue ? '(已过期)' : ''}</span>
                </div>
            `;
        }

        taskEl.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex items-start flex-1">
                    <input type="checkbox" class="task-checkbox mt-1.5 mr-3" ${task.completed ? 'checked' : ''}>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-medium ${task.completed ? 'line-through text-gray-400' : ''}">${escapeHtml(task.title)} ${priorityIcon}</h3>
                        ${task.description ? `<p class="text-gray-600 text-sm mt-1 ${task.completed ? 'line-through' : ''}">${escapeHtml(task.description)}</p>` : ''}
                        ${dueDateHtml}

                    </div>
                </div>
                <div class="flex items-center space-x-2 ml-4">
                    <button class="task-edit-btn text-gray-500 hover:text-primary p-1.5 rounded-full hover:bg-primary/10 transition-colors">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="task-delete-btn text-gray-500 hover:text-danger p-1.5 rounded-full hover:bg-danger/10 transition-colors">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        // 添加事件监听器
        const checkbox = taskEl.querySelector('.task-checkbox');
        const editBtn = taskEl.querySelector('.task-edit-btn');
        const deleteBtn = taskEl.querySelector('.task-delete-btn');

        checkbox.addEventListener('change', function() {
            toggleTaskStatus(task.id);
        });

        editBtn.addEventListener('click', function() {
            editTask(task.id);
        });

        deleteBtn.addEventListener('click', function() {
            deleteTask(task.id);
        });

        tasksContainer.appendChild(taskEl);
    });
}

// 更新任务计数（已删除用户相关过滤）
function updateTaskCounts() {
    // 所有任务均显示，无需用户过滤
    const allTasks = tasks;

    // 更新计数
    totalTasksEl.textContent = allTasks.length;
    pendingTasksCountEl.textContent = allTasks.filter(task => !task.completed).length;
    completedTasksCountEl.textContent = allTasks.filter(task => task.completed).length;
    highPriorityCountEl.textContent = allTasks.filter(task => task.priority === 'high').length;
}

// 显示通知
function showNotification(message, type = 'info') {
    // 实现通知逻辑（根据实际UI调整）
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-50 text-green-800' :
        type === 'error' ? 'bg-red-50 text-red-800' :
        'bg-blue-50 text-blue-800'
    } z-50 animate-fade-in`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// HTML转义
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 初始化任务管理
document.addEventListener('DOMContentLoaded', initTasks);
// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 临时添加测试用户，用于调试添加笔记功能
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {id: 1, username: '测试用户'};
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // 初始化图表
    initChart();
    
    // 绑定添加笔记按钮事件
    document.getElementById('add-note-btn').addEventListener('click', openAddNoteModal);
    document.getElementById('floating-add-btn').addEventListener('click', openAddNoteModal);
    
    // 绑定关闭模态框事件
    document.getElementById('close-modal').addEventListener('click', closeNoteModal);
    document.getElementById('cancel-btn').addEventListener('click', closeNoteModal);
    
    // 绑定表单提交事件
    document.getElementById('note-form').addEventListener('submit', handleNoteSubmit);
    
    // 绑定删除确认事件
    document.getElementById('cancel-delete').addEventListener('click', closeDeleteModal);
    document.getElementById('confirm-delete').addEventListener('click', confirmDeleteNote);
    
    // 初始化笔记列表
    renderNoteList();
});

// 初始化图表
function initChart() {
    const ctx = document.getElementById('stats-chart').getContext('2d');
    
    // 从本地存储获取数据或使用默认值
    const notesCount = localStorage.getItem('notesCount') || 0;
    const achievementsCount = localStorage.getItem('achievementsCount') || 0;
    const toolsCount = localStorage.getItem('toolsCount') || 0;
    const careerCount = localStorage.getItem('careerCount') || 0;
    
    // 更新统计数字
    document.getElementById('notes-count').textContent = notesCount;
    document.getElementById('achievements-count').textContent = achievementsCount;
    document.getElementById('tools-count').textContent = toolsCount;
    document.getElementById('career-count').textContent = careerCount;
    
    // 创建饼图
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['学习笔记', '学习成果', '学习工具', '职业资源'],
            datasets: [{
                data: [notesCount, achievementsCount, toolsCount, careerCount],
                backgroundColor: [
                    '#3B82F6', // primary
                    '#10B981', // secondary
                    '#8B5CF6', // accent
                    '#F59E0B'  // amber-500
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// 打开添加笔记模态框
function openAddNoteModal() {
    document.getElementById('note-modal').classList.remove('hidden');
    document.getElementById('modal-title').textContent = '添加学习笔记';
    document.getElementById('note-id').value = '';
    document.getElementById('note-form').reset();
}

// 关闭笔记模态框
function closeNoteModal() {
    document.getElementById('note-modal').classList.add('hidden');
}

// 打开删除确认模态框
function openDeleteModal(noteId) {
    document.getElementById('delete-modal').classList.remove('hidden');
    // 存储要删除的笔记ID
    document.getElementById('delete-modal').dataset.noteId = noteId;
}

// 关闭删除确认模态框
function closeDeleteModal() {
    document.getElementById('delete-modal').classList.add('hidden');
}

// 处理笔记提交
function handleNoteSubmit(e) {
    e.preventDefault();
    
    const noteId = document.getElementById('note-id').value;
    const title = document.getElementById('note-title').value;
    const category = document.getElementById('note-category').value;
    const content = document.getElementById('note-content').value;
    const tags = document.getElementById('note-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // 获取现有的笔记列表
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    if (noteId) {
        // 更新现有笔记
        const index = notes.findIndex(note => note.id === noteId);
        if (index !== -1) {
            notes[index] = {
                ...notes[index],
                title,
                category,
                content,
                tags,
                updatedAt: new Date().toISOString()
            };
        }
    } else {
        // 添加新笔记
        notes.push({
            id: Date.now().toString(),
            title,
            category,
            content,
            tags,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        
        // 更新笔记计数
        const notesCount = parseInt(localStorage.getItem('notesCount') || 0) + 1;
        localStorage.setItem('notesCount', notesCount);
        document.getElementById('notes-count').textContent = notesCount;
    }
    
    // 保存笔记
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // 关闭模态框
    closeNoteModal();
    
    // 更新笔记列表
    renderNoteList();
    
    // 显示提示
    showToast(noteId ? '笔记更新成功' : '笔记添加成功');
}

// 确认删除笔记
function confirmDeleteNote() {
    const noteId = document.getElementById('delete-modal').dataset.noteId;
    
    // 获取现有的笔记列表
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    // 过滤掉要删除的笔记
    notes = notes.filter(note => note.id !== noteId);
    
    // 保存笔记
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // 更新笔记计数
    const notesCount = Math.max(0, parseInt(localStorage.getItem('notesCount') || 0) - 1);
    localStorage.setItem('notesCount', notesCount);
    document.getElementById('notes-count').textContent = notesCount;
    
    // 关闭模态框
    closeDeleteModal();
    
    // 更新笔记列表
    renderNoteList();
    
    // 显示提示
    showToast('笔记删除成功');
}

// 渲染笔记列表
function renderNoteList() {
    const notesContainer = document.getElementById('notes-container');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const categoryFilter = document.getElementById('notes-category-filter').value;
    const tagFilter = document.getElementById('notes-tag-filter').value;
    const searchTerm = document.getElementById('notes-search').value.toLowerCase();
    
    // 筛选笔记
    let filteredNotes = notes;
    
    // 按分类筛选
    if (categoryFilter !== 'all') {
        filteredNotes = filteredNotes.filter(note => note.category === categoryFilter);
    }
    
    // 按标签筛选
    if (tagFilter) {
        filteredNotes = filteredNotes.filter(note => note.tags.includes(tagFilter));
    }
    
    // 按搜索词筛选
    if (searchTerm) {
        filteredNotes = filteredNotes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) || 
            note.content.toLowerCase().includes(searchTerm) || 
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // 按更新时间排序
    filteredNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = `
            <div class="col-span-full flex justify-center items-center py-12">
                <div class="text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <i class="fa fa-sticky-note-o text-xl text-gray-400"></i>
                    </div>
                    <p class="text-gray-500">暂无匹配的笔记</p>
                </div>
            </div>
        `;
        return;
    }
    
    // 渲染笔记列表
    notesContainer.innerHTML = filteredNotes.map(note => `
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 card-hover">
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-lg text-gray-800 truncate">${escapeHtml(note.title)}</h3>
                <div class="flex gap-1">
                    <button class="text-gray-400 hover:text-primary p-1" onclick="editNote('${note.id}')">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="text-gray-400 hover:text-red-500 p-1" onclick="openDeleteModal('${note.id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="mb-3 text-xs text-gray-500">
                <span>${getCategoryName(note.category)}</span> • 
                <span>${formatDate(note.updatedAt)}</span>
            </div>
            <p class="text-gray-600 mb-3 line-clamp-2">${escapeHtml(note.content)}</p>
            <div class="flex flex-wrap gap-1 mt-3">
                ${note.tags.map(tag => `
                    <span class="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">${escapeHtml(tag)}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 编辑笔记
function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes.find(note => note.id === noteId);
    
    if (note) {
        document.getElementById('note-modal').classList.remove('hidden');
        document.getElementById('modal-title').textContent = '编辑学习笔记';
        document.getElementById('note-id').value = note.id;
        document.getElementById('note-title').value = note.title;
        document.getElementById('note-category').value = note.category;
        document.getElementById('note-content').value = note.content;
        document.getElementById('note-tags').value = note.tags.join(', ');
    }
}

// 获取分类名称
function getCategoryName(category) {
    const categories = {
        'frontend': '前端开发',
        'backend': '后端开发',
        'database': '数据库',
        'algorithm': '算法',
        'other': '其他'
    };
    
    return categories[category] || category;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 转义HTML
function escapeHtml(text) {
    if (typeof text !== 'string') {
        return '';
    }
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
    
document.addEventListener('DOMContentLoaded', function() {
  // 移动端菜单切换
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });

  // 认证模态框相关
  const authModal = document.getElementById('authModal');
  const closeAuthModal = document.getElementById('closeAuthModal');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const mobileRegisterBtn = document.getElementById('mobileRegisterBtn');
  const authModalTitle = document.getElementById('authModalTitle');
  const authModalSwitchText = document.getElementById('authModalSwitchText');
  const switchToRegister = document.getElementById('switchToRegister');
  const loginForm = document.getElementById('loginForm');
  const authModalContent = document.getElementById('authModalContent');

  // 打开登录模态框
  function openLoginModal() {
    authModalTitle.textContent = '登录';
    authModalSwitchText.innerHTML = '还没有账号? <a href="#" id="switchToRegister" class="text-primary hover:underline">立即注册</a>';
    authModalContent.innerHTML = `
      <form id="loginForm" class="space-y-4">
        <div>
          <label for="loginEmail" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
          <input type="email" id="loginEmail" class="input-field" placeholder="请输入您的邮箱" required>
        </div>
        <div>
          <label for="loginPassword" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <input type="password" id="loginPassword" class="input-field" placeholder="请输入您的密码" required>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <input type="checkbox" id="rememberMe" class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded">
            <label for="rememberMe" class="ml-2 block text-sm text-gray-700">记住我</label>
          </div>
          <a href="#" class="text-sm text-primary hover:underline">忘记密码?</a>
        </div>
        <button type="submit" class="btn-primary flex justify-center items-center gap-2 w-full">
          <i class="fas fa-sign-in-alt"></i> 登录
        </button>
      </form>
    `;
    authModal.classList.remove('hidden');
    // 重新绑定事件
    document.getElementById('switchToRegister').addEventListener('click', openRegisterModal);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
  }

  // 打开注册模态框
  function openRegisterModal(e) {
    if (e) e.preventDefault();
    authModalTitle.textContent = '注册';
    authModalSwitchText.innerHTML = '已有账号? <a href="#" id="switchToLogin" class="text-primary hover:underline">立即登录</a>';
    authModalContent.innerHTML = `
      <form id="registerForm" class="space-y-4">
        <div>
          <label for="registerName" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
          <input type="text" id="registerName" class="input-field" placeholder="请输入用户名" required>
        </div>
        <div>
          <label for="registerEmail" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
          <input type="email" id="registerEmail" class="input-field" placeholder="请输入您的邮箱" required>
        </div>
        <div>
          <label for="registerPassword" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <input type="password" id="registerPassword" class="input-field" placeholder="请设置密码" required>
        </div>
        <div>
          <label for="registerConfirmPassword" class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
          <input type="password" id="registerConfirmPassword" class="input-field" placeholder="请确认密码" required>
        </div>
        <button type="submit" class="btn-secondary flex justify-center items-center gap-2 w-full">
          <i class="fas fa-user-plus"></i> 注册
        </button>
      </form>
    `;
    // 重新绑定事件
    document.getElementById('switchToLogin').addEventListener('click', openLoginModal);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
  }

  // 关闭认证模态框
  function closeModal() {
    authModal.classList.add('hidden');
  }

  // 处理登录表单提交
  function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    // 这里应该添加实际的登录逻辑
    console.log('登录请求:', { email, password });
    // 模拟登录成功
    showToast('登录成功！');
    closeModal();
    // 更新用户状态
    updateUserAuth(true, '测试用户');
  }

  // 处理注册表单提交
  function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
      showToast('两次输入的密码不一致');
      return;
    }

    // 这里应该添加实际的注册逻辑
    console.log('注册请求:', { name, email, password });
    // 模拟注册成功
    showToast('注册成功！请登录');
    openLoginModal();
  }

  // 更新用户认证状态
  function updateUserAuth(isAuthenticated, username) {
    const authSection = document.getElementById('authSection');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileRegisterBtn = document.getElementById('mobileRegisterBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (isAuthenticated) {
      // 已登录状态
      loginBtn.classList.add('hidden');
      registerBtn.classList.add('hidden');
      mobileLoginBtn.classList.add('hidden');
      mobileRegisterBtn.classList.add('hidden');
      userMenu.classList.remove('hidden');
      userName.textContent = username;
    } else {
      // 未登录状态
      loginBtn.classList.remove('hidden');
      registerBtn.classList.remove('hidden');
      mobileLoginBtn.classList.remove('hidden');
      mobileRegisterBtn.classList.remove('hidden');
      userMenu.classList.add('hidden');
    }
  }

  // 退出登录
  document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    // 这里应该添加实际的退出登录逻辑
    console.log('退出登录');
    // 模拟退出登录
    showToast('已退出登录');
    updateUserAuth(false);
  });

  // 创建帖子模态框相关
  const createPostModal = document.getElementById('createPostModal');
  const closeCreatePostModal = document.getElementById('closeCreatePostModal');
  const cancelCreatePost = document.getElementById('cancelCreatePost');
  const createPostForm = document.getElementById('createPostForm');
  const imageUploadArea = document.getElementById('imageUploadArea');
  const postImage = document.getElementById('postImage');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');
  const addTagBtn = document.getElementById('addTagBtn');
  const newTagInput = document.getElementById('newTagInput');
  const tagContainer = document.getElementById('tagContainer');

  // 打开创建帖子模态框
  function openCreatePostModal() {
    createPostModal.classList.remove('hidden');
  }

  // 关闭创建帖子模态框
  function closeCreatePostModalFunc() {
    createPostModal.classList.add('hidden');
  }

  // 处理图片上传预览
  function handleImageUpload() {
    const files = postImage.files;
    if (files.length > 0) {
      imagePreviewContainer.classList.remove('hidden');
      imagePreviewContainer.innerHTML = '';

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
          const preview = document.createElement('div');
          preview.className = 'relative';
          preview.innerHTML = `
            <img src="${e.target.result}" alt="预览图" class="w-full h-20 object-cover rounded-lg">
            <button class="absolute top-1 right-1 bg-danger text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-danger/80 transition-colors remove-image">
              <i class="fas fa-times"></i>
            </button>
          `;
          imagePreviewContainer.appendChild(preview);

          // 绑定删除图片事件
          preview.querySelector('.remove-image').addEventListener('click', function() {
            preview.remove();
            if (imagePreviewContainer.children.length === 0) {
              imagePreviewContainer.classList.add('hidden');
            }
          });
        };

        reader.readAsDataURL(file);
      }
    }
  }

  // 添加标签
  function addTag() {
    const tagText = newTagInput.value.trim();
    if (tagText && tagText.length <= 10) {
      // 检查标签是否已存在
      const existingTags = Array.from(tagContainer.querySelectorAll('.tag-item'));
      const tagExists = existingTags.some(tag => tag.dataset.tag === tagText);

      if (!tagExists) {
        const tag = document.createElement('span');
        tag.className = 'tag-item bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer';
        tag.dataset.tag = tagText;
        tag.innerHTML = `${tagText} <i class="fas fa-times-circle text-xs"></i>`;

        // 绑定删除标签事件
        tag.querySelector('i').addEventListener('click', function() {
          tag.remove();
        });

        tagContainer.appendChild(tag);
        newTagInput.value = '';
      } else {
        showToast('该标签已存在');
      }
    } else if (tagText.length > 10) {
      showToast('标签长度不能超过10个字符');
    }
  }

  // 处理创建帖子表单提交
  function handleCreatePost(e) {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const tags = Array.from(tagContainer.querySelectorAll('.tag-item')).map(tag => tag.dataset.tag);
    // 这里应该添加实际的创建帖子逻辑
    console.log('创建帖子请求:', { title, content, tags });
    // 模拟创建成功
    showToast('帖子创建成功！');
    closeCreatePostModalFunc();
    // 重置表单
    createPostForm.reset();
    tagContainer.innerHTML = `
      <span class="tag-item bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer" data-tag="美食">
        美食 <i class="fas fa-times-circle text-xs"></i>
      </span>
      <span class="tag-item bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer" data-tag="旅行">
        旅行 <i class="fas fa-times-circle text-xs"></i>
      </span>
      <span class="tag-item bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer" data-tag="电影">
        电影 <i class="fas fa-times-circle text-xs"></i>
      </span>
    `;
    imagePreviewContainer.classList.add('hidden');
    imagePreviewContainer.innerHTML = '';
    // 重新绑定标签删除事件
    tagContainer.querySelectorAll('.tag-item i').forEach(icon => {
      icon.addEventListener('click', function() {
        icon.parentElement.remove();
      });
    });
  }

  // 显示提示信息
  function showToast(message) {
    // 检查是否已有toast
    let toast = document.querySelector('.toast');
    if (toast) {
      toast.remove();
    }

    toast = document.createElement('div');
    toast.className = 'toast fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 3秒后自动隐藏
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  // 绑定事件
  loginBtn.addEventListener('click', openLoginModal);
  registerBtn.addEventListener('click', openRegisterModal);
  mobileLoginBtn.addEventListener('click', openLoginModal);
  mobileRegisterBtn.addEventListener('click', openRegisterModal);
  closeAuthModal.addEventListener('click', closeModal);
  closeCreatePostModal.addEventListener('click', closeCreatePostModalFunc);
  cancelCreatePost.addEventListener('click', closeCreatePostModalFunc);
  createPostForm.addEventListener('submit', handleCreatePost);
  imageUploadArea.addEventListener('click', () => postImage.click());
  postImage.addEventListener('change', handleImageUpload);
  addTagBtn.addEventListener('click', addTag);
  newTagInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTag();
    }
  });

  // 初始化标签删除事件
  tagContainer.querySelectorAll('.tag-item i').forEach(icon => {
    icon.addEventListener('click', function() {
      icon.parentElement.remove();
    });
  });

  // 点击模态框外部关闭模态框
  window.addEventListener('click', function(e) {
    if (e.target === authModal) {
      closeModal();
    }
    if (e.target === createPostModal) {
      closeCreatePostModalFunc();
    }
  });

  // 初始化用户状态（未登录）
  updateUserAuth(false);

  // 检查是否有创建帖子的按钮，如果有则绑定事件
  const createPostBtn = document.getElementById('createPostBtn');
  if (createPostBtn) {
    createPostBtn.addEventListener('click', openCreatePostModal);
  }
});
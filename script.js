document.addEventListener('DOMContentLoaded', () => {
    const inputTextarea = document.getElementById('inputText');
    const outputTextarea = document.getElementById('outputText');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // --- 1. Fox-Text 转换核心逻辑 ---
    
    // 更改函数名称和装饰符号
    function convertTextToFoxText(text) {
        if (!text) return "";

        // 示例 Fox-Text 规则：在每个字符后添加一个狐狸符号 🦊
        return text.split('').map(char => char + '🦊').join('');

        // 你可以替换成任何更复杂的“狐狸”主题的文本替换规则。
    }

    // 转换按钮事件
    convertButton.addEventListener('click', () => {
        const input = inputTextarea.value;
        // 调用新的转换函数
        const convertedText = convertTextToFoxText(input); 
        outputTextarea.value = convertedText;
    });

    // --- 2. 复制功能 (保持不变) ---
    copyButton.addEventListener('click', () => {
        outputTextarea.select();
        outputTextarea.setSelectionRange(0, 99999);
        document.execCommand('copy');
        
        const originalText = copyButton.textContent;
        copyButton.textContent = '已复制!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 1500);
    });

    // --- 3. 深色模式切换功能 (保持不变) ---
    function setDarkMode(isDark) {
        // ... (与之前 Pig-Text 的逻辑完全相同) ...
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    darkModeToggle.addEventListener('change', () => {
        setDarkMode(darkModeToggle.checked);
    });

    // 加载时检查用户偏好设置 (持久化)
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'enabled') {
        darkModeToggle.checked = true;
        setDarkMode(true);
    } else {
        darkModeToggle.checked = false;
        setDarkMode(false);
    }
});
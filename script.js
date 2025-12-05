document.addEventListener('DOMContentLoaded', function() {
    const textTypeSelect = document.getElementById('text-type');
    const textCountInput = document.getElementById('text-count');
    const textCountValue = document.getElementById('text-count-value');
    const darkModeToggle = document.getElementById('dark-mode');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const resultDiv = document.getElementById('result');

    // 狐狸相关文本库
    const foxTexts = {
        proverb: [
            "狐狸再狡猾，也斗不过好猎手。",
            "狐狸尾巴藏不住，事情总会露马脚。",
            "狐狸精明，但也有失算的时候。",
            "狐狸虽小，五脏俱全。",
            "狐狸的智慧在于懂得隐藏自己。",
            "狐狸走过的地方，总会留下痕迹。",
            "狐狸的狡猾，是为了生存的智慧。",
            "狐狸不吃窝边草，聪明人不伤害身边人。",
            "狐狸的尾巴再长，也藏不住自己的本性。",
            "狐狸的叫声虽小，却能传得很远。"
        ],
        joke: [
            "问：狐狸为什么喜欢吃葡萄？\n答：因为它想成为‘狐狸精’！",
            "问：狐狸和狼有什么区别？\n答：狐狸是‘狡猾’，狼是‘凶残’！",
            "问：狐狸最怕什么？\n答：怕猎人，更怕‘狐狸精’的称号！",
            "问：狐狸为什么不敢去动物园？\n答：怕被关进‘狐狸精展览馆’！",
            "问：狐狸的梦想是什么？\n答：成为‘狐狸精’中的战斗机！",
            "问：狐狸为什么喜欢夜晚出没？\n答：因为白天太‘显眼’了！",
            "问：狐狸最讨厌什么动物？\n答：猎狗，因为它总是‘穷追不舍’！",
            "问：狐狸的爱情观是什么？\n答：宁可‘狐’独终老，也不‘狐’假虎威！",
            "问：狐狸为什么喜欢吃鸡？\n答：因为鸡肉是‘狐狸精’的最爱！",
            "问：狐狸的座右铭是什么？\n答：‘狡猾’是生存的艺术！"
        ],
        poem: [
            "狐狸轻步月下行，\n尾巴摇曳影随形。\n夜色如水心如镜，\n智慧藏于暗中明。",
            "狐狸舞于山林间，\n红毛闪烁似火燃。\n机敏如风行踪隐，\n生存智慧胜神仙。",
            "狐狸独坐石上眠，\n梦中自有桃花源。\n世人皆道狡诈恶，\n谁知其心亦可怜。",
            "狐狸夜半啼声长，\n回荡山谷月色凉。\n莫道此声多凄切，\n智者自有诉衷肠。",
            "狐狸穿梭林中行，\n步步为营不留痕。\n世间万物皆有道，\n狡猾背后是生存。"
        ],
        story: [
            "从前，有一只聪明的狐狸，住在茂密的森林里。它总是能用智慧躲过猎人的追捕，还经常帮助其他小动物。一天，森林里来了一只凶恶的狼，欺负弱小动物。狐狸决定用计谋赶走狼。它假装生病，躺在路边，等狼经过时，突然跳起来大喊：‘狼来了！狼来了！’森林里的动物们听到喊声，纷纷赶来，吓跑了狼。从此，狐狸成了森林里的英雄。",
            "在一个寒冷的冬天，一只狐狸在雪地里觅食。它发现了一只冻僵的乌鸦，决定救它。狐狸把乌鸦带回洞穴，用自己的体温温暖它。乌鸦苏醒后，非常感激狐狸。为了报答狐狸，乌鸦每天给狐狸带来食物。从此，它们成了好朋友，一起度过了寒冷的冬天。",
            "有一只狐狸，总是喜欢炫耀自己的尾巴。它认为自己的尾巴是世界上最美丽的。一天，它遇到了一只孔雀，孔雀展开美丽的尾羽，狐狸羞愧地低下了头。孔雀对狐狸说：‘每个人都有自己的长处，不要只看到别人的优点，而忽略了自己的美丽。’狐狸听后，明白了这个道理，不再炫耀自己的尾巴。"
        ]
    };

    // 检查URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const darkModeParam = urlParams.get('darkmode');

    if (darkModeParam === '1') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }

    // 更新生成数量显示
    textCountInput.addEventListener('input', function() {
        textCountValue.textContent = this.value;
    });

    // 切换夜间模式
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        updateURL();
    });

    // 生成文本
    generateBtn.addEventListener('click', generateText);

    // 复制结果
    copyBtn.addEventListener('click', function() {
        const resultText = resultDiv.textContent;
        if (resultText) {
            navigator.clipboard.writeText(resultText).then(function() {
                copyBtn.textContent = '已复制!';
                setTimeout(() => {
                    copyBtn.textContent = '复制结果';
                }, 2000);
            });
        }
    });

    // 初始生成文本
    generateText();

    function generateText() {
        const type = textTypeSelect.value;
        const count = parseInt(textCountInput.value);
        let result = '';

        if (type === 'random') {
            // 随机混合所有类型
            const allTexts = [];
            for (const key in foxTexts) {
                allTexts.push(...foxTexts[key]);
            }
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * allTexts.length);
                result += allTexts[randomIndex] + '\n\n';
            }
        } else {
            // 按类型生成
            const texts = foxTexts[type];
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * texts.length);
                result += texts[randomIndex] + '\n\n';
            }
        }

        resultDiv.textContent = result.trim();
    }

    function updateURL() {
        const darkMode = darkModeToggle.checked ? '1' : '0';
        const newUrl = `${window.location.pathname}?darkmode=${darkMode}`;
        window.history.replaceState({}, '', newUrl);
    }
});

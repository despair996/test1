// 粒子效果配置
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00ff9d'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            animation: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff9d',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动状态
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});


// 添加入场动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

document.querySelectorAll('.about-card').forEach((el) => {
    observer.observe(el);
});

// 自定义光标效果
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const easing = 0.2;

// 更新光标位置
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 平滑跟随动画
function animate() {
    // 计算光标位置
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    
    // 更新光标位置
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    
    requestAnimationFrame(animate);
}
animate();


// 光标悬停效果
const hoverElements = document.querySelectorAll('a, button, .about-card');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// 加载动画和打字效果
const loadingScreen = document.querySelector('.loading-screen');
const loadingDetails = document.querySelector('.loading-details');
const title = document.querySelector('.typewriter');
const subtitle = document.querySelector('.typewriter-subtitle');

// 副标题文本数组
const subtitleTexts = [
    '北方工业大学人工智能社会实践团',
    '探索AI前沿，服务社会发展',
    '用智能技术创造美好未来',
    '理论与实践并重，创新与服务并行',
    '人工智能与网络安全融合发展',
    '智行千里，筑梦未来'
];

// 加载动画文本序列
const loadingTexts = [
    '初始化AI模型...',
    '加载数据模块...',
    '建立智能连接...',
    '验证身份信息...',
    '准备完成...'
];

let textIndex = 0;
const updateLoadingText = () => {
    if (textIndex < loadingTexts.length) {
        loadingDetails.textContent = loadingTexts[textIndex];
        textIndex++;
        setTimeout(updateLoadingText, 250);
    }
};

// 打字机效果函数 - 包含删除效果
const typeWriter = (element, text, speed = 100) => {
    return new Promise((resolve) => {
        let i = 0;
        element.textContent = '';
        element.classList.add('typing');
        
        const type = () => {
            if (i < text.length) {
                // 创建一个临时的 span 来包含当前字符
                const char = text.charAt(i);
                element.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(type, speed + Math.random() * 50);
            } else {
                resolve();
            }
        };
        
        type();
    });
};

// 删除文字效果函数
const eraseText = (element, speed = 50) => {
    return new Promise((resolve) => {
        const text = element.textContent;
        let i = text.length;
        
        const erase = () => {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(erase, speed + Math.random() * 30);
            } else {
                resolve();
            }
        };
        
        erase();
    });
};

// 循环展示文本
const loopTexts = async () => {
    let currentIndex = 0;
    
    while (true) {
        await typeWriter(subtitle, subtitleTexts[currentIndex], 150);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await eraseText(subtitle);
        await new Promise(resolve => setTimeout(resolve, 500));
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * subtitleTexts.length);
        } while (nextIndex === currentIndex);
        currentIndex = nextIndex;
    }
};

// 加载动画流程
window.addEventListener('load', () => {
    updateLoadingText();
    
    // 2秒后隐藏加载页面
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // 开始标题动画
        setTimeout(() => {
            // 显示主标题
            title.classList.add('visible');
            
            // 开始副标题循环动画
            setTimeout(() => {
                loopTexts();
            }, 800);
        }, 500);
    }, 2000);
});

// 滚动到团队使命
const scrollToMission = () => {
    const missionElement = document.getElementById('mission');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    if (missionElement) {
        const targetPosition = missionElement.offsetTop - navbarHeight - 20; // 减去导航栏高度和一些额外空间
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // 添加高亮效果
        missionElement.classList.add('highlight-mission');
        setTimeout(() => {
            missionElement.classList.remove('highlight-mission');
        }, 1500);
    }
};

// 初始化成就展示 - 优化版
const initializeAchievements = () => {
    const achievementsGrid = document.getElementById('achievementsGrid');
    const originalCards = Array.from(achievementsGrid.children);
    
    // 克隆足够的卡片以实现无缝滚动（原数量的2倍）
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        achievementsGrid.appendChild(clone);
    });
    
    // 设置滚动容器宽度
    const containerWidth = originalCards.length * 420; // 每个卡片约420px宽
    achievementsGrid.style.width = `${containerWidth * 2}px`;
};

// 成果展示滚动控制
document.getElementById('scrollLeftBtn').addEventListener('click', () => {
    const achievementsGrid = document.getElementById('achievementsGrid');
    achievementsGrid.scrollBy({ left: -420, behavior: 'smooth' });
});

document.getElementById('scrollRightBtn').addEventListener('click', () => {
    const achievementsGrid = document.getElementById('achievementsGrid');
    achievementsGrid.scrollBy({ left: 420, behavior: 'smooth' });
});

// 滚动到团队荣誉部分
const scrollToAchievements = () => {
    const achievementsElement = document.getElementById('achievements');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    if (achievementsElement) {
        // 获取元素相对于文档顶部的位置
        const rect = achievementsElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // 添加高亮效果
        achievementsElement.classList.add('highlight-mission');
        setTimeout(() => {
            achievementsElement.classList.remove('highlight-mission');
        }, 1500);
    }
};

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeAchievements();
});


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


// 添加视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-content');
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// 添加入场动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

document.querySelectorAll('.about-card, .member-card').forEach((el) => {
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
const hoverElements = document.querySelectorAll('a, button, .about-card, .member-card');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// 成员展示部分的滚动和展开功能
const membersGrid = document.querySelector('.members-grid');
const membersScroll = document.querySelector('.members-scroll');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const expandBtn = document.querySelector('.expand-btn');
const expandBtnText = expandBtn.querySelector('span');

// 设置成员卡片的动画延迟
const memberCards = document.querySelectorAll('.member-card');
memberCards.forEach((card, index) => {
    card.style.setProperty('--card-index', index);
});

let isExpanded = false;
let isAnimating = false;
document.addEventListener('DOMContentLoaded', () => {
    if(!isExpanded)
        expandBtn.click();
});
expandBtn.addEventListener('click', async () => {
    if (isAnimating) return;
    isAnimating = true;
    
    // 记录当前成员区域的位置
    const membersSection = document.querySelector('#members');
    const membersSectionTop = membersSection.offsetTop;
    
    // 更新按钮状态
    expandBtn.classList.toggle('expanded');
    expandBtnText.textContent = isExpanded ? '展开' : '收起';
    
    // 淡出动画
    membersGrid.classList.add('fade-out');
    
    // 等待淡出完成
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 切换展开状态
    isExpanded = !isExpanded;
    membersGrid.classList.toggle('expanded');
    
    // 更新滚动按钮显示状态
    scrollLeftBtn.style.display = isExpanded ? 'none' : 'flex';
    scrollRightBtn.style.display = isExpanded ? 'none' : 'flex';
    
    // 如果是收起状态，滚动到开始
    if (!isExpanded) {
        membersScroll.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    }
    
    // 触发重排以确保动画效果
    membersGrid.offsetHeight;
    
    // 淡入动画
    membersGrid.classList.remove('fade-out');
    membersGrid.classList.add('fade-in');
    
    // 滚动到成员区域的顶部
    window.scrollTo({
        top: membersSectionTop - 80, // 减去导航栏的高度
        behavior: 'smooth'
    });
    
    // 动画结束后清理
    setTimeout(() => {
        membersGrid.classList.remove('fade-in');
        isAnimating = false;
    }, 500);
});

// 滚动按钮功能
scrollLeftBtn.addEventListener('click', () => {
    membersScroll.scrollBy({
        left: -320,
        behavior: 'smooth'
    });
});

scrollRightBtn.addEventListener('click', () => {
    membersScroll.scrollBy({
        left: 320,
        behavior: 'smooth'
    });
});

// 检测滚动位置来显示/隐藏按钮
membersScroll.addEventListener('scroll', () => {
    if (isExpanded) return;
    
    const isAtStart = membersScroll.scrollLeft === 0;
    const isAtEnd = membersScroll.scrollLeft + membersScroll.clientWidth >= membersScroll.scrollWidth;
    
    scrollLeftBtn.style.opacity = isAtStart ? '0.5' : '1';
    scrollRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
});

// 初始化时触发一次滚动事件来设置按钮状态
membersScroll.dispatchEvent(new Event('scroll'));

// 加载动画和打字效果
const loadingScreen = document.querySelector('.loading-screen');
const loadingDetails = document.querySelector('.loading-details');
const title = document.querySelector('.typewriter');
const subtitle = document.querySelector('.typewriter-subtitle');

// 副标题文本数组
const subtitleTexts = [
    '北方工业大学安全协会旗下CTF战队',
    '北方工业大学CTF竞赛领航者',
    '因热爱而相聚，为安全而战',
    '以赛促学，以会精进',
    '编程、网安、岗位',
    '代码与攻防兼备，热爱与实力并存'
];

// 加载动画文本序列
const loadingTexts = [
    '初始化安全协议...',
    '加载加密模块...',
    '建立安全连接...',
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

// 创建邮件弹窗
const createEmailPopup = () => {
    const popup = document.createElement('div');
    popup.className = 'email-popup';
    popup.innerHTML = `
        <div class="email-popup-content">
            <span class="popup-close">&times;</span>
            <h3>加入我们</h3>
            <p>感谢您的关注，我们将为您跳转到邮件发送界面</p>
            <p>您可以通过邮件详细描述：</p>
            <ul style="text-align: left; margin-bottom: 1.5rem;">
                <li>您的基本信息（姓名、专业、年级）</li>
                <li>感兴趣的安全领域</li>
                <li>技能特长和经验</li>
            </ul>
            <p>我们会在收到邮件后尽快回复您</p>
            <p>flag{Challenge_Enjoyment_Achievement}</p>
            <button class="popup-confirm">确认并跳转</button>
        </div>
    `;
    document.body.appendChild(popup);
    return popup;
};

// 显示邮件信息弹窗
const showEmailInfo = (event) => {
    event.preventDefault();
    
    // 获取或创建弹窗
    let popup = document.querySelector('.email-popup');
    if (!popup) {
        popup = createEmailPopup();
    }
    
    // 显示弹窗
    popup.classList.add('show');
    
    // 关闭按钮事件
    const closeBtn = popup.querySelector('.popup-close');
    const confirmBtn = popup.querySelector('.popup-confirm');
    
    // 清除之前的事件监听器
    closeBtn.onclick = null;
    confirmBtn.onclick = null;
    
    // 添加新的事件监听器
    closeBtn.onclick = () => {
        popup.classList.remove('show');
    };
    
    confirmBtn.onclick = () => {
        window.location.href = 'mailto:contact@n0r7hst4r.cn';
        popup.classList.remove('show');
    };
};

// 防止点击弹窗内容时的冒泡
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        if (event.target.closest('.email-popup-content')) {
            event.stopPropagation();
        }
    });
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

// 加载成就数据
const loadAchievements = async () => {
    try {
        const response = await fetch('achievements.json');
        const data = await response.json();
        return {
            achievements: data.achievements,
            icons: data.icons
        };
    } catch (error) {
        console.error('加载成就数据失败:', error);
        return { achievements: [], icons: {} };
    }
};

// 渲染成就卡片
const renderAchievementCard = (achievement, icons) => {
    const card = document.createElement('div');
    card.className = `achievement-card${achievement.isFuture ? ' future-card' : ''}`;
    
    card.innerHTML = `
        <div class="achievement-icon">
            <i class="fas ${icons[achievement.icon]}"></i>
            <span class="year">${achievement.year}</span>
        </div>
        <div class="achievement-details">
            <h4>${achievement.title}</h4>
            <p>${achievement.description}</p>
        </div>
    `;
    
    return card;
};

// 初始化成就展示
const initializeAchievements = async () => {
    const achievementsGrid = document.getElementById('achievementsGrid');
    const { achievements, icons } = await loadAchievements();
    
    // 清空现有内容
    achievementsGrid.innerHTML = '';
    
    // 创建滚动容器
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'achievements-scroll-container';
    
    // 渲染初始卡片
    achievements.forEach(achievement => {
        const card = renderAchievementCard(achievement, icons);
        scrollContainer.appendChild(card);
    });
    
    // 复制一组卡片用于无缝滚动
    achievements.forEach(achievement => {
        const card = renderAchievementCard(achievement, icons);
        scrollContainer.appendChild(card);
    });

    // 将滚动容器添加到网格中
    achievementsGrid.appendChild(scrollContainer);
};

// 加载成员数据
const loadMembers = async () => {
    try {
        const response = await fetch('members.json');
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error('加载成员数据失败:', error);
        return [];
    }
};

// 渲染成员卡片
const renderMemberCard = (member) => {
    const card = document.createElement('a');  // 改为 a 标签
    card.className = 'member-card';
    card.href = member.hasBlog ? member.blogUrl : 'no-blog.html';  // 根据 hasBlog 设置跳转链接
    card.target = '_blank';  // 新标签页打开

    card.innerHTML = `
        <div class="member-avatar">
            <img src="${member.avatar}" alt="${member.name}">
        </div>
        <h3>${member.name}</h3>
        <p class="position">${member.position}</p>
        <p class="year">${member.year}</p>
        <div class="skills">
            ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
    `;
    
    return card;
};

// 初始化成员展示
const initializeMembers = async () => {
    const membersGrid = document.getElementById('membersGrid');
    const members = await loadMembers();

    members.forEach(member => {
        const card = renderMemberCard(member);
        membersGrid.appendChild(card);
    });

    // 设置成员卡片的动画延迟
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });

    // 初始化滚动按钮状态
    membersScroll.dispatchEvent(new Event('scroll'));
};

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeMembers();
    initializeAchievements();
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
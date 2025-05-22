document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
    }
    
    // Theme toggle event
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    ت
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.typing-cursor');
    const professions = [
        'مطور واجهات مستخدم',
        'مصمم تجربة مستخدم',
        'مطور ويب'
    ];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        const currentProfession = professions[professionIndex];
        
        if (isDeleting) {
            typingText.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentProfession.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            setTimeout(type, 500);
        } else {
            const typingSpeed = isDeleting ? 50 : 150;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Start typing animation after 1 second
    setTimeout(type, 1000);
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});


// About Section Tabs                          ---------------------------------------------------------------
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Animate skill bars when they become visible
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8) && 
                         (rect.bottom >= window.innerHeight * 0.2);
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
                bar.classList.add('animated');
            }, 1000);
        }
    });
}

// Initial check
animateSkillBars();

// Check on scroll
window.addEventListener('scroll', animateSkillBars);



// Animate Skills Progress Bars                -------------------------------------------------
function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const progressBar = card.querySelector('.progress-bar');
        const percent = card.getAttribute('data-percent');
        
        // Only animate if not already animated
        if (!card.classList.contains('animated')) {
            progressBar.style.width = `${percent}%`;
            card.classList.add('animated');
        }
    });
}

// Animate when skills section is visible
function checkSkillsVisibility() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.8) && 
                     (rect.bottom >= window.innerHeight * 0.2);
    
    if (isVisible) {
        animateSkills();
        window.removeEventListener('scroll', checkSkillsVisibility);
    }
}

// Initial check
checkSkillsVisibility();

// Check on scroll
window.addEventListener('scroll', checkSkillsVisibility);

//                              -------------------------------------------------------------------------------

// Projects Section Animation
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Only animate if not already animated
        if (!card.classList.contains('animated')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('animated');
            }, 100);
        }
    });
}

// Animate when projects section is visible
function checkProjectsVisibility() {
    const projectsSection = document.querySelector('.projects');
    if (!projectsSection) return;
    
    const rect = projectsSection.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.8) && 
                     (rect.bottom >= window.innerHeight * 0.2);
    
    if (isVisible) {
        animateProjects();
        window.removeEventListener('scroll', checkProjectsVisibility);
    }
}

// Initial check
checkProjectsVisibility();

// Check on scroll
window.addEventListener('scroll', checkProjectsVisibility);
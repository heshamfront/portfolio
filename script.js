// تفاعل بسيط مع نموذج التواصل
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.textContent = 'تم إرسال رسالتك بنجاح! شكراً لتواصلك.';
        form.reset();
        setTimeout(() => {
            formMessage.textContent = '';
        }, 3500);
    });
}

// Animation للـ progress bar في skills
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skills-progress .progress').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300);
    });

    // Animation typing للنص التعريفي في صفحة about
    const aboutText = "أنا مطور واجهات أمامية أهوى الإبداع والتطوير، أمتلك خبرة في بناء مواقع وتطبيقات ويب عصرية وسهلة الاستخدام. أسعى دائمًا لتقديم أفضل تجربة للمستخدم من خلال تصاميم حديثة وتفاعلات جذابة.";
    const aboutAnimated = document.getElementById('about-animated-text');
    if (aboutAnimated) {
        let idx = 0;
        function typeChar() {
            if (idx <= aboutText.length) {
                aboutAnimated.textContent = aboutText.slice(0, idx);
                idx++;
                setTimeout(typeChar, 32);
            }
        }
        typeChar();
    }
});

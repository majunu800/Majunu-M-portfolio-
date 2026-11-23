// 1. Custom Cursor Logic
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. GSAP Reveal Animations (Add the GSAP CDN to your HTML first)
// gsap.from(".reveal-text", { duration: 1.5, y: 100, opacity: 0, ease: "power4.out" });

// 3. ScrollReveal (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
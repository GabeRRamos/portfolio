// Smooth scrolling for the navbar links
document.querySelectorAll('.header a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Adding fade-in animation when sections come into view
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section, .project-card h3, .project-card p, .about h2, .about p').forEach(element => {
    observer.observe(element);
});

// Typing animation for elements
function typeWriter(element, text, speed, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

document.querySelectorAll('.project-card h3, .project-card p, .about h2, .about p').forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    const startTyping = () => typeWriter(element, text, 30);

    const typeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTyping();
                typeObserver.unobserve(element);
            }
        });
    }, {
        threshold: 1.0
    });

    typeObserver.observe(element);
});

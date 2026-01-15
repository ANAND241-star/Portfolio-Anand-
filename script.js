
// Menu Toggle
let menu = document.querySelector('#menu-btn');
let header = document.querySelector('.header .navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

// Theme Toggle
let themeBtn = document.querySelector('#theme-btn');

themeBtn.onclick = () => {
    themeBtn.classList.toggle('fa-sun');
    themeBtn.classList.toggle('fa-moon');
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Check Local Storage on load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.classList.replace('fa-moon', 'fa-sun');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    header.classList.remove('active');

    // Scroll Top Button visibility
    if (window.scrollY > 60) {
        document.querySelector('.top').style.display = 'block';
    } else {
        document.querySelector('.top').style.display = 'none';
    }

    // Scroll Spy
    let section = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header .navbar a');

    section.forEach(sec => {
        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
            });
        };
    });
}

// Typing Text Effect
const texts = ["Accountant", "Tally Customization Specialist", "Future-Ready Learner"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector(".typing-text").textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // Wait before next word
    } else {
        setTimeout(type, 150); // Typing speed
    }
})();

// Vanilla Tilt Effect for Cards
function initTilt() {
    const cards = document.querySelectorAll('.tilt');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -20; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}
initTilt();


// Simple Particle Effect on Canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.getElementById('particles-js').appendChild(canvas);

let particlesArray;

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

window.addEventListener('resize', setCanvasSize);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = '#012c6d'; // Navy
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 50; i++) {
        particlesArray.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Connect particles
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(1, 44, 109, 0.1)';
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
            particlesArray.push(new Particle()); // Replace
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Chat Widget Logic
const chatToggle = document.getElementById('chat-toggle');
const chatPopup = document.getElementById('chat-popup');
const closeChat = document.querySelector('.chat-header h3 i');
const chatForm = document.getElementById('chat-form');

// Toggle Chat
chatToggle.addEventListener('click', () => {
    chatPopup.classList.toggle('active');
});

// Close Chat (Back Arrow)
closeChat.addEventListener('click', () => {
    chatPopup.classList.remove('active');
});

// Handle Form Submit (Mailto)
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('chat-name').value;
    const email = document.getElementById('chat-email').value;
    const message = document.getElementById('chat-message').value;
    
    // Construct Mailto Link
    const subject = 'Portfolio Chat Message from ' + name;
    const body = 'Name: ' + name + '%0D%0AEmail: ' + email + '%0D%0A%0D%0AMessage:%0D%0A' + message;
    
    // Open Mail Client
    window.location.href = 'mailto:anandjatt689@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + body; // body is partially encoded above
});


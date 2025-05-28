// Dynamic Features for Aditi Kadam's Portfolio
// This file contains additional interactive elements to enhance the user experience

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dynamic features
    initTypingEffect();
    initDarkModeToggle();
    initScrollProgressBar();
    initSkillsAnimation();
    initBackToTopButton();
    enhanceContactForm();
    initParticlesBackground();
    initSkillsParticlesBackground();
    initParallaxEffect();
});

// Typing effect for the hero section tagline
function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const originalText = tagline.textContent;
    tagline.textContent = '';

    let i = 0;
    const typingSpeed = 50; // milliseconds per character

    function typeWriter() {
        if (i < originalText.length) {
            tagline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Reset and start again after a pause
            setTimeout(() => {
                tagline.textContent = '';
                i = 0;
                typeWriter();
            }, 5000);
        }
    }

    typeWriter();
}

// Dark mode toggle functionality
function initDarkModeToggle() {
    // Create the toggle button
    const navbar = document.querySelector('.navbar .container');
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    navbar.appendChild(darkModeToggle);

    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode on click
    darkModeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'disabled');
        } else {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        }
    });
}

// Scroll progress indicator
function initScrollProgressBar() {
    // Create the progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    // Update progress bar width on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

// Enhanced skills section with progress bars
function initSkillsAnimation() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        // Add focus styles for accessibility (for keyboard navigation)
        tag.setAttribute('tabindex', '0');

        tag.addEventListener('focus', function() {
            this.classList.add('skill-tag-focus');
        });

        tag.addEventListener('blur', function() {
            this.classList.remove('skill-tag-focus');
        });

        // Add touch feedback for mobile users
        tag.addEventListener('touchstart', function() {
            this.classList.add('skill-tag-active');
        });

        tag.addEventListener('touchend', function() {
            this.classList.remove('skill-tag-active');
            // Trigger click after touch for mobile users
            this.click();
        });

        // Add click functionality to show more details
        tag.addEventListener('click', function() {
            // Create or update skill detail popup
            let popup = document.querySelector('.skill-popup');
            if (!popup) {
                popup = document.createElement('div');
                popup.className = 'skill-popup';
                document.body.appendChild(popup);
            }

            // Set content based on skill
            const skillName = this.textContent;
            popup.innerHTML = `
                <div class="skill-popup-content">
                    <h3>${skillName}</h3>
                    <div class="skill-progress-container">
                        <div class="skill-progress-bar" style="width: 0%"></div>
                    </div>
                    <p>Experience level: Advanced</p>
                    <button class="close-popup">Close</button>
                </div>
            `;

            // Position popup near the clicked skill
            const rect = this.getBoundingClientRect();
            popup.style.top = (rect.bottom + window.scrollY + 10) + 'px';
            popup.style.left = (rect.left + window.scrollX) + 'px';

            // Show popup with animation
            popup.style.display = 'block';
            setTimeout(() => {
                popup.style.opacity = '1';
                // Animate progress bar
                const progressBar = popup.querySelector('.skill-progress-bar');
                progressBar.style.width = '85%';
            }, 10);

            // Close button functionality
            popup.querySelector('.close-popup').addEventListener('click', function() {
                popup.style.opacity = '0';
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            });
        });
    });
}

// Back to top button
function initBackToTopButton() {
    // Create the button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced contact form with better validation and feedback
function enhanceContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Add status message element
    const statusMessage = document.createElement('div');
    statusMessage.className = 'form-status';
    contactForm.appendChild(statusMessage);

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });

        input.addEventListener('input', function() {
            // Remove error styling as user types
            this.classList.remove('input-error');
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    });

    // Form submission with enhanced validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Create data object to send
            const formData = {
                name: name,
                email: email,
                message: message
            };

            // Send data to Google Sheets using the deployed Google Apps Script
            // Replace this URL with the actual deployed web app URL from Google Apps Script
            const scriptURL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';

            fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    // Show success message
                    statusMessage.textContent = 'Thank you! Your message has been sent successfully and added to the Google Sheet.';
                    statusMessage.className = 'form-status success';
                    contactForm.reset();
                } else {
                    // Show error message
                    statusMessage.textContent = 'There was an error sending your message. Please try again.';
                    statusMessage.className = 'form-status error';
                }

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Clear message after a delay
                setTimeout(() => {
                    statusMessage.textContent = '';
                    statusMessage.className = 'form-status';
                }, 5000);
            })
            .catch(error => {
                // Show error message
                statusMessage.textContent = 'There was an error sending your message. Please try again.';
                statusMessage.className = 'form-status error';
                console.error('Error:', error);

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        }
    });

    // Input validation function
    function validateInput(input) {
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();

        let isValid = true;
        let message = '';

        if (!input.value.trim()) {
            isValid = false;
            message = 'This field is required';
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }

        if (!isValid) {
            input.classList.add('input-error');
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            input.parentElement.appendChild(error);
        } else {
            input.classList.remove('input-error');
        }

        return isValid;
    }
}

// Particles background effect for hero section
function initParticlesBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }

            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            ctx.fillStyle = 'rgba(40, 167, 69, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw lines between nearby particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(40, 167, 69, ${0.2 - distance/500})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Particles background effect for skills section
function initSkillsParticlesBackground() {
    const skills = document.querySelector('.skills');
    if (!skills) return;

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'skills-particles-canvas';
    skills.insertBefore(canvas, skills.firstChild);

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = skills.offsetWidth;
        canvas.height = skills.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // SkillParticle class - different from hero particles
    class SkillParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 2;
            this.baseSize = this.size;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.speedY = Math.random() * 0.8 - 0.4;
            this.color = this.getRandomColor();
            this.opacity = Math.random() * 0.5 + 0.2;
            this.growDirection = Math.random() > 0.5 ? 1 : -1;
        }

        getRandomColor() {
            const colors = [
                'rgba(40, 167, 69, opacity)', // Primary green
                'rgba(125, 200, 85, opacity)', // Secondary green
                'rgba(51, 51, 51, opacity)',   // Dark text
                'rgba(102, 102, 102, opacity)' // Light text
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Pulse size effect
            this.size += 0.05 * this.growDirection;
            if (this.size > this.baseSize + 1.5 || this.size < this.baseSize - 1.5) {
                this.growDirection *= -1;
            }

            // Wrap around edges instead of bouncing
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            const actualColor = this.color.replace('opacity', this.opacity);
            ctx.fillStyle = actualColor;
            ctx.beginPath();

            // Draw different shapes for variety
            const shapeType = Math.floor(this.baseSize) % 3;

            if (shapeType === 0) {
                // Circle
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            } else if (shapeType === 1) {
                // Square
                ctx.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
            } else {
                // Triangle
                ctx.moveTo(this.x, this.y - this.size);
                ctx.lineTo(this.x + this.size, this.y + this.size);
                ctx.lineTo(this.x - this.size, this.y + this.size);
            }

            ctx.fill();
        }
    }

    // Create skill particles
    const particles = [];
    const particleCount = 40; // Slightly fewer than hero section

    for (let i = 0; i < particleCount; i++) {
        particles.push(new SkillParticle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw curved lines between some particles for a network effect
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(40, 167, 69, ${0.15 - distance/800})`;
                    ctx.lineWidth = 0.8;

                    // Draw curved lines for a more organic network look
                    const midX = (particles[i].x + particles[j].x) / 2;
                    const midY = (particles[i].y + particles[j].y) / 2 - 15;

                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.quadraticCurveTo(midX, midY, particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Add interactive effect - particles move toward mouse
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        particles.forEach(particle => {
            // Calculate direction to mouse
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If mouse is close, add a slight attraction
            if (distance < 150) {
                particle.speedX += dx / distance * 0.05;
                particle.speedY += dy / distance * 0.05;

                // Limit speed
                const maxSpeed = 2;
                const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
                if (currentSpeed > maxSpeed) {
                    particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
                    particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
                }
            }
        });
    });
}

// Parallax effect for About section
function initParallaxEffect() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    // Add parallax class to the about section
    aboutSection.classList.add('parallax-section');

    // Create background elements for parallax effect
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-background';
    aboutSection.insertBefore(parallaxBg, aboutSection.firstChild);

    // Create floating elements
    const elementsCount = 8;
    for (let i = 0; i < elementsCount; i++) {
        const element = document.createElement('div');
        element.className = 'parallax-element';

        // Randomize size, position and animation duration
        const size = Math.random() * 60 + 20;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 10 + 10}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;

        // Add to background
        parallaxBg.appendChild(element);
    }

    // Add scroll event listener for parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const aboutPosition = aboutSection.offsetTop;
        const windowHeight = window.innerHeight;

        // Check if about section is in viewport
        if (scrollPosition + windowHeight > aboutPosition && 
            scrollPosition < aboutPosition + aboutSection.offsetHeight) {

            // Calculate parallax offset
            const offset = (scrollPosition - aboutPosition) * 0.4;
            parallaxBg.style.transform = `translateY(${offset}px)`;

            // Move content in opposite direction for enhanced effect
            const aboutContent = aboutSection.querySelector('.about-content');
            if (aboutContent) {
                aboutContent.style.transform = `translateY(${-offset * 0.2}px)`;
            }

            // Add 3D tilt effect based on scroll position
            const tiltAngle = (scrollPosition - aboutPosition) / 20;
            aboutSection.style.perspective = '1000px';
            aboutContent.style.transform += ` rotateX(${Math.min(5, tiltAngle)}deg)`;
        }
    });

    // Add hover effect to the about section
    aboutSection.addEventListener('mousemove', function(e) {
        const aboutContent = aboutSection.querySelector('.about-content');
        if (!aboutContent) return;

        // Calculate mouse position relative to the section
        const rect = aboutSection.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation based on mouse position
        const rotateY = ((mouseX / rect.width) - 0.5) * 5;
        const rotateX = ((mouseY / rect.height) - 0.5) * -5;

        // Apply subtle rotation effect
        aboutContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset transform on mouse leave
    aboutSection.addEventListener('mouseleave', function() {
        const aboutContent = aboutSection.querySelector('.about-content');
        if (aboutContent) {
            aboutContent.style.transform = '';
        }
    });
}

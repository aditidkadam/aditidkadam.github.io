/*
   Case Study Enhancements for Aditi Kadam's Portfolio
   This file contains JavaScript functionality to enhance the case study pages
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all case study enhancements
    initCaseStudyLayout();
    initSectionAnimations();
    initTableOfContents();
    initScreenshotLightbox();
    initProgressIndicator();
    initFloatingActions();
    enhanceInsightCards();
    addReadingTimeEstimate();
    initSectionHighlighting();
    addToolTips();
    initCodeBlocks();
});

// Set up the case study layout with table of contents
function initCaseStudyLayout() {
    const projectContent = document.querySelector('.project-case-study .container');
    if (!projectContent) return;

    // Add the case-study-layout class to the container
    projectContent.classList.add('case-study-layout');

    // Create table of contents
    const toc = document.createElement('div');
    toc.className = 'case-study-toc';
    toc.innerHTML = `
        <h3><i class="fas fa-list"></i> Table of Contents</h3>
        <ul class="toc-links"></ul>
    `;

    // Insert TOC at the beginning of the content
    const projectHeader = document.querySelector('.project-header');
    if (projectHeader) {
        projectHeader.parentNode.insertBefore(toc, projectHeader.nextSibling);
    } else {
        projectContent.insertBefore(toc, projectContent.firstChild);
    }

    // Make TOC header collapsible
    const tocHeader = toc.querySelector('h3');
    const tocLinks = toc.querySelector('.toc-links');

    tocHeader.addEventListener('click', function() {
        tocHeader.classList.toggle('collapsed');
        tocLinks.classList.toggle('collapsed');
    });
}

// Animate sections as they come into view
function initSectionAnimations() {
    const sections = document.querySelectorAll('.project-section, .project-header');

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }

    // Function to add visible class to elements in viewport
    function checkVisibility() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }

    // Initial check
    checkVisibility();

    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
}

// Create and populate table of contents
function initTableOfContents() {
    const tocLinks = document.querySelector('.toc-links');
    if (!tocLinks) return;

    const sections = document.querySelectorAll('.project-section');

    // Add IDs to sections if they don't have them
    sections.forEach((section, index) => {
        if (!section.id) {
            // Get heading text or use default
            const heading = section.querySelector('h2');
            const headingText = heading ? heading.textContent.trim() : `section-${index + 1}`;

            // Create ID from heading text
            const id = headingText
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            section.id = id;
        }

        // Add link to TOC
        const heading = section.querySelector('h2');
        if (heading) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${section.id}">${heading.textContent}</a>`;
            tocLinks.appendChild(li);
        }
    });

    // Highlight active section in TOC
    function updateActiveTOCLink() {
        const tocItems = tocLinks.querySelectorAll('li');

        // Find the section that's currently in view
        let activeSection = null;
        let smallestDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);

            if (distance < smallestDistance && rect.top <= 100) {
                smallestDistance = distance;
                activeSection = section;
            }
        });

        // Update active class in TOC
        if (activeSection) {
            tocItems.forEach(item => {
                const link = item.querySelector('a');
                if (link && link.getAttribute('href') === `#${activeSection.id}`) {
                    item.classList.add('active');
                    link.classList.add('active');
                } else {
                    item.classList.remove('active');
                    if (link) link.classList.remove('active');
                }
            });
        }
    }

    // Initial update
    updateActiveTOCLink();

    // Update on scroll
    window.addEventListener('scroll', updateActiveTOCLink);

    // Smooth scroll to section when TOC link is clicked
    tocLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90, // Adjust for navbar and spacing
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize lightbox for screenshots
function initScreenshotLightbox() {
    const screenshots = document.querySelectorAll('.screenshot');
    if (screenshots.length === 0) return;

    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img class="lightbox-img" src="" alt="Screenshot">
            <div class="lightbox-close">&times;</div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Get lightbox elements
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Open lightbox when screenshot is clicked
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox when close button is clicked
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

// Initialize progress indicator for case study
function initProgressIndicator() {
    // Create progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'case-study-progress';
    progressIndicator.innerHTML = '<div class="case-study-progress-bar"></div>';
    document.body.appendChild(progressIndicator);

    const progressBar = progressIndicator.querySelector('.case-study-progress-bar');

    // Update progress bar on scroll
    function updateProgress() {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = `${scrollPercentage}%`;
    }

    // Initial update
    updateProgress();

    // Update on scroll
    window.addEventListener('scroll', updateProgress);
}

// Initialize floating action buttons
function initFloatingActions() {
    // Create floating actions container
    const floatingActions = document.createElement('div');
    floatingActions.className = 'floating-actions';

    // Add back to top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'floating-btn';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.title = 'Back to top';
    floatingActions.appendChild(backToTopBtn);

    // Add share button
    const shareBtn = document.createElement('div');
    shareBtn.className = 'floating-btn';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
    shareBtn.title = 'Share this case study';
    floatingActions.appendChild(shareBtn);

    // Add print-friendly version button
    const printBtn = document.createElement('div');
    printBtn.className = 'floating-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i>';
    printBtn.title = 'Print-friendly version';
    floatingActions.appendChild(printBtn);

    // Add dark mode toggle button
    const darkModeBtn = document.createElement('div');
    darkModeBtn.className = 'floating-btn';
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.title = 'Toggle dark mode';
    floatingActions.appendChild(darkModeBtn);

    // Add to body
    document.body.appendChild(floatingActions);

    // Show/hide buttons based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            setTimeout(() => {
                backToTopBtn.classList.add('visible');
            }, 100);
            setTimeout(() => {
                shareBtn.classList.add('visible');
            }, 200);
            setTimeout(() => {
                printBtn.classList.add('visible');
            }, 300);
            setTimeout(() => {
                darkModeBtn.classList.add('visible');
            }, 400);
        } else {
            backToTopBtn.classList.remove('visible');
            shareBtn.classList.remove('visible');
            printBtn.classList.remove('visible');
            darkModeBtn.classList.remove('visible');
        }
    });

    // Scroll to top when back to top button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Share functionality
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href
            })
            .catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = window.location.href;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            // Show a notification
            alert('URL copied to clipboard!');
        }
    });

    // Print-friendly version functionality
    printBtn.addEventListener('click', function() {
        // Add print-friendly class to body
        document.body.classList.add('print-friendly');

        // Create print notification
        const printNotification = document.createElement('div');
        printNotification.className = 'print-notification';
        printNotification.innerHTML = `
            <div class="print-notification-content">
                <h3>Print-Friendly Version</h3>
                <p>The page has been optimized for printing. Press Ctrl+P (or Cmd+P on Mac) to print or save as PDF.</p>
                <button class="btn primary-btn cancel-print">Cancel</button>
            </div>
        `;
        document.body.appendChild(printNotification);

        // Show notification
        setTimeout(() => {
            printNotification.classList.add('active');
        }, 10);

        // Cancel print mode
        const cancelPrintBtn = printNotification.querySelector('.cancel-print');
        cancelPrintBtn.addEventListener('click', function() {
            document.body.classList.remove('print-friendly');
            printNotification.classList.remove('active');

            // Remove notification after animation
            setTimeout(() => {
                document.body.removeChild(printNotification);
            }, 300);
        });
    });

    // Dark mode toggle functionality
    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeBtn.title = 'Toggle light mode';
        } else {
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeBtn.title = 'Toggle dark mode';
        }

        // Save preference to localStorage
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeBtn.title = 'Toggle light mode';
    }
}

// Enhance insight cards with expandable content
function enhanceInsightCards() {
    const insightCards = document.querySelectorAll('.insight-card');

    insightCards.forEach(card => {
        // Store original height
        const originalHeight = card.offsetHeight;
        const content = card.querySelector('p');

        // Check if content is long enough to truncate
        if (content && content.scrollHeight > content.offsetHeight) {
            // Add expand/collapse functionality
            card.classList.add('expandable');

            // Add expand button
            const expandBtn = document.createElement('div');
            expandBtn.className = 'expand-btn';
            expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Read more';
            card.appendChild(expandBtn);

            // Toggle expanded state
            card.addEventListener('click', function() {
                if (card.classList.contains('expanded')) {
                    card.classList.remove('expanded');
                    expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Read more';
                    card.style.height = originalHeight + 'px';
                } else {
                    card.classList.add('expanded');
                    expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Read less';
                    card.style.height = 'auto';
                }
            });
        }
    });
}

// Add reading time estimate to the case study
function addReadingTimeEstimate() {
    const projectContent = document.querySelector('.project-case-study .container');
    if (!projectContent) return;

    // Get all text content
    const text = projectContent.textContent;

    // Calculate reading time (average reading speed: 200 words per minute)
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Create reading time element
    const readingTimeEl = document.createElement('div');
    readingTimeEl.className = 'reading-time';
    readingTimeEl.innerHTML = `
        <i class="far fa-clock"></i> ${readingTime} min read
    `;

    // Add to project header
    const projectHeader = document.querySelector('.project-header');
    if (projectHeader) {
        projectHeader.appendChild(readingTimeEl);
    }
}

// Highlight sections as they come into view
function initSectionHighlighting() {
    const sections = document.querySelectorAll('.project-section');

    function highlightSection() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.top <= window.innerHeight * 0.5
            );

            if (isInView) {
                section.classList.add('highlight');

                // Remove highlight after animation completes
                setTimeout(() => {
                    section.classList.remove('highlight');
                }, 1000);
            }
        });
    }

    // Check on scroll
    window.addEventListener('scroll', highlightSection);
}

// Add tooltips to technical terms
function addToolTips() {
    const projectContent = document.querySelector('.project-case-study .container');
    if (!projectContent) return;

    // Define technical terms and their explanations
    const technicalTerms = {
        'Python': 'A high-level programming language known for its readability and versatility.',
        'Pandas': 'A data manipulation and analysis library for Python.',
        'NumPy': 'A library for numerical computations in Python.',
        'Matplotlib': 'A plotting library for Python.',
        'Seaborn': 'A statistical data visualization library based on Matplotlib.',
        'Scikit-learn': 'A machine learning library for Python.',
        'RMSE': 'Root Mean Square Error, a measure of the differences between predicted and observed values.',
        'R-squared': 'A statistical measure that represents the proportion of variance in the dependent variable explained by the independent variables.',
        'ANOVA': 'Analysis of Variance, a statistical method used to test differences between two or more means.'
    };

    // Find and add tooltips to technical terms
    Object.keys(technicalTerms).forEach(term => {
        // Find all instances of the term
        const regex = new RegExp(`\\b${term}\\b`, 'g');
        const html = projectContent.innerHTML;

        // Replace with tooltip
        projectContent.innerHTML = html.replace(regex, `<span class="tooltip" data-tooltip="${technicalTerms[term]}">${term}</span>`);
    });
}

// Initialize code blocks with syntax highlighting
function initCodeBlocks() {
    // Check if there are any code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    if (codeBlocks.length === 0) return;

    // Create a simple syntax highlighting function
    function highlightSyntax(code) {
        // Replace keywords with highlighted spans
        const keywords = ['import', 'from', 'def', 'return', 'if', 'else', 'for', 'while', 'in', 'True', 'False', 'None'];
        let highlightedCode = code;

        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="keyword">${keyword}</span>`);
        });

        // Highlight strings
        highlightedCode = highlightedCode.replace(/(["'])(.*?)\1/g, '<span class="string">$&</span>');

        // Highlight comments
        highlightedCode = highlightedCode.replace(/(#.*)$/gm, '<span class="comment">$1</span>');

        return highlightedCode;
    }

    // Apply syntax highlighting to each code block
    codeBlocks.forEach(block => {
        const code = block.textContent;
        block.innerHTML = highlightSyntax(code);
    });
}

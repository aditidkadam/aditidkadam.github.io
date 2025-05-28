/*
   Aditi Kadam - Data Analyst Portfolio
   Projects JavaScript File
   Author: AI Assistant
   Date: 2025
*/

// Array of project objects
const projects = [
    {
        id: 1,
        title: "Ghost Jobs Detection",
        description: "Used machine learning algorithms to identify fraudulent job postings by analyzing patterns and anomalies in job listing data.",
        image: "images/ghost-job-image.png",
        github: "https://github.com/aditidkadam/ghost_jobs_detection",
        categories: ["ml", "nlp"]
    },
    {
        id: 2,
        title: "Diamond Price Analysis (0.7–0.89ct)",
        description: "Conducted statistical analysis on diamond pricing factors, focusing on the 0.7-0.89ct range to identify key value determinants.",
        image: "images/diamond-image.png",
        github: "https://github.com/aditidkadam/Comprehensive-Analysis-of-Round-Shape-Diamonds-0.7ct-0.89ct-",
        categories: ["visualization", "ml"]
    },
    {
        id: 3,
        title: "Smart Pricing for Ride-Sharing Apps",
        description: "Developed a dynamic pricing model for ride-sharing services using historical data, demand patterns, and external factors.",
        image: "images/smart-pricing.avif",
        github: "https://github.com/aditidkadam/Smart-pricing-strategies-for-ride-sharing-apps-",
        categories: ["ml"]
    },
    {
        id: 4,
        title: "HubSpot Contact Analysis",
        description: "Created interactive dashboards to analyze customer engagement patterns and optimize marketing strategies using HubSpot data.",
        image: "images/hubspot-logo.png",
        github: "https://github.com/aditidkadam/HubSpot_Contact_Analysis",
        categories: ["visualization"]
    },
    {
        id: 5,
        title: "DataCamp Projects",
        description: "A collection of data analysis and visualization projects completed on the DataCamp platform.",
        image: "images/datacamp-logo.png",
        github: "https://github.com/aditidkadam/Data_camp_projects",
        categories: ["visualization", "ml"]
    }
];

// Function to create project cards
function createProjectCard(project) {
    // Create the main card element
    const card = document.createElement('div');
    card.className = `project-card ${project.categories.join(' ')}`;

    // Create the HTML structure for the card
    card.innerHTML = `
        <div class="project-img-container">
            <img src="${project.image}" class="project-img" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <a href="${project.github}" target="_blank" class="project-link">
                <i class="fab fa-github"></i> View on GitHub
            </a>
        </div>
    `;

    return card;
}

// Function to load projects
function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');

    // Check if the container exists
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    // Clear the container
    projectsContainer.innerHTML = '';

    // Create and append project cards
    projects.forEach(project => {
        const card = createProjectCard(project);
        projectsContainer.appendChild(card);
    });
}

// Load projects when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadProjects);

// Function to handle project filtering
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the filter value
            const filterValue = this.getAttribute('data-filter');

            // Get all project cards
            const projectCards = document.querySelectorAll('.project-card');

            // Toggle active class on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter the projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Setup filters when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupProjectFilters);

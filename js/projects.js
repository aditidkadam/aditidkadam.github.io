/*
   Aditi Kadam - Data Analyst Portfolio
   Projects JavaScript File
   Author: AI Assistant
   Date: 2025
*/

// Array of project objects
const projects = [
    {
        id: 10,
        title: "COVID-19 Data Analysis",
        description: "Explored the global impact of COVID-19 using Tableau visualizations to uncover trends in deaths, comorbidities, policy response, and healthcare strain.",
        image: "images/Covid card image.webp",
        github: "https://github.com/aditidkadam/Covid-19-Data-Analysis",
        categories: ["visualization"]
    },
    {
        id: 1,
        title: "Netflix Data Analysis",
        description: "I explored trends across Netflix's global content catalog using Python. From genre popularity to country-based contributions, I uncovered what makes Netflix's content strategy tick.",
        image: "images/netflix-logo.png",
        github: "https://github.com/aditidkadam/NETFLIX-DATA-ANALYSIS",
        categories: ["visualization", "ml"]
    },
    {
        id: 2,
        title: "Movie Data Portfolio",
        description: "This project dives into what makes a movie successful — analyzing revenue, IMDb scores, genres, and more. It's where storytelling meets data science.",
        image: "images/movie data portfolio.jpeg",
        github: "https://github.com/aditidkadam/Movie_Data_Portfolio",
        categories: ["visualization", "ml"]
    },
    {
        id: 3,
        title: "Manufacturing Quality Control",
        description: "I used SQL to simulate a real-time quality control system on a manufacturing line. It calculates rolling averages, control limits, and flags parts that fall out of spec.",
        image: "images/quality_control.png",
        github: "https://github.com/aditidkadam/Manufacturing-Quality-Control/blob/main/README.md",
        categories: ["visualization"]
    },
    {
        id: 4,
        title: "Excel-Based Operations Dashboard",
        description: "Built a full dashboard in Excel to track order flow, delivery delays, and department performance using charts, KPIs, and slicers — no code required.",
        image: "images/operational_management.jpeg",
        github: "https://github.com/aditidkadam/Excel-Based-Operations-Management-Dashboard",
        categories: ["visualization"]
    },
    {
        id: 5,
        title: "Ghost Jobs Detection",
        description: "Used machine learning algorithms to identify fraudulent job postings by analyzing patterns and anomalies in job listing data.",
        image: "images/ghost-job-image.png",
        github: "https://github.com/aditidkadam/ghost_jobs_detection",
        categories: ["ml", "nlp"]
    },
    {
        id: 6,
        title: "Diamond Price Analysis (0.7–0.89ct)",
        description: "Conducted statistical analysis on diamond pricing factors, focusing on the 0.7-0.89ct range to identify key value determinants.",
        image: "images/diamond-image.png",
        github: "https://github.com/aditidkadam/Comprehensive-Analysis-of-Round-Shape-Diamonds-0.7ct-0.89ct-",
        categories: ["visualization", "ml"]
    },
    {
        id: 7,
        title: "Smart Pricing for Ride-Sharing Apps",
        description: "Developed a dynamic pricing model for ride-sharing services using historical data, demand patterns, and external factors.",
        image: "images/smart-pricing.avif",
        github: "https://github.com/aditidkadam/Smart-pricing-strategies-for-ride-sharing-apps-",
        categories: ["ml"]
    },
    {
        id: 8,
        title: "HubSpot Contact Analysis",
        description: "Created interactive dashboards to analyze customer engagement patterns and optimize marketing strategies using HubSpot data.",
        image: "images/hubspot-logo.png",
        github: "https://github.com/aditidkadam/HubSpot_Contact_Analysis",
        categories: ["visualization"]
    },
    {
        id: 9,
        title: "DataCamp Projects",
        description: "A collection of data analysis and visualization projects completed on the DataCamp platform.",
        image: "images/datacamp-logo.png",
        github: "https://github.com/aditidkadam/Data_camp_projects",
        categories: ["visualization", "ml"]
    }
];

// Function to get the filename for a project based on its ID
function getProjectFileName(id) {
    switch(id) {
        case 1:
            return "netflix-data-analysis.html";
        case 2:
            return "movie-data-portfolio.html";
        case 3:
            return "manufacturing-quality-control.html";
        case 4:
            return "excel-operations-dashboard.html";
        case 5:
            return "ghost-jobs-detection.html";
        case 6:
            return "diamond-price-analysis.html";
        case 7:
            return "smart-pricing-ride-sharing.html";
        case 8:
            return "hubspot-contact-analysis.html";
        case 9:
            return "datacamp-projects.html";
        case 10:
            return "covid-19-data-analysis.html";
        default:
            return "#";
    }
}

// Function to create project cards
function createProjectCard(project) {
    // Create the main card element
    const card = document.createElement('div');
    card.className = `project-card ${project.categories.join(' ')}`;

    // Get the project URL
    const projectUrl = `projects/${getProjectFileName(project.id)}`;

    // Create the HTML structure for the card
    card.innerHTML = `
        <a href="${projectUrl}" class="card-link" style="display: block; text-decoration: none; color: inherit;">
            <div class="project-img-container">
                <img src="${project.image}" class="project-img" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <span class="project-link">
                    <i class="fas fa-book-open"></i> View Case Study
                </span>
            </div>
        </a>
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

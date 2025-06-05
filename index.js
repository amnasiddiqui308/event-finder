// Sample event data
const events = [
    {
        id: 1,
        name: "Summer Music Festival",
        date: "2025-07-15",
        time: "18:00",
        location: "Central Park",
        description: "Join us for the biggest music festival of the summer featuring top artists from around the world.",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Art Exhibition Opening",
        date: "2025-06-20",
        time: "10:00",
        location: "Modern Art Museum",
        description: "Experience the latest contemporary art from emerging artists in this exclusive exhibition.",
        image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Food & Drinks Tasting",
        date: "2025-07-05",
        time: "19:30",
        location: "Downtown Plaza",
        description: "Sample gourmet foods and drinks from local producers and international vendors.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Tech Conference 2025",
        date: "2025-08-12",
        time: "09:00",
        location: "Convention Center",
        description: "Learn about the latest trends in technology from industry leaders and innovators.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Yoga in the Park",
        date: "2025-06-25",
        time: "08:00",
        location: "Riverside Park",
        description: "Start your weekend with a relaxing yoga session surrounded by nature.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
];

// DOM Elements
const eventsContainer = document.getElementById('eventsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Display events
function displayEvents(eventsToDisplay) {
    eventsContainer.innerHTML = '';
    
    if (eventsToDisplay.length === 0) {
        eventsContainer.innerHTML = '<p class="no-events">No events found matching your search.</p>';
        return;
    }
    
    eventsToDisplay.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        eventCard.innerHTML = `
            <div class="event-image" style="background-image: url('${event.image}')"></div>
            <div class="event-content">
                <h3>${event.name}</h3>
                <div class="event-meta">
                    <span><i class="far fa-calendar-alt"></i> ${formatDate(event.date)} at ${event.time}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <a href="#" class="register-btn">Register</a>
            </div>
        `;
        
        eventsContainer.appendChild(eventCard);
    });
}

// Format date to be more readable
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Filter events based on search input
function filterEvents() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
    );
    
    displayEvents(filteredEvents);
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    // For this demo, we'll just show a success message
    formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
    formMessage.className = 'success';
    formMessage.style.display = 'block';
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').substring(1);
        if (linkHref === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenu.style.display = 'none';
            }
        });
    });
}

// Initialize the page
function init() {
    // Display all events initially
    displayEvents(events);
    
    // Set up event listeners
    searchBtn.addEventListener('click', filterEvents);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterEvents();
        }
    });
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    setupSmoothScrolling();
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Set initial active nav link
    updateActiveNavLink();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
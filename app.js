// Create light particles
function createStarHeadliner() {
    const container = document.getElementById("light-particles");
    container.innerHTML = ""; // Clear any existing particles

    // Set background to dark
    container.style.backgroundColor = "#000814";

    const particleCount = 1000; // More stars for dense coverage

    // Create different types of stars
    const starTypes = [
        { size: [1, 2], count: 580, blur: 0, opacity: [0.4, 0.8], color: "white" }, // Tiny distant stars
        { size: [2, 3], count: 300, blur: 0.5, opacity: [0.6, 1], color: "white" }, // Medium stars
        { size: [3, 5], count: 100, blur: 1, opacity: [0.7, 1], color: "white" }, // Larger stars
        { size: [4, 6], count: 20, blur: 2, opacity: [0.8, 1], color: "#8bcdff" }, // Blue-tinted feature stars
    ];

    // Track total particles to create
    let totalCreated = 0;

    // Create each type of star
    starTypes.forEach((type) => {
        for (let i = 0; i < type.count && totalCreated < particleCount; i++) {
            const star = document.createElement("div");
            star.classList.add("star-particle");

            // Random size within range
            const size = Math.random() * (type.size[1] - type.size[0]) + type.size[0];
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Random position - ensure good distribution
            const posX = Math.random() * 98 + 1; // 1-99% (avoid edges)
            const posY = Math.random() * 98 + 1; // 1-99% (avoid edges)
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;

            // Apply star styles
            star.style.position = "absolute";
            star.style.borderRadius = "50%";
            star.style.backgroundColor = type.color;
            star.style.filter = `blur(${type.blur}px)`;

            // Random opacity within range
            const opacity =
                Math.random() * (type.opacity[1] - type.opacity[0]) + type.opacity[0];
            star.style.opacity = opacity;

            // Star twinkling effect
            const twinkleDelay = Math.random() * 10; // Random start time
            const twinkleDuration = Math.random() * 3 + 2; // 2-5 seconds
            star.style.animation = `twinkle ${twinkleDuration}s ease-in-out ${twinkleDelay}s infinite`;

            // Add star to container
            container.appendChild(star);
            totalCreated++;
        }
    });

    // Add occasional shooting stars
    setInterval(createShootingStar, 6000);

    // Add CSS for animations if needed
    if (!document.getElementById("star-styles")) {
        const styleSheet = document.createElement("style");
        styleSheet.id = "star-styles";
        styleSheet.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
      
      @keyframes shoot {
        0% { 
          transform: translate(0, 0) rotate(-45deg) scale(0);
          opacity: 0;
        }
        10% {
          transform: translate(-20px, 20px) rotate(-45deg) scale(1);
          opacity: 1;
        }
        100% { 
          transform: translate(-200px, 200px) rotate(-45deg) scale(0.2);
          opacity: 0;
        }
      }
      
      .shooting-star {
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        border-radius: 50%;
        box-shadow: 0 0 3px 1px white;
        transform-origin: 100% 0;
      }
    `;
        document.head.appendChild(styleSheet);
    }
}

function createShootingStar() {
    const container = document.getElementById("light-particles");
    const shootingStar = document.createElement("div");
    shootingStar.classList.add("shooting-star");

    // Start from random position at top portion of container
    const startX = Math.random() * 80 + 20; // 20-100%
    const startY = Math.random() * 30; // 0-30%

    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;

    // Randomize shooting star properties
    const length = Math.random() * 30 + 20; // Length of trail
    shootingStar.style.width = `${length}px`;
    shootingStar.style.height = "2px";

    // Random animation duration (faster = more dramatic)
    const duration = Math.random() * 0.3 + 1; // 0.3-1s
    shootingStar.style.animation = `shoot ${duration}s linear forwards`;

    // Add to container and remove when animation complete
    container.appendChild(shootingStar);
    setTimeout(() => {
        shootingStar.remove();
    }, duration * 1000);
}

// Add required CSS
function addHeadlinerStyles() {
    const style = document.createElement("style");
    style.textContent = `
    #light-particles {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #000814;
    }
    
    .star-particle {
      position: absolute;
      border-radius: 50%;
    }
  `;
    document.head.appendChild(style);
}

// Initialize
function initStarHeadliner() {
    addHeadlinerStyles();
    createStarHeadliner();
}

// Create floating effect for background
function animateBackground() {
    const background = document.querySelector(".animated-background");

    setInterval(() => {
        const xPos = Math.random() * 10 - 5;
        const yPos = Math.random() * 10 - 5;

        background.style.transform = `translate(${xPos}px, ${yPos}px)`;
        background.style.transition = "transform 8s ease-in-out";
    }, 8000);
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "0.8rem 0";
            header.style.background = "rgba(18, 18, 18, 0.95)";
        } else {
            header.style.padding = "1.5rem 0";
            header.style.background = "rgba(18, 18, 18, 0.9)";
        }
    });
}

// Mobile navigation
function setupMobileNav() {
    const navToggle = document.getElementById("nav-toggle");
    const closeNav = document.getElementById("close-nav");
    const nav = document.getElementById("main-nav");
    const navLinks = nav.querySelectorAll("a");

    navToggle.addEventListener("click", () => {
        nav.classList.add("active");
    });

    closeNav.addEventListener("click", () => {
        nav.classList.remove("active");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
}

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
    initStarHeadliner();
    animateBackground();
    handleHeaderScroll();
    setupMobileNav();

    // Animate services cards and gallery items on scroll
    const animatedElements = document.querySelectorAll(
        ".service-card, .gallery-item",
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 },
    );

    animatedElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s, transform 0.6s";
        observer.observe(element);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Get modal elements
    const modal = document.getElementById("consultation-modal");
    const closeModalBtn = document.querySelector(".close-modal");
    const consultationForm = document.getElementById("consultation-form");
    const formSuccess = document.getElementById("form-success");
    const closeSuccessBtn = document.querySelector(".close-success");

    // Get all CTA buttons
    const ctaButtons = document.querySelectorAll(".cta-button");

    // Open modal when CTA is clicked
    ctaButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal when clicking close button or outside
    closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close success message
    closeSuccessBtn.addEventListener("click", () => {
        closeModal();
        // Reset the form view after closing
        setTimeout(() => {
            formSuccess.classList.add("hidden");
            consultationForm.style.display = "block";
        }, 300);
    });

    // Handle form submission
    consultationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(consultationForm);

        // Make sure the form data is submitted to Formspree
        fetch("https://formsubmit.co/ajax/anthonywalcott31@gmail.com", {
                // Replace with your FormSubmit endpoint
                method: "POST",
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                // Show success message
                consultationForm.style.display = "none";
                formSuccess.classList.remove("hidden");

                // Reset form for next time
                consultationForm.reset();

                // Optionally, log the response from Formspree
                console.log("Form submitted successfully:", data);
            })
            .catch((error) => {
                // Handle any errors that occur during the form submission
                console.error("Form submission error:", error);
                // Optionally show an error message
            });

        // Disable the submit button and show loading text
        const sendButton = document.querySelector(".submit-button");
        sendButton.textContent = "Sending...";
        sendButton.disabled = true;
    });

    // Functions to open and close modal
    function openModal() {
        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
        const sendButton = document.querySelector(".submit-button");
        sendButton.textContent = "Submit";
        sendButton.disabled = false;
    }

    function closeModal() {
        modal.classList.remove("show");
        document.body.style.overflow = ""; // Restore scrolling
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Get all "Learn more" buttons
    const serviceLinks = document.querySelectorAll(".service-link");

    // Get modal elements
    const pricingModal = document.getElementById("pricing-modal");
    const closePricingBtn = pricingModal.querySelector(".close-modal");
    const pricingTitle = document.getElementById("pricing-title");
    const pricingContents = document.querySelectorAll(".pricing-content");

    // Function to open pricing modal with specific service
    function openPricingModal(serviceId) {
        // Hide all pricing content first
        pricingContents.forEach((content) => {
            content.classList.remove("active");
        });

        // Show the selected service pricing
        const selectedPricing = document.getElementById(`${serviceId}-pricing`);
        if (selectedPricing) {
            selectedPricing.classList.add("active");

            // Update modal title based on service
            const serviceTitle = selectedPricing.querySelector("h3").textContent;
            pricingTitle.textContent = `${serviceTitle} Pricing`;
        }

        // Show the modal
        pricingModal.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    // Add click event to each "Learn more" button
    serviceLinks.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Get the service name from the h3 text in the parent card
            const serviceCard = link.closest(".service-card");
            const serviceTitle = serviceCard.querySelector("h3").textContent;

            // Convert service title to ID format (lowercase, hyphenated)
            const serviceId = serviceTitle.toLowerCase().replace(/\s+/g, "-");

            // Open the pricing modal for this service
            openPricingModal(serviceId);
        });
    });

    // Close modal when clicking close button or outside
    closePricingBtn.addEventListener("click", closePricingModal);
    pricingModal.addEventListener("click", (e) => {
        if (e.target === pricingModal) {
            closePricingModal();
        }
    });

    // Function to close pricing modal
    function closePricingModal() {
        pricingModal.classList.remove("show");
        document.body.style.overflow = ""; // Restore scrolling
    }

    // Function to open consultation modal from pricing
    window.openConsultationModal = function() {
        // Close the pricing modal first
        closePricingModal();

        // Then open the consultation modal
        setTimeout(() => {
            const consultationModal = document.getElementById("consultation-modal");
            consultationModal.classList.add("show");
            document.body.style.overflow = "hidden";
        }, 300); // Small delay for better transition
    };
});

// Gallery Slideshow Functionality
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const thumbnails = document.querySelectorAll(".thumbnail");
let isAnimating = false;

// Initialize the gallery
showSlide(slideIndex);

function changeSlide(n) {
    if (isAnimating) return;
    isAnimating = true;

    // Calculate new index with wrap-around
    const newIndex = (slideIndex + n + slides.length) % slides.length;

    // Add outgoing animation to current slide
    slides[slideIndex].classList.add("slide-out");

    // After animation completes, switch slides
    setTimeout(() => {
        slides[slideIndex].classList.remove("active-slide", "slide-out");
        slideIndex = newIndex;
        showSlide(slideIndex);
        isAnimating = false;
    }, 500); // Match this duration with your CSS animation
}

function showSlide(n) {
    // Reset all slides and thumbnails
    slides.forEach((slide) => {
        slide.classList.remove("active-slide", "slide-out");
    });

    thumbnails.forEach((thumb) => {
        thumb.classList.remove("active");
    });

    // Activate new slide and thumbnail
    slides[n].classList.add("active-slide");
    thumbnails[n].classList.add("active");
}

// Event listeners for navigation
document.querySelector(".next").addEventListener("click", () => changeSlide(1));
document
    .querySelector(".prev")
    .addEventListener("click", () => changeSlide(-1));

// Event listeners for thumbnails
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        if (index !== slideIndex && !isAnimating) {
            isAnimating = true;
            slides[slideIndex].classList.add("slide-out");

            setTimeout(() => {
                slides[slideIndex].classList.remove("active-slide", "slide-out");
                slideIndex = index;
                showSlide(slideIndex);
                isAnimating = false;
            }, 500);
        }
    });
});

document.querySelectorAll(".services .service-card").forEach((card) => {
    const images = card.querySelector(".service-images");
    const prevBtn = card.querySelector(".prev");
    const nextBtn = card.querySelector(".next");
    const dots = card.querySelectorAll(".image-dot");
    let currentIndex = 0;

    function updateImages() {
        images.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + 5) % 5;
        updateImages();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % 5;
        updateImages();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateImages();
        });
    });
});

// Smooth Scroll Implementation
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        multiplier: 1.18, // Adjust scroll speed (lower = slower)
        smartphone: {
            smooth: true,
        },
        tablet: {
            smooth: true,
        },
    });
    scroll.update()

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((anchorLink) => {
        anchorLink.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = anchorLink.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                scroll.scrollTo(target);
            }
        });
    });

    // Optional: Update scroll on window resize
    window.addEventListener("resize", () => {
        scroll.update();
    });

    function ScrollUpdateDelay() {
        setTimeout(function() { scroll.update(); }, 500);

    }

    ScrollUpdateDelay();
});
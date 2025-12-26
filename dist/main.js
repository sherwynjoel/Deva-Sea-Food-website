document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navLinks.classList.remove("open");
      }
    });
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate sections on scroll
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    observer.observe(section);
  });

  // Animate cards on scroll
  const cards = document.querySelectorAll(
    ".feature-card, .product-card, .column-card, .quality-item"
  );
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Header scroll effect
  let lastScroll = 0;
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.boxShadow = "none";
      }
      lastScroll = currentScroll;
    });
  }

  // Parallax effect removed to prevent banner layering issues

  // Contact Form Email Submission
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    // Initialize EmailJS (you'll need to replace with your actual public key)
    // Get your public key from https://dashboard.emailjs.com/admin/integration
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

    // Show message function
    const showMessage = (message, type = "success") => {
      formMessage.textContent = message;
      formMessage.className = `form-message form-message-${type}`;
      formMessage.style.display = "block";
      
      // Scroll to message
      formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    };

    // Handle form submission
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      
      // Get form data
      const formData = {
        name: document.getElementById("name").value.trim(),
        company: document.getElementById("company").value.trim(),
        email: document.getElementById("email").value.trim(),
        country: document.getElementById("country").value.trim(),
        requirements: document.getElementById("requirements").value.trim(),
      };

      // Basic validation
      if (!formData.name || !formData.company || !formData.email || !formData.country || !formData.requirements) {
        showMessage("Please fill in all required fields.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showMessage("Please enter a valid email address.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
        return;
      }

      try {
        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
        const response = await emailjs.send(
          "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
          "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
          {
            from_name: formData.name,
            from_company: formData.company,
            from_email: formData.email,
            from_country: formData.country,
            requirements: formData.requirements,
            to_email: "info@devaseafood.com", // Your receiving email
          }
        );

        if (response.status === 200) {
          showMessage("Thank you! Your enquiry has been sent successfully. We'll get back to you soon.", "success");
          contactForm.reset();
        }
      } catch (error) {
        console.error("Email sending error:", error);
        showMessage("Sorry, there was an error sending your message. Please try again or contact us directly.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
      }
    });
  }

  // Auto-scrolling certifications animation
  const certificationsGrid = document.querySelector(".certifications-grid");
  if (certificationsGrid) {
    let scrollPosition = 0;
    const scrollSpeed = 0.8; // pixels per frame
    let isPaused = false;
    let animationFrameId;
    let isUserInteracting = false;

    // Duplicate certifications for seamless infinite loop
    const certifications = Array.from(certificationsGrid.querySelectorAll(".certification-item"));
    const originalCount = certifications.length;
    
    // Clone all items to create seamless loop
    certifications.forEach((item) => {
      const clone = item.cloneNode(true);
      certificationsGrid.appendChild(clone);
    });

    // Calculate the width of one set of certifications
    const getSingleSetWidth = () => {
      let width = 0;
      for (let i = 0; i < originalCount; i++) {
        const item = certifications[i];
        if (item) {
          width += item.offsetWidth + 24; // 24px is the gap (1.5rem)
        }
      }
      return width;
    };

    // Auto-scroll function
    const autoScroll = () => {
      if (!isPaused && !isUserInteracting) {
        scrollPosition += scrollSpeed;
        const singleSetWidth = getSingleSetWidth();
        
        // Reset position when we've scrolled through one complete set
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
        }
        
        certificationsGrid.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Pause on hover
    certificationsGrid.addEventListener("mouseenter", () => {
      isPaused = true;
    });

    certificationsGrid.addEventListener("mouseleave", () => {
      isPaused = false;
    });

    // Pause on touch/mouse interaction (mobile and desktop)
    certificationsGrid.addEventListener("mousedown", () => {
      isUserInteracting = true;
      isPaused = true;
    });

    certificationsGrid.addEventListener("mouseup", () => {
      setTimeout(() => {
        isUserInteracting = false;
        isPaused = false;
      }, 1500);
    });

    certificationsGrid.addEventListener("touchstart", () => {
      isUserInteracting = true;
      isPaused = true;
    });

    certificationsGrid.addEventListener("touchend", () => {
      setTimeout(() => {
        isUserInteracting = false;
        isPaused = false;
      }, 2000);
    });

    // Start animation after a short delay
    setTimeout(() => {
      autoScroll();
    }, 500);

    // Cleanup on page unload
    window.addEventListener("beforeunload", () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });
  }
});



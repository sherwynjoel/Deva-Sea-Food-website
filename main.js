// Ensure animations work even if DOM is already loaded
const initAllAnimations = () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  // Mobile navigation handling
  if (navToggle && navLinks) {
    // Toggle menu
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("open");
      navToggle.classList.toggle("active");
      // Prevent body scroll when menu is open on mobile
      if (navLinks.classList.contains("open")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    });

    // Close menu when clicking on a link
    navLinks.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navLinks.classList.remove("open");
        navToggle.classList.remove("active");
        body.style.overflow = "";
      }
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener("click", (event) => {
      if (navLinks.classList.contains("open")) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle) {
          navLinks.classList.remove("open");
          navToggle.classList.remove("active");
          body.style.overflow = "";
        }
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.classList.remove("active");
        body.style.overflow = "";
      }
    });

    // Prevent menu from closing when clicking inside it
    navLinks.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Scroll-triggered animations with mobile performance optimization
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  // Fallback function if IntersectionObserver fails
  const animateElementsFallback = () => {
    const sections = document.querySelectorAll(".section");
    const cards = document.querySelectorAll(".feature-card, .product-card, .column-card, .quality-item");
    
    sections.forEach((section, index) => {
      section.classList.add('animate-ready');
      setTimeout(() => {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }, index * 100);
    });
    
    cards.forEach((card, index) => {
      card.classList.add('animate-ready');
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 50);
    });
  };

  // Try to use IntersectionObserver, fallback if not available
  if (typeof IntersectionObserver !== 'undefined') {
    const observerOptions = {
      threshold: prefersReducedMotion ? 0 : 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    try {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame for better performance on mobile
            requestAnimationFrame(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            });
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Animate sections on scroll
      const sections = document.querySelectorAll(".section");
      sections.forEach((section) => {
        // Add class for CSS fallback
        section.classList.add('animate-ready');
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
        // Add class for CSS fallback
        card.classList.add('animate-ready');
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
      });
    } catch (error) {
      console.warn('IntersectionObserver failed, using fallback:', error);
      animateElementsFallback();
    }
  } else {
    // IntersectionObserver not supported, use fallback
    animateElementsFallback();
  }

  // Smooth scroll for anchor links with mobile optimization
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // Close mobile menu if open
          if (navLinks && navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            body.style.overflow = "";
          }
          
          // Calculate offset based on screen size
          const isMobile = window.innerWidth <= 768;
          const headerOffset = isMobile ? 70 : 80;
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

  // Header scroll effect with animation
  let lastScroll = 0;
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.classList.add("scrolled");
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      } else {
        header.classList.remove("scrolled");
        header.style.boxShadow = "none";
      }
      lastScroll = currentScroll;
    });
  }

  // Add animation classes to elements on scroll
  const animatedElements = document.querySelectorAll(
    ".feature-card, .product-card, .column-card, .quality-item, .certification-item"
  );

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
        elementObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px) scale(0.95)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    elementObserver.observe(el);
  });

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

  // Auto-scrolling certifications carousel with seamless infinite loop
  const certificationsGrid = document.querySelector(".certifications-grid");
  const carouselWrapper = document.querySelector(".certifications-carousel-wrapper");
  const gradientLeft = document.querySelector(".carousel-gradient-left");
  const gradientRight = document.querySelector(".carousel-gradient-right");
  
  if (certificationsGrid && carouselWrapper) {
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame - smooth carousel speed
    let isPaused = false;
    let animationFrameId;
    let isUserInteracting = false;
    let singleSetWidth = 0;
    let isInitialized = false;

    // Get original certifications
    const certifications = Array.from(certificationsGrid.querySelectorAll(".certification-item"));
    const originalCount = certifications.length;
    
    if (originalCount === 0) return; // Exit if no certifications found
    
    // Clone items to create seamless infinite loop
    // We need at least 2 complete sets for seamless looping
    for (let i = 0; i < 2; i++) {
      certifications.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('data-clone', 'true'); // Mark as clone for debugging
        certificationsGrid.appendChild(clone);
      });
    }

    // Calculate the width of one set of certifications
    const calculateSingleSetWidth = () => {
      // Method 1: Measure actual rendered width (most accurate)
      if (certifications.length > 0) {
        const firstItem = certifications[0];
        const lastItem = certifications[originalCount - 1];
        
        if (firstItem && lastItem && firstItem.offsetLeft !== undefined && lastItem.offsetLeft !== undefined) {
          // Calculate from first item's left edge to last item's right edge
          const firstItemLeft = firstItem.offsetLeft;
          const lastItemRight = lastItem.offsetLeft + lastItem.offsetWidth;
          const measuredWidth = lastItemRight - firstItemLeft;
          
          if (measuredWidth > 0) {
            return measuredWidth;
          }
        }
      }
      
      // Method 2: Calculate manually (fallback)
      let width = 0;
      const gap = 24; // 1.5rem = 24px
      
      // Calculate width including gaps between items (but not after the last item)
      for (let i = 0; i < originalCount; i++) {
        const item = certifications[i];
        if (item && item.offsetWidth) {
          width += item.offsetWidth;
          // Add gap only if not the last item
          if (i < originalCount - 1) {
            width += gap;
          }
        }
      }
      
      return width;
    };

    // Update width calculation on resize
    const updateWidth = () => {
      singleSetWidth = calculateSingleSetWidth();
    };

    // Update width calculation on resize
    window.addEventListener("resize", () => {
      updateWidth();
      if (isInitialized) {
        updateGradients();
      }
    });

    // Update gradient opacity based on scroll position
    const updateGradients = () => {
      if (!gradientLeft || !gradientRight || !certificationsGrid) return;
      
      const scrollLeft = certificationsGrid.scrollLeft;
      const scrollWidth = certificationsGrid.scrollWidth;
      const clientWidth = certificationsGrid.clientWidth;
      const maxScroll = Math.max(scrollWidth - clientWidth, 0);
      
      // Left gradient: fade out when scrolled right
      // Show gradient when near the start (first 100px)
      const leftOpacity = scrollLeft < 100 ? Math.max(1 - (scrollLeft / 100), 0.3) : 0;
      gradientLeft.style.opacity = leftOpacity.toString();
      
      // Right gradient: fade out when scrolled to the end
      // Show gradient when near the end (last 100px)
      const rightOpacity = (maxScroll - scrollLeft) < 100 ? Math.max((maxScroll - scrollLeft) / 100, 0.3) : 1;
      gradientRight.style.opacity = rightOpacity.toString();
    };

    // Auto-scroll function with seamless infinite loop
    const autoScroll = () => {
      if (!isPaused && !isUserInteracting && singleSetWidth > 0) {
        scrollPosition += scrollSpeed;
        
        // When we've scrolled through one complete set, reset to 0
        // This is invisible because the duplicate set looks identical to the original
        if (scrollPosition >= singleSetWidth) {
          // Use modulo to ensure seamless reset without gaps
          scrollPosition = scrollPosition % singleSetWidth;
        }
        
        certificationsGrid.scrollLeft = scrollPosition;
        updateGradients();
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };
    
    // Update gradients on manual scroll
    certificationsGrid.addEventListener("scroll", updateGradients);

    // Pause on hover with smooth transition
    certificationsGrid.addEventListener("mouseenter", () => {
      isPaused = true;
      if (carouselWrapper) {
        carouselWrapper.style.cursor = 'grab';
      }
    });

    certificationsGrid.addEventListener("mouseleave", () => {
      isPaused = false;
      if (carouselWrapper) {
        carouselWrapper.style.cursor = 'default';
      }
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

    // Enhanced touch handling for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    certificationsGrid.addEventListener("touchstart", (e) => {
      isUserInteracting = true;
      isPaused = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    certificationsGrid.addEventListener("touchmove", (e) => {
      // Allow native scrolling
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      const diffX = Math.abs(touchCurrentX - touchStartX);
      const diffY = Math.abs(touchCurrentY - touchStartY);
      
      // If horizontal scroll is more than vertical, prevent default to allow horizontal scroll
      if (diffX > diffY) {
        // User is scrolling horizontally, keep paused
        isPaused = true;
      }
    }, { passive: true });

    certificationsGrid.addEventListener("touchend", () => {
      setTimeout(() => {
        isUserInteracting = false;
        isPaused = false;
      }, 2000);
    }, { passive: true });

    // Initialize carousel animation with better error handling
    const initializeCarousel = () => {
      if (isInitialized) return;
      
      try {
        // Wait for images to load, but don't wait forever
        const images = certificationsGrid.querySelectorAll('img');
        let imagesLoaded = 0;
        const totalImages = images.length;
        let timeoutId;
        
        // Set a maximum wait time (5 seconds)
        timeoutId = setTimeout(() => {
          console.log('Carousel: Timeout waiting for images, starting anyway');
          startCarousel();
        }, 5000);
        
        if (totalImages === 0) {
          // No images, start immediately
          clearTimeout(timeoutId);
          startCarousel();
          return;
        }
        
        const checkImagesLoaded = () => {
          imagesLoaded++;
          if (imagesLoaded >= totalImages) {
            clearTimeout(timeoutId);
            // All images loaded, start carousel
            setTimeout(() => {
              startCarousel();
            }, 200);
          }
        };
        
        images.forEach((img) => {
          if (img.complete) {
            checkImagesLoaded();
          } else {
            img.addEventListener('load', checkImagesLoaded);
            img.addEventListener('error', checkImagesLoaded); // Count errors too
          }
        });
      } catch (error) {
        console.error('Carousel initialization error:', error);
        // Try to start anyway after a delay
        setTimeout(() => {
          startCarousel();
        }, 1000);
      }
    };
    
    const startCarousel = () => {
      try {
        // Ensure clones are created
        ensureClones();
        updateWidth();
        
        if (singleSetWidth > 0 && !isInitialized) {
          isInitialized = true;
          // Reset scroll position to start
          certificationsGrid.scrollLeft = 0;
          scrollPosition = 0;
          // Initial gradient update
          updateGradients();
          // Start the animation
          autoScroll();
          console.log('✅ Carousel animation started successfully');
        } else if (singleSetWidth === 0) {
          // Retry if width is still 0 (max 10 retries)
          let retryCount = 0;
          const maxRetries = 10;
          const retryInterval = setInterval(() => {
            retryCount++;
            ensureClones();
            updateWidth();
            if (singleSetWidth > 0 || retryCount >= maxRetries) {
              clearInterval(retryInterval);
              if (singleSetWidth > 0) {
                startCarousel();
              } else {
                console.warn('Carousel: Could not calculate width after retries');
              }
            }
          }, 200);
        }
      } catch (error) {
        console.error('Carousel start error:', error);
      }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeCarousel, 500);
      });
    } else {
      setTimeout(initializeCarousel, 500);
    }
    
    // Also try on window load as fallback
    window.addEventListener('load', () => {
      if (!isInitialized) {
        setTimeout(initializeCarousel, 300);
      }
    });

    // Cleanup on page unload
    window.addEventListener("beforeunload", () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
  // DOM already loaded, initialize immediately
  setTimeout(initAllAnimations, 100);
}



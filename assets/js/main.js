document.addEventListener("DOMContentLoaded", () => {
  // Set current year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("mainNav");
  const navLinks = nav?.querySelectorAll(".nav-link");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    // Close menu when link is clicked
    navLinks?.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // Menu filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");
  const menuCategories = document.querySelectorAll(".menu-category");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      // Filter categories
      if (filterValue === "all") {
        menuCategories.forEach(cat => cat.style.display = "block");
      } else {
        menuCategories.forEach(cat => {
          const hasItems = Array.from(cat.querySelectorAll(".menu-item")).some(
            item => item.getAttribute("data-filter") === filterValue
          );
          cat.style.display = hasItems ? "block" : "none";
        });
      }

      // Animate items
      menuItems.forEach(item => {
        const itemFilter = item.getAttribute("data-filter");
        if (filterValue === "all" || itemFilter === filterValue) {
          item.style.display = "block";
          setTimeout(() => item.style.opacity = "1", 10);
        } else {
          item.style.opacity = "0";
          setTimeout(() => item.style.display = "none", 300);
        }
      });
    });
  });

  // Contact form validation and submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Reset previous errors
      document.querySelectorAll(".error-message").forEach(msg => {
        msg.classList.remove("show");
      });
      formStatus.textContent = "";

      // Validate fields
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const type = document.getElementById("type").value;

      let hasErrors = false;

      // Name validation
      if (name.length < 2) {
        showError("name-error", "Name must be at least 2 characters");
        hasErrors = true;
      }

      // Email validation
      if (!isValidEmail(email)) {
        showError("email-error", "Please enter a valid email");
        hasErrors = true;
      }

      // Message validation
      if (message.length < 10) {
        showError("message-error", "Message must be at least 10 characters");
        hasErrors = true;
      }

      // Type validation
      if (!type) {
        showError("type-error", "Please select an enquiry type");
        hasErrors = true;
      }

      if (hasErrors) return;

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual backend call)
      setTimeout(() => {
        // In production, you would send data to your backend here
        // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(...) })

        showSuccess(
          "✓ Message sent! We'll get back to you within 24–48 hours."
        );
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Clear success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = "";
          formStatus.className = "";
        }, 5000);
      }, 1000);
    });

    function showError(elementId, message) {
      const errorEl = document.getElementById(elementId);
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add("show");
      }
    }

    function showSuccess(message) {
      formStatus.textContent = message;
      formStatus.className = "success";
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }

  // Smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Add animation to elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe cards and items for animation
  document.querySelectorAll(
    ".highlight-card, .testimonial-card, .value-card, .menu-item"
  ).forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
    observer.observe(el);
  });
});

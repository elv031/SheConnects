// Dynamic Navbar Highlight
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");
  
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  });
  
  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
      }
  
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      alert(`Thank you, ${name}! Your message has been received.`);
      this.reset(); // Clear the form after submission
    });
  }
  
  // Email Validation Function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Smooth Scroll Effect for Anchor Links
  const smoothScrollLinks = document.querySelectorAll("a[href^='#']");
  
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
  
  // Back to Top Button (Optional Feature)
  const backToTopButton = document.createElement("button");
  backToTopButton.textContent = "↑";
  backToTopButton.style.position = "fixed";
  backToTopButton.style.bottom = "20px";
  backToTopButton.style.right = "20px";
  backToTopButton.style.padding = "10px";
  backToTopButton.style.backgroundColor = "#007bff";
  backToTopButton.style.color = "white";
  backToTopButton.style.border = "none";
  backToTopButton.style.borderRadius = "50%";
  backToTopButton.style.cursor = "pointer";
  backToTopButton.style.display = "none";
  document.body.appendChild(backToTopButton);
  
  // Show/Hide Back to Top Button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });
  
  // Back to Top Button Click Event
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  
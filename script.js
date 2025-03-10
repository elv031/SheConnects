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
// Fetch Jobs from JSearch API
const fetchJobs = async (keyword, location) => {
  const apiURL = "https://jsearch.p.rapidapi.com/search";
  const apiKey = "YOUR_RAPIDAPI_KEY"; // Replace with your actual RapidAPI key

  const params = new URLSearchParams({
    query: `${keyword} in ${location}`,
    num_pages: 1, // Number of pages to fetch
  });

  try {
    const response = await fetch(`${apiURL}?${params.toString()}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch job data");

    const data = await response.json();
    displayJobs(data.data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    document.getElementById("jobResults").innerHTML =
      "<p>Failed to load jobs. Please try again later.</p>";
  }
};

// Display Jobs in the Results Section
const displayJobs = (jobs) => {
  const jobResults = document.getElementById("jobResults");
  jobResults.innerHTML = "";

  if (jobs.length === 0) {
    jobResults.innerHTML = "<p>No jobs found. Try a different search.</p>";
    return;
  }

  jobs.forEach((job) => {
    const jobElement = document.createElement("div");
    jobElement.classList.add("job-card", "p-3", "mb-3", "border", "rounded");
    jobElement.innerHTML = `
      <h4>${job.job_title}</h4>
      <p><strong>Company:</strong> ${job.employer_name}</p>
      <p><strong>Location:</strong> ${job.job_city}, ${job.job_country}</p>
      <a href="${job.job_apply_link}" target="_blank" class="btn btn-success">Apply Now</a>
    `;
    jobResults.appendChild(jobElement);
  });
};

// Add Event Listener to the Job Search Form
const jobSearchForm = document.getElementById("jobSearchForm");
if (jobSearchForm) {
  jobSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = document.getElementById("jobKeyword").value.trim();
    const location = document.getElementById("jobLocation").value.trim();

    if (keyword && location) {
      fetchJobs(keyword, location);
    } else {
      alert("Please fill in both fields.");
    }
  });
}
  
document.getElementById('mentorshipForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const field = document.getElementById('mentorField').value;
    const location = document.getElementById('mentorLocation').value;
  
    // Mock API URL (Replace with your mentorship API endpoint)
    const apiUrl = `https://example.com/api/mentors?field=${encodeURIComponent(field)}&location=${encodeURIComponent(location)}`;
  
    const mentorResults = document.getElementById('mentorResults');
    mentorResults.innerHTML = '<p>Loading...</p>';
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      mentorResults.innerHTML = '';
      if (data.length === 0) {
        mentorResults.innerHTML = '<p>No mentors found.</p>';
        return;
      }
  
      data.forEach((mentor) => {
        const card = document.createElement('div');
        card.className = 'card p-3';
  
        card.innerHTML = `
          <h5 class="card-title">${mentor.name}</h5>
          <p class="card-text">${mentor.expertise}</p>
          <p class="card-text"><strong>Location:</strong> ${mentor.location}</p>
        `;
  
        mentorResults.appendChild(card);
      });
    } catch (error) {
      mentorResults.innerHTML = '<p>Failed to load mentors. Please try again later.</p>';
      console.error(error);
    }
  });
  
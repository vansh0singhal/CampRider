
const campingPlaces = [
    { id: 1, name: "Rishikesh Camping", location: "Rishikesh, Uttarakhand", description: "Riverside camping with adventure activities", image: "https://picsum.photos/300/200?random=1" },
    { id: 2, name: "Coorg Wildlife Camp", location: "Coorg, Karnataka", description: "Lush green forests and coffee plantations", image: "https://picsum.photos/300/200?random=2" },
    { id: 3, name: "Spiti Valley Camp", location: "Spiti Valley, Himachal Pradesh", description: "High-altitude desert camping experience", image: "https://picsum.photos/300/200?random=3" },
    { id: 4, name: "Goa Beach Camp", location: "Arambol, Goa", description: "Beachside camping with water sports", image: "https://picsum.photos/300/200?random=4" },
    { id: 5, name: "Ladakh Wilderness Camp", location: "Leh, Ladakh", description: "Stunning mountain views and stargazing", image: "https://picsum.photos/300/200?random=5" },
    { id: 6, name: "Pushkar Desert Camp", location: "Pushkar, Rajasthan", description: "Experience the magic of the Thar Desert under starry skies", image: "https://picsum.photos/300/200?random=6" },
    { id: 7, name: "Andaman Island Camp", location: "Havelock Island, Andaman", description: "Tropical paradise with pristine beaches and coral reefs", image: "https://picsum.photos/300/200?random=7" },
    { id: 8, name: "Wayanad Tree House Camp", location: "Wayanad, Kerala", description: "Unique tree house accommodation in the Western Ghats", image: "https://picsum.photos/300/200?random=8" },
    { id: 9, name: "Zanskar Valley Camp", location: "Zanskar, Ladakh", description: "Remote camping in one of India's most isolated regions", image: "https://picsum.photos/300/200?random=9" },
];

        const searchInput = document.getElementById('search-input');
        const resultsContainer = document.getElementById('results');

        function createCard(place) {
            return `
                <div class="card">
                    <img src="${place.image}" alt="${place.name}" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%23ddd\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'16\' fill=\'%23555\'%3EImage not available%3C/text%3E%3C/svg%3E'">
                    <div class="card-content">
                        <h2>${place.name}</h2>
                        <p class="location">${place.location}</p>
                        <p>${place.description}</p>
                    </div>
                </div>
            `;
        }

        function displayResults(places) {
            resultsContainer.innerHTML = places.map(createCard).join('');
        }

        function handleSearch() {
            const query = searchInput.value.toLowerCase();
            const filteredPlaces = campingPlaces.filter(place => 
                place.name.toLowerCase().includes(query) ||
                place.location.toLowerCase().includes(query)
            );
            displayResults(filteredPlaces);
        }

        searchInput.addEventListener('input', handleSearch);

        // Initial display of all camping places
        displayResults(campingPlaces);
   

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.email.value;
            const message = this.message.value;
            
            // Here you would typically send this data to your server
            console.log('Sending message:', { email, message });
            
            // For demo purposes, we'll just log it and reset the form
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });


        function createCard(place) {
          return `
              <div class="card" onclick="openCampsitePage('${place.id}')">
                  <img src="${place.image}" alt="${place.name}" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%23ddd\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'16\' fill=\'%23555\'%3EImage not available%3C/text%3E%3C/svg%3E'">
                  <div class="card-content">
                      <h2>${place.name}</h2>
                      <p class="location">${place.location}</p>
                      <p>${place.description}</p>
                  </div>
              </div>
          `;
      }
      
      function openCampsitePage(id) {
        window.location.href = `campsite.html?id=${id}`; // Use the id in the query parameter
        console.log(id); // Log the id to ensure it's correct
    }
    

      
    


        const reviews = [
            { name: "John Doe", review: "Amazing camping experience! Will definitely recommend to others." },
            { name: "Jane Smith", review: "Beautiful locations and well-maintained campsites." }
          ];
          
          // Function to display reviews
          async function addReview() {
            const reviewerName = document.getElementById('reviewerName').value;
            const reviewText = document.getElementById('reviewText').value;
          
            if (reviewerName && reviewText) {
              try {
                const response = await fetch('http://localhost:3000/api/reviews', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ reviewerName, reviewText })
                });
          
                const result = await response.json();
                if (response.ok) {
                  alert(result.message); // Notify user of success
                  document.getElementById('reviewerName').value = '';
                  document.getElementById('reviewText').value = '';
                  fetchReviews(); // Fetch and display new reviews
                } else {
                  alert(result.message); // Notify user of an error
                }
              } catch (err) {
                console.error('Error submitting review:', err);
              }
            } else {
              alert('Please enter both your name and review!');
            }
          }
          
          // Function to fetch and display reviews
          async function fetchReviews() {
            try {
              const response = await fetch('http://localhost:3000/api/reviews');
              const reviews = await response.json();
              const reviewCards = document.getElementById('reviewCards');
              reviewCards.innerHTML = ''; // Clear existing reviews
          
              if (reviews.length === 0) {
                reviewCards.innerHTML = '<p>No reviews available</p>';
                return;
              }
          
              // Sort reviews by most recent
              const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
              // Get the most recent review
              const mostRecentReview = sortedReviews[0];
          
              // Get the rest of the reviews and randomly select 3
              const otherReviews = sortedReviews.slice(1);
              const randomReviews = otherReviews.sort(() => 0.5 - Math.random()).slice(0, 3);
          
              // Display the most recent review
              const recentReviewElement = document.createElement('div');
              recentReviewElement.classList.add('review-card');
              recentReviewElement.innerHTML = `<h3>${mostRecentReview.reviewerName}</h3><p>${mostRecentReview.reviewText}</p>`;
              reviewCards.appendChild(recentReviewElement);
          
              // Display 3 random reviews
              randomReviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review-card');
                reviewElement.innerHTML = `<h3>${review.reviewerName}</h3><p>${review.reviewText}</p>`;
                reviewCards.appendChild(reviewElement);
              });
            } catch (err) {
              console.error('Error fetching reviews:', err);
            }
          }
          
          
          // Call fetchReviews on page load to display existing reviews
          window.onload = fetchReviews;
          
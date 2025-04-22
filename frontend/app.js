const sign_in_btn = document.querySelector("#sign-in-btn");
   const sign_up_btn = document.querySelector("#sign-up-btn");
   const container = document.querySelector(".container");

   sign_up_btn.addEventListener("click", () => {
     container.classList.add("sign-up-mode");
   });

   sign_in_btn.addEventListener("click", () => {
     container.classList.remove("sign-up-mode");
   });

   // Handle registration functionality
// Handle registration functionality
document.querySelector('.sign-up-form').addEventListener('submit', function(e) {
  e.preventDefault();

  fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: document.getElementById('register-username').value,
          email: document.getElementById('register-email').value,
          password: document.getElementById('register-password').value,
      }),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Registration response:', data);
      document.getElementById('register-message').textContent = data.message;
  })
  .catch(error => {
      console.error('Detailed registration error:', error);
      document.getElementById('register-message').textContent = 'An error occurred during registration.';
  });
});

// Handle login functionality
document.querySelector('.sign-in-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Login response:', data);
      if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = 'index.html';
      } else {
          document.getElementById('login-message').textContent = data.message;
      }
  })
  .catch(error => {
      console.error('Detailed login error:', error);
      document.getElementById('login-message').textContent = 'An error occurred during login.';
  });
});
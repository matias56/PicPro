document.addEventListener('DOMContentLoaded', function () {
    // --- Password Toggle Logic (remains the same) ---
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    if (togglePassword) {
        // ... (the existing password toggle code goes here) ...
    }

    // --- NEW: Login Form Logic ---
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop the form from submitting the default way

            const email = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            // --- SIMULATION ---
            // In a real application, you would send `email` and `passwordInput`
            // to your server here to be validated against a database.

            // For this example, we'll use a hardcoded dummy account.
            if (email === 'user@example.com' && passwordInput === 'password123') {
                // SUCCESS: Redirect to the main page
                errorMessage.textContent = ''; // Clear any previous error
                window.location.href = 'main-page.html';
            } else {
                // FAILURE: Show an error message
                errorMessage.textContent = 'Mail o contraseña incorrectos';
            }
        });
    }
});
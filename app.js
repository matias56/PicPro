document.addEventListener('DOMContentLoaded', function () {
    // --- Password Toggle Logic (remains the same) ---
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const eyeOpen = document.querySelector('.eye-open');
    const eyeSlash = document.querySelector('.eye-slash');

    togglePassword.addEventListener('click', function (e) {
        // Toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        // Toggle the eye icons
        if (type === 'password') {
            // If password is hidden
            eyeOpen.style.display = 'block';
            eyeSlash.style.display = 'none';
        } else {
            // If password is visible
            eyeOpen.style.display = 'none';
            eyeSlash.style.display = 'block';
        }
    });

    // --- NEW: Login Form Logic ---
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop the form from submitting the default way

            const emailAttempt = document.getElementById('email').value;
            const passwordAttempt = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            // For this example, we'll use a hardcoded dummy account.
            if (storedEmail && storedPassword && emailAttempt === storedEmail && passwordAttempt === storedPassword) {
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


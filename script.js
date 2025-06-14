// script.js

document.addEventListener('DOMContentLoaded', function () {
    const API_BASE_URL = 'http://localhost:3000/api';

    // --- Signup Form Logic ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message); // Show success or error message from server
                    if (data.message.includes('successfully')) {
                        window.location.href = 'index.html';
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }

    // --- Login Form Logic ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
                .then(response => {
                    if (!response.ok) {
                        // If response is not 2xx, it's an error
                        return response.json().then(err => { throw new Error(err.message) });
                    }
                    return response.json();
                })
                .then(data => {
                    errorMessage.textContent = '';
                    window.location.href = 'main-page.html';
                })
                .catch(error => {
                    errorMessage.textContent = error.message;
                });
        });
    }

    // --- Password Reset Form Logic ---
    const resetPasswordForm = document.getElementById('reset-password-form');
    if (resetPasswordForm) {
        // This is a simplified version. A full implementation would be needed for the multi-step form.
        // For now, we'll connect the final password update step.
        // You would need to add logic to handle the email verification step first.
    }


    // --- Password Toggle Visibility Logic (no changes needed here) ---
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    if (togglePassword) {
        // ... same password toggle code ...
    }
});

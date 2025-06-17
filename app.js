document.addEventListener('DOMContentLoaded', function () {
    // --- Helper functions (defined once to be used by both login and signup) ---

    // Validates email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Displays an error message
    const showError = (element, message) => {
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    };

    // Clears an error message
    const clearError = (element) => {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    };

    // Reusable function to set up password visibility toggles
    function setupPasswordToggle(toggleButtonId, passwordFieldId) {
        const toggleButton = document.getElementById(toggleButtonId);
        const passwordField = document.getElementById(passwordFieldId);

        if (toggleButton && passwordField) {
            const eyeOpen = toggleButton.querySelector('.eye-open');
            const eyeSlash = toggleButton.querySelector('.eye-slash');

            toggleButton.addEventListener('click', function () {
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);

                if (type === 'password') {
                    if (eyeOpen) eyeOpen.style.display = 'block';
                    if (eyeSlash) eyeSlash.style.display = 'none';
                } else {
                    if (eyeOpen) eyeOpen.style.display = 'none';
                    if (eyeSlash) eyeSlash.style.display = 'block';
                }
            });
        }
    }


    // --- Login Page Logic ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        // Setup password toggle for the login form
        setupPasswordToggle('togglePassword', 'password');

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailAttempt = emailInput.value.trim();
            const passwordAttempt = passwordInput.value.trim();

            clearError(emailError);
            clearError(passwordError);

            let hasValidationError = false;
            if (emailAttempt === '') {
                showError(emailError, 'Por favor, introduce tu email.');
                hasValidationError = true;
            } else if (!isValidEmail(emailAttempt)) {
                showError(emailError, 'Por favor, introduce una dirección de email válida.');
                hasValidationError = true;
            }

            if (passwordAttempt === '') {
                showError(passwordError, 'Por favor, introduce tu contraseña.');
                hasValidationError = true;
            }

            if (hasValidationError) return;

            // --- CORRECTED AUTHENTICATION LOGIC ---
            // <<< CHANGE: Load the 'users' array from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // <<< CHANGE: Find a user that matches both email and password
            const foundUser = users.find(user => user.email === emailAttempt && user.password === passwordAttempt);

            if (foundUser) {
                // SUCCESS: Redirect to the main page
                // This path assumes index.html is in the root, and main-page.html is in a 'pages' folder.
                // Adjust if your file structure is different.
                window.location.href = 'pages/main-page.html';
            } else {
                // FAILURE: Show a general error message for incorrect credentials
                showError(passwordError, 'Mail o contraseña incorrectos.');
            }
        });
    }


    // --- Sign Up Page Logic ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const signupEmailInput = document.getElementById('signupEmail');
        const signupPasswordInput = document.getElementById('signupPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const signupEmailError = document.getElementById('signupEmailError');
        const signupPasswordError = document.getElementById('signupPasswordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        // Setup password toggles for the signup form
        setupPasswordToggle('toggleSignupPassword', 'signupPassword');
        setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let hasValidationError = false;

            clearError(signupEmailError);
            clearError(signupPasswordError);
            clearError(confirmPasswordError);

            const email = signupEmailInput.value.trim();
            const password = signupPasswordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            // Email validation
            if (email === '') {
                showError(signupEmailError, 'El email es requerido.');
                hasValidationError = true;
            } else if (!isValidEmail(email)) {
                showError(signupEmailError, 'Por favor, introduce un email válido.');
                hasValidationError = true;
            }

            // Password validation (add your rules back here if you wish)
            if (password === '') {
                showError(signupPasswordError, 'La contraseña es requerida.');
                hasValidationError = true;
            } else if (password.length < 8) {
                showError(signupPasswordError, 'La contraseña debe tener al menos 8 caracteres.');
                hasValidationError = true;
            }
            // You can add the other password rules (uppercase, number, etc.) back here

            // Confirm password validation
            if (confirmPassword === '') {
                showError(confirmPasswordError, 'Confirma tu contraseña.');
                hasValidationError = true;
            } else if (password !== confirmPassword) {
                showError(confirmPasswordError, 'Las contraseñas no coinciden.');
                hasValidationError = true;
            }

            if (hasValidationError) return;

            // --- SIMULATED ACCOUNT CREATION ---
            let users = JSON.parse(localStorage.getItem('users')) || [];

            if (users.some(user => user.email === email)) {
                showError(signupEmailError, 'Este email ya está registrado.');
                return;
            }

            users.push({ email: email, password: password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('¡Registro exitoso! Redirigiendo a la página principal.');

            // <<< CHANGE: Redirect to the main page after successful registration
            // This path assumes your signup page is in a 'pages' folder, so it goes up one level ('../')
            // and then to the 'pages' folder again. If your signup page is at the root, use 'pages/main-page.html'
            window.location.href = 'main-page.html'; // Adjust this path if needed
        });
    }
});

// --- DYNAMIC CONTENT LOADING FOR DASHBOARD ---
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const contentContainer = document.getElementById('content-container');

    // This code will only run if the sidebar and content container are on the page
    if (sidebar && contentContainer) {

        // Function to load content into the main area
        // --- Find and REPLACE your existing loadContent function with this one ---

        const loadContent = async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to load page: ${response.status}`);
                }
                const html = await response.text();

                // Inject the loaded HTML into the content container
                const contentContainer = document.getElementById('content-container');
                contentContainer.innerHTML = html;

                // --- NEW INITIALIZATION LOGIC ---
                // After loading content, check which page it is and run its specific scripts.
                if (document.getElementById('clientes-content')) {
                    initializeClientsPage();
                }
                // You can add more 'else if' blocks for other pages in the future
                // else if (document.getElementById('some-other-page')) {
                //     initializeSomeOtherPage();
                // }

            } catch (error) {
                console.error('Error loading content:', error);
                const contentContainer = document.getElementById('content-container');
                contentContainer.innerHTML = `<div class="content-section"><h1>Error</h1><p>No se pudo cargar el contenido.</p></div>`;
            }
        };

        // Add a click listener to the entire sidebar for efficiency
        sidebar.addEventListener('click', function (e) {
            // Find the link that was clicked on
            const clickedLink = e.target.closest('.sidebar-link');

            if (clickedLink) {
                e.preventDefault(); // Stop the link from navigating away

                // Get the path to the content page from the data-target attribute
                const targetPage = clickedLink.dataset.target;

                if (targetPage) {
                    // Load the new content
                    loadContent(targetPage);

                    // --- Update the 'active' class for styling ---
                    // 1. Remove 'active' from all list items
                    document.querySelectorAll('.sidebar-nav li').forEach(li => {
                        li.classList.remove('active');
                    });

                    // 2. Add 'active' to the parent list item of the clicked link
                    clickedLink.closest('li').classList.add('active');
                }
            }
        });

        // --- Logic for the dropdown menu ---
        const dropdownBtns = document.querySelectorAll('.dropdown-btn');
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                // Toggle a class on the parent 'sidebar-dropdown' element
                this.closest('.sidebar-dropdown').classList.toggle('open');
            });
        });

    } // end of if(sidebar && contentContainer)
});

// --- CLIENTS PAGE LOGIC (CORRECTED) ---

// 1. SIMULATED DATABASE: An array of client objects.
const allClients = [
    {
        firstName: 'Francisco Manuel',
        lastName: 'Castro Magaña',
        email: 'pacu73@hotmail.com',
        signupDate: '10/03/2025'
    },
    {
        firstName: 'Aryana',
        lastName: 'Alonso Garcia',
        email: 'info@ionditudo.es',
        signupDate: '10/03/2025'
    },
    {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@email.com',
        signupDate: '15/02/2025'
    },
    {
        firstName: 'Maria',
        lastName: 'González',
        email: 'maria.g@email.com',
        signupDate: '21/01/2025'
    }
];

// 2. FUNCTION to display clients in the table
function renderClients(clients) {
    const clientListBody = document.getElementById('client-list-body');
    if (!clientListBody) return;

    clientListBody.innerHTML = '';
    if (clients.length === 0) {
        clientListBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No se encontraron clientes.</td></tr>';
        return;
    }

    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.firstName}</td>
            <td>${client.lastName}</td>
            <td>${client.email}</td>
            <td>${client.signupDate}</td>
            <td class="actions-cell">
                <button class="btn-edit" data-email="${client.email}">Editar</button>
                <button class="btn-details" data-email="${client.email}">Detalles</button>
                <button class="btn-delete" data-email="${client.email}">Eliminar</button>
            </td>
        `;
        clientListBody.appendChild(row);
    });
}

// 3. NEW FUNCTION to set up the entire client page
function initializeClientsPage() {
    // a) Initial render of all clients
    renderClients(allClients);

    // b) Add event listener for the search bar
    const searchInput = document.getElementById('client-search-input');
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredClients = allClients.filter(client =>
            client.firstName.toLowerCase().includes(searchTerm) ||
            client.lastName.toLowerCase().includes(searchTerm) ||
            client.email.toLowerCase().includes(searchTerm)
        );
        renderClients(filteredClients);
    });

    // c) Add event listeners for action buttons
    const clientListBody = document.getElementById('client-list-body');
    clientListBody.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName !== 'BUTTON') return; // Only act on button clicks

        const userEmail = target.dataset.email;

        if (target.classList.contains('btn-edit')) {
            alert(`Acción: Editar cliente con email: ${userEmail}`);
        }
        if (target.classList.contains('btn-details')) {
            alert(`Acción: Mostrar detalles del cliente: ${userEmail}`);
        }
        if (target.classList.contains('btn-delete')) {
            if (confirm(`¿Estás seguro de que quieres eliminar al cliente ${userEmail}?`)) {
                alert(`Acción: Eliminar cliente: ${userEmail}`);
            }
        }
    });
}
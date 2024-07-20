document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const securePage = document.getElementById('secure-page');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');
    const registerUsername = document.getElementById('register-username');
    const registerPassword = document.getElementById('register-password');

    function switchToLogin() {
        loginSection.style.display = 'block';
        registerSection.style.display = 'none';
    }

    function switchToRegister() {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    }

    function showSecurePage() {
        loginSection.style.display = 'none';
        registerSection.style.display = 'none';
        securePage.style.display = 'block';
    }

    function login() {
        const username = loginUsername.value;
        const password = loginPassword.value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedIn', 'true');
            showSecurePage();
        } else {
            alert('Invalid username or password');
        }
    }

    function register() {
        const username = registerUsername.value;
        const password = registerPassword.value;

        if (username && password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.username === username)) {
                alert('Username already exists');
                return;
            }
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            switchToLogin();
        } else {
            alert('Please enter both username and password');
        }
    }

    function logout() {
        localStorage.removeItem('loggedIn');
        switchToLogin();
    }

    loginBtn.addEventListener('click', login);
    registerBtn.addEventListener('click', register);
    logoutBtn.addEventListener('click', logout);
    showRegister.addEventListener('click', switchToRegister);
    showLogin.addEventListener('click', switchToLogin);

    if (localStorage.getItem('loggedIn') === 'true') {
        showSecurePage();
    }
});

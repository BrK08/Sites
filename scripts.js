// Kullanıcı bilgilerini localStorage'da saklama ve doğrulama
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Kullanıcı bilgilerini localStorage'a kaydet
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Kayıt başarılı!');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Kullanıcı bilgilerini doğrulama
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                alert('Giriş başarılı!');
                window.location.href = 'index.html';
            } else {
                alert('Kullanıcı adı veya şifre yanlış!');
            }
        });
    }
});

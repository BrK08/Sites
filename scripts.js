document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');
    const commentCount = document.getElementById('comment-count');
    const userProfile = document.getElementById('userProfile');
    const profilePhoto = document.getElementById('profilePhoto');

    // Kullanıcı kaydı işlemi
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

            alert('Kayıt başarılı! Hesabınıza giriş yapabilirsiniz.');
            window.location.href = 'login.html';
        });
    }

    // Kullanıcı girişi işlemi
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Kullanıcı bilgilerini doğrulama
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                alert('Giriş başarılı!');
                window.location.href = 'index.html';
            } else {
                alert('Kullanıcı adı veya şifre yanlış! Hesabınız yoksa kayıt olabilirsiniz.');
                window.location.href = 'register.html';
            }
        });
    }

    // Ürün satın alma işlemi
    window.purchaseProduct = function(productName, productPrice) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser) {
            alert('Lütfen satın alma işlemi için giriş yapın!');
            window.location.href = 'login.html';
            return;
        }

        alert(`${productName} ürününü $${productPrice} karşılığında satın aldınız!`);
    }

    // Yorum yapma işlemi
    if (commentForm) {
        commentForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            if (!loggedInUser) {
                alert('Yorum yapabilmek için giriş yapmalısınız!');
                window.location.href = 'login.html';
                return;
            }

            const username = loggedInUser.username; // Yorum yapan kullanıcının adını almak
            const rating = document.querySelector('input[name="rating"]:checked');
            const comment = document.getElementById('comment').value;

            if (rating) {
                const ratingValue = rating.value;

                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');

                commentItem.innerHTML = `
                    <p class="username">${username}</p>
                    <p class="rating">${'☆'.repeat(ratingValue)}</p>
                    <p>${comment}</p>
                `;

                commentList.appendChild(commentItem);

                commentCount.textContent = `${parseInt(commentCount.textContent) + 1} yorum`;

                commentForm.reset();
            }
        });
    }

    // Profil fotoğrafını ayarlama ve gösterme
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const profileImages = [
            'https://randomuser.me/api/portraits/lego/1.jpg',
            'https://randomuser.me/api/portraits/lego/2.jpg',
            'https://randomuser.me/api/portraits/lego/3.jpg',
            'https://randomuser.me/api/portraits/lego/4.jpg',
            'https://randomuser.me/api/portraits/lego/5.jpg'
        ];

        const randomIndex = Math.floor(Math.random() * profileImages.length);
        profilePhoto.src = profileImages[randomIndex];
        userProfile.style.display = 'block';
    }

    // Bot B ürününü gizleme işlemi
    var botBElement = document.querySelector('.product-item:nth-child(2)');
    if (botBElement) {
        botBElement.style.display = 'none';
    }
});

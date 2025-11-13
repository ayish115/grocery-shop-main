document.addEventListener('DOMContentLoaded', () => {
    let searchForm = document.querySelector('.search-form');
    let shoppingCart = document.querySelector('.shopping-cart');
    let loginForm = document.querySelector('.login-form');
    let registerForm = document.querySelector('.register-form');
    let navbar = document.querySelector('.navbar');
    let cartItemsContainer = document.querySelector('.shopping-cart .box-container');

    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        loginForm.classList.remove('active');
        shoppingCart.classList.remove('active');
    };

    document.querySelector('#cart-btn').onclick = () => {
        shoppingCart.classList.toggle('active');
        navbar.classList.remove('active');
        loginForm.classList.remove('active');
        searchForm.classList.remove('active');
    };

    document.querySelector('#login-btn').onclick = () => {
        loginForm.classList.toggle('active');
        registerForm.classList.remove('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        navbar.classList.remove('active');
    };

    document.querySelector('#show-register-form').onclick = (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.toggle('active');
    };

    document.querySelector('#goToLogin').onclick = (e) => {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.toggle('active');
    };

    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.toggle('active');
        loginForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        searchForm.classList.remove('active');
    };

    window.onscroll = () => {
        navbar.classList.remove('active');
        loginForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        searchForm.classList.remove('active');
        registerForm.classList.remove('active');
    };

    document.querySelector('#registerForm').onsubmit = function(e) {
        e.preventDefault();

        let username = document.querySelector('#reg-username').value;
        let email = document.querySelector('#reg-email').value;
        let password = document.querySelector('#reg-password').value;
        let confirmPassword = document.querySelector('#reg-confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email.");
            return;
        }

        alert("User registered successfully!");
    };

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    var swiper = new Swiper(".product-slider", {
        loop: true,
        spaceBetween: 20,
        autoplay: {
            delay: 7500,
            disableOnInteraction: false,
        },
        centeredSlides: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
        },
    });

    var swiperTwo = new Swiper(".review-slider", {
        loop: true,
        spaceBetween: 20,
        autoplay: false,
        centeredSlides: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
        }
    });

    document.querySelector('.view-more').onclick = () => {
        swiperTwo.slideNext();
    };

    document.querySelector('.add-review').onclick = () => {
        document.querySelector('.review-form').style.display = 'block';
    };

    document.querySelector('#review-form').onsubmit = (e) => {
        e.preventDefault();
        
        let name = document.querySelector('#review-name').value;
        let text = document.querySelector('#review-text').value;

        let newSlide = document.createElement('div');
        newSlide.classList.add('swiper-slide', 'box');
        newSlide.innerHTML = `
            <img src="images/reviews/img5.png" alt="" class="image">
            <p>${text}</p>
            <h3>${name}</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
        `;

        document.querySelector('.two').appendChild(newSlide);
        swiperTwo.update();

        document.querySelector('#review-form').reset();
        document.querySelector('.review-form').style.display = 'none';
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('#shopping-cart');
    const shoppingCart = document.querySelector('#shopping-cart');

    function addToCart(event) {
        event.preventDefault();

        const productElement = event.target.closest('.swiper-slide');
        if (!productElement) return;

        const productName = productElement.querySelector('h3').textContent;
        const productPrice = productElement.querySelector('.price').textContent;
        const productImage = productElement.querySelector('.image').src;

        const cartItem = document.createElement('div');
        cartItem.className = 'box';
        cartItem.innerHTML = `
            <i class="fas fa-trash"></i>
            <img src="${productImage}" alt="${productName}">
            <div class="content">
                <h3>${productName}</h3>
                <span class="price">${productPrice}</span>
                <span class="quantity">qty : 1</span>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    }

    document.querySelectorAll('.swiper-slide .btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    shoppingCart.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-trash')) {
            e.target.closest('.box').remove();
        }
    });
});

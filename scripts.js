document.addEventListener('DOMContentLoaded', () => {
    // Elements selection
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const cartButton = document.querySelector('#cart-button');
    const cartModal = document.querySelector('#cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsList = document.querySelector('#cart-items');
    const removeAllButton = document.querySelector('.remove-all-btn');
    const searchInput = document.getElementById('search');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartCount = cartItems.length;

    // Update cart count initially
    const updateCartCount = () => {
        cartButton.textContent = `Cart (${cartCount})`;
    };

    // Save cart items to local storage
    const saveCartItems = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    // Function to add product to cart
    const addToCart = (product) => {
        const productName = product.querySelector('h2').textContent;
        const productPrice = product.querySelector('.price b').textContent;
        cartItems.push({ name: productName, price: productPrice });
        saveCartItems();
        cartCount++;
        updateCartCount();
        updateCartModal();

        // Add animation to cart button
        cartButton.classList.add('cart-text-animation');
        cartButton.style.color = 'var(--highlight-color)';

        // Remove animation class after animation ends
        setTimeout(() => {
            cartButton.classList.remove('cart-text-animation');
            cartButton.style.color = '';
        }, 1000);
    };

    // Function to update cart modal content
    const updateCartModal = () => {
        cartItemsList.innerHTML = '';
        if (cartItems.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Cart is empty';
            emptyMessage.classList.add('empty-message');
            cartItemsList.appendChild(emptyMessage);
            removeAllButton.style.display = 'none';
        } else {
            removeAllButton.style.display = 'block';
            cartItems.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `${item.name} - ${item.price} <button class="remove-item" data-index="${index}">Remove</button>`;
                cartItemsList.appendChild(listItem);
            });
        }
    };

    // Function to hide cart modal
    const hideCartModal = () => {
        cartModal.style.display = 'none';
        cartModal.classList.remove('open', 'close');
    };

    // Event listener to toggle navigation for mobile and tablet
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Debounce function for search input
    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    // Search functionality
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const products = document.querySelectorAll('.product');
        
        products.forEach(product => {
            const productName = product.querySelector('h2').textContent.toLowerCase();
            product.style.display = productName.includes(query) ? 'block' : 'none';
        });
    };

    searchInput.addEventListener('input', debounce(handleSearch, 300));

    // Show cart modal
    cartButton.addEventListener('click', () => {
        updateCartModal();
        cartModal.classList.add('open');
        cartModal.style.display = 'block';
    });

    // Close cart modal
    closeCart.addEventListener('click', () => {
        hideCartModal();
    });

    // Close modal when clicking outside the cart content
    window.addEventListener('click', (event) => {
        if (event.target === cartModal && cartModal.classList.contains('open')) {
            hideCartModal();
        }
    });

    // Event delegation for removing cart items
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            const listItem = event.target.closest('li');
            
            // Add fade-out animation
            listItem.classList.add('fade-out');
            listItem.addEventListener('animationend', () => {
                cartItems.splice(index, 1);
                saveCartItems();
                cartCount--;
                updateCartCount();
                updateCartModal();
            }, { once: true });
        }
    });

    // Remove all items from cart with animation
    removeAllButton.addEventListener('click', () => {
        const listItems = cartItemsList.querySelectorAll('li');
        
        // Add fade-out animation to all items
        listItems.forEach((listItem, index) => {
            listItem.classList.add('fade-out');
            listItem.addEventListener('animationend', () => {
                if (index === listItems.length - 1) {
                    cartItems = [];
                    saveCartItems();
                    cartCount = 0;
                    updateCartCount();
                    updateCartModal();
                }
            }, { once: true });
        });
    });

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            addToCart(product);
        });
    });

    // Initial cart count update
    updateCartCount();

    // Go to Top Button functionality
    const goToTopButton = document.createElement('button');
    goToTopButton.innerHTML = '&uarr;';
    goToTopButton.id = 'go-to-top';
    document.body.appendChild(goToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            goToTopButton.style.display = 'block';
        } else {
            goToTopButton.style.display = 'none';
        }
    });

    goToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Ensure body is visible immediately without page load animation
    document.body.classList.remove('page-load-animation');
});
// Navbar functionality
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    burger.classList.toggle("toggle");
  });
};

navSlide();

// Cart functionality
let cart = [];
const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartItems = document.querySelector(".cart-items");
const cartTotalAmount = document.getElementById("cart-total-amount");
const checkoutButton = document.getElementById("checkout-button");
const closeCartButton = document.querySelector(".close-cart");

// Save cart to LocalStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from LocalStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("open");
});

closeCartButton.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
            </div>
            <p class="item-total">$${(item.price * item.quantity).toFixed(
              2
            )}</p>
        `;
    cartItems.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  cartTotalAmount.textContent = total.toFixed(2);
  document.querySelector(".cart-count").textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Save cart to LocalStorage
  saveCartToLocalStorage();
}

cartItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("increase-quantity")) {
    const index = e.target.getAttribute("data-index");
    cart[index].quantity++;
    updateCart();
  } else if (e.target.classList.contains("decrease-quantity")) {
    const index = e.target.getAttribute("data-index");
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    updateCart();
  }
});

checkoutButton.addEventListener("click", () => {
  Swal.fire({
    title: "¡Compra realizada con éxito!",
    text: "Gracias por tu compra",
    icon: "success",
    confirmButtonText: "Cerrar",
  }).then(() => {
    cart = [];
    localStorage.removeItem("cart"); // Elimina el carrito de LocalStorage
    updateCart();
    cartSidebar.classList.remove("open");
  });
});

// Shop page functionality
if (window.location.pathname.includes("shop.html")) {
  const productGrid = document.querySelector(".product-grid");
  const pagination = document.querySelector(".pagination");
  const categoryFilter = document.getElementById("category-filter");
  let currentPage = 1;
  const productsPerPage = 5; // Update: Changed productsPerPage to 5
  let allProducts = [];

  const clothingProducts = [
    {
      id: "c1",
      name: "Vestido Floral",
      price: 59.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/young-beautiful-woman-spring-look_144627-9836.jpg",
    },
    {
      id: "c2",
      name: "Blusa de Seda",
      price: 45.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-positive-female-shows-facial-emotions-funny-model-isolated-yellow_158538-15796.jpg",
    },
    {
      id: "c3",
      name: "Jeans Skinny",
      price: 69.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-102239.jpg",
    },
    {
      id: "c4",
      name: "Falda Plisada",
      price: 39.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/young-woman-beautiful-red-skirt-sweater-posing-beige-background_574295-1778.jpg",
    },
    {
      id: "c5",
      name: "Chaqueta de Cuero",
      price: 89.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/portrait-beautiful-brunette-woman-model-brown-leather-jacket-fashion-clothes_158538-1369.jpg",
    },
    {
      id: "c6",
      name: "Suéter de Cachemira",
      price: 79.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/portrait-beautiful-woman_144627-29227.jpg",
    },
    {
      id: "c7",
      name: "Pantalón de Yoga",
      price: 49.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/young-woman-practicing-yoga-home_1303-20706.jpg",
    },
    {
      id: "c8",
      name: "Vestido de Noche",
      price: 99.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/elegant-young-woman-black-dress_144627-29384.jpg",
    },
    {
      id: "c9",
      name: "Top Crop",
      price: 29.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-round-hat-positive-female-shows-facial-emotions-funny-model-isolated-yellow_158538-15794.jpg",
    },
    {
      id: "c10",
      name: "Blazer Elegante",
      price: 79.99,
      category: "clothing",
      image:
        "https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg",
    },
  ];

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
      );
      const makeupProducts = await response.json();

      const formattedMakeupProducts = makeupProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        category: "makeup",
        image: product.image_link,
      }));

      return [...clothingProducts, ...formattedMakeupProducts];
    } catch (error) {
      console.error("Error fetching products:", error);
      return clothingProducts; // Fallback to clothing products if API fails
    }
  }

  function filterProducts(category) {
    return category === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === category);
  }

  function displayProducts(products, page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end); // Update: No change needed here

    productGrid.innerHTML = "";
    paginatedProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product-card");
      productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${
                  product.id
                }" data-name="${product.name}" data-price="${
        product.price
      }" data-image="${product.image}">Agregar al carrito</button>
            `;
      productGrid.appendChild(productElement);
    });
  }

  function setupPagination(products) {
    const pageCount = Math.ceil(products.length / productsPerPage);
    pagination.innerHTML = "";

    // Add previous button
    const prevButton = document.createElement("button");
    prevButton.innerText = "Anterior";
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updatePaginationDisplay(products);
      }
    });
    pagination.appendChild(prevButton);

    // Add page buttons
    for (let i = 1; i <= pageCount; i++) {
      const button = document.createElement("button");
      button.innerText = i;
      button.addEventListener("click", () => {
        currentPage = i;
        updatePaginationDisplay(products);
      });
      pagination.appendChild(button);
    }

    // Add next button
    const nextButton = document.createElement("button");
    nextButton.innerText = "Siguiente";
    nextButton.addEventListener("click", () => {
      if (currentPage < pageCount) {
        currentPage++;
        updatePaginationDisplay(products);
      }
    });
    pagination.appendChild(nextButton);

    updatePaginationDisplay(products);
  }

  function updatePaginationDisplay(products) {
    const pageCount = Math.ceil(products.length / productsPerPage);
    const pageButtons = pagination.querySelectorAll(
      "button:not(:first-child):not(:last-child)"
    );

    pageButtons.forEach((button, index) => {
      const pageNumber = index + 1;
      if (
        pageNumber === currentPage ||
        (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) ||
        pageNumber === 1 ||
        pageNumber === pageCount
      ) {
        button.style.display = "inline-block";
      } else {
        button.style.display = "none";
      }

      if (pageNumber === currentPage) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    displayProducts(products, currentPage);
    window.scrollTo(0, 0);
  }

  function setupCategoryFilter() {
    categoryFilter.addEventListener("change", () => {
      const category = categoryFilter.value;
      const filteredProducts = filterProducts(category);
      currentPage = 1;
      displayProducts(filteredProducts, currentPage);
      setupPagination(filteredProducts);
    });
  }

  productGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const product = {
        id: e.target.getAttribute("data-id"),
        name: e.target.getAttribute("data-name"),
        price: parseFloat(e.target.getAttribute("data-price")),
        image: e.target.getAttribute("data-image"),
        quantity: 1,
      };

      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push(product);
      }

      updateCart();
      cartSidebar.classList.add("open");

      Swal.fire({
        title: "¡Producto añadido!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });

  fetchProducts().then((products) => {
    allProducts = products;
    displayProducts(allProducts, currentPage);
    setupPagination(allProducts);
    setupCategoryFilter();
  });
}

// Contact form validation
if (window.location.pathname.includes("contact.html")) {
  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un email válido",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }

    // Here you would typically send the form data to a server
    // For this example, we'll just show a success message
    Swal.fire({
      title: "¡Mensaje enviado!",
      text: "Gracias por contactarnos. Te responderemos pronto.",
      icon: "success",
      confirmButtonText: "Cerrar",
    }).then(() => {
      form.reset();
    });
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Initialize cart functionality on all pages
loadCartFromLocalStorage();
updateCart();

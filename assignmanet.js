// API URLs
const ALL_PRODUCTS_URL = "https://dummyjson.com/products";
const SEARCH_URL = "https://dummyjson.com/products/search?q=";

// Create main container
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexWrap = "wrap";
container.style.justifyContent = "center";
container.style.gap = "20px";
container.style.padding = "20px";
document.body.appendChild(container);

// Create search box
const searchBox = document.createElement("input");
searchBox.type = "text";
searchBox.placeholder = "Search products...";
searchBox.style.width = "300px";
searchBox.style.padding = "10px";
searchBox.style.margin = "20px";
searchBox.style.fontSize = "16px";
searchBox.style.border = "1px solid #ccc";
searchBox.style.borderRadius = "5px";
document.body.insertBefore(searchBox, container);

// Fetch and display products
async function fetchProducts(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayProducts(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display products in cards
function displayProducts(products) {
  container.innerHTML = ""; // Clear old results

  products.forEach((product) => {
    const card = document.createElement("div");
    card.style.width = "220px";
    card.style.border = "1px solid #ddd";
    card.style.borderRadius = "8px";
    card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    card.style.padding = "10px";
    card.style.textAlign = "center";
    card.style.backgroundColor = "#fff";

    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;
    img.style.width = "100%";
    img.style.height = "150px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "5px";

    const title = document.createElement("h3");
    title.textContent = product.title;
    title.style.fontSize = "16px";

    const price = document.createElement("p");
    price.textContent = `💲${product.price}`;
    price.style.fontWeight = "bold";

    const rating = document.createElement("p");
    rating.textContent = `⭐ ${product.rating}`;

    card.append(img, title, price, rating);
    container.appendChild(card);
  });
}

// Search feature
searchBox.addEventListener("keyup", (e) => {
  const query = e.target.value.trim();
  if (query.length === 0) {
    fetchProducts(ALL_PRODUCTS_URL);
  } else {
    fetchProducts(SEARCH_URL + query);
  }
});



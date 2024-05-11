// *

const mainProductDiv = document.querySelector(".productMain");
const cardsRows = document.querySelectorAll(".cardsRow");

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  return data;
}

function generateStars(rate) {
  const starsTotal = 5;
  const roundedRate = Math.round(rate);

  let stars = "";
  for (let i = 1; i <= starsTotal; i++) {
    if (i <= roundedRate) {
      stars += "⭐"; // Filled star
    } else {
      stars += "☆"; // Empty star
    }
  }

  return stars;
}

async function displayProducts() {
  const products = await fetchProducts();
  const firstProduct = products[0];

  // Display first product in mainProductDiv
  mainProductDiv.style.backgroundImage = `url(${firstProduct.image})`;
  const titleParagraph = document.createElement("p");
  titleParagraph.textContent = firstProduct.title;
  mainProductDiv.appendChild(titleParagraph);

  // Distribute products into rows of 4 cards each
  let rowIndex = 1;
  let currentRow;

  products.slice(1).forEach((product, index) => {
    if (index % 4 === 0) {
      currentRow = cardsRows[rowIndex - 1];
      rowIndex++;
    }

    const productCard = document.createElement("div");
    productCard.classList.add("product");

    const title = document.createElement("h3");
    title.textContent = product.title;

    const image = document.createElement("img");
    image.src = product.image;

    const rate = document.createElement("p");
    rate.classList = "stars";
    rate.textContent = generateStars(Math.round(product.rating.rate));

    const ratingCount = document.createElement("p");
    ratingCount.classList = "ratingCount";
    ratingCount.textContent = `(${product.rating.count})`;

    const description = document.createElement("p");
    description.classList = "description";
    description.textContent = product.description;

    const price = document.createElement("p");
    price.classList = "productPrice";
    price.textContent = `$${product.price}`;

    productCard.appendChild(image);
    productCard.appendChild(title);
    productCard.appendChild(price);
    productCard.appendChild(description);
    productCard.appendChild(rate);
    productCard.appendChild(ratingCount);

    currentRow.appendChild(productCard);
  });
}

displayProducts();

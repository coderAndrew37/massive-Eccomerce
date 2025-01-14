import { initAddToCartListeners } from "./utils/cartUtils.js";

// Toggle skeletons visibility
export function toggleSkeletons(skeletonContainer, productsContainer, show) {
  if (show) {
    skeletonContainer.classList.remove("hidden");
    productsContainer.classList.add("hidden");
  } else {
    skeletonContainer.classList.add("hidden");
    productsContainer.classList.remove("hidden");
  }
}

// Generate HTML for a single product card
export function generateProductHTML(product) {
  return `
    <div class="product-container bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105">
      <img
        class="w-full h-48 object-cover rounded-lg mb-4"
        src="${product.image}"
        alt="${product.name}"
      />
      <h3 class="text-lg font-bold text-idcPrimary limit-text-to-2-lines mb-2">
        ${product.name}
      </h3>
      <div class="flex items-center mb-4">
        <img
          class="w-20 h-5"
          src="images/ratings/rating-${product.rating.stars}.png"
          alt="${product.rating.stars * 10} stars"
        />
        <span class="ml-2 text-sm text-idcText">
          (${product.rating.count} reviews)
        </span>
      </div>
      <p class="text-xl font-semibold text-idcHighlight">
        ${product.priceCents / 100}
      </p>
      <div class="added-to-cart hidden text-green-600 text-center font-bold mb-4">
        Added to Cart!
      </div>
      <button
        class="js-add-to-cart w-full mt-4 px-4 py-2 bg-idcHighlight text-black font-bold rounded-lg hover:bg-opacity-90"
        data-product-id="${product._id}"
      >
        Add to Cart
      </button>
    </div>
  `;
}

// Render product cards
export function renderProducts(products, container) {
  container.innerHTML = products
    .map((product) => generateProductHTML(product))
    .join("");
  initAddToCartListeners(); // Attach cart listeners
}

// Render pagination buttons
export function renderPagination(
  container,
  currentPage,
  totalPages,
  fetchFunction
) {
  container.innerHTML = "";

  const createButton = (label, isActive, isDisabled, page) => {
    const btnClass = `px-4 py-2 mx-1 text-sm font-medium ${
      isActive
        ? "bg-idcPrimary text-white"
        : "bg-white text-idcPrimary hover:bg-idcHighlight"
    } ${
      isDisabled
        ? "cursor-not-allowed opacity-50"
        : "border border-idcPrimary rounded-md"
    }`;

    const button = document.createElement("button");
    button.className = btnClass;
    button.textContent = label;
    button.disabled = isDisabled;
    if (!isDisabled) {
      button.addEventListener("click", () => fetchFunction(page));
    }
    return button;
  };

  // Previous Button
  container.appendChild(
    createButton("Previous", false, currentPage === 1, currentPage - 1)
  );

  // Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    container.appendChild(createButton(i, i === currentPage, false, i));
  }

  // Next Button
  container.appendChild(
    createButton("Next", false, currentPage === totalPages, currentPage + 1)
  );
}

// Fetch products
export async function fetchProducts(
  url,
  page,
  productsPerPage,
  skeletonContainer,
  productsContainer,
  renderCallback,
  paginationContainer,
  paginationCallback
) {
  try {
    toggleSkeletons(skeletonContainer, productsContainer, true);

    const response = await fetch(
      `${url}?page=${page}&limit=${productsPerPage}`
    );
    const data = await response.json();

    if (data.products && data.products.length > 0) {
      renderCallback(data.products);
      paginationCallback(
        paginationContainer,
        data.currentPage,
        data.totalPages,
        (newPage) => {
          fetchProducts(
            url,
            newPage,
            productsPerPage,
            skeletonContainer,
            productsContainer,
            renderCallback,
            paginationContainer,
            paginationCallback
          );
        }
      );
    } else {
      productsContainer.innerHTML = `<p class="text-center text-lg text-idcText">No products available.</p>`;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    productsContainer.innerHTML = `<p class="text-center text-lg text-idcText text-red-600">Failed to load products. Please try again later.</p>`;
  } finally {
    toggleSkeletons(skeletonContainer, productsContainer, false);
  }
}

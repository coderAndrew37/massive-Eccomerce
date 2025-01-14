import { fetchProducts, renderProducts } from "./fetchContent/products.js";
import { renderPagination } from "./fetchContent/pagination.js";
import { formatCurrency } from "./utils/currency.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "furniture"; // Default to 'furniture'
  const categoryTitle = document.getElementById("category-title");
  categoryTitle.textContent = `Category: ${
    category.charAt(0).toUpperCase() + category.slice(1)
  }`;

  const productsContainer = document.querySelector("#category-products .grid"); // Fixed selector
  const skeletonContainer = document.querySelector(
    "#category-products .skeletons"
  ); // Fixed selector

  const paginationContainer = document.getElementById("pagination");
  const productsPerPage = 12;

  const categoryUrl = `/api/products?category=${category}`; // Correct base URL
  fetchProducts(
    categoryUrl,
    1,
    productsPerPage,
    skeletonContainer,
    productsContainer, // Updated variable name
    (products) => renderProducts(products, productsContainer, formatCurrency),
    paginationContainer,
    (container, currentPage, totalPages, fetchFunction) =>
      renderPagination(container, currentPage, totalPages, fetchFunction)
  );
});

import { fetchProducts, renderProducts } from "./fetchContent/products.js";
import { renderPagination } from "./fetchContent/pagination.js";
import { toggleSkeletons } from "./fetchContent/skeletons.js";
import { formatCurrency } from "./utils/currency.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "furniture"; // Default to 'furniture'
  const categoryTitle = document.getElementById("category-title");
  categoryTitle.textContent = `Category: ${
    category.charAt(0).toUpperCase() + category.slice(1)
  }`;

  const featuredProductsContainer = document.querySelector(
    "#featured-products .grid"
  );
  const skeletonContainer = document.querySelector(
    "#featured-products .skeletons"
  );
  const paginationContainer = document.getElementById("pagination");
  const productsPerPage = 12;

  const categoryUrl = `/api/products?category=${category}`;
  fetchProducts(
    categoryUrl,
    1,
    productsPerPage,
    skeletonContainer,
    featuredProductsContainer,
    (products) =>
      renderProducts(products, featuredProductsContainer, formatCurrency),
    paginationContainer,
    (container, currentPage, totalPages, fetchFunction) =>
      renderPagination(container, currentPage, totalPages, fetchFunction)
  );
});

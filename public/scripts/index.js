import { fetchProducts, renderProducts } from "./fetchContent/products.js";
import { renderTestimonials } from "./fetchContent/testimonials.js";
import { renderFAQs } from "./fetchContent/faqs.js";
import { renderPagination } from "./fetchContent/pagination.js";
import { toggleSkeletons } from "./fetchContent/skeletons.js";
import { testimonials, faqs } from "../data/data.js";
import { formatCurrency } from "./utils/currency.js";
import "./search.js";
import "./menuToggle.js";
import "./animations.js";
import "./authButton.js";
import "./carousel.js";

document.addEventListener("DOMContentLoaded", () => {
  const featuredProductsContainer = document.querySelector(
    "#featured-products .grid"
  );
  const skeletonContainer = document.querySelector(
    "#featured-products .skeletons"
  );
  const paginationContainer = document.getElementById("pagination");
  const productsPerPage = 12;

  // Get category from the URL
  const category = window.location.pathname.split("/").pop();

  // Construct API endpoint
  const apiEndpoint = category
    ? `/api/categories/${category}`
    : "/api/products";

  // Fetch products for the category or default
  fetchProducts(
    apiEndpoint,
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

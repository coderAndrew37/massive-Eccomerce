import { fetchProducts, renderProducts } from "./fetchContent/products.js";
import { renderTestimonials } from "./fetchContent/testimonials.js";
import { renderFAQs } from "./fetchContent/faqs.js";
import { renderPagination } from "./fetchContent/pagination.js";
import { toggleSkeletons } from "./fetchContent/skeletons.js";
import { testimonials, faqs } from "../data/data.js";
import { formatCurrency } from "./utils/currency.js";

document.addEventListener("DOMContentLoaded", () => {
  // Testimonials
  renderTestimonials(testimonials, "#testimonials .grid");

  // FAQs
  renderFAQs(faqs, "#faqs .space-y-4");

  // Featured Products
  const featuredProductsContainer = document.querySelector(
    "#featured-products .grid"
  );
  const skeletonContainer = document.querySelector(
    "#featured-products .skeletons"
  );
  const paginationContainer = document.getElementById("pagination");
  const productsPerPage = 12;

  fetchProducts(
    "/api/products",
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

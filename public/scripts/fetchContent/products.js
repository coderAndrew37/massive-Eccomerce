import { toggleSkeletons } from "./skeletons.js";
import { generateProductHTML } from "./productHTML.js";

export async function fetchProducts(
  url,
  page,
  limit,
  skeletonContainer,
  productsContainer,
  renderProductsCallback,
  paginationContainer,
  renderPaginationCallback
) {
  try {
    toggleSkeletons(skeletonContainer, productsContainer, true);

    // Correct URL construction based on whether '?' exists in the base URL
    const fetchUrl = url.includes("?")
      ? `${url}&page=${page}&limit=${limit}`
      : `${url}?page=${page}&limit=${limit}`;

    const response = await fetch(fetchUrl);
    const data = await response.json();

    if (data.products && data.products.length > 0) {
      renderProductsCallback(data.products);
      renderPaginationCallback(
        paginationContainer,
        data.currentPage,
        data.totalPages,
        (newPage) =>
          fetchProducts(
            url,
            newPage,
            limit,
            skeletonContainer,
            productsContainer,
            renderProductsCallback,
            paginationContainer,
            renderPaginationCallback
          )
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

export function renderProducts(products, container, formatCurrency) {
  container.innerHTML = products
    .map((product) => generateProductHTML(product, formatCurrency))
    .join("");
}

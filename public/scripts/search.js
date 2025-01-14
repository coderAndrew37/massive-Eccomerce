import { baseUrl } from "./constants.js";
import { formatCurrency } from "./utils/currency.js";
import { generateProductHTML } from "./fetchContent/productHTML.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const searchBar = document.getElementById("search-bar");
  const searchInput = document.getElementById("search-input");
  const closeSearchButton = document.getElementById("close-search");
  const suggestionsList = document.getElementById("search-suggestions");
  const searchLoader = document.getElementById("search-loader");
  const featuredProductsContainer =
    document.querySelector("#featured-products .grid") ||
    document.querySelector("#category-products .grid"); // Handle multiple pages

  // Toggle search bar
  searchButton.addEventListener("click", () => {
    searchBar.style.transform = "translateY(100px)";
    searchInput.focus();
  });

  closeSearchButton.addEventListener("click", () => {
    closeSearchBar();
  });

  // Live search suggestions
  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();
    if (query.length < 2) {
      clearSuggestions();
      return;
    }
    await fetchSuggestions(query);
  });

  // Handle Enter key for search
  searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query.length < 2) return;
      await searchProducts(query);
      closeSearchBar();
    }
  });

  // Fetch search suggestions
  async function fetchSuggestions(query) {
    try {
      searchLoader.classList.remove("hidden");
      const response = await fetch(
        `${baseUrl}/api/products/suggestions?q=${query}`
      );
      const suggestions = await response.json();

      if (suggestions && suggestions.length > 0) {
        renderSuggestions(suggestions);
      } else {
        renderNoResults("No suggestions found.");
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      renderError("Failed to fetch suggestions.");
    } finally {
      searchLoader.classList.add("hidden");
    }
  }

  // Render suggestions
  function renderSuggestions(suggestions) {
    clearSuggestions();
    suggestions.forEach((product) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.className =
        "p-3 hover:bg-idcHighlight text-idcPrimary cursor-pointer rounded-lg";
      suggestionItem.textContent = product.name;
      suggestionItem.addEventListener("click", () => {
        searchProducts(product.name);
        closeSearchBar();
      });
      suggestionsList.appendChild(suggestionItem);
    });
    suggestionsList.classList.remove("hidden");
  }

  // Fetch and display search results
  async function searchProducts(query) {
    try {
      searchLoader.classList.remove("hidden");
      const response = await fetch(`${baseUrl}/api/products/search?q=${query}`);
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        renderSearchedProducts(data.products);
      } else {
        renderNoResults(`No products found for "${query}".`);
      }
    } catch (error) {
      console.error("Error during product search:", error);
      renderError("Failed to load search results. Please try again.");
    } finally {
      searchLoader.classList.add("hidden");
    }
  }

  // Render search results
  function renderSearchedProducts(products) {
    if (featuredProductsContainer) {
      featuredProductsContainer.innerHTML = products
        .map((product) => generateProductHTML(product, formatCurrency))
        .join("");
      featuredProductsContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Render no results message
  function renderNoResults(message) {
    clearSuggestions();
    const noResultsItem = document.createElement("li");
    noResultsItem.className = "p-3 text-idcText bg-idcBackground rounded-lg";
    noResultsItem.textContent = message;
    suggestionsList.appendChild(noResultsItem);
    suggestionsList.classList.remove("hidden");
  }

  // Render error message
  function renderError(message) {
    clearSuggestions();
    const errorItem = document.createElement("li");
    errorItem.className = "p-3 text-red-600 bg-idcBackground rounded-lg";
    errorItem.textContent = message;
    suggestionsList.appendChild(errorItem);
    suggestionsList.classList.remove("hidden");
  }

  // Clear suggestions
  function clearSuggestions() {
    suggestionsList.innerHTML = "";
    suggestionsList.classList.add("hidden");
  }

  // Close search bar
  function closeSearchBar() {
    searchBar.style.transform = "translateY(-100px)";
    clearSuggestions();
    searchInput.value = "";
  }
});

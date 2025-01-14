import { baseUrl } from "../constants.js";
import { addToCart, updateCartQuantity } from "../../data/cart.js";

// Check if the user is authenticated
export async function isAuthenticated() {
  try {
    const response = await fetch(`${baseUrl}/api/users/is-authenticated`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data.authenticated;
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
  }
  return false; // Default to false if there's an error
}

// Initialize Add to Cart listeners
export function initAddToCartListeners() {
  const buttons = document.querySelectorAll(".js-add-to-cart");

  if (!buttons.length) {
    console.error("No Add to Cart buttons found.");
  }

  buttons.forEach((button) => {
    console.log("Initializing listener for button:", button);
    const newButton = button.cloneNode(true);
    button.replaceWith(newButton);

    newButton.addEventListener("click", async () => {
      const productId = newButton.dataset.productId;
      if (!productId) {
        console.error("Missing productId for Add to Cart button.");
        return;
      }

      await handleAddToCart(productId, newButton);
    });
  });
}

// Handle adding a product to the cart
async function handleAddToCart(productId, button) {
  try {
    button.disabled = true;
    button.textContent = "Adding...";

    const productContainer = button.closest(".product-container");
    if (!productContainer) {
      console.error("Add to Cart button not inside a .product-container.");
      return;
    }

    const quantitySelector =
      productContainer.querySelector(".quantity-selector");
    if (!quantitySelector) {
      console.error("Quantity selector not found in product container.");
      return;
    }

    const quantity = parseInt(quantitySelector.value, 10) || 1;

    // Add to cart
    await addToCart(productId, quantity);
    await updateCartQuantity();

    // Show success message
    const addedMessage = productContainer.querySelector(".added-to-cart");
    if (addedMessage) {
      addedMessage.textContent = `${quantity} item(s) added to the cart!`;
      addedMessage.classList.remove("hidden");
      setTimeout(() => {
        addedMessage.classList.add("hidden");
      }, 2000);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("Failed to add the product to the cart. Please try again.");
  } finally {
    button.disabled = false;
    button.textContent = "Add to Cart";
  }
}

// Show login redirect prompt for unauthenticated users
function showLoginRedirectPrompt() {
  const proceedToLogin = confirm(
    "You must log in to add items to your cart. Would you like to log in now?"
  );
  if (proceedToLogin) {
    window.location.href = "/login.html";
  } else {
    alert("You cannot add items to the cart without logging in.");
  }
}

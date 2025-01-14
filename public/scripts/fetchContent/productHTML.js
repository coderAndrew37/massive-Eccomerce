export function generateProductHTML(product, formatCurrency) {
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
        ${formatCurrency(product.priceCents)}
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

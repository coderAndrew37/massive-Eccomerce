export function toggleSkeletons(skeletonContainer, productsContainer, show) {
  if (show) {
    skeletonContainer.classList.remove("hidden");
    productsContainer.classList.add("hidden");
  } else {
    skeletonContainer.classList.add("hidden");
    productsContainer.classList.remove("hidden");
  }
}

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

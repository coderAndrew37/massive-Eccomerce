export function renderFAQs(faqs, containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) return;

  // Handle case when FAQs are empty
  if (!faqs || faqs.length === 0) {
    container.innerHTML = `<p class="text-center text-idcText">No FAQs available at the moment.</p>`;
    return;
  }

  // Render each FAQ
  faqs.forEach((faq, index) => {
    const faqHTML = `
      <div class="border border-gray-300 rounded-lg">
        <button
          class="w-full text-left px-4 py-3 flex justify-between items-center font-bold text-idcPrimary"
          data-index="${index}"
        >
          <span>${faq.question}</span>
          <svg
            class="w-5 h-5 text-idcPrimary transform transition-transform duration-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <div
          class="hidden px-4 py-3 text-idcText transition-all duration-300"
          id="faq-answer-${index}"
        >
          ${faq.answer}
        </div>
      </div>
    `;
    container.innerHTML += faqHTML;
  });

  // Add toggle functionality
  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      const answer = document.getElementById(`faq-answer-${index}`);
      const icon = button.querySelector("svg");

      // Toggle visibility of the answer
      answer.classList.toggle("hidden");

      // Rotate the icon
      icon.classList.toggle("rotate-180");
    });
  });
}

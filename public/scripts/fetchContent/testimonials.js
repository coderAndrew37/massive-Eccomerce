export function renderTestimonials(testimonials, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (container) {
    testimonials.forEach((testimonial) => {
      const testimonialHTML = `
        <div class="bg-idcAccent p-6 rounded-lg shadow-lg hover:bg-idcHighlight hover:text-black transition">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mx-auto mb-4" loading="lazy">
          <p class="text-idcText mb-4">"${testimonial.message}"</p>
          <p class="text-idcHighlight font-bold hover:text-black">– ${testimonial.name}</p>
        </div>
      `;
      container.innerHTML += testimonialHTML;
    });
  }
}

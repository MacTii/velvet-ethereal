export function initGalleryPopup(images) {
  const imageUrls = images.map((img) => img.media_url);

  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".modal .close");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const openBtn = document.getElementById("openGalleryBtn");
  const grid = document.getElementById("gallery-grid");

  if (!modal || !modalImage || !imageUrls.length) return;

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + imageUrls.length) % imageUrls.length;
    modalImage.src = imageUrls[currentIndex];
  }

  function openModal(index = 0) {
    showImage(index);
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  openBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(0);
  });

  // Klikniecie w kafelek otwiera modal na tym konkretnym zdjeciu
  grid?.addEventListener("click", (e) => {
    const img = e.target.closest("img[data-index]");
    if (img) openModal(Number(img.dataset.index));
  });

  nextBtn?.addEventListener("click", () => showImage(currentIndex + 1));
  prevBtn?.addEventListener("click", () => showImage(currentIndex - 1));
  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (modal.style.display !== "block") return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  });
}

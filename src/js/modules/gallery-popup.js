export function initGalleryPopup(imageUrls = []) {
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".modal .close");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const openBtn = document.querySelector(".gallery__btn a");

  if (!modal || !modalImage || !openBtn) return;

  let currentIndex = 0;

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  function openModal() {
    modal.style.display = "block";
    showImage(currentIndex);
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showImage(index) {
    if (!imageUrls[index]) return;
    modalImage.src = imageUrls[index];
  }

  nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    showImage(currentIndex);
  });

  prevBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    showImage(currentIndex);
  });

  closeBtn?.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

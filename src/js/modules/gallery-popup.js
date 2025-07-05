export async function initGalleryPopup(userId) {
  try {
    const response = await fetch(`/api/instagram?userId=${userId}`);
    if (!response.ok) throw new Error("Nie udało się pobrać zdjęć z API");

    const images = await response.json();
    const imageUrls = images.map((img) => img.media_url);
    console.log("Załadowane zdjęcia:", imageUrls);

    const modal = document.getElementById("galleryModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".modal .close");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const openBtn = document.getElementById("openGalleryBtn");

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
  } catch (error) {
    console.error("Błąd ładowania galerii:", error);
  }
}

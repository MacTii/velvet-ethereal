import { initNavigation } from "./modules/navigation.js";
import { initAnimations } from "./modules/animations.js";
import { initSwiper } from "./modules/swiper.js";
import { loadInstagramMedia } from "./modules/instagram-media.js";
import { initGalleryPopup } from "./modules/gallery-popup.js";
import { initSendEmailForm } from "./modules/send-email.js";
import { fetchInstagramPhotos } from "./modules/instagram-photos.js";

document.addEventListener("DOMContentLoaded", async () => {
  initNavigation();
  initAnimations();
  initSwiper();
  const allPhotos = await fetchInstagramPhotos(import.meta.env.VITE_INSTAGRAM_USER_ID);
  loadInstagramMedia(allPhotos, "instagram-feed", 8);
  loadInstagramMedia(allPhotos, "gallery", 12);
  initGalleryPopup(allPhotos);
  initSendEmailForm();
});

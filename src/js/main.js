import { initNavigation } from "./modules/navigation.js";
import { initAnimations } from "./modules/animations.js";
import { initSwiper } from "./modules/swiper.js";
import { loadInstagramMedia } from "./modules/instagram-media.js";
import { initGalleryPopup } from "./modules/gallery-popup.js";
import { initSendEmailForm } from "./modules/send-email.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAnimations();
  initSwiper();
  loadInstagramMedia(import.meta.env.VITE_INSTAGRAM_USER_ID, "instagram-feed", 8);
  loadInstagramMedia(import.meta.env.VITE_INSTAGRAM_USER_ID, "gallery", 12);
  initGalleryPopup(import.meta.env.VITE_INSTAGRAM_USER_ID);
  initSendEmailForm();
});

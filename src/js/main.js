import { initNavigation } from "./modules/navigation.js";
import { initAnimations } from "./modules/animations.js";
import { initSwiper } from "./modules/swiper.js";
import { loadInstagramMedia } from "./modules/instagram-media.js";
import { initGalleryPopup } from "./modules/gallery-popup.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAnimations();
  initSwiper();
  loadInstagramMedia(import.meta.env.VITE_INSTAGRAM_USER_ID, "instagram-feed");
  loadInstagramMedia(import.meta.env.VITE_INSTAGRAM_USER_ID, "gallery", 16);
  // const staticImages = [
  //   "/assets/image-1.jpg",
  //   "/assets/image-2.jpg",
  //   "/assets/image-3.jpg",
  //   "/assets/image-4.jpg",
  //   "/assets/image-5.jpg",
  //   "/assets/image-6.jpg",
  //   "/assets/image-7.jpg",
  //   "/assets/image-8.jpg",
  // ];

  initGalleryPopup(import.meta.env.VITE_INSTAGRAM_USER_ID);
});

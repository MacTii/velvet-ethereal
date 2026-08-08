import { initSiteNotice } from "./modules/site-notice.js";
import { initNavigation } from "./modules/navigation.js";
import { initAnimations } from "./modules/animations.js";
import { loadInstagramMedia } from "./modules/instagram-media.js";
import { initGalleryPopup } from "./modules/gallery-popup.js";
import { initSendEmailForm } from "./modules/send-email.js";
import { fetchInstagramPhotos } from "./modules/instagram-photos.js";

const GALLERY_SIZE = 12;

document.addEventListener("DOMContentLoaded", async () => {
  initSiteNotice();
  initNavigation();
  initAnimations();
  initSendEmailForm();

  const allPhotos = await fetchInstagramPhotos();
  const galleryPhotos = allPhotos.slice(0, GALLERY_SIZE);

  loadInstagramMedia(allPhotos.slice(0, 8), "instagram-feed", { duplicate: true });
  loadInstagramMedia(galleryPhotos, "gallery-grid");
  initGalleryPopup(galleryPhotos);
});

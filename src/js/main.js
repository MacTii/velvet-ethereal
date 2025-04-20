import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initSwiper } from './modules/swiper.js';
import { loadInstagramMedia } from './modules/instagram-media.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initSwiper();
  loadInstagramMedia(import.meta.env.VITE_INSTAGRAM_USER_ID, 'instagram-feed');
  loadInstagramMedia(import.meta.env.VITE_INSTAGRAM_USER_ID, 'gallery', 16);
});
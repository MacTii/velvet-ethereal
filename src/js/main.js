// Import funkcji
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initSwiper } from './modules/swiper.js';

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initSwiper();
});
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initSwiper } from './modules/swiper.js';
import { loadInstagramFeed } from './modules/instagram-feed.js';

// Odczyt zmiennych środowiskowych
const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;

// Sprawdzenie czy zmienne zostały załadowane
if (!userId) {
  console.error('Brak konfiguracji Instagram API! Sprawdź plik .env');
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  loadInstagramFeed(userId);
  initSwiper();
});
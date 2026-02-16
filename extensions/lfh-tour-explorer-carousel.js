/**
 * Last Frontier Tour Explorer - Variant B: Horizontal Carousel
 *
 * In-chat widget displaying tours in a horizontal carousel with
 * prev/next arrows, dot indicators, touch/swipe support, and counter.
 * Clicking a card opens the shared expanded modal.
 *
 * Triggers on VoiceFlow trace: ext_tourExplorer_carousel
 *
 * @version 1.0.0
 * @author Last Frontier Heliskiing / RomAIx
 */

import { LFH_TOURS, LFH_COLORS, LFH_ASSETS, openTourExplorerModal } from './lfh-tour-explorer-modal.js';

export const LFHTourExplorerCarousel = {
  name: 'LFHTourExplorerCarousel',
  type: 'response',

  match: ({ trace }) =>
    trace.type === 'ext_tourExplorer_carousel' ||
    trace.payload?.name === 'ext_tourExplorer_carousel',

  render: ({ trace, element }) => {
    const {
      formTitle = 'OUR HELISKIING TOURS',
      formSubtitle = 'Explore packages from two unique lodges in Northern BC',
      animateIn = true,
    } = trace.payload || {};

    element.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'lfhte-carousel-widget';

    if (animateIn) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      container.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    // Helpers
    function lodgeBadgeText(lodges) {
      if (lodges.includes('both')) return 'Both Lodges';
      return lodges.map((l) => (l === 'bell2' ? 'Bell 2' : l === 'ripley' ? 'Ripley Creek' : l)).join(' & ');
    }

    // Build slide HTML
    const slidesHTML = LFH_TOURS.map(
      (tour, i) => `
      <div class="lfhte-cw-slide ${i === 0 ? 'active' : ''}" data-index="${i}" data-tour-id="${tour.id}">
        <div class="lfhte-cw-slide-img" style="background-image: url('${tour.heroImage}')"></div>
        <div class="lfhte-cw-slide-body">
          <h3 class="lfhte-cw-slide-name">${tour.name}</h3>
          <p class="lfhte-cw-slide-sub">${tour.subtitle}</p>
          <div class="lfhte-cw-slide-stats">
            <span>${tour.duration}</span>
            <span class="lfhte-cw-divider">|</span>
            <span>${tour.verticalGuarantee}</span>
            <span class="lfhte-cw-divider">|</span>
            <span>From $${tour.priceFrom.toLocaleString()}</span>
          </div>
          <span class="lfhte-cw-slide-badge">${lodgeBadgeText(tour.lodges)}</span>
        </div>
      </div>
    `
    ).join('');

    const dotsHTML = LFH_TOURS.map(
      (_, i) => `<button class="lfhte-cw-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`
    ).join('');

    container.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

@font-face {
  font-family: 'Nexa Rust Sans Black 2';
  src: url('https://yannicksegaar.github.io/lastfrontier-voiceflow-styles/fonts/NexaRustSansBlack2.woff2') format('woff2');
  font-weight: 900; font-style: normal; font-display: swap;
}

.lfhte-carousel-widget {
  width: 100%; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: ${LFH_COLORS.background}; border-radius: 8px; overflow: hidden;
  box-sizing: border-box;
}
.lfhte-carousel-widget * { box-sizing: border-box; }

/* Header - reuse branded dark wood pattern */
.lfhte-cw-header {
  position: relative; background-image: url('${LFH_ASSETS.bgImage}');
  background-size: cover; background-position: center;
  text-align: center; overflow: hidden; padding: 24px 20px 28px;
}
.lfhte-cw-header::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.4));
  pointer-events: none; z-index: 1;
}
.lfhte-cw-title {
  position: relative; z-index: 2;
  font-family: 'Nexa Rust Sans Black 2', 'Inter', sans-serif;
  font-size: 20px; font-weight: 900; color: #fff;
  text-transform: uppercase; letter-spacing: 3px;
  margin: 0 0 8px; text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}
.lfhte-cw-subtitle {
  position: relative; z-index: 2;
  font-family: 'Inter', sans-serif; font-size: 12px;
  color: #fff; line-height: 1.5; margin: 0; opacity: 0.95;
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
}

/* Carousel Container */
.lfhte-cw-carousel {
  position: relative; padding: 16px 12px 8px;
  overflow: hidden;
}

/* Slides wrapper */
.lfhte-cw-slides {
  position: relative; height: 320px; overflow: hidden;
}

/* Individual slide */
.lfhte-cw-slide {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0; transform: translateX(100%);
  transition: opacity 0.4s ease, transform 0.4s ease;
  cursor: pointer; border-radius: 10px; overflow: hidden;
  border: 2px solid ${LFH_COLORS.border};
  background: #fff;
}
.lfhte-cw-slide.active {
  opacity: 1; transform: translateX(0);
}
.lfhte-cw-slide.exit-left {
  opacity: 0; transform: translateX(-100%);
}
.lfhte-cw-slide:hover { border-color: ${LFH_COLORS.primaryRed}; }

.lfhte-cw-slide-img {
  width: 100%; height: 160px;
  background-size: cover; background-position: center;
}
.lfhte-cw-slide-body { padding: 12px 14px; }
.lfhte-cw-slide-name {
  font-size: 16px; font-weight: 700;
  color: ${LFH_COLORS.primaryRed}; margin: 0 0 4px;
}
.lfhte-cw-slide-sub {
  font-size: 12px; color: ${LFH_COLORS.textSecondary};
  font-style: italic; margin: 0 0 10px;
}
.lfhte-cw-slide-stats {
  font-size: 12px; font-weight: 600; color: ${LFH_COLORS.textPrimary};
  margin-bottom: 10px;
}
.lfhte-cw-divider { margin: 0 6px; opacity: 0.3; }
.lfhte-cw-slide-badge {
  display: inline-block; padding: 4px 10px; border-radius: 20px;
  font-size: 10px; font-weight: 600; color: #fff;
  background: ${LFH_COLORS.primaryRed}; text-transform: uppercase;
  letter-spacing: 0.3px;
}

/* Nav Arrows */
.lfhte-cw-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,0.9); border: 2px solid ${LFH_COLORS.primaryRed};
  color: ${LFH_COLORS.primaryRed}; font-size: 18px;
  cursor: pointer; z-index: 5; display: flex;
  align-items: center; justify-content: center;
  transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.lfhte-cw-arrow:hover {
  background: ${LFH_COLORS.primaryRed}; color: #fff;
}
.lfhte-cw-prev { left: 4px; }
.lfhte-cw-next { right: 4px; }

/* Dots */
.lfhte-cw-dots {
  display: flex; justify-content: center; gap: 6px;
  padding: 10px 0 4px;
}
.lfhte-cw-dot {
  width: 8px; height: 8px; border-radius: 4px;
  border: none; background: ${LFH_COLORS.border};
  cursor: pointer; transition: all 0.3s;
}
.lfhte-cw-dot.active {
  width: 20px; background: ${LFH_COLORS.primaryRed};
}

/* Counter */
.lfhte-cw-counter {
  text-align: center; font-size: 12px; font-weight: 600;
  color: ${LFH_COLORS.textSecondary}; padding: 4px 0 8px;
}

/* Footer */
.lfhte-cw-footer {
  padding: 12px 16px; text-align: center;
  border-top: 1px solid ${LFH_COLORS.border};
}
.lfhte-cw-cta {
  display: block; width: 100%; padding: 12px 20px;
  background: ${LFH_COLORS.primaryRed}; color: #fff;
  border: none; border-radius: 6px;
  font-family: 'Inter', sans-serif; font-size: 13px;
  font-weight: 600; cursor: pointer; transition: all 0.2s;
  margin-bottom: 8px;
}
.lfhte-cw-cta:hover { background: #c4221a; transform: translateY(-1px); }
.lfhte-cw-footer-text {
  font-family: 'Inter', sans-serif; font-size: 12px;
  color: ${LFH_COLORS.textSecondary}; margin: 0;
}
.lfhte-cw-footer-text strong { color: ${LFH_COLORS.textPrimary}; font-weight: 700; }

/* Mobile breakpoint */
@media (max-width: 500px) {
  .lfhte-cw-slides { height: 280px; }
  .lfhte-cw-slide-img { height: 130px; }
}
</style>

<!-- Header -->
<div class="lfhte-cw-header">
  <p class="lfhte-cw-title">${formTitle}</p>
  <p class="lfhte-cw-subtitle">${formSubtitle}</p>
</div>

<!-- Carousel -->
<div class="lfhte-cw-carousel">
  <div class="lfhte-cw-slides" id="lfhte-cw-slides">${slidesHTML}</div>
  <button class="lfhte-cw-arrow lfhte-cw-prev" id="lfhte-cw-prev">&#10094;</button>
  <button class="lfhte-cw-arrow lfhte-cw-next" id="lfhte-cw-next">&#10095;</button>
</div>
<div class="lfhte-cw-dots" id="lfhte-cw-dots">${dotsHTML}</div>
<div class="lfhte-cw-counter" id="lfhte-cw-counter">1 / ${LFH_TOURS.length}</div>

<!-- Footer -->
<div class="lfhte-cw-footer">
  <button class="lfhte-cw-cta" id="lfhte-cw-explore-btn">Explore All Tours</button>
  <p class="lfhte-cw-footer-text">Still have questions? <strong>Just ask!</strong></p>
</div>
`;

    element.appendChild(container);

    // Animate in
    if (animateIn) {
      setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 50);
    }

    // ---- Carousel Logic ----
    let currentIndex = 0;
    const totalSlides = LFH_TOURS.length;

    function goToSlide(index) {
      const slides = container.querySelectorAll('.lfhte-cw-slide');
      const dots = container.querySelectorAll('.lfhte-cw-dot');

      // Exit current
      slides[currentIndex].classList.remove('active');
      slides[currentIndex].classList.add(index > currentIndex ? 'exit-left' : '');

      currentIndex = index;

      // Reset all, then activate target
      slides.forEach((s) => {
        s.classList.remove('active', 'exit-left');
        s.style.transform = '';
        s.style.opacity = '';
      });
      slides[currentIndex].classList.add('active');

      // Update dots
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
        d.style.width = i === currentIndex ? '20px' : '8px';
        d.style.background = i === currentIndex ? LFH_COLORS.primaryRed : LFH_COLORS.border;
      });

      // Update counter
      container.querySelector('#lfhte-cw-counter').textContent = `${currentIndex + 1} / ${totalSlides}`;
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % totalSlides);
    }

    function prevSlide() {
      goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }

    // Arrow clicks
    container.querySelector('#lfhte-cw-prev')?.addEventListener('click', prevSlide);
    container.querySelector('#lfhte-cw-next')?.addEventListener('click', nextSlide);

    // Dot clicks
    container.querySelectorAll('.lfhte-cw-dot').forEach((dot) => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
    });

    // Touch/swipe
    let touchStartX = 0;
    let touchEndX = 0;
    const slidesEl = container.querySelector('#lfhte-cw-slides');

    slidesEl?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slidesEl?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) nextSlide();
      if (touchEndX > touchStartX + 50) prevSlide();
    });

    // Slide click → open modal focused on tour
    container.querySelectorAll('.lfhte-cw-slide').forEach((slide) => {
      slide.addEventListener('click', () => {
        openTourExplorerModal(slide.dataset.tourId);
      });
    });

    // CTA → open modal
    container.querySelector('#lfhte-cw-explore-btn')?.addEventListener('click', () => {
      openTourExplorerModal();
    });

    return function cleanup() {};
  },
};

export default LFHTourExplorerCarousel;

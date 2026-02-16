/**
 * Last Frontier Weather Conditions - In-Chat Widget
 *
 * VoiceFlow extension displaying a branded weather conditions card
 * with dark wood header, description, and CTA that opens the
 * weather conditions iframe modal.
 *
 * Triggers on VoiceFlow trace: ext_weather_conditions1
 *
 * @version 1.0.0
 * @author Last Frontier Heliskiing / RomAIx
 */

import { LFH_COLORS, LFH_ASSETS } from './lfh-tour-explorer-modal.js';
import { openWeatherConditionsModal } from './lfh-weather-conditions-modal.js';

export const LFHWeatherConditionsWidgetV1 = {
  name: 'LFHWeatherConditionsWidgetV1',
  type: 'response',

  match: ({ trace }) =>
    trace.type === 'ext_weather_conditions_v1' ||
    trace.payload?.name === 'ext_weather_conditions_v1',

  render: ({ trace, element }) => {
    const {
      formTitle = 'WEATHER CONDITIONS',
      formSubtitle = 'Live heliskiing conditions in Northern BC',
      description = 'Check current weather, snowfall reports, and skiing conditions at Bell 2 Lodge and Ripley Creek.',
      buttonText = 'View Current Conditions',
      footerNote = 'Updated regularly during the season',
      animateIn = true,
    } = trace.payload || {};

    element.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'lfhww-widget';

    if (animateIn) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      container.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    container.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

@font-face {
  font-family: 'Nexa Rust Sans Black 2';
  src: url('https://yannicksegaar.github.io/lastfrontier-voiceflow-styles/fonts/NexaRustSansBlack2.woff2') format('woff2');
  font-weight: 900; font-style: normal; font-display: swap;
}

.lfhww-widget {
  width: 100%; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: ${LFH_COLORS.background}; border-radius: 12px; overflow: hidden;
  box-sizing: border-box; border: 1px solid ${LFH_COLORS.border};
}
.lfhww-widget * { box-sizing: border-box; }

/* Header (dark wood background) */
.lfhww-header {
  position: relative; background-image: url('${LFH_ASSETS.bgImage}');
  background-size: cover; background-position: center;
  text-align: center; overflow: hidden; padding: 20px 16px 22px;
}
.lfhww-header::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.45));
  pointer-events: none; z-index: 1;
}
.lfhww-title {
  position: relative; z-index: 2;
  font-family: 'Nexa Rust Sans Black 2', 'Inter', sans-serif;
  font-size: 18px; font-weight: 900; color: #fff;
  text-transform: uppercase; letter-spacing: 2.5px;
  margin: 0 0 6px; text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}
.lfhww-subtitle {
  position: relative; z-index: 2;
  font-family: 'Inter', sans-serif; font-size: 12px;
  color: #fff; line-height: 1.4; margin: 0; opacity: 0.92;
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
}

/* Body */
.lfhww-body {
  padding: 18px 16px;
  display: flex; align-items: flex-start; gap: 14px;
}
.lfhww-icon {
  flex-shrink: 0;
  width: 44px; height: 44px;
  background: ${LFH_COLORS.infoBox};
  border: 1px solid ${LFH_COLORS.border};
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
}
.lfhww-desc {
  font-size: 13px; line-height: 1.6;
  color: ${LFH_COLORS.textPrimary}; margin: 0;
}

/* Footer */
.lfhww-footer {
  padding: 12px 16px 16px;
  text-align: center;
  border-top: 1px solid ${LFH_COLORS.border};
  background: ${LFH_COLORS.infoBox};
}
.lfhww-cta {
  display: block; width: 100%; padding: 12px 20px;
  background: ${LFH_COLORS.primaryRed}; color: #fff;
  border: none; border-radius: 8px;
  font-family: 'Inter', sans-serif; font-size: 13px;
  font-weight: 600; cursor: pointer; transition: all 0.2s;
  margin-bottom: 8px;
}
.lfhww-cta:hover { background: #c4221a; transform: translateY(-1px); }
.lfhww-footer-text {
  font-family: 'Inter', sans-serif; font-size: 11px;
  color: ${LFH_COLORS.textSecondary}; margin: 0;
}

/* Mobile */
@media (max-width: 480px) {
  .lfhww-title { font-size: 16px; letter-spacing: 2px; }
  .lfhww-body { gap: 12px; padding: 14px 14px; }
  .lfhww-icon { width: 38px; height: 38px; font-size: 20px; }
  .lfhww-desc { font-size: 12px; }
}
</style>

<!-- Header -->
<div class="lfhww-header">
  <p class="lfhww-title">${formTitle}</p>
  <p class="lfhww-subtitle">${formSubtitle}</p>
</div>

<!-- Body -->
<div class="lfhww-body">
  <div class="lfhww-icon">&#9729;</div>
  <p class="lfhww-desc">${description}</p>
</div>

<!-- Footer -->
<div class="lfhww-footer">
  <button class="lfhww-cta" id="lfhww-open-btn">${buttonText}</button>
  <p class="lfhww-footer-text">${footerNote}</p>
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

    // CTA → open modal
    container.querySelector('#lfhww-open-btn')?.addEventListener('click', () => {
      openWeatherConditionsModal();
    });

    return function cleanup() {};
  },
};

export default LFHWeatherConditionsWidgetV1;

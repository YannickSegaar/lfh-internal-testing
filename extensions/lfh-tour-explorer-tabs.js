/**
 * Last Frontier Tour Explorer - Variant C: Lodge-First Tabs
 *
 * In-chat widget with three tabs (Bell 2 / Ripley Creek / Safari & Private)
 * and accordion-style tour lists under each tab. Expanding a tour shows
 * key details. Clicking "View Details" opens the shared modal.
 *
 * Triggers on VoiceFlow trace: ext_tourExplorer_tabs
 *
 * @version 1.0.0
 * @author Last Frontier Heliskiing / RomAIx
 */

import { LFH_TOURS, LFH_COLORS, LFH_ASSETS, openTourExplorerModal } from './lfh-tour-explorer-modal.js';

export const LFHTourExplorerTabs = {
  name: 'LFHTourExplorerTabs',
  type: 'response',

  match: ({ trace }) =>
    trace.type === 'ext_tourExplorer_tabs' ||
    trace.payload?.name === 'ext_tourExplorer_tabs',

  render: ({ trace, element }) => {
    const {
      formTitle = 'OUR HELISKIING TOURS',
      formSubtitle = 'Explore packages from two unique lodges in Northern BC',
      initialTab = 'bell2',
      animateIn = true,
    } = trace.payload || {};

    element.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'lfhte-tabs-widget';

    if (animateIn) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      container.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    // Categorize tours by tab
    const tabs = {
      bell2: {
        label: 'Bell 2',
        tours: LFH_TOURS.filter((t) => t.lodges.includes('bell2')),
      },
      ripley: {
        label: 'Ripley Creek',
        tours: LFH_TOURS.filter((t) => t.lodges.includes('ripley')),
      },
      safari: {
        label: 'Safari & Private',
        tours: LFH_TOURS.filter((t) => t.lodges.includes('both') || t.id === 'private'),
      },
    };

    // Duration badge color
    function durationColor(days) {
      if (days <= 4) return '#2196F3';
      if (days <= 5) return '#4CAF50';
      if (days <= 7) return '#FF9800';
      return '#9C27B0';
    }

    // Build accordion HTML for each tab
    function buildAccordion(tabKey) {
      const tabData = tabs[tabKey];
      if (tabData.tours.length === 0) {
        return '<p class="lfhte-tw-empty">No tours available for this lodge.</p>';
      }
      return tabData.tours
        .map(
          (tour) => `
        <div class="lfhte-tw-accordion-item" data-tour-id="${tour.id}">
          <button class="lfhte-tw-accordion-trigger">
            <div class="lfhte-tw-accordion-left">
              <span class="lfhte-tw-tour-name">${tour.name}</span>
              <span class="lfhte-tw-duration-badge" style="background:${durationColor(tour.durationDays)}">${tour.duration}</span>
            </div>
            <span class="lfhte-tw-accordion-icon">+</span>
          </button>
          <div class="lfhte-tw-accordion-content">
            <div class="lfhte-tw-detail-row">
              <span class="lfhte-tw-detail-label">Vertical Guarantee</span>
              <span class="lfhte-tw-detail-value">${tour.verticalGuarantee}</span>
            </div>
            <div class="lfhte-tw-detail-row">
              <span class="lfhte-tw-detail-label">Starting From</span>
              <span class="lfhte-tw-detail-value lfhte-tw-price">$${tour.priceFrom.toLocaleString()} CAD</span>
            </div>
            <div class="lfhte-tw-detail-row">
              <span class="lfhte-tw-detail-label">Skill Level</span>
              <span class="lfhte-tw-detail-value">${tour.skillLevel}</span>
            </div>
            <p class="lfhte-tw-brief-desc">${tour.description.substring(0, 140)}...</p>
            <button class="lfhte-tw-view-details" data-tour-id="${tour.id}">View Details &rarr;</button>
          </div>
        </div>
      `
        )
        .join('');
    }

    // Tab buttons
    const tabButtonsHTML = Object.entries(tabs)
      .map(
        ([key, data]) =>
          `<li class="lfhte-tw-tab ${key === initialTab ? 'active' : ''}" role="tab" data-tab="${key}">${data.label}</li>`
      )
      .join('');

    // Tab panels
    const tabPanelsHTML = Object.entries(tabs)
      .map(
        ([key]) =>
          `<div class="lfhte-tw-panel ${key === initialTab ? 'active' : ''}" data-panel="${key}">${buildAccordion(key)}</div>`
      )
      .join('');

    container.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

@font-face {
  font-family: 'Nexa Rust Sans Black 2';
  src: url('https://yannicksegaar.github.io/lastfrontier-voiceflow-styles/fonts/NexaRustSansBlack2.woff2') format('woff2');
  font-weight: 900; font-style: normal; font-display: swap;
}

.lfhte-tabs-widget {
  width: 100%; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: ${LFH_COLORS.background}; border-radius: 8px; overflow: hidden;
  box-sizing: border-box;
}
.lfhte-tabs-widget * { box-sizing: border-box; }

/* Header */
.lfhte-tw-header {
  position: relative; background-image: url('${LFH_ASSETS.bgImage}');
  background-size: cover; background-position: center;
  text-align: center; overflow: hidden; padding: 24px 20px 28px;
}
.lfhte-tw-header::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.4));
  pointer-events: none; z-index: 1;
}
.lfhte-tw-title {
  position: relative; z-index: 2;
  font-family: 'Nexa Rust Sans Black 2', 'Inter', sans-serif;
  font-size: 20px; font-weight: 900; color: #fff;
  text-transform: uppercase; letter-spacing: 3px;
  margin: 0 0 8px; text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}
.lfhte-tw-subtitle {
  position: relative; z-index: 2;
  font-family: 'Inter', sans-serif; font-size: 12px;
  color: #fff; line-height: 1.5; margin: 0; opacity: 0.95;
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
}

/* Tab Navigation */
.lfhte-tw-tabs {
  display: flex; background: ${LFH_COLORS.infoBox};
  border-bottom: 1px solid ${LFH_COLORS.border};
  padding: 0; margin: 0; list-style: none;
}
.lfhte-tw-tab {
  flex: 1; padding: 12px 8px; text-align: center;
  font-family: 'Inter', sans-serif; font-size: 11px;
  font-weight: 700; color: ${LFH_COLORS.textSecondary};
  cursor: pointer; border: none; background: transparent;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.lfhte-tw-tab:hover { background: #eee; color: ${LFH_COLORS.textPrimary}; }
.lfhte-tw-tab.active {
  color: ${LFH_COLORS.primaryRed};
  border-bottom-color: ${LFH_COLORS.primaryRed};
  background: ${LFH_COLORS.background};
}

/* Content Area */
.lfhte-tw-content {
  padding: 12px; max-height: 380px; overflow-y: auto;
  background: ${LFH_COLORS.background};
}
.lfhte-tw-content::-webkit-scrollbar { width: 4px; }
.lfhte-tw-content::-webkit-scrollbar-track { background: ${LFH_COLORS.infoBox}; }
.lfhte-tw-content::-webkit-scrollbar-thumb { background: ${LFH_COLORS.border}; border-radius: 2px; }

/* Panels */
.lfhte-tw-panel { display: none; animation: lfhte-tw-fadeIn 0.3s ease-out; }
.lfhte-tw-panel.active { display: block; }

@keyframes lfhte-tw-fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.lfhte-tw-empty {
  text-align: center; font-size: 13px; color: ${LFH_COLORS.textSecondary};
  padding: 30px 0;
}

/* Accordion */
.lfhte-tw-accordion-item {
  border: 1.5px solid ${LFH_COLORS.border}; border-radius: 8px;
  overflow: hidden; transition: border-color 0.2s ease;
  margin-bottom: 8px;
}
.lfhte-tw-accordion-item:hover { border-color: #ccc; }
.lfhte-tw-accordion-item.open {
  border-color: ${LFH_COLORS.primaryRed};
  border-left: 3px solid ${LFH_COLORS.primaryRed};
  background: ${LFH_COLORS.selectedTint};
}

.lfhte-tw-accordion-trigger {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 12px 14px;
  background: ${LFH_COLORS.background}; border: none;
  font-family: 'Inter', sans-serif; cursor: pointer;
  text-align: left; transition: background 0.2s ease;
}
.lfhte-tw-accordion-item.open .lfhte-tw-accordion-trigger { background: transparent; }
.lfhte-tw-accordion-trigger:hover { background: ${LFH_COLORS.infoBox}; }

.lfhte-tw-accordion-left { display: flex; align-items: center; gap: 10px; }
.lfhte-tw-tour-name {
  font-size: 13px; font-weight: 600; color: ${LFH_COLORS.textPrimary};
}
.lfhte-tw-duration-badge {
  padding: 2px 8px; border-radius: 10px; font-size: 9px;
  font-weight: 600; color: #fff; text-transform: uppercase;
}
.lfhte-tw-accordion-icon {
  font-size: 16px; font-weight: 700; color: ${LFH_COLORS.primaryRed};
  transition: transform 0.2s ease; flex-shrink: 0; margin-left: 10px;
}
.lfhte-tw-accordion-item.open .lfhte-tw-accordion-icon { transform: rotate(45deg); }

/* Accordion Content */
.lfhte-tw-accordion-content {
  display: none; padding: 0 14px 14px;
}
.lfhte-tw-accordion-item.open .lfhte-tw-accordion-content { display: block; }

.lfhte-tw-detail-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.06);
}
.lfhte-tw-detail-label {
  font-size: 11px; color: ${LFH_COLORS.textSecondary};
  font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;
}
.lfhte-tw-detail-value {
  font-size: 12px; color: ${LFH_COLORS.textPrimary}; font-weight: 600;
}
.lfhte-tw-price { color: ${LFH_COLORS.primaryRed}; }

.lfhte-tw-brief-desc {
  font-size: 11px; color: ${LFH_COLORS.textSecondary};
  line-height: 1.5; margin: 8px 0;
}
.lfhte-tw-view-details {
  background: transparent; border: none; color: ${LFH_COLORS.primaryRed};
  font-family: 'Inter', sans-serif; font-size: 12px;
  font-weight: 600; cursor: pointer; padding: 4px 0;
  transition: opacity 0.2s;
}
.lfhte-tw-view-details:hover { opacity: 0.7; }

/* Footer */
.lfhte-tw-footer {
  padding: 12px 16px; text-align: center;
  border-top: 1px solid ${LFH_COLORS.border};
}
.lfhte-tw-cta {
  display: block; width: 100%; padding: 12px 20px;
  background: ${LFH_COLORS.primaryRed}; color: #fff;
  border: none; border-radius: 6px;
  font-family: 'Inter', sans-serif; font-size: 13px;
  font-weight: 600; cursor: pointer; transition: all 0.2s;
  margin-bottom: 8px;
}
.lfhte-tw-cta:hover { background: #c4221a; transform: translateY(-1px); }
.lfhte-tw-footer-text {
  font-family: 'Inter', sans-serif; font-size: 12px;
  color: ${LFH_COLORS.textSecondary}; margin: 0;
}
.lfhte-tw-footer-text strong { color: ${LFH_COLORS.textPrimary}; font-weight: 700; }

/* Mobile breakpoint */
@media (max-width: 400px) {
  .lfhte-tw-tab { font-size: 10px; padding: 10px 4px; letter-spacing: 0; }
}
</style>

<!-- Header -->
<div class="lfhte-tw-header">
  <p class="lfhte-tw-title">${formTitle}</p>
  <p class="lfhte-tw-subtitle">${formSubtitle}</p>
</div>

<!-- Tab Navigation -->
<ul class="lfhte-tw-tabs" role="tablist">${tabButtonsHTML}</ul>

<!-- Content -->
<div class="lfhte-tw-content">${tabPanelsHTML}</div>

<!-- Footer -->
<div class="lfhte-tw-footer">
  <button class="lfhte-tw-cta" id="lfhte-tw-explore-btn">Explore All Tours</button>
  <p class="lfhte-tw-footer-text">Still have questions? <strong>Just ask!</strong></p>
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

    // ---- Tab Navigation ----
    container.querySelectorAll('.lfhte-tw-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;

        container.querySelectorAll('.lfhte-tw-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        container.querySelectorAll('.lfhte-tw-panel').forEach((p) => p.classList.remove('active'));
        container.querySelector(`[data-panel="${tabName}"]`)?.classList.add('active');
      });
    });

    // ---- Accordion Logic ----
    container.querySelectorAll('.lfhte-tw-accordion-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.lfhte-tw-accordion-item');
        const wasOpen = item.classList.contains('open');

        // Close all in same panel
        const panel = item.closest('.lfhte-tw-panel');
        panel.querySelectorAll('.lfhte-tw-accordion-item').forEach((i) => i.classList.remove('open'));

        if (!wasOpen) {
          item.classList.add('open');
        }
      });
    });

    // ---- View Details → open modal ----
    container.querySelectorAll('.lfhte-tw-view-details').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTourExplorerModal(btn.dataset.tourId);
      });
    });

    // CTA → open modal
    container.querySelector('#lfhte-tw-explore-btn')?.addEventListener('click', () => {
      openTourExplorerModal();
    });

    return function cleanup() {};
  },
};

export default LFHTourExplorerTabs;

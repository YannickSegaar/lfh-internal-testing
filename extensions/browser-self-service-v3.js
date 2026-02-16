/**
 * Last Frontier Browser Self-Service Extension v3.0
 *
 * Improvements over v2:
 * - Video thumbnails from LFH website
 * - Episode numbering (Episode 1, Episode 2, etc.)
 * - "Dig Deeper" section header above video grid
 * - Custom inline SVG icons for each resource type
 *
 * @version 3.0.0
 * @author Last Frontier Heliskiing / RomAIx
 */

export const LastFrontierBrowserSelfService_v3 = {
  name: 'LastFrontierBrowserSelfService_v3',
  type: 'response',

  match: ({ trace }) =>
    trace.type === 'ext_browserSelfService_v3' ||
    trace.payload?.name === 'ext_browserSelfService_v3',

  render: ({ trace, element }) => {
    // --- Configuration from VoiceFlow Payload ---
    const {
      formTitle = 'Discover Heliskiing',
      formSubtitle = 'Explore our videos, FAQs, and resources',
      initialTab = 'videos',
      animateIn = true,
    } = trace.payload || {};

    // --- Color Palette ---
    const colors = {
      primaryRed: '#e62b1e',
      textPrimary: '#42494e',
      textSecondary: '#666666',
      background: '#FFFFFF',
      infoBox: '#F5F5F5',
      border: '#E5E8EB',
      selectedTint: 'rgba(230, 43, 30, 0.04)',
    };

    // ========================================================================
    // INLINE SVG ICONS FOR RESOURCES
    // ========================================================================

    const resourceIcons = {
      // FAQ - Question mark in circle
      faq: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>`,

      // Is Heliskiing For Me? - Clipboard/checklist
      prep: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>`,

      // YouTube - Play button logo
      youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
      </svg>`,

      // Compare Lodges - Building/house icon
      lodges: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>`,
    };

    // ========================================================================
    // DATA
    // ========================================================================

    const data = {
      videos: [
        {
          id: 'location',
          episode: 1,
          title: 'Location',
          vimeoId: '234398800',
          thumbnail: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/01_Last_Frontier_Backgrounder_Series_Location-510x339.jpg',
          description: "Where we fly - Northern BC's Skeena Mountains",
        },
        {
          id: 'lodging',
          episode: 2,
          title: 'Lodging',
          vimeoId: '237992712',
          thumbnail: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/02_Last_Frontier_Backgrounder_Series_Lodging-510x340.jpg',
          description: 'Where you stay - Two unique lodge experiences',
        },
        {
          id: 'terrain',
          episode: 3,
          title: 'Terrain',
          vimeoId: '242847858',
          thumbnail: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/03_Last_Frontier_Backgrounder_Series_Terrain-496x350.jpg',
          description: 'What you ski - From alpine bowls to gladed trees',
        },
        {
          id: 'day-in-life',
          episode: 4,
          title: 'Day in the Life',
          vimeoId: '247898299',
          thumbnail: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/04_Last_Frontier_Backgrounder_Series_Day_In_The_Life-510x340.jpg',
          description: 'How a day unfolds - 8-12 runs, 15,000+ feet',
        },
        {
          id: 'safety',
          episode: 5,
          title: 'Safety',
          vimeoId: '251401988',
          thumbnail: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/05_Last_Frontier_Backgrounder_Series_Safety-510x340.jpg',
          description: 'How we keep you safe - Protocols and equipment',
        },
        {
          id: 'crew',
          episode: 6,
          title: 'The Crew',
          vimeoId: '256697044',
          thumbnail: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/06_Last_Frontier_Backgrounder_Series_The_Crew-510x340.jpg',
          description: "Who you'll meet - Guides, pilots, and staff",
        },
      ],

      faqs: [
        {
          id: 'skill',
          question: 'How good do I have to be?',
          answer:
            "You should be a strong intermediate skier comfortable on ungroomed terrain. You don't need to be a pro, but you do need confident parallel turns and the ability to handle varied snow conditions. For Ripley Creek specifically, expert-level skills are required.",
        },
        {
          id: 'included',
          question: "What's included?",
          answer:
            'Your package includes helicopter access, certified guides, all meals, lodging, powder skis/poles, and complete safety equipment (transceivers, ABS airbags). You just need to bring your boots and outerwear.',
        },
        {
          id: 'safety',
          question: 'Is it safe?',
          answer:
            'Safety is our top priority. All guests are trained on avalanche equipment, travel with ACMG-certified guides, and carry ABS airbag systems. Our guides assess conditions daily and choose terrain accordingly.',
        },
        {
          id: 'day',
          question: 'What does a typical day look like?',
          answer:
            "After breakfast, you'll fly out around 8:30 AM. Expect 8-12 runs totaling 15,000-20,000+ vertical feet. Lunch is in the mountains. You're usually back at the lodge by 4 PM for hot tub, sauna, and dinner.",
        },
        {
          id: 'lodge',
          question: 'Which lodge should I choose?',
          answer:
            'Bell 2 Lodge is great for strong intermediate to expert skiers who want a remote, off-grid experience. Ripley Creek is for experts only - steeper terrain, 30% more snow, quirky historic town setting.',
        },
        {
          id: 'bring',
          question: 'What do I need to bring?',
          answer:
            'Your ski or snowboard boots, outerwear, thermal layers, goggles, helmet, gloves, and comfortable evening clothes. We provide powder skis, poles, and all safety equipment.',
        },
      ],

      resources: [
        {
          id: 'faq',
          title: 'FAQ for First-Timers',
          description: 'Comprehensive answers to common questions',
          url: 'https://lastfrontierheli.com/heliski-resource-guide/faq-first-time-heli-skiers/',
          icon: 'faq',
        },
        {
          id: 'prep',
          title: 'Is Heliskiing For Me?',
          description: 'Honest guide to skill and fitness requirements',
          url: 'https://lastfrontierheli.com/is-heliskiing-for-me/',
          icon: 'prep',
        },
        {
          id: 'youtube',
          title: 'YouTube Channel',
          description: 'More videos and guest footage',
          url: 'https://youtube.com/LastFrontierHeli1',
          icon: 'youtube',
        },
        {
          id: 'lodges',
          title: 'Compare Lodges',
          description: 'Bell 2 vs Ripley Creek in detail',
          url: 'https://lastfrontierheli.com/lodges/',
          icon: 'lodges',
        },
      ],
    };

    // ========================================================================
    // STATE
    // ========================================================================

    let currentTab = initialTab;
    let currentVideoId = null;

    // ========================================================================
    // SETUP CONTAINER
    // ========================================================================

    element.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'lfh-ss-v3';

    if (animateIn) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      container.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    // ========================================================================
    // STYLES & HTML
    // ========================================================================

    container.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

/* Nexa Rust Sans Black 2 - hosted on GitHub Pages */
@font-face {
  font-family: 'Nexa Rust Sans Black 2';
  src: url('https://yannicksegaar.github.io/lastfrontier-voiceflow-styles/fonts/NexaRustSansBlack2.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

.lfh-ss-v3 {
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: ${colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
}

.lfh-ss-v3 * {
  box-sizing: border-box;
}

/* ===== HEADER - Full dark wood background with logo overlay ===== */
.lfh-ss-v3-header {
  position: relative;
  background-image: url('https://yannicksegaar.github.io/RomAIx-Logo/LFH_bg_content_and_image_black.png');
  background-size: cover;
  background-position: center;
  text-align: center;
  overflow: hidden;
  padding: 24px 20px 28px 20px;
}

/* Dark overlay for better text contrast */
.lfh-ss-v3-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Logo sits directly on background */
.lfh-ss-v3-logo-container {
  position: relative;
  z-index: 2;
  display: inline-block;
  margin-bottom: 16px;
}

.lfh-ss-v3-logo {
  max-height: 50px;
  max-width: 260px;
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.lfh-ss-v3-header-label {
  position: relative;
  z-index: 2;
  font-family: 'Nexa Rust Sans Black 2', 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 900;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.lfh-ss-v3-header-description {
  position: relative;
  z-index: 2;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1.5;
  margin: 0;
  opacity: 0.95;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}

/* ===== TAB NAVIGATION ===== */
.lfh-ss-v3-tabs {
  display: flex;
  background: ${colors.infoBox};
  border-bottom: 1px solid ${colors.border};
  padding: 0;
  margin: 0;
  list-style: none;
}

.lfh-ss-v3-tab {
  flex: 1;
  padding: 12px 8px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: ${colors.textSecondary};
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.lfh-ss-v3-tab:hover {
  background: #eee;
  color: ${colors.textPrimary};
}

.lfh-ss-v3-tab.active {
  color: ${colors.primaryRed};
  border-bottom-color: ${colors.primaryRed};
  background: ${colors.background};
}

/* ===== CONTENT AREA ===== */
.lfh-ss-v3-content {
  padding: 16px;
  max-height: 420px;
  overflow-y: auto;
  background: ${colors.background};
}

.lfh-ss-v3-panel {
  display: none;
  animation: lfh-ss-v3-fadeIn 0.3s ease-out;
}

.lfh-ss-v3-panel.active {
  display: block;
}

@keyframes lfh-ss-v3-fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== DIG DEEPER SECTION HEADER ===== */
.lfh-ss-v3-dig-deeper-header {
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${colors.border};
}

.lfh-ss-v3-dig-deeper-title {
  font-family: 'Nexa Rust Sans Black 2', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 900;
  color: ${colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0 0 6px 0;
}

.lfh-ss-v3-dig-deeper-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: ${colors.textSecondary};
  line-height: 1.5;
  margin: 0;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}

/* ===== VIDEO GRID ===== */
.lfh-ss-v3-video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.lfh-ss-v3-video-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-size: cover;
  background-position: center;
  aspect-ratio: 16/10;
  border: 2px solid transparent;
}

/* Mask overlay - matches Last Frontier website styling */
.lfh-ss-v3-video-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://www.lastfrontierheli.com/wp-content/themes/lastfrontier/dist/images/videos-img-mask.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  pointer-events: none;
}

.lfh-ss-v3-video-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: ${colors.primaryRed};
}

.lfh-ss-v3-video-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  padding: 24px 10px 10px;
  color: #fff;
  z-index: 2;
}

.lfh-ss-v3-video-episode {
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 2px 0;
  opacity: 0.85;
}

.lfh-ss-v3-video-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.lfh-ss-v3-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;
}

.lfh-ss-v3-video-card:hover .lfh-ss-v3-play-icon {
  transform: translate(-50%, -50%) scale(1.05);
  background: ${colors.primaryRed};
  border-color: ${colors.primaryRed};
  box-shadow: 0 4px 12px rgba(230, 43, 30, 0.5);
}

.lfh-ss-v3-play-icon::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 12px solid #fff;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  margin-left: 3px;
}

/* ===== VIDEO PLAYER ===== */
.lfh-ss-v3-player {
  display: none;
}

.lfh-ss-v3-player.active {
  display: block;
}

.lfh-ss-v3-player-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.lfh-ss-v3-back-btn {
  background: ${colors.infoBox};
  border: 1px solid ${colors.border};
  border-radius: 6px;
  padding: 8px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.lfh-ss-v3-back-btn:hover {
  background: #eee;
  color: ${colors.textPrimary};
  border-color: ${colors.primaryRed};
}

.lfh-ss-v3-player-title {
  font-size: 14px;
  font-weight: 900;
  color: ${colors.textPrimary};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.lfh-ss-v3-player-frame {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.lfh-ss-v3-player-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.lfh-ss-v3-player-desc {
  font-size: 12px;
  color: ${colors.textSecondary};
  margin: 10px 0;
  line-height: 1.4;
}

.lfh-ss-v3-related {
  margin-top: 12px;
}

.lfh-ss-v3-related-label {
  font-size: 10px;
  font-weight: 700;
  color: ${colors.textSecondary};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.lfh-ss-v3-related-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.lfh-ss-v3-related-card {
  flex: 0 0 90px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  aspect-ratio: 16/10;
  background-size: cover;
  background-position: center;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

/* Mask overlay for related cards */
.lfh-ss-v3-related-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://www.lastfrontierheli.com/wp-content/themes/lastfrontier/dist/images/videos-img-mask.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  pointer-events: none;
}

.lfh-ss-v3-related-card:hover {
  border-color: ${colors.primaryRed};
}

.lfh-ss-v3-related-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  padding: 16px 6px 6px;
  z-index: 2;
}

.lfh-ss-v3-related-card-episode {
  font-size: 7px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin: 0;
  opacity: 0.8;
}

.lfh-ss-v3-related-card-title {
  font-size: 9px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  margin: 0;
}

/* ===== FAQ ACCORDION ===== */
.lfh-ss-v3-faq-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lfh-ss-v3-faq-item {
  border: 1.5px solid ${colors.border};
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.lfh-ss-v3-faq-item:hover {
  border-color: #ccc;
}

.lfh-ss-v3-faq-item.open {
  border-color: ${colors.primaryRed};
  border-left: 3px solid ${colors.primaryRed};
  background: ${colors.selectedTint};
}

.lfh-ss-v3-faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 14px;
  background: ${colors.background};
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.textPrimary};
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
}

.lfh-ss-v3-faq-item.open .lfh-ss-v3-faq-question {
  background: transparent;
}

.lfh-ss-v3-faq-question:hover {
  background: ${colors.infoBox};
}

.lfh-ss-v3-faq-icon {
  font-size: 16px;
  font-weight: 700;
  color: ${colors.primaryRed};
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-left: 10px;
}

.lfh-ss-v3-faq-item.open .lfh-ss-v3-faq-icon {
  transform: rotate(45deg);
}

.lfh-ss-v3-faq-answer {
  display: none;
  padding: 0 14px 14px;
  font-size: 12px;
  color: ${colors.textSecondary};
  line-height: 1.6;
  background: transparent;
}

.lfh-ss-v3-faq-item.open .lfh-ss-v3-faq-answer {
  display: block;
}

/* ===== RESOURCES ===== */
.lfh-ss-v3-resources {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lfh-ss-v3-resource-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: ${colors.background};
  border: 1.5px solid ${colors.border};
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.lfh-ss-v3-resource-card:hover {
  border-color: ${colors.primaryRed};
  border-left: 3px solid ${colors.primaryRed};
  background: ${colors.selectedTint};
}

.lfh-ss-v3-resource-icon {
  width: 36px;
  height: 36px;
  background: ${colors.primaryRed};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lfh-ss-v3-resource-icon svg {
  width: 18px;
  height: 18px;
  color: white;
}

.lfh-ss-v3-resource-info {
  flex: 1;
  min-width: 0;
}

.lfh-ss-v3-resource-title {
  font-size: 13px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 2px 0;
}

.lfh-ss-v3-resource-desc {
  font-size: 11px;
  color: ${colors.textSecondary};
  margin: 0;
}

.lfh-ss-v3-resource-arrow {
  color: ${colors.primaryRed};
  font-size: 16px;
  flex-shrink: 0;
}

/* ===== FOOTER ===== */
.lfh-ss-v3-footer {
  padding: 12px 16px;
  background: ${colors.infoBox};
  border-top: 1px solid ${colors.border};
  text-align: center;
}

.lfh-ss-v3-footer-text {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: ${colors.textSecondary};
  margin: 0;
}

.lfh-ss-v3-footer-text strong {
  color: ${colors.textPrimary};
  font-weight: 700;
}

/* ===== SCROLLBAR ===== */
.lfh-ss-v3-content::-webkit-scrollbar {
  width: 4px;
}

.lfh-ss-v3-content::-webkit-scrollbar-track {
  background: ${colors.infoBox};
  border-radius: 2px;
}

.lfh-ss-v3-content::-webkit-scrollbar-thumb {
  background: ${colors.border};
  border-radius: 2px;
}

.lfh-ss-v3-content::-webkit-scrollbar-thumb:hover {
  background: #CBD5E1;
}
</style>

<!-- HEADER - Full dark wood background with logo overlay -->
<div class="lfh-ss-v3-header">
  <div class="lfh-ss-v3-logo-container">
    <img
      src="https://yannicksegaar.github.io/RomAIx-Logo/LFH_Logo_FullName_White.svg"
      alt="Last Frontier Heliskiing"
      class="lfh-ss-v3-logo"
    />
  </div>
  <p class="lfh-ss-v3-header-label">${formTitle}</p>
  <p class="lfh-ss-v3-header-description">${formSubtitle}</p>
</div>

<!-- TAB NAVIGATION -->
<ul class="lfh-ss-v3-tabs" role="tablist">
  <li class="lfh-ss-v3-tab ${initialTab === 'videos' ? 'active' : ''}" role="tab" data-tab="videos">Videos</li>
  <li class="lfh-ss-v3-tab ${initialTab === 'faq' ? 'active' : ''}" role="tab" data-tab="faq">FAQ</li>
  <li class="lfh-ss-v3-tab ${initialTab === 'resources' ? 'active' : ''}" role="tab" data-tab="resources">Resources</li>
</ul>

<!-- CONTENT AREA -->
<div class="lfh-ss-v3-content">
  <!-- Videos Panel -->
  <div class="lfh-ss-v3-panel ${initialTab === 'videos' ? 'active' : ''}" data-panel="videos">
    <!-- Dig Deeper Header -->
    <div class="lfh-ss-v3-dig-deeper-header">
      <h3 class="lfh-ss-v3-dig-deeper-title">Dig Deeper With Our Backgrounder Videos</h3>
      <p class="lfh-ss-v3-dig-deeper-subtitle">Discover more about who we are, what we do and how we do it in our six-part helicopter skiing mini-series.</p>
    </div>
    <div class="lfh-ss-v3-video-grid" id="lfh-ss-v3-video-grid">
      ${data.videos
        .map(
          (video) => `
        <div class="lfh-ss-v3-video-card" data-video-id="${video.id}" data-vimeo="${video.vimeoId}" style="background-image: url('${video.thumbnail}');">
          <div class="lfh-ss-v3-play-icon"></div>
          <div class="lfh-ss-v3-video-overlay">
            <p class="lfh-ss-v3-video-episode">Episode ${video.episode}</p>
            <p class="lfh-ss-v3-video-title">${video.title}</p>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  </div>

  <!-- Video Player -->
  <div class="lfh-ss-v3-player" id="lfh-ss-v3-video-player">
    <div class="lfh-ss-v3-player-header">
      <button class="lfh-ss-v3-back-btn" id="lfh-ss-v3-back-to-grid">Back</button>
      <h3 class="lfh-ss-v3-player-title" id="lfh-ss-v3-player-title"></h3>
    </div>
    <div class="lfh-ss-v3-player-frame" id="lfh-ss-v3-player-frame"></div>
    <p class="lfh-ss-v3-player-desc" id="lfh-ss-v3-player-desc"></p>
    <div class="lfh-ss-v3-related">
      <p class="lfh-ss-v3-related-label">Up next</p>
      <div class="lfh-ss-v3-related-row" id="lfh-ss-v3-related-videos"></div>
    </div>
  </div>

  <!-- FAQ Panel -->
  <div class="lfh-ss-v3-panel ${initialTab === 'faq' ? 'active' : ''}" data-panel="faq">
    <div class="lfh-ss-v3-faq-list">
      ${data.faqs
        .map(
          (faq) => `
        <div class="lfh-ss-v3-faq-item" data-faq="${faq.id}">
          <button class="lfh-ss-v3-faq-question">
            <span>${faq.question}</span>
            <span class="lfh-ss-v3-faq-icon">+</span>
          </button>
          <div class="lfh-ss-v3-faq-answer">${faq.answer}</div>
        </div>
      `
        )
        .join('')}
    </div>
  </div>

  <!-- Resources Panel -->
  <div class="lfh-ss-v3-panel ${initialTab === 'resources' ? 'active' : ''}" data-panel="resources">
    <div class="lfh-ss-v3-resources">
      ${data.resources
        .map(
          (resource) => `
        <a class="lfh-ss-v3-resource-card" href="${resource.url}" target="_blank" rel="noopener" data-resource="${resource.id}">
          <div class="lfh-ss-v3-resource-icon">
            ${resourceIcons[resource.icon] || resourceIcons.faq}
          </div>
          <div class="lfh-ss-v3-resource-info">
            <p class="lfh-ss-v3-resource-title">${resource.title}</p>
            <p class="lfh-ss-v3-resource-desc">${resource.description}</p>
          </div>
          <span class="lfh-ss-v3-resource-arrow">\u2192</span>
        </a>
      `
        )
        .join('')}
    </div>
  </div>
</div>

<!-- FOOTER -->
<div class="lfh-ss-v3-footer">
  <p class="lfh-ss-v3-footer-text">Still have questions? <strong>Just ask!</strong></p>
</div>
`;

    element.appendChild(container);

    // ========================================================================
    // ANIMATE IN
    // ========================================================================
    if (animateIn) {
      setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 50);
    }

    // ========================================================================
    // HELPER FUNCTIONS
    // ========================================================================

    // NOTE: trackEvent removed to prevent extension interactions from triggering
    // the VoiceFlow agent. The agent will only continue when the user types
    // something in the chat input.

    function showVideoPlayer(videoId) {
      const video = data.videos.find((v) => v.id === videoId);
      if (!video) return;

      currentVideoId = videoId;

      // Hide grid, show player
      container.querySelector('[data-panel="videos"]').classList.remove('active');
      container.querySelector('#lfh-ss-v3-video-player').classList.add('active');

      // Set player content
      container.querySelector('#lfh-ss-v3-player-title').textContent = `Episode ${video.episode}: ${video.title}`;
      container.querySelector('#lfh-ss-v3-player-desc').textContent = video.description;
      container.querySelector('#lfh-ss-v3-player-frame').innerHTML = `
        <iframe
          src="https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0"
          allow="autoplay; fullscreen"
          allowfullscreen>
        </iframe>
      `;

      // Set related videos with thumbnails
      const relatedVideos = data.videos.filter((v) => v.id !== videoId).slice(0, 3);
      container.querySelector('#lfh-ss-v3-related-videos').innerHTML = relatedVideos
        .map(
          (v) => `
        <div class="lfh-ss-v3-related-card" data-video-id="${v.id}" data-vimeo="${v.vimeoId}" style="background-image: url('${v.thumbnail}');">
          <div class="lfh-ss-v3-related-card-overlay">
            <p class="lfh-ss-v3-related-card-episode">Ep ${v.episode}</p>
            <p class="lfh-ss-v3-related-card-title">${v.title}</p>
          </div>
        </div>
      `
        )
        .join('');

    }

    function hideVideoPlayer() {
      container.querySelector('#lfh-ss-v3-player-frame').innerHTML = '';
      container.querySelector('#lfh-ss-v3-video-player').classList.remove('active');
      container.querySelector('[data-panel="videos"]').classList.add('active');
      currentVideoId = null;
    }

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    // Tab navigation
    container.querySelectorAll('.lfh-ss-v3-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;

        // If in video player, go back first
        if (currentVideoId && tabName === 'videos') {
          hideVideoPlayer();
        }

        // Update tabs
        container.querySelectorAll('.lfh-ss-v3-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        // Update panels
        container.querySelectorAll('.lfh-ss-v3-panel').forEach((p) => p.classList.remove('active'));
        container.querySelector(`[data-panel="${tabName}"]`)?.classList.add('active');

        // Hide video player if switching away
        if (tabName !== 'videos' && currentVideoId) {
          hideVideoPlayer();
        }

        // Also hide player panel when switching tabs
        container.querySelector('#lfh-ss-v3-video-player').classList.remove('active');

        currentTab = tabName;
      });
    });

    // Video card clicks
    container.addEventListener('click', (e) => {
      const videoCard = e.target.closest('[data-video-id]');
      if (videoCard) {
        showVideoPlayer(videoCard.dataset.videoId);
      }
    });

    // Back button
    container.querySelector('#lfh-ss-v3-back-to-grid')?.addEventListener('click', hideVideoPlayer);

    // FAQ accordion
    container.querySelectorAll('.lfh-ss-v3-faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.lfh-ss-v3-faq-item');
        const wasOpen = item.classList.contains('open');

        // Close all others
        container.querySelectorAll('.lfh-ss-v3-faq-item').forEach((i) => i.classList.remove('open'));

        // Toggle this one
        if (!wasOpen) {
          item.classList.add('open');
        }
      });
    });

    return function cleanup() {
      // Cleanup if needed
    };
  },
};

export default LastFrontierBrowserSelfService_v3;

/**
 * Last Frontier Welcome Path Selector Extension (V4 Onboarding)
 *
 * Displays a compact branded card with 4 intent-path buttons,
 * letting users self-select their journey type on first interaction.
 *
 * Trace type: ext_welcomePath
 * Payload: (none required)
 *
 * @version 1.0.0
 */

export const LastFrontierWelcomePath = {
  name: 'LastFrontierWelcomePath',
  type: 'response',

  match: ({ trace }) =>
    trace.type === 'ext_welcomePath' ||
    trace.payload?.name === 'ext_welcomePath',

  render: ({ trace, element }) => {
    const paths = [
      {
        id: 'planning',
        label: 'Planning a Trip',
        description: 'Dates, lodges, packages — let\'s find your perfect tour',
        icon: '\u{1F3D4}\uFE0F',
        intentLevel: 'HIGH'
      },
      {
        id: 'browsing',
        label: 'Just Browsing',
        description: 'Videos, photos, and info to explore at your own pace',
        icon: '\u{1F50D}',
        intentLevel: 'LOW'
      },
      {
        id: 'question',
        label: 'Specific Question',
        description: 'Safety, gear, pricing, booking — ask me anything',
        icon: '\u{2753}',
        intentLevel: 'MEDIUM'
      },
      {
        id: 'everything',
        label: 'Show Me Everything',
        description: 'The full tour showcase — lodges, packages, and pricing',
        icon: '\u{1F680}',
        intentLevel: 'HIGH'
      }
    ];

    // ========================================================================
    // STYLES
    // ========================================================================

    const styles = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      .lfh-path {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        max-width: 100%;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        background: #fff;
      }

      .lfh-path * {
        box-sizing: border-box;
      }

      .lfh-path-header {
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        padding: 20px 20px 16px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .lfh-path-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: #E62B1E;
      }

      .lfh-path-brand {
        font-size: 11px;
        font-weight: 600;
        color: #E62B1E;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin: 0 0 6px 0;
      }

      .lfh-path-title {
        font-size: 18px;
        font-weight: 700;
        color: #fff;
        margin: 0;
        line-height: 1.3;
      }

      .lfh-path-buttons {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .lfh-path-btn {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        background: #fff;
        border: 1.5px solid #e8e8e8;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
      }

      .lfh-path-btn:hover {
        border-color: #E62B1E;
        background: #fef7f6;
        box-shadow: 0 2px 8px rgba(230, 43, 30, 0.08);
      }

      .lfh-path-btn:active {
        transform: scale(0.98);
      }

      .lfh-path-btn-icon {
        font-size: 22px;
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        border-radius: 8px;
        transition: background 0.2s;
      }

      .lfh-path-btn:hover .lfh-path-btn-icon {
        background: #fde8e6;
      }

      .lfh-path-btn-text {
        flex: 1;
        min-width: 0;
      }

      .lfh-path-btn-label {
        font-size: 14px;
        font-weight: 600;
        color: #42494e;
        margin: 0;
        line-height: 1.3;
      }

      .lfh-path-btn-desc {
        font-size: 12px;
        color: #888;
        margin: 2px 0 0 0;
        line-height: 1.3;
      }

      .lfh-path-btn-arrow {
        font-size: 16px;
        color: #ccc;
        flex-shrink: 0;
        transition: color 0.2s, transform 0.2s;
      }

      .lfh-path-btn:hover .lfh-path-btn-arrow {
        color: #E62B1E;
        transform: translateX(2px);
      }

      .lfh-path-footer {
        text-align: center;
        padding: 0 16px 14px;
        font-size: 12px;
        color: #bbb;
      }
    `;

    // ========================================================================
    // BUILD HTML
    // ========================================================================

    const buttonsHtml = paths.map(path => `
      <button class="lfh-path-btn" data-path="${path.id}" data-intent="${path.intentLevel}">
        <span class="lfh-path-btn-icon">${path.icon}</span>
        <span class="lfh-path-btn-text">
          <p class="lfh-path-btn-label">${path.label}</p>
          <p class="lfh-path-btn-desc">${path.description}</p>
        </span>
        <span class="lfh-path-btn-arrow">&rsaquo;</span>
      </button>
    `).join('');

    const container = document.createElement('div');
    container.innerHTML = `
      <style>${styles}</style>
      <div class="lfh-path">
        <div class="lfh-path-header">
          <p class="lfh-path-brand">Last Frontier Heliskiing</p>
          <p class="lfh-path-title">How can I help today?</p>
        </div>
        <div class="lfh-path-buttons">
          ${buttonsHtml}
        </div>
        <p class="lfh-path-footer">or just start typing...</p>
      </div>
    `;

    // ========================================================================
    // BUTTON CLICK HANDLERS
    // ========================================================================

    container.querySelectorAll('.lfh-path-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pathId = btn.dataset.path;

        const pathMessages = {
          planning: 'I\'m planning a heliskiing trip',
          browsing: 'I\'m just browsing — show me what you\'ve got',
          question: 'I have a specific question',
          everything: 'Show me everything — tours, lodges, pricing'
        };

        const message = pathMessages[pathId];
        if (message) {
          window.voiceflow?.chat?.interact({
            type: 'intent',
            payload: { query: message }
          });
        }
      });
    });

    element.appendChild(container);
  }
};

export default LastFrontierWelcomePath;

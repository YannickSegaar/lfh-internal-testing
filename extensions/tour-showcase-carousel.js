/**
 * Last Frontier Tour Showcase Carousel Extension
 *
 * A multi-view carousel displaying lodges, tour types, and pricing.
 * Designed for VoiceFlow chat widget integration.
 *
 * @version 1.0.0
 * @author Last Frontier Heliskiing
 */

export const LastFrontierTourShowcase1 = {
  name: 'LastFrontierTourShowcase1',
  type: 'response',

  match: ({ trace }) =>
    trace.type === 'ext_tourShowcase1' ||
    trace.payload?.name === 'ext_tourShowcase1',

  render: ({ trace, element }) => {
    const payload = trace.payload || {};
    const initialView = payload.view || 'lodges';

    // ========================================================================
    // DATA
    // ========================================================================

    const data = {
      lodges: [
        {
          id: 'bell2',
          name: 'Bell 2 Lodge',
          tagline: 'Remote & Off-the-Grid',
          capacity: '36 guests',
          terrain: 'Intermediate to Expert',
          mountains: 'Skeena Mountains',
          setting: 'Custom-built heliski village',
          image: 'https://lastfrontierheli.com/wp-content/uploads/bell2-lodge-hero.jpg',
          highlights: [
            'Cozy log chalets with wood-burning stoves',
            'Depart directly from lodge helipads',
            'Excellent bad-weather tree skiing nearby',
            'Hot tub, sauna, fitness centre'
          ],
          features: {
            connectivity: 'No cell service, high-speed WiFi',
            heliAccess: 'Depart from lodge',
            snow: 'Excellent coverage',
            downtime: 'Snowshoeing, fat biking, archery, skeet shooting'
          }
        },
        {
          id: 'ripley',
          name: 'Ripley Creek',
          tagline: 'Expert Terrain, Historic Setting',
          capacity: '24 guests',
          terrain: 'Expert Only',
          mountains: 'Coast Mountains',
          setting: 'Historic mining town of Stewart, BC',
          image: 'https://lastfrontierheli.com/wp-content/uploads/ripley-creek-hero.jpg',
          highlights: [
            'Quirky heritage buildings, no two rooms alike',
            '30% more snow on average',
            'Massive glacier runs & old growth tree skiing',
            'Walk to restaurants & cross border to Alaska'
          ],
          features: {
            connectivity: 'Cell service + medium WiFi',
            heliAccess: '15-40 min drive to staging',
            snow: '30% more on average',
            downtime: 'Explore Stewart, museum, Alaska border crossing'
          }
        }
      ],

      tourTypes: [
        {
          id: 'regular',
          name: 'Regular Tours',
          description: '4, 5, or 7-day packages at either lodge',
          icon: '🎿',
          features: ['Single lodge experience', 'Vertical guarantee pricing', 'Max 4 guests per guide']
        },
        {
          id: 'safari',
          name: 'Safari Tours',
          description: 'Experience both lodges in one epic trip',
          icon: '🚁',
          features: ['Both Bell 2 & Ripley Creek', '7 or 10-day options', 'Helicopter transfer between lodges']
        },
        {
          id: 'private',
          name: 'Private Tours',
          description: 'Your own helicopter & unlimited vertical',
          icon: '⭐',
          features: ['Dedicated helicopter', 'Unlimited vertical', 'Private guides', 'VIP transfers']
        }
      ],

      tours: {
        regular: [
          {
            duration: '4 Days',
            vertical: '17,500m',
            bell2: { peak: '$10,400 - $12,710', early: 'N/A', late: 'N/A' },
            ripley: { peak: '$9,300 - $11,310', early: 'N/A', late: 'N/A' },
            note: 'Peak season only'
          },
          {
            duration: '5 Days',
            vertical: '22,000m',
            bell2: { peak: '$12,400 - $15,640', early: '$11,800 - $14,010', late: '$14,440' },
            ripley: { peak: '$11,000 - $13,890', early: '$10,100 - $12,440', late: '$10,700 - $12,840' },
            note: 'Available year-round'
          },
          {
            duration: '7 Days',
            vertical: '30,500m',
            bell2: { peak: '$20,980', early: '$14,500 - $19,490', late: 'N/A' },
            ripley: { peak: '$14,500 - $18,630', early: '$13,600 - $17,300', late: 'N/A' },
            note: 'Flagship experience'
          }
        ],
        safari: [
          {
            duration: '7-Day Safari',
            vertical: '30,500m',
            price: '$20,130',
            description: 'Both lodges, helicopter transfer midweek'
          },
          {
            duration: '10-Day Safari',
            vertical: '44,000m',
            price: '$23,980',
            description: 'Five days at each lodge'
          }
        ],
        private: [
          {
            duration: '5 Days',
            heliTime: '5-10 hours',
            singleGroup: '$83,570 - $108,370',
            twoGroup: '$129,710 - $165,720',
            note: 'Single group = 4 guests, Two group = 8 guests'
          },
          {
            duration: '7 Days',
            heliTime: '7-14 hours',
            singleGroup: '$111,170 - $144,420',
            twoGroup: '$167,280 - $220,530',
            note: 'Single group = 4 guests, Two group = 8 guests'
          }
        ]
      }
    };

    // ========================================================================
    // STYLES
    // ========================================================================

    const styles = `
      .lfh-carousel {
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        max-width: 100%;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .lfh-carousel * {
        box-sizing: border-box;
      }

      /* Navigation Tabs */
      .lfh-tabs {
        display: flex;
        background: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .lfh-tab {
        flex: 1;
        padding: 12px 8px;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        color: #666;
        cursor: pointer;
        border: none;
        background: transparent;
        transition: all 0.2s ease;
        border-bottom: 3px solid transparent;
      }

      .lfh-tab:hover {
        background: #eee;
        color: #42494e;
      }

      .lfh-tab.active {
        color: #E62B1E;
        border-bottom-color: #E62B1E;
        background: #fff;
      }

      /* View Container */
      .lfh-view {
        display: none;
        padding: 16px;
      }

      .lfh-view.active {
        display: block;
      }

      /* Section Headers */
      .lfh-section-label {
        color: #E62B1E;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      .lfh-section-title {
        color: #42494e;
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 16px 0;
        line-height: 1.3;
      }

      /* Lodge Cards */
      .lfh-lodge-card {
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 16px;
      }

      .lfh-lodge-image {
        width: 100%;
        height: 140px;
        object-fit: cover;
        background: #f0f0f0;
      }

      .lfh-lodge-content {
        padding: 16px;
      }

      .lfh-lodge-name {
        font-size: 18px;
        font-weight: 700;
        color: #42494e;
        margin: 0 0 4px 0;
      }

      .lfh-lodge-tagline {
        font-size: 14px;
        color: #E62B1E;
        font-weight: 500;
        margin: 0 0 12px 0;
      }

      .lfh-lodge-meta {
        display: flex;
        gap: 16px;
        margin-bottom: 12px;
        font-size: 13px;
        color: #666;
      }

      .lfh-lodge-meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .lfh-lodge-highlights {
        list-style: none;
        padding: 0;
        margin: 0 0 16px 0;
      }

      .lfh-lodge-highlights li {
        font-size: 13px;
        color: #444;
        padding: 4px 0 4px 20px;
        position: relative;
      }

      .lfh-lodge-highlights li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #E62B1E;
        font-weight: bold;
      }

      /* Tour Type Cards */
      .lfh-type-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .lfh-type-card {
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .lfh-type-card:hover {
        border-color: #E62B1E;
        box-shadow: 0 2px 8px rgba(230, 43, 30, 0.1);
      }

      .lfh-type-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
      }

      .lfh-type-icon {
        font-size: 24px;
      }

      .lfh-type-name {
        font-size: 16px;
        font-weight: 700;
        color: #42494e;
        margin: 0;
      }

      .lfh-type-description {
        font-size: 14px;
        color: #666;
        margin: 0 0 12px 0;
      }

      .lfh-type-features {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .lfh-feature-tag {
        background: #f5f5f5;
        color: #444;
        font-size: 12px;
        padding: 4px 10px;
        border-radius: 12px;
      }

      /* Pricing Cards */
      .lfh-pricing-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .lfh-pricing-card {
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 16px;
      }

      .lfh-pricing-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .lfh-pricing-duration {
        font-size: 18px;
        font-weight: 700;
        color: #42494e;
      }

      .lfh-pricing-vertical {
        background: #f5f5f5;
        color: #666;
        font-size: 12px;
        padding: 4px 10px;
        border-radius: 12px;
      }

      .lfh-pricing-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 12px;
      }

      .lfh-pricing-lodge {
        text-align: center;
      }

      .lfh-pricing-lodge-name {
        font-size: 12px;
        font-weight: 600;
        color: #666;
        margin-bottom: 4px;
      }

      .lfh-pricing-amount {
        font-size: 14px;
        font-weight: 700;
        color: #42494e;
      }

      .lfh-pricing-note {
        font-size: 12px;
        color: #888;
        text-align: center;
        font-style: italic;
      }

      /* Safari & Private Pricing */
      .lfh-special-card {
        background: linear-gradient(135deg, #f9f9f9 0%, #fff 100%);
        border: 2px solid #e0e0e0;
      }

      .lfh-special-card.featured {
        border-color: #E62B1E;
      }

      .lfh-special-price {
        font-size: 24px;
        font-weight: 700;
        color: #E62B1E;
        margin: 8px 0;
      }

      .lfh-special-description {
        font-size: 13px;
        color: #666;
        margin: 0;
      }

      /* Buttons */
      .lfh-btn {
        display: inline-block;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid #E62B1E;
        background: #fff;
        color: #E62B1E;
        width: 100%;
        margin-top: 8px;
      }

      .lfh-btn:hover {
        background: #E62B1E;
        color: #fff;
      }

      .lfh-btn-primary {
        background: #E62B1E;
        color: #fff;
      }

      .lfh-btn-primary:hover {
        background: #c42419;
      }

      /* Comparison Table */
      .lfh-comparison {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
        margin-top: 16px;
      }

      .lfh-comparison th,
      .lfh-comparison td {
        padding: 10px 8px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
      }

      .lfh-comparison th {
        background: #f5f5f5;
        font-weight: 600;
        color: #42494e;
      }

      .lfh-comparison td:first-child {
        font-weight: 500;
        color: #666;
      }

      /* Sub-navigation for pricing */
      .lfh-subnav {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
      }

      .lfh-subnav-btn {
        flex: 1;
        padding: 8px 12px;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        background: #f5f5f5;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #666;
      }

      .lfh-subnav-btn:hover {
        background: #eee;
      }

      .lfh-subnav-btn.active {
        background: #fff;
        border-color: #E62B1E;
        color: #E62B1E;
      }

      /* Footer note */
      .lfh-footer-note {
        font-size: 11px;
        color: #888;
        text-align: center;
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid #e0e0e0;
      }
    `;

    // ========================================================================
    // RENDER FUNCTIONS
    // ========================================================================

    function renderLodgesView() {
      return `
        <div class="lfh-view active" data-view="lodges">
          <div class="lfh-section-label">Choose Your Base</div>
          <h2 class="lfh-section-title">Two Unique Lodges</h2>

          ${data.lodges.map(lodge => `
            <div class="lfh-lodge-card">
              <img class="lfh-lodge-image" src="${lodge.image}" alt="${lodge.name}"
                   onerror="this.style.display='none'">
              <div class="lfh-lodge-content">
                <h3 class="lfh-lodge-name">${lodge.name}</h3>
                <p class="lfh-lodge-tagline">${lodge.tagline}</p>
                <div class="lfh-lodge-meta">
                  <span class="lfh-lodge-meta-item">👥 ${lodge.capacity}</span>
                  <span class="lfh-lodge-meta-item">🏔️ ${lodge.terrain}</span>
                </div>
                <ul class="lfh-lodge-highlights">
                  ${lodge.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
                <button class="lfh-btn" data-action="learn-lodge" data-lodge="${lodge.id}">
                  Learn More About ${lodge.name.split(' ')[0]}
                </button>
              </div>
            </div>
          `).join('')}

          <table class="lfh-comparison">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Bell 2</th>
                <th>Ripley Creek</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Capacity</td><td>36 guests</td><td>24 guests</td></tr>
              <tr><td>Terrain</td><td>Intermediate-Expert</td><td>Expert Only</td></tr>
              <tr><td>Setting</td><td>Remote village</td><td>Historic Stewart</td></tr>
              <tr><td>Snow</td><td>Excellent</td><td>30% more avg</td></tr>
              <tr><td>Cell Service</td><td>No</td><td>Yes</td></tr>
            </tbody>
          </table>
        </div>
      `;
    }

    function renderToursView() {
      return `
        <div class="lfh-view" data-view="tours">
          <div class="lfh-section-label">Find Your Adventure</div>
          <h2 class="lfh-section-title">Tour Types</h2>

          <div class="lfh-type-cards">
            ${data.tourTypes.map(type => `
              <div class="lfh-type-card" data-action="select-type" data-type="${type.id}">
                <div class="lfh-type-header">
                  <span class="lfh-type-icon">${type.icon}</span>
                  <h3 class="lfh-type-name">${type.name}</h3>
                </div>
                <p class="lfh-type-description">${type.description}</p>
                <div class="lfh-type-features">
                  ${type.features.map(f => `<span class="lfh-feature-tag">${f}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <p class="lfh-footer-note">All tours include lodging, meals, guides, and safety equipment</p>
        </div>
      `;
    }

    function renderPricingView() {
      return `
        <div class="lfh-view" data-view="pricing">
          <div class="lfh-section-label">2027 Season</div>
          <h2 class="lfh-section-title">Tour Pricing</h2>

          <div class="lfh-subnav">
            <button class="lfh-subnav-btn active" data-pricing="regular">Regular</button>
            <button class="lfh-subnav-btn" data-pricing="safari">Safari</button>
            <button class="lfh-subnav-btn" data-pricing="private">Private</button>
          </div>

          <div class="lfh-pricing-section" data-pricing-view="regular">
            <div class="lfh-pricing-cards">
              ${data.tours.regular.map(tour => `
                <div class="lfh-pricing-card">
                  <div class="lfh-pricing-header">
                    <span class="lfh-pricing-duration">${tour.duration}</span>
                    <span class="lfh-pricing-vertical">${tour.vertical} guaranteed</span>
                  </div>
                  <div class="lfh-pricing-grid">
                    <div class="lfh-pricing-lodge">
                      <div class="lfh-pricing-lodge-name">Bell 2 Lodge</div>
                      <div class="lfh-pricing-amount">${tour.bell2.peak}</div>
                    </div>
                    <div class="lfh-pricing-lodge">
                      <div class="lfh-pricing-lodge-name">Ripley Creek</div>
                      <div class="lfh-pricing-amount">${tour.ripley.peak}</div>
                    </div>
                  </div>
                  <p class="lfh-pricing-note">${tour.note}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="lfh-pricing-section" data-pricing-view="safari" style="display:none">
            <div class="lfh-pricing-cards">
              ${data.tours.safari.map((tour, i) => `
                <div class="lfh-pricing-card lfh-special-card ${i === 1 ? 'featured' : ''}">
                  <div class="lfh-pricing-duration">${tour.duration}</div>
                  <div class="lfh-pricing-vertical" style="display:inline-block;margin:8px 0">
                    ${tour.vertical} guaranteed
                  </div>
                  <div class="lfh-special-price">${tour.price} CAD</div>
                  <p class="lfh-special-description">${tour.description}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="lfh-pricing-section" data-pricing-view="private" style="display:none">
            <div class="lfh-pricing-cards">
              ${data.tours.private.map(tour => `
                <div class="lfh-pricing-card lfh-special-card">
                  <div class="lfh-pricing-header">
                    <span class="lfh-pricing-duration">${tour.duration}</span>
                    <span class="lfh-pricing-vertical">${tour.heliTime} heli time</span>
                  </div>
                  <div class="lfh-pricing-grid">
                    <div class="lfh-pricing-lodge">
                      <div class="lfh-pricing-lodge-name">4 Guests</div>
                      <div class="lfh-pricing-amount">${tour.singleGroup}</div>
                    </div>
                    <div class="lfh-pricing-lodge">
                      <div class="lfh-pricing-lodge-name">8 Guests</div>
                      <div class="lfh-pricing-amount">${tour.twoGroup}</div>
                    </div>
                  </div>
                  <p class="lfh-pricing-note">${tour.note}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <button class="lfh-btn lfh-btn-primary" data-action="check-availability">
            Check Availability
          </button>

          <p class="lfh-footer-note">All prices in CAD. 5% GST applies. Peak season rates shown.</p>
        </div>
      `;
    }

    // ========================================================================
    // BUILD COMPONENT
    // ========================================================================

    const container = document.createElement('div');
    container.innerHTML = `
      <style>${styles}</style>
      <div class="lfh-carousel">
        <ul class="lfh-tabs" role="tablist">
          <li class="lfh-tab ${initialView === 'lodges' ? 'active' : ''}"
              role="tab" data-tab="lodges">Lodges</li>
          <li class="lfh-tab ${initialView === 'tours' ? 'active' : ''}"
              role="tab" data-tab="tours">Tours</li>
          <li class="lfh-tab ${initialView === 'pricing' ? 'active' : ''}"
              role="tab" data-tab="pricing">Pricing</li>
        </ul>
        <div class="lfh-views">
          ${renderLodgesView()}
          ${renderToursView()}
          ${renderPricingView()}
        </div>
      </div>
    `;

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    // Tab navigation
    container.querySelectorAll('.lfh-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.tab;

        // Update tabs
        container.querySelectorAll('.lfh-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update views
        container.querySelectorAll('.lfh-view').forEach(v => v.classList.remove('active'));
        container.querySelector(`[data-view="${view}"]`).classList.add('active');
      });
    });

    // Pricing sub-navigation
    container.querySelectorAll('.lfh-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pricing = btn.dataset.pricing;

        // Update buttons
        container.querySelectorAll('.lfh-subnav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update views
        container.querySelectorAll('.lfh-pricing-section').forEach(s => s.style.display = 'none');
        container.querySelector(`[data-pricing-view="${pricing}"]`).style.display = 'block';
      });
    });

    // Action buttons
    container.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;

        switch (action) {
          case 'learn-lodge':
            const lodge = btn.dataset.lodge;
            window.voiceflow?.chat?.interact({
              type: 'intent',
              payload: { query: `Tell me more about ${lodge === 'bell2' ? 'Bell 2 Lodge' : 'Ripley Creek'}` }
            });
            break;

          case 'select-type':
            const type = btn.dataset.type;
            const typeNames = { regular: 'regular tours', safari: 'safari tours', private: 'private tours' };
            window.voiceflow?.chat?.interact({
              type: 'intent',
              payload: { query: `Tell me about ${typeNames[type]}` }
            });
            break;

          case 'check-availability':
            window.voiceflow?.chat?.interact({
              type: 'intent',
              payload: { query: 'I want to check tour availability' }
            });
            break;
        }
      });
    });

    // Tour type cards click handler
    container.querySelectorAll('.lfh-type-card').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.dataset.type;

        // Switch to pricing view with corresponding sub-nav
        container.querySelector('[data-tab="pricing"]').click();

        setTimeout(() => {
          container.querySelector(`[data-pricing="${type}"]`)?.click();
        }, 100);
      });
    });

    element.appendChild(container);
  }
};

export default LastFrontierTourShowcase1;

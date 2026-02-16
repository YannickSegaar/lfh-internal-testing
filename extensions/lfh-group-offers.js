// YRS: PRICING TABLE EXTENSION FOR LAST FRONTIER HELISKIING - WIDGET OPTIMIZED - VERSION 1 (20 JAN 2026 - 15:08 CEST)

export const LastFrontierGroupOffers2027_v1 = {
  name: 'LastFrontierGroupOffers2027_v1',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_lastFrontierGroupOffers2027_v1' ||
    trace.payload?.name === 'ext_lastFrontierGroupOffers2027_v1',
  render: ({ trace, element }) => {
    const {
      logoUrl = 'https://yannicksegaar.github.io/RomAIx-Logo/LastFrontierHeliskiing_Logo_FullName.svg',
      showLogo = true,
      primaryColor = '#ee2d24',
      textColor = '#2C3E50',
      lightGray = '#F8F9FA',
      borderColor = '#E5E8EB',
      animateIn = true,
    } = trace.payload || {};

    element.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'last-frontier-group-offers-wrapper';
    
    if (animateIn) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      container.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

        .last-frontier-group-offers-wrapper {
          width: 100%;
          font-family: 'Inter', sans-serif;
          background: #FFFFFF;
          border-radius: 8px;
          overflow: hidden;
          box-sizing: border-box;
        }

        .last-frontier-group-offers-wrapper * {
          box-sizing: border-box;
        }

        /* Header */
        .offers-header {
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%);
          color: white;
          padding: 14px 16px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .offers-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }

        .logo-container {
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }

        .logo-container img {
          max-height: 32px;
          max-width: 160px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .offers-header h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.3px;
          position: relative;
          z-index: 1;
          text-transform: uppercase;
        }

        /* Content */
        .offers-content {
          padding: 16px;
          max-height: 500px;
          overflow-y: auto;
        }

        .offer-intro {
          margin-bottom: 16px;
        }

        .offer-intro h3 {
          font-size: 14px;
          font-weight: 700;
          color: ${textColor};
          margin: 0 0 10px 0;
          letter-spacing: -0.2px;
        }

        .offer-intro p {
          font-size: 11px;
          color: #64748B;
          line-height: 1.5;
          margin: 0 0 12px 0;
        }

        /* Tier Boxes */
        .tier-boxes {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .tier-box {
          background: rgba(238, 45, 36, 0.05);
          border: 2px solid ${primaryColor};
          border-radius: 6px;
          padding: 10px 12px;
          text-align: center;
        }

        .tier-box-label {
          font-size: 10px;
          font-weight: 700;
          color: ${primaryColor};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .tier-box-value {
          font-size: 13px;
          font-weight: 600;
          color: ${textColor};
        }

        /* Info Section */
        .info-section {
          margin-bottom: 16px;
          background: ${lightGray};
          border-radius: 6px;
          padding: 12px;
        }

        .info-item {
          margin-bottom: 10px;
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .info-item-title {
          font-size: 10px;
          font-weight: 700;
          color: ${textColor};
          margin-bottom: 4px;
        }

        .info-item-text {
          font-size: 10px;
          color: #64748B;
          line-height: 1.4;
        }

        /* Tables */
        .table-section {
          margin-bottom: 16px;
        }

        .table-header {
          background: ${primaryColor};
          color: white;
          padding: 8px 10px;
          border-radius: 6px 6px 0 0;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-table {
          width: 100%;
          border-collapse: collapse;
          border: 2px solid ${borderColor};
          border-top: none;
          border-radius: 0 0 6px 6px;
          overflow: hidden;
          font-size: 9px;
        }

        .price-table thead {
          background: ${lightGray};
        }

        .price-table th {
          padding: 8px 6px;
          text-align: left;
          font-weight: 700;
          color: ${textColor};
          border-bottom: 1px solid ${borderColor};
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .price-table th:first-child {
          width: 20%;
        }

        .price-table th:nth-child(2) {
          width: 35%;
        }

        .price-table th:nth-child(3),
        .price-table th:nth-child(4) {
          width: 22.5%;
          text-align: right;
        }

        .price-table tbody tr {
          border-bottom: 1px solid ${borderColor};
        }

        .price-table tbody tr:last-child {
          border-bottom: none;
        }

        .price-table tbody tr:hover {
          background: rgba(238, 45, 36, 0.02);
        }

        .price-table td {
          padding: 8px 6px;
          color: #64748B;
          font-size: 9px;
        }

        .price-table td:first-child {
          font-weight: 600;
          color: ${textColor};
        }

        .price-table td:nth-child(3),
        .price-table td:nth-child(4) {
          text-align: right;
          font-weight: 600;
          color: ${primaryColor};
        }

        .table-note {
          font-size: 8px;
          color: #94A3B8;
          margin-top: 6px;
          font-style: italic;
          line-height: 1.3;
        }

        /* Terms Section */
        .terms-section {
          margin-top: 16px;
          background: ${lightGray};
          border-radius: 6px;
          padding: 12px;
        }

        .terms-title {
          font-size: 11px;
          font-weight: 700;
          color: ${textColor};
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .terms-list {
          padding-left: 16px;
          margin: 0;
        }

        .terms-list li {
          font-size: 9px;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 6px;
        }

        .terms-list li:last-child {
          margin-bottom: 0;
        }

        /* Request Button */
        .request-button-container {
          padding: 0 16px 16px 16px;
        }

        .request-button {
          width: 100%;
          padding: 12px 20px;
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
          box-shadow: 0 3px 8px rgba(238, 45, 36, 0.25);
        }

        .request-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 14px rgba(238, 45, 36, 0.35);
        }

        .request-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 5px rgba(238, 45, 36, 0.25);
        }

        /* Scrollbar */
        .offers-content::-webkit-scrollbar {
          width: 4px;
        }

        .offers-content::-webkit-scrollbar-track {
          background: ${lightGray};
          border-radius: 10px;
        }

        .offers-content::-webkit-scrollbar-thumb {
          background: ${borderColor};
          border-radius: 10px;
        }

        .offers-content::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      </style>

      <div class="offers-header">
        ${showLogo ? `
          <div class="logo-container">
            <img src="${logoUrl}" alt="Last Frontier Heliskiing" />
          </div>
        ` : ''}
        <h2>2027 Heli Skiing Group Offers</h2>
      </div>

      <div class="offers-content">
        <div class="offer-intro">
          <h3>Ski or Ride with Friends & Save</h3>
          <p>If you've got your sights set on a heliski trip in 2027, this is your calling. We have prepared an easy-to-understand group incentive model that rewards your efforts for gathering the clan.</p>
        </div>

        <div class="tier-boxes">
          <div class="tier-box">
            <div class="tier-box-label">Group of 4</div>
            <div class="tier-box-value">½ Free Seat</div>
          </div>
          <div class="tier-box">
            <div class="tier-box-label">Group of 8</div>
            <div class="tier-box-value">1 Free Seat</div>
          </div>
          <div class="tier-box">
            <div class="tier-box-label">Group of 12</div>
            <div class="tier-box-value">2 Free Seats</div>
          </div>
        </div>

        <div class="info-section">
          <div class="info-item">
            <div class="info-item-title">Who is eligible for the offer?</div>
            <div class="info-item-text">Whether you're a seasoned Last Frontier Heli convert, or a first time guest, this offer is open to anyone.</div>
          </div>
          <div class="info-item">
            <div class="info-item-title">Does the offer expire?</div>
            <div class="info-item-text">No. But it would be wise to lock in your preferred dates soon as the offer is limited to 12 seats per tour.</div>
          </div>
          <div class="info-item">
            <div class="info-item-title">Can the discount be shared?</div>
            <div class="info-item-text">Yes. The discount can be shared equally amongst group members, or applied to a single person.</div>
          </div>
        </div>

        <div class="table-section">
          <div class="table-header">
            <span>7 Days</span>
            <span>Per Person Rates [CAD]</span>
          </div>
          <table class="price-table">
            <thead>
              <tr>
                <th>Tour Code</th>
                <th>Dates</th>
                <th>Bell 2 Lodge</th>
                <th>Ripley Creek</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2027-04</td>
                <td>Dec 30 – Jan 06</td>
                <td>$16,750</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>2027-05</td>
                <td>Jan 06 – Jan 13</td>
                <td>$18,030</td>
                <td>$15,580</td>
              </tr>
              <tr>
                <td>2027-07</td>
                <td>Jan 23 – Jan 30</td>
                <td>$20,270</td>
                <td>$18,010</td>
              </tr>
              <tr>
                <td>2027-15</td>
                <td>Mar 21 – Mar 28</td>
                <td>$20,970</td>
                <td>$18,630</td>
              </tr>
            </tbody>
          </table>
          <div class="table-note">* All prices indicated in the above tables are in CAD, per person, plus 5% GST.</div>
        </div>

        <div class="table-section">
          <div class="table-header">
            <span>5 Days</span>
            <span>Per Person Rates [CAD]</span>
          </div>
          <table class="price-table">
            <thead>
              <tr>
                <th>Tour Code</th>
                <th>Dates</th>
                <th>Bell 2 Lodge</th>
                <th>Ripley Creek</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2027-05-5</td>
                <td>Jan 13 – Jan 18</td>
                <td>$13,210</td>
                <td>$11,760</td>
              </tr>
              <tr>
                <td>2027-06-5</td>
                <td>Jan 18 – Jan 23</td>
                <td>$14,570</td>
                <td>$12,940</td>
              </tr>
              <tr>
                <td>2027-08-5</td>
                <td>Jan 30 – Feb 04</td>
                <td>$15,040</td>
                <td>$13,370</td>
              </tr>
              <tr>
                <td>2027-16-5</td>
                <td>Mar 28 – Apr 02</td>
                <td>$15,020</td>
                <td>$13,360</td>
              </tr>
              <tr>
                <td>2027-17-5</td>
                <td>Apr 02 – Apr 07</td>
                <td>$14,420</td>
                <td>$12,810</td>
              </tr>
              <tr>
                <td>2027-18-5</td>
                <td>Apr 07 – Apr 12</td>
                <td>$14,030</td>
                <td>$12,460</td>
              </tr>
            </tbody>
          </table>
          <div class="table-note">* All prices indicated in the above tables are in CAD, per person, plus 5% GST.</div>
        </div>

        <div class="terms-section">
          <div class="terms-title">Terms & Conditions</div>
          <div class="info-item-title" style="margin-bottom: 6px;">Discount Terms</div>
          <ul class="terms-list">
            <li>Group sizes need to be maintained to receive the discount. The free seat(s) will be applied at final payment 90 days prior to trip start.</li>
            <li>Group discount not combinable with other offers including our new guest referral credit.</li>
            <li>Vertical refunds only given on full paying seats. No refund on free seats. Extra vertical charges apply to all seats.</li>
          </ul>
          <div class="info-item-title" style="margin: 8px 0 6px 0;">Booking Terms</div>
          <p class="info-item-text" style="margin: 0;">Our regular terms and conditions apply (e.g. a 20% deposit must be paid by all members to secure seats).</p>
        </div>
      </div>

      <div class="request-button-container">
        <button id="request-availability-btn" class="request-button">
          Request Availability
        </button>
      </div>
    `;

    element.appendChild(container);

    if (animateIn) {
      setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 50);
    }

    // Button click handler
    const requestBtn = container.querySelector('#request-availability-btn');
    if (requestBtn) {
      requestBtn.addEventListener('click', () => {
        // Trigger the lead form extension
        window.voiceflow.chat.interact({
          type: 'complete',
          payload: { action: 'request_availability' },
        });
      });
    }

    return function cleanup() {
      // Cleanup if needed
    };
  }
};

export default LastFrontierGroupOffers2027_v1;

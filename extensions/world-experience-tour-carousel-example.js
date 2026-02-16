export const WorldExperienceCarousel1 = {
  name: 'WorldExperienceCarousel1',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_worldExperienceCarousel1' || trace.payload?.name === 'ext_worldExperienceCarousel1',
  render: ({ trace, element }) => {
    const { 
      wizardTitle = 'World Experience',
      subtitle = 'Premium Small Group Tours in Spain & Portugal',
      height = '750',
      backgroundColor = '#ffffff',
      primaryColor = '#8B7355',
      secondaryColor = '#6B5842',
      accentColor = '#C19A6B',
      borderWidth = '2px',
      borderColor = '#8B7355',
      borderStyle = 'solid',
      borderRadius = '12px',
      shadowColor = 'rgba(139, 115, 85, 0.2)',
      shadowSize = '8px',
      animateIn = true,
      // Filter defaults
      defaultLocation = 'all',
      defaultCategory = 'all',
      defaultDuration = 'all'
    } = trace.payload || {};

    // Complete tour data from World Experience website
    const allToursData = [
      {
        id: 'barcelona-wine-tour',
        name: 'Penedès Vineyard Tour from Barcelona',
        subtitle: 'Wine & Cava Tasting',
        description: 'Discover Catalonia\'s wine country in style with a 4WD adventure through Penedès vineyards and premium cava tastings. Visit two award-winning wineries and taste 7 exceptional wines.',
        duration: '6 Hours',
        time: '09:00 AM',
        price: 'from €119.99',
        image: 'https://www.worldexperience.com/uploads/experiences/wine-cava-tour-in-penedes-with-tapas-and-4wd-vineyard-adventure-from-barcelona/wine-cava-tour-in-penedes-with-tapas-and-4wd-vineyard-adventure-from-barcelona.webp',
        tourUrl: 'https://www.worldexperience.com/barcelona/tour/barcelona-small-group-tour-penedes-4wd-vineyard-and-wine-tasting-tour',
        fareharborItemId: '83702',
        location: 'Barcelona',
        category: 'Wine & Gastronomy',
        durationCategory: 'Half Day (4-6h)',
        bestFor: ['Wine Lovers', 'Couples', 'Small Groups']
      },
      {
        id: 'madrid-tapas-tour',
        name: 'Madrid Gastronomic Tour',
        subtitle: 'Tapas, Wine & Rooftops',
        description: 'Savor authentic tapas and local wines as you explore Madrid\'s historic streets. Visit 4 traditional taverns, taste Iberian ham, and enjoy cava on a rooftop with panoramic city views.',
        duration: '4 Hours',
        time: '11:30 AM / 06:00 PM',
        price: 'from €93.99',
        image: 'https://www.worldexperience.com/uploads/experiences/premium-small-group-tour-madrid-gastronomic-tour-tapas-wine-rooftops/premium-small-group-tour-madrid-gastronomic-tour-tapas-wine-rooftops.webp',
        tourUrl: 'https://www.worldexperience.com/madrid/tour/madrid-small-group-gastronomic-tour-tapas-wine-rooftops',
        fareharborItemId: '121648',
        location: 'Madrid',
        category: 'Wine & Gastronomy',
        durationCategory: 'Half Day (4-6h)',
        bestFor: ['Food Lovers', 'Couples', 'Evening Tours']
      },
      {
        id: 'porto-walking-tour',
        name: 'Porto Walking Tour Experience',
        subtitle: 'Lello Bookshop, River Cruise & Cable Car',
        description: 'Sail, soar, and stroll through Porto\'s most iconic views. Comprehensive walking tour including Livraria Lello, scenic cable car ride, and relaxing Douro River cruise under historic bridges.',
        duration: '4 Hours',
        time: '09:00 AM / 11:00 AM / 02:00 PM',
        price: 'from €59.99',
        image: 'https://www.worldexperience.com/uploads/experiences/porto-walking-tour-lello-bookshop-river-cruise-and-cable-car/porto-walking-tour-lello-bookshop-river-cruise-and-cable-car.webp',
        tourUrl: 'https://www.worldexperience.com/oporto/tour/porto-small-group-tour-river-cruise-lello-bookshop-cable-car',
        fareharborItemId: '529729',
        location: 'Porto',
        category: 'City Tour',
        durationCategory: 'Half Day (4-6h)',
        bestFor: ['Culture & History', 'Families', 'Photography']
      },
      {
        id: 'seville-day-trip',
        name: 'Seville Day Trip: 3 Cities in 1 Day',
        subtitle: 'Córdoba, White Villages & Ronda',
        description: 'Discover Andalusia\'s most iconic destinations. Explore Córdoba\'s historic quarter, visit the unique cliffside village of Setenil, and experience dramatic Ronda perched atop a gorge.',
        duration: '13 Hours',
        time: '08:30 AM',
        price: 'from €109.99',
        image: 'https://www.worldexperience.com/uploads/experiences/three-cities-in-one-day-cordoba-white-villages-and-ronda-from-sevilla/three-cities-in-one-day-cordoba-white-villages-and-ronda-from-sevilla.webp',
        tourUrl: 'https://www.worldexperience.com/seville/tour/seville-small-group-day-trip-cordoba-white-villages-ronda-guided-tours',
        fareharborItemId: '626697',
        location: 'Seville',
        category: 'Day Trip',
        durationCategory: 'Full Day (8+h)',
        bestFor: ['Adventure', 'Culture & History', 'Photography']
      },
      {
        id: 'barcelona-montjuic',
        name: 'Barcelona Experience',
        subtitle: 'Montjuïc Cable Car, Castle & Boat Ride',
        description: 'Discover Barcelona by land, air & sea on a small group experience. Explore Montjuïc Castle via cable car, enjoy panoramic views, and relax on a coastal boat ride.',
        duration: '5 Hours',
        time: '10:00 AM',
        price: 'from €129.99',
        image: 'https://www.worldexperience.com/uploads/experiences/360o-barcelona-ebike-with-montjuic-cable-car-boat-ride/360o-barcelona-ebike-with-montjuic-cable-car-boat-ride.webp',
        tourUrl: 'https://www.worldexperience.com/barcelona/tour/barcelona-small-group-tour-montjuic-castle-cable-car-boat-ride',
        fareharborItemId: '83703',
        location: 'Barcelona',
        category: 'City Tour',
        durationCategory: 'Half Day (4-6h)',
        bestFor: ['Families', 'Adventure', 'Photography']
      },
      {
        id: 'barcelona-montserrat-girona',
        name: 'Catalonia Highlights',
        subtitle: 'Montserrat, Girona & Costa Brava',
        description: 'Three Catalonia gems in one day. Visit the mystical Montserrat monastery, explore medieval Girona\'s historic quarter, and enjoy the stunning beauty of Costa Brava coastline.',
        duration: '11 Hours',
        time: '08:00 AM',
        price: 'from €109.99',
        image: 'https://www.worldexperience.com/uploads/experiences/from-barcelona-montserrat-girona-and-costa-brava-full-day-tour/from-barcelona-montserrat-girona-and-costa-brava-full-day-tour.webp',
        tourUrl: 'https://www.worldexperience.com/barcelona/tour/barcelona-day-trip-montserrat-girona-costa-brava',
        fareharborItemId: '83705',
        location: 'Barcelona',
        category: 'Day Trip',
        durationCategory: 'Full Day (8+h)',
        bestFor: ['Culture & History', 'Nature', 'Photography']
      },
      {
        id: 'barcelona-sagrada-familia',
        name: 'Sagrada Família Skip-the-Line',
        subtitle: 'Official Guide & Fast-Track Entry',
        description: 'Unlock the secrets of Gaudí\'s masterpiece with an official guide. Skip the lines and discover the architectural genius, symbolism, and history behind Barcelona\'s most iconic landmark.',
        duration: '2 Hours',
        time: '09:00 AM / 11:00 AM / 03:00 PM',
        price: 'from €74.99',
        image: 'https://www.worldexperience.com/uploads/experiences/sagrada-familia-with-official-guide-fast-track-entry/sagrada-familia-with-official-guide-fast-track-entry.webp',
        tourUrl: 'https://www.worldexperience.com/barcelona/tour/barcelona-small-group-tour-sagrada-familia-with-official-guide-fast-track-entry',
        fareharborItemId: '83706',
        location: 'Barcelona',
        category: 'City Tour',
        durationCategory: 'Short Tour (2-3h)',
        bestFor: ['Culture & History', 'Architecture', 'Families']
      },
      {
        id: 'madrid-tapas-flamenco',
        name: 'Madrid Tapas & Flamenco Show',
        subtitle: 'Walking Tour with Live Performance',
        description: 'Taste traditional Spanish flavors and feel the rhythm of flamenco. Guided evening tour through Madrid\'s iconic neighborhoods with authentic tapas and passionate flamenco performance.',
        duration: '5 Hours',
        time: '06:00 PM',
        price: 'from €109.99',
        image: 'https://www.worldexperience.com/uploads/experiences/madrid-local-tapas-walking-tour-flamenco-show/madrid-local-tapas-walking-tour-flamenco-show.webp',
        tourUrl: 'https://www.worldexperience.com/madrid/tour/madrid-small-group-tour-tapas-walking-flamenco-show',
        fareharborItemId: '121649',
        location: 'Madrid',
        category: 'Wine & Gastronomy',
        durationCategory: 'Half Day (4-6h)',
        bestFor: ['Evening Tours', 'Couples', 'Culture & History']
      }
    ];

    // Filter configuration
    const locations = ['All', 'Barcelona', 'Madrid', 'Porto', 'Seville'];
    const categories = ['All', 'City Tour', 'Day Trip', 'Wine & Gastronomy'];
    const durations = ['All', 'Short Tour (2-3h)', 'Half Day (4-6h)', 'Full Day (8+h)'];

    // State management
    let currentTourIndex = 0;
    let isModalOpen = false;
    let bookingModal = null;
    let filteredTours = [...allToursData];
    let activeFilters = {
      location: defaultLocation,
      category: defaultCategory,
      duration: defaultDuration
    };

    element.innerHTML = '';

    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.backgroundColor = 'transparent';
    container.style.margin = '0';
    container.style.padding = '0';

    const card = document.createElement('div');
    card.className = 'we-card';
    card.style.cssText = `
      width: 460px;
      height: ${height}px;
      background: ${backgroundColor};
      border: ${borderWidth} ${borderStyle} ${borderColor};
      border-radius: ${borderRadius};
      box-shadow: 0 ${shadowSize} ${parseInt(shadowSize) * 3}px ${shadowColor};
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      ${animateIn ? 'animation: we-slideIn 0.5s ease-out;' : ''}
    `;

    // Header
    const header = document.createElement('div');
    header.className = 'we-header';
    header.style.cssText = `
      background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
      color: white;
      padding: 20px;
      text-align: center;
      flex-shrink: 0;
    `;

    const title = document.createElement('h2');
    title.textContent = wizardTitle;
    title.style.cssText = `
      margin: 0 0 5px 0;
      font-size: 24px;
      font-weight: 700;
    `;

    const subtitleEl = document.createElement('p');
    subtitleEl.textContent = subtitle;
    subtitleEl.style.cssText = `
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    `;

    header.appendChild(title);
    header.appendChild(subtitleEl);

    // Filter section
    const filterSection = document.createElement('div');
    filterSection.className = 'we-filters';
    filterSection.style.cssText = `
      padding: 15px;
      background: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
      flex-shrink: 0;
    `;

    const filterLabel = document.createElement('div');
    filterLabel.textContent = 'FILTER BY:';
    filterLabel.style.cssText = `
      font-size: 11px;
      font-weight: 600;
      color: #666;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
    `;
    filterLabel.innerHTML = '<span style="font-size: 14px;">⚙️</span> FILTER BY:';

    // Location filter
    const locationFilter = createFilterDropdown('Location', locations, activeFilters.location, (value) => {
      activeFilters.location = value;
      applyFilters();
    });

    // Category filter
    const categoryFilter = createFilterDropdown('Category', categories, activeFilters.category, (value) => {
      activeFilters.category = value;
      applyFilters();
    });

    // Duration filter
    const durationFilter = createFilterDropdown('Duration', durations, activeFilters.duration, (value) => {
      activeFilters.duration = value;
      applyFilters();
    });

    const filtersRow = document.createElement('div');
    filtersRow.style.cssText = `
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    `;

    filtersRow.appendChild(locationFilter);
    filtersRow.appendChild(categoryFilter);
    filtersRow.appendChild(durationFilter);

    filterSection.appendChild(filterLabel);
    filterSection.appendChild(filtersRow);

    // Results counter
    const resultsCounter = document.createElement('div');
    resultsCounter.className = 'we-results-counter';
    resultsCounter.textContent = `${allToursData.length} results`;
    resultsCounter.style.cssText = `
      padding: 10px 15px;
      font-size: 12px;
      font-weight: 600;
      color: #666;
      background: white;
      border-bottom: 1px solid #e0e0e0;
      flex-shrink: 0;
    `;

    // Carousel content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'we-content';
    contentContainer.style.cssText = `
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 0;
      position: relative;
    `;

    // Tour slider
    const tourSlider = document.createElement('div');
    tourSlider.className = 'we-tour-slider';
    tourSlider.style.cssText = `
      flex: 1;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
    `;

    // Navigation arrows
    const prevArrow = document.createElement('button');
    prevArrow.innerHTML = '&#10094;';
    prevArrow.className = 'we-nav-arrow we-prev';
    prevArrow.style.cssText = `
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.9);
      color: ${primaryColor};
      border: 2px solid ${primaryColor};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 20px;
      cursor: pointer;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    `;

    const nextArrow = document.createElement('button');
    nextArrow.innerHTML = '&#10095;';
    nextArrow.className = 'we-nav-arrow we-next';
    nextArrow.style.cssText = prevArrow.style.cssText.replace('left: 10px', 'right: 10px');

    // Tour slides container
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'we-slides-container';
    slidesContainer.style.cssText = `
      width: 100%;
      height: 100%;
      position: relative;
    `;

    // Dots navigation
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'we-dots';
    dotsContainer.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 15px 0;
      flex-shrink: 0;
    `;

    // Counter
    const counter = document.createElement('div');
    counter.className = 'we-counter';
    counter.style.cssText = `
      text-align: center;
      padding: 10px 0 15px 0;
      font-size: 12px;
      color: #666;
      font-weight: 600;
      flex-shrink: 0;
    `;

    // Helper function to create filter dropdown
    function createFilterDropdown(label, options, defaultValue, onChange) {
      const container = document.createElement('div');
      container.style.cssText = `
        position: relative;
        flex: 1;
        min-width: 120px;
      `;

      const button = document.createElement('button');
      button.className = 'we-filter-btn';
      const displayValue = defaultValue.charAt(0).toUpperCase() + defaultValue.slice(1);
      button.innerHTML = `<span style="font-size: 10px; margin-right: 4px;">▼</span> ${label}`;
      button.style.cssText = `
        width: 100%;
        padding: 8px 12px;
        background: white;
        border: 1px solid ${primaryColor};
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        color: ${primaryColor};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        white-space: nowrap;
      `;

      const dropdown = document.createElement('div');
      dropdown.className = 'we-dropdown';
      dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 4px;
        background: white;
        border: 1px solid ${primaryColor};
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-height: 200px;
        overflow-y: auto;
        z-index: 100;
        display: none;
      `;

      options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.textContent = option;
        optionEl.style.cssText = `
          padding: 8px 12px;
          font-size: 11px;
          cursor: pointer;
          transition: background 0.2s ease;
          color: #333;
        `;

        if (option.toLowerCase() === defaultValue.toLowerCase()) {
          optionEl.style.background = `${accentColor}20`;
          optionEl.style.fontWeight = '600';
        }

        optionEl.addEventListener('mouseenter', () => {
          optionEl.style.background = `${accentColor}30`;
        });

        optionEl.addEventListener('mouseleave', () => {
          if (option.toLowerCase() !== activeFilters[label.toLowerCase()]) {
            optionEl.style.background = 'transparent';
          }
        });

        optionEl.addEventListener('click', () => {
          onChange(option.toLowerCase());
          dropdown.style.display = 'none';
          
          // Update button text
          if (option === 'All') {
            button.innerHTML = `<span style="font-size: 10px; margin-right: 4px;">▼</span> ${label}`;
          } else {
            button.innerHTML = `<span style="font-size: 10px; margin-right: 4px;">▼</span> ${option.length > 15 ? option.substring(0, 15) + '...' : option}`;
          }
          button.style.background = accentColor;
          button.style.color = 'white';
          button.style.borderColor = accentColor;

          // Update selected state in dropdown
          dropdown.querySelectorAll('div').forEach(div => {
            div.style.background = 'transparent';
            div.style.fontWeight = 'normal';
          });
          optionEl.style.background = `${accentColor}20`;
          optionEl.style.fontWeight = '600';
        });

        dropdown.appendChild(optionEl);
      });

      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.style.display === 'block';
        
        // Close all other dropdowns
        document.querySelectorAll('.we-dropdown').forEach(d => d.style.display = 'none');
        
        dropdown.style.display = isOpen ? 'none' : 'block';
      });

      container.appendChild(button);
      container.appendChild(dropdown);

      return container;
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      document.querySelectorAll('.we-dropdown').forEach(d => d.style.display = 'none');
    });

    // Apply filters function
    function applyFilters() {
      filteredTours = allToursData.filter(tour => {
        let matchesLocation = activeFilters.location === 'all' || 
                             tour.location.toLowerCase() === activeFilters.location.toLowerCase();
        
        let matchesCategory = activeFilters.category === 'all' || 
                            tour.category.toLowerCase() === activeFilters.category.toLowerCase();
        
        let matchesDuration = activeFilters.duration === 'all' || 
                             tour.durationCategory.toLowerCase() === activeFilters.duration.toLowerCase();

        return matchesLocation && matchesCategory && matchesDuration;
      });

      resultsCounter.textContent = `${filteredTours.length} result${filteredTours.length !== 1 ? 's' : ''}`;
      
      if (filteredTours.length === 0) {
        showNoResults();
      } else {
        currentTourIndex = 0;
        rebuildCarousel();
      }
    }

    // Show no results message
    function showNoResults() {
      slidesContainer.innerHTML = '';
      dotsContainer.innerHTML = '';
      counter.textContent = '';
      
      const noResults = document.createElement('div');
      noResults.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        text-align: center;
      `;
      
      noResults.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 15px;">🔍</div>
        <div style="font-size: 16px; font-weight: 600; color: ${primaryColor}; margin-bottom: 10px;">No tours found</div>
        <div style="font-size: 13px; color: #666; margin-bottom: 20px;">Try adjusting your filters to see more options</div>
      `;
      
      slidesContainer.appendChild(noResults);
    }

    // Rebuild carousel with filtered tours
    function rebuildCarousel() {
      slidesContainer.innerHTML = '';
      dotsContainer.innerHTML = '';

      // Create tour slides
      filteredTours.forEach((tour, index) => {
        const slide = createTourSlide(tour, index);
        slidesContainer.appendChild(slide);

        // Create dot
        const dot = document.createElement('button');
        dot.className = 'we-dot';
        dot.style.cssText = `
          width: ${index === 0 ? '24px' : '8px'};
          height: 8px;
          border-radius: 4px;
          border: none;
          background: ${index === 0 ? primaryColor : '#ddd'};
          cursor: pointer;
          transition: all 0.3s ease;
        `;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });

      counter.textContent = `1 / ${filteredTours.length}`;
      updateNavigationVisibility();
    }

    // Create tour slide
    function createTourSlide(tour, index) {
      const slide = document.createElement('div');
      slide.className = 'we-slide';
      slide.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: ${index === 0 ? '1' : '0'};
        transform: ${index === 0 ? 'translateX(0)' : 'translateX(100%)'};
        transition: opacity 0.5s ease, transform 0.5s ease;
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-sizing: border-box;
      `;

      // Tour image
      const imageContainer = document.createElement('div');
      imageContainer.style.cssText = `
        width: 100%;
        height: 180px;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 15px;
        position: relative;
      `;

      const tourImage = document.createElement('img');
      tourImage.src = tour.image;
      tourImage.alt = tour.name;
      tourImage.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
      `;

      // Badge for subtitle
      if (tour.subtitle) {
        const badge = document.createElement('div');
        badge.textContent = tour.subtitle;
        badge.style.cssText = `
          position: absolute;
          top: 10px;
          right: 10px;
          background: ${primaryColor};
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        imageContainer.appendChild(badge);
      }

      imageContainer.appendChild(tourImage);

      // Tour info
      const tourInfo = document.createElement('div');
      tourInfo.style.cssText = `
        flex: 1;
        display: flex;
        flex-direction: column;
      `;

      const tourName = document.createElement('h3');
      tourName.textContent = tour.name;
      tourName.style.cssText = `
        margin: 0 0 10px 0;
        font-size: 16px;
        font-weight: 700;
        color: ${primaryColor};
        line-height: 1.3;
      `;

      const tourDescription = document.createElement('p');
      tourDescription.textContent = tour.description;
      tourDescription.style.cssText = `
        margin: 0 0 12px 0;
        font-size: 12px;
        line-height: 1.5;
        color: #333;
        flex: 1;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      `;

      // Stats row
      const statsRow = document.createElement('div');
      statsRow.style.cssText = `
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
        flex-wrap: wrap;
      `;

      const createStat = (icon, label, value) => {
        const stat = document.createElement('div');
        stat.style.cssText = `
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #666;
        `;
        stat.innerHTML = `<span style="font-weight: 600; color: ${primaryColor};">${icon}</span> ${label}: <strong>${value}</strong>`;
        return stat;
      };

      if (tour.duration) statsRow.appendChild(createStat('⏱️', 'Duration', tour.duration));
      if (tour.time) statsRow.appendChild(createStat('🕐', 'Time', tour.time));
      if (tour.price) statsRow.appendChild(createStat('💵', 'Price', tour.price));

      // Buttons row
      const buttonsRow = document.createElement('div');
      buttonsRow.style.cssText = `
        display: flex;
        gap: 10px;
        margin-top: auto;
      `;

      const bookButton = document.createElement('button');
      bookButton.textContent = 'Book Now';
      bookButton.className = 'we-book-btn';
      bookButton.style.cssText = `
        flex: 1;
        background: ${primaryColor};
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px ${shadowColor};
      `;

      const learnButton = document.createElement('button');
      learnButton.textContent = 'Learn More';
      learnButton.className = 'we-learn-btn';
      learnButton.style.cssText = `
        flex: 1;
        background: white;
        color: ${primaryColor};
        border: 2px solid ${primaryColor};
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      `;

      // Button hover effects
      bookButton.addEventListener('mouseenter', () => {
        bookButton.style.background = secondaryColor;
        bookButton.style.transform = 'translateY(-2px)';
        bookButton.style.boxShadow = `0 4px 12px ${shadowColor}`;
      });

      bookButton.addEventListener('mouseleave', () => {
        bookButton.style.background = primaryColor;
        bookButton.style.transform = 'translateY(0)';
        bookButton.style.boxShadow = `0 2px 8px ${shadowColor}`;
      });

      learnButton.addEventListener('mouseenter', () => {
        learnButton.style.background = primaryColor;
        learnButton.style.color = 'white';
        learnButton.style.transform = 'translateY(-2px)';
      });

      learnButton.addEventListener('mouseleave', () => {
        learnButton.style.background = 'white';
        learnButton.style.color = primaryColor;
        learnButton.style.transform = 'translateY(0)';
      });

      // Book button click
      bookButton.addEventListener('click', () => {
        if (tour.fareharborItemId) {
          openBookingModal(tour);
        } else {
          window.open(tour.tourUrl, '_blank');
        }
      });

      // Learn More button click
      learnButton.addEventListener('click', () => {
        window.open(tour.tourUrl, '_blank');
      });

      buttonsRow.appendChild(bookButton);
      buttonsRow.appendChild(learnButton);

      tourInfo.appendChild(tourName);
      tourInfo.appendChild(tourDescription);
      tourInfo.appendChild(statsRow);
      tourInfo.appendChild(buttonsRow);

      slide.appendChild(imageContainer);
      slide.appendChild(tourInfo);

      return slide;
    }

    // Navigation functions
    function goToSlide(index) {
      const slides = slidesContainer.querySelectorAll('.we-slide');
      const dots = dotsContainer.querySelectorAll('.we-dot');

      if (slides.length === 0) return;

      slides[currentTourIndex].style.opacity = '0';
      slides[currentTourIndex].style.transform = index > currentTourIndex ? 'translateX(-100%)' : 'translateX(100%)';

      currentTourIndex = index;

      slides[currentTourIndex].style.opacity = '1';
      slides[currentTourIndex].style.transform = 'translateX(0)';

      dots.forEach((dot, i) => {
        dot.style.width = i === currentTourIndex ? '24px' : '8px';
        dot.style.background = i === currentTourIndex ? primaryColor : '#ddd';
      });

      counter.textContent = `${currentTourIndex + 1} / ${filteredTours.length}`;
    }

    function nextSlide() {
      if (filteredTours.length > 0) {
        goToSlide((currentTourIndex + 1) % filteredTours.length);
      }
    }

    function prevSlide() {
      if (filteredTours.length > 0) {
        goToSlide((currentTourIndex - 1 + filteredTours.length) % filteredTours.length);
      }
    }

    function updateNavigationVisibility() {
      const shouldShow = filteredTours.length > 1;
      prevArrow.style.display = shouldShow ? 'flex' : 'none';
      nextArrow.style.display = shouldShow ? 'flex' : 'none';
      dotsContainer.style.display = shouldShow ? 'flex' : 'none';
    }

    prevArrow.addEventListener('click', prevSlide);
    nextArrow.addEventListener('click', nextSlide);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    tourSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    tourSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) nextSlide();
      if (touchEndX > touchStartX + 50) prevSlide();
    }

    // Keyboard navigation
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });

    // FareHarbor Booking Modal
    function openBookingModal(tour) {
      if (isModalOpen) return;

      isModalOpen = true;

      bookingModal = document.createElement('div');
      bookingModal.className = 'we-booking-modal';
      bookingModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: we-fadeIn 0.3s ease;
      `;

      const modalContent = document.createElement('div');
      modalContent.style.cssText = `
        width: 90%;
        max-width: 900px;
        height: 85%;
        max-height: 700px;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: we-slideUp 0.4s ease;
      `;

      const modalHeader = document.createElement('div');
      modalHeader.style.cssText = `
        background: ${primaryColor};
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
      `;

      const modalTitle = document.createElement('h3');
      modalTitle.textContent = tour.name;
      modalTitle.style.cssText = `
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      `;

      const closeButton = document.createElement('button');
      closeButton.innerHTML = '✕';
      closeButton.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        padding: 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
      `;

      closeButton.addEventListener('mouseenter', () => {
        closeButton.style.background = 'rgba(255, 255, 255, 0.2)';
      });

      closeButton.addEventListener('mouseleave', () => {
        closeButton.style.background = 'transparent';
      });

      closeButton.addEventListener('click', closeBookingModal);

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(closeButton);

      const iframeContainer = document.createElement('div');
      iframeContainer.style.cssText = `
        flex: 1;
        position: relative;
        overflow: hidden;
      `;

      const loadingIndicator = document.createElement('div');
      loadingIndicator.textContent = 'Loading booking calendar...';
      loadingIndicator.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        color: ${primaryColor};
        font-weight: 600;
      `;
      iframeContainer.appendChild(loadingIndicator);

      const bookingIframe = document.createElement('iframe');
      const fareharborUrl = `https://fareharbor.com/embeds/book/webarcelona/items/${tour.fareharborItemId}/?full-items=yes&flow=53541&from-ssl=yes&language=`;
      
      bookingIframe.src = fareharborUrl;
      bookingIframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;

      bookingIframe.addEventListener('load', () => {
        loadingIndicator.style.display = 'none';
        bookingIframe.style.opacity = '1';
      });

      iframeContainer.appendChild(bookingIframe);

      modalContent.appendChild(modalHeader);
      modalContent.appendChild(iframeContainer);
      bookingModal.appendChild(modalContent);

      bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
          closeBookingModal();
        }
      });

      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          closeBookingModal();
          document.removeEventListener('keydown', escapeHandler);
        }
      };
      document.addEventListener('keydown', escapeHandler);

      document.body.appendChild(bookingModal);
    }

    function closeBookingModal() {
      if (bookingModal) {
        bookingModal.style.animation = 'we-fadeOut 0.3s ease';
        setTimeout(() => {
          if (bookingModal && bookingModal.parentNode) {
            bookingModal.parentNode.removeChild(bookingModal);
          }
          bookingModal = null;
          isModalOpen = false;
        }, 300);
      }
    }

    // Initial build
    rebuildCarousel();

    tourSlider.appendChild(prevArrow);
    tourSlider.appendChild(slidesContainer);
    tourSlider.appendChild(nextArrow);

    contentContainer.appendChild(tourSlider);
    contentContainer.appendChild(dotsContainer);
    contentContainer.appendChild(counter);

    card.appendChild(header);
    card.appendChild(filterSection);
    card.appendChild(resultsCounter);
    card.appendChild(contentContainer);
    container.appendChild(card);
    element.appendChild(container);

    // Animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes we-slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes we-fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes we-fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      
      @keyframes we-slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
};
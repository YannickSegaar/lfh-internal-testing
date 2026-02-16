// YRS: PULSE SNOWSPORTS LEAD CAPTURE FORM EXTENSION VERSION 2 (27 OCT 2025)

export const PulseSnowsportsLeadForm2 = {
  name: 'PulseSnowsportsLeadForm2',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_pulseSnowsportsLeadForm2' || trace.payload?.name === 'ext_pulseSnowsportsLeadForm2',
  render: ({ trace, element }) => {
    // --- Configuration from Voiceflow Payload ---
    const {
      formTitle = 'Book Your Ski Lesson Today!',
      formSubtitle = 'Expert instruction in Verbier, Morzine & Manchester',
      height = '720',
      backgroundColor = '#FFFFFF',
      maxWidth = '460px',
      primaryColor = '#031e6c',
      secondaryColor = '#031e6c',
      accentColor = '#FFFFFF',
      textColor = '#2C3E50',
      lightGray = '#F8F9FA',
      borderColor = '#E5E8EB',
      blueAccent = '#E8F4F8',
      greenAccent = '#F0F8E8',
      borderWidth = '1px',
      borderStyle = 'solid',
      borderRadius = '16px',
      shadowColor = 'rgba(3, 30, 108, 0.25)',
      shadowSize = '12px',
      animateIn = true,
      logoUrl = 'https://yannicksegaar.github.io/RomAIx-Logo/PulseSnowsports_Logo_FullName.png',
      showLogo = true,
      lessonIconUrl = 'https://yannicksegaar.github.io/RomAIx-Logo/SkiWithEase_SkiLesson.svg',
      conversationHistory = null,
      conversationSummary = '',
      conversationId = null,
      userId = null,
    } = trace.payload || {};

    const N8N_WEBHOOK_URL = 'https://n8n.romaix-n8n.xyz/webhook/b9aaee97-42c6-4568-aefe-7f7e396bdd0f';

    let currentStep = 'form';
    let isSubmitting = false;

    element.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; display: flex; justify-content: center; align-items: flex-start; background-color: transparent; margin: 0; padding: 8px 0;';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'pulse-snowsports-lead-form-wrapper';
    wrapper.style.cssText = `
      width: ${maxWidth}; min-width: ${maxWidth}; max-width: ${maxWidth};
      border: ${borderWidth} ${borderStyle} ${borderColor}; border-radius: ${borderRadius};
      overflow: hidden; background: ${backgroundColor};
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px ${shadowSize} ${shadowColor}, 0 0 0 1px rgba(255,255,255,0.1);
      height: ${height}px; display: flex; flex-direction: column; margin: 0 auto; position: relative;
    `;
    
    if (animateIn) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(15px) scale(0.98)';
      wrapper.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    wrapper.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        .pulse-snowsports-lead-form-wrapper * { box-sizing: border-box; }
        
        .form-header { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #02163d 100%); 
          color: white; 
          padding: 22px 28px; 
          text-align: center; 
          position: relative;
          overflow: hidden;
        }
        .form-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }
        .logo-container { 
          margin-bottom: 10px; 
          position: relative;
          z-index: 1;
        }
        .logo-container img { 
          max-height: 40px; 
          max-width: 180px; 
          object-fit: contain;
        }
        .form-header h2 { 
          margin: 0 0 6px 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 20px; 
          font-weight: 700; 
          letter-spacing: -0.3px;
          position: relative;
          z-index: 1;
        }
        .form-header p { 
          margin: 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 13px; 
          opacity: 0.95; 
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }
        
        .form-content { 
          flex: 1; 
          padding: 24px 28px 20px 28px; 
          font-family: 'Inter', sans-serif; 
          background: ${backgroundColor};
          overflow-y: auto;
        }
        
        .form-step { 
          display: none; 
          animation: fadeInUp 0.3s ease-out;
        }
        .form-step.active { 
          display: block; 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(12px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        .form-group { 
          margin-bottom: 18px; 
          position: relative; 
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group label { 
          display: block; 
          margin-bottom: 7px; 
          font-weight: 600; 
          color: ${textColor}; 
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .form-group input, .form-group select, .form-group textarea { 
          width: 100%; 
          padding: 12px 14px; 
          border-radius: 10px; 
          border: 1.5px solid ${borderColor}; 
          font-size: 14px; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          background: ${accentColor};
        }
        .form-group textarea {
          min-height: 100px;
          resize: vertical;
          line-height: 1.5;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { 
          color: #94A3B8; 
          font-size: 13px;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
          outline: none; 
          border-color: ${primaryColor}; 
          box-shadow: 0 0 0 3px rgba(3, 30, 108, 0.15);
          background: ${accentColor};
          transform: translateY(-1px);
        }
        
        /* Date Input Styling */
        .form-group input[type="date"] {
          cursor: pointer;
          position: relative;
        }
        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
        }
        
        /* Lesson Type with Icon */
        .lesson-option {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lesson-icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
          flex-shrink: 0;
        }
        
        .checkbox-group { 
          display: flex; 
          align-items: flex-start; 
          margin: 14px 0 0 0; 
          gap: 10px;
        }
        .checkbox-wrapper {
          position: relative;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .checkbox-wrapper input[type="checkbox"] {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid ${borderColor};
          border-radius: 4px;
          background: ${accentColor};
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .checkbox-wrapper input[type="checkbox"]:checked {
          background: ${secondaryColor};
          border-color: ${secondaryColor};
          transform: scale(1.05);
        }
        .checkbox-wrapper input[type="checkbox"]:checked::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        .checkbox-group label { 
          margin-bottom: 0; 
          text-transform: none; 
          letter-spacing: 0; 
          font-weight: 400; 
          font-size: 12px; 
          line-height: 1.5; 
          cursor: pointer;
          color: #64748B;
        }
        .checkbox-group label a {
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 500;
        }
        .checkbox-group label a:hover {
          text-decoration: underline;
        }
        
        /* Select Dropdown Styling */
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
          cursor: pointer;
        }
        
        .error-message { 
          color: #EF4444; 
          background: #FEE2E2; 
          padding: 10px 14px; 
          border-radius: 8px; 
          font-size: 12px; 
          margin-top: 12px;
          font-weight: 500;
        }
        
        .loading-container { 
          text-align: center; 
          padding: 60px 20px; 
        }
        .spinner { 
          margin: 0 auto 20px; 
          width: 50px; 
          height: 50px; 
          border: 4px solid ${lightGray}; 
          border-top-color: ${primaryColor}; 
          border-radius: 50%; 
          animation: spin 0.8s linear infinite; 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        .loading-text { 
          font-size: 16px; 
          color: ${textColor}; 
          font-weight: 500;
        }
        
        .success-container { 
          text-align: center; 
          padding: 50px 28px; 
        }
        .success-icon { 
          width: 70px; 
          height: 70px; 
          margin: 0 auto 20px; 
          background: linear-gradient(135deg, ${primaryColor} 0%, #02163d 100%); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 20px rgba(3, 30, 108, 0.3);
        }
        .success-icon svg { 
          width: 38px; 
          height: 38px; 
          color: white; 
        }
        .success-title { 
          font-size: 22px; 
          font-weight: 700; 
          color: ${textColor}; 
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }
        .success-message { 
          font-size: 14px; 
          color: #64748B; 
          line-height: 1.6; 
          margin: 0;
        }
        
        .btn-container { 
          padding: 0 28px 24px 28px; 
          background: ${backgroundColor};
          position: relative;
        }
        .btn { 
          width: 100%; 
          padding: 14px 24px; 
          border: none; 
          border-radius: 10px; 
          font-size: 15px; 
          font-weight: 600; 
          cursor: pointer; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }
        .btn-primary { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #02163d 100%); 
          color: white;
          box-shadow: 0 4px 12px rgba(3, 30, 108, 0.3);
        }
        .btn-primary:hover { 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(3, 30, 108, 0.4);
        }
        .btn-primary:active { 
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(3, 30, 108, 0.3);
        }
        
        /* Scrollbar Styling */
        .form-content::-webkit-scrollbar {
          width: 6px;
        }
        .form-content::-webkit-scrollbar-track {
          background: ${lightGray};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb {
          background: ${borderColor};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      </style>
      
      <div class="form-header">
        ${showLogo ? `
          <div class="logo-container">
            <img src="${logoUrl}" alt="Pulse Snowsports" />
          </div>
        ` : ''}
        <h2>${formTitle}</h2>
        <p>${formSubtitle}</p>
      </div>
      
      <div class="form-content">
        <div id="form-step" class="form-step active">
          <form id="lead-form">
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name *</label>
                <input type="text" id="first-name" name="firstName" placeholder="John" required>
              </div>
              
              <div class="form-group">
                <label for="last-name">Last Name *</label>
                <input type="text" id="last-name" name="lastName" placeholder="Smith" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" placeholder="john.smith@example.com" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" placeholder="+44 7700 900000" required>
            </div>
            
            <div class="form-group">
              <label for="ski-school">Ski School *</label>
              <select id="ski-school" name="skiSchool" required>
                <option value="">Select a ski school</option>
                <option value="Verbier">Verbier</option>
                <option value="Morzine">Morzine</option>
                <option value="Manchester">Manchester</option>
              </select>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="arrival-date">Arrival Date *</label>
                <input type="date" id="arrival-date" name="arrivalDate" required>
              </div>
              
              <div class="form-group">
                <label for="departure-date">Departure Date *</label>
                <input type="date" id="departure-date" name="departureDate" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="experience-level">Experience Level *</label>
              <select id="experience-level" name="experienceLevel" required>
                <option value="">Select your experience</option>
                <option value="beginner">Beginner - Never skied before</option>
                <option value="intermediate">Intermediate - Can turn and stop</option>
                <option value="advanced">Advanced - Comfortable on black runs</option>
                <option value="expert">Expert - All terrain & conditions</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="lesson-type">Lesson Type *</label>
              <select id="lesson-type" name="lessonType" required>
                <option value="">Select lesson type</option>
                <option value="private">Private Lesson</option>
                <option value="group">Group Lesson</option>
                <option value="family">Family Lesson</option>
                <option value="kids">Kids Lesson</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Additional Information</label>
              <textarea id="message" name="message" placeholder="Tell us about your goals, any specific requirements, or questions you have...">${conversationSummary || 'Experienced skier looking for off piste skiing in Verbier'}</textarea>
            </div>

            
            <div class="checkbox-group">
              <div class="checkbox-wrapper">
                <input type="checkbox" id="privacy-consent" name="privacyConsent" required>
              </div>
              <label for="privacy-consent">
                I want personalized lesson recommendations and agree to the <a href="https://pulsesnowsports.com/privacy-policy" target="_blank">Privacy Policy</a>.
              </label>
            </div>
            
            <div id="error-container"></div>
          </form>
        </div>
        
        <div id="loading-step" class="form-step">
          <div class="loading-container">
            <div class="spinner"></div>
            <div class="loading-text">Preparing your ski adventure...</div>
          </div>
        </div>
        
        <div id="success-step" class="form-step">
          <div class="success-container">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="success-title">Ready to Hit the Slopes!</h3>
            <p class="success-message">
              Thank you! Our experienced ski instructors will contact you within 24 hours with personalized lesson options. See you on the mountain!
            </p>
          </div>
        </div>
      </div>

      <div class="btn-container">
        <button id="submit-btn" class="btn btn-primary">Get My Lesson Plan</button>
      </div>
    `;

    container.appendChild(wrapper);
    element.appendChild(container);

    if (animateIn) {
      setTimeout(() => {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0) scale(1)';
      }, 50);
    }

    // Set minimum dates for date pickers
    const today = new Date().toISOString().split('T')[0];
    const arrivalInput = wrapper.querySelector('#arrival-date');
    const departureInput = wrapper.querySelector('#departure-date');
    
    if (arrivalInput) {
      arrivalInput.setAttribute('min', today);
      arrivalInput.addEventListener('change', (e) => {
        if (departureInput) {
          departureInput.setAttribute('min', e.target.value);
        }
      });
    }

    function showStep(stepId) {
      const steps = wrapper.querySelectorAll('.form-step');
      steps.forEach(step => step.classList.remove('active'));
      
      const targetStep = wrapper.querySelector(`#${stepId}-step`);
      if (targetStep) {
        targetStep.classList.add('active');
        currentStep = stepId;
        
        const btnContainer = wrapper.querySelector('.btn-container');
        btnContainer.style.display = (stepId === 'form') ? 'block' : 'none';
      }
    }

    function showError(message) {
      const errorContainer = wrapper.querySelector('#error-container');
      errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }

    function clearError() {
      const errorContainer = wrapper.querySelector('#error-container');
      errorContainer.innerHTML = '';
    }

    function validateForm() {
      const form = wrapper.querySelector('#lead-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = borderColor;
        }
      });
      
      const emailField = wrapper.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value && !emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#EF4444';
      }

      // Validate date order
      const arrivalDate = wrapper.querySelector('#arrival-date').value;
      const departureDate = wrapper.querySelector('#departure-date').value;
      if (arrivalDate && departureDate && new Date(departureDate) <= new Date(arrivalDate)) {
        isValid = false;
        wrapper.querySelector('#departure-date').style.borderColor = '#EF4444';
        showError('Departure date must be after arrival date.');
      }
      
      return isValid;
    }

    async function sendToWebhook(formData) {
      try {
        let cleanConversationHistory = conversationHistory;
        if (conversationHistory && typeof conversationHistory === 'string') {
          cleanConversationHistory = conversationHistory
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/"/g, '\\"');
        }

        const payload = {
          lead: formData,
          conversationData: {
            history: cleanConversationHistory,
            conversationId: conversationId,
            userId: userId,
            timestamp: new Date().toISOString()
          },
          source: 'Voiceflow Lead Form - Pulse Snowsports',
          formType: 'Pulse Snowsports Ski Lesson Lead Capture',
          timestamp: new Date().toISOString()
        };

        console.log('Sending payload to webhook:', JSON.stringify(payload, null, 2));

        await new Promise(resolve => setTimeout(resolve, 1800));
        
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Successfully sent lead to webhook');
        return true;
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        return true;
      }
    }

    const submitBtn = wrapper.querySelector('#submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        clearError();
        
        if (!validateForm()) {
          showError('Please fill out all required fields correctly.');
          return;
        }
        
        isSubmitting = true;
        showStep('loading');
        
        const formData = {
          firstName: wrapper.querySelector('#first-name').value.trim(),
          lastName: wrapper.querySelector('#last-name').value.trim(),
          email: wrapper.querySelector('#email').value.trim(),
          phone: wrapper.querySelector('#phone').value.trim(),
          skiSchool: wrapper.querySelector('#ski-school').value,
          arrivalDate: wrapper.querySelector('#arrival-date').value,
          departureDate: wrapper.querySelector('#departure-date').value,
          experienceLevel: wrapper.querySelector('#experience-level').value,
          lessonType: wrapper.querySelector('#lesson-type').value,
          message: wrapper.querySelector('#message').value.trim()
        };
        
        const success = await sendToWebhook(formData);
        
        if (success) {
          showStep('success');
        } else {
          showStep('form');
          showError('Oops! Something went wrong. Please try again.');
        }
        
        isSubmitting = false;
      });
    }

    const inputs = wrapper.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = borderColor;
        }
      });
      
      input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
          input.style.borderColor = borderColor;
        }
      });
    });

    return function cleanup() {
      // Cleanup if needed
    };
  }
};

export default PulseSnowsportsLeadForm2;

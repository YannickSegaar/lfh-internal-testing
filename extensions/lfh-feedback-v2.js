const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`

export const FeedbackExtension2 = {
  name: 'Feedback',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_feedback2' || trace.payload?.name === 'ext_feedback2',
  render: ({ trace, element }) => {
    removePreviousFeedbackElements();
    
    const feedbackContainer = document.createElement('div');
    feedbackContainer.innerHTML = `
      <style>
        .vfrc-feedback {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .vfrc-feedback--header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .vfrc-feedback--description {
          font-size: 0.8em;
          color: grey;
          pointer-events: none;
          font-family: 'Open Sans', sans-serif !important;
        }
        
        .vfrc-feedback--buttons {
          display: flex;
          gap: 8px;
        }
        
        .vfrc-feedback--button {
          margin: 0;
          padding: 0;
          border: none;
          background: none;
          opacity: 0.2;
          cursor: pointer;
        }
        
        .vfrc-feedback--button:hover {
          opacity: 0.5;
        }
        
        .vfrc-feedback--button.selected {
          opacity: 0.6;
        }
        
        .vfrc-feedback--button.disabled {
          pointer-events: none;
        }
        
        .vfrc-feedback--button:first-child svg {
          fill: none;
          stroke: none;
          border: none;
          margin-left: 6px;
        }
        
        .vfrc-feedback--button:last-child svg {
          margin-left: 4px;
          fill: none;
          stroke: none;
          border: none;
          transform: rotate(180deg);
        }
        
        /* Skip button styling */
        .vfrc-feedback--skip-btn {
          padding: 4px 8px;
          background: transparent;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.75em;
          color: #666;
          cursor: pointer;
          font-family: 'Open Sans', sans-serif !important;
          margin-left: 8px;
        }
        
        .vfrc-feedback--skip-btn:hover {
          background: #f5f5f5;
        }
        
        /* Comment section styles */
        .vfrc-feedback--comment-section {
          display: none;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
        
        .vfrc-feedback--comment-section.visible {
          display: flex;
        }
        
        .vfrc-feedback--comment-label {
          font-size: 0.75em;
          color: #666;
          font-family: 'Open Sans', sans-serif !important;
        }
        
        .vfrc-feedback--comment-input {
          width: 100%;
          min-height: 60px;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.85em;
          font-family: 'Open Sans', sans-serif !important;
          resize: vertical;
        }
        
        .vfrc-feedback--comment-input:focus {
          outline: none;
          border-color: #2e6ee1;
        }
        
        .vfrc-feedback--comment-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        
        .vfrc-feedback--comment-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 0.8em;
          cursor: pointer;
          font-family: 'Open Sans', sans-serif !important;
        }
        
        .vfrc-feedback--comment-btn.submit {
          background: #2e6ee1;
          color: white;
        }
        
        .vfrc-feedback--comment-btn.submit:hover {
          background: #2558b8;
        }
        
        .vfrc-feedback--comment-btn.skip {
          background: transparent;
          color: #666;
        }
        
        .vfrc-feedback--comment-btn.skip:hover {
          background: #f0f0f0;
        }
      </style>
      
      <div class="vfrc-feedback">
        <div class="vfrc-feedback--header">
          <div class="vfrc-feedback--description">Was this answer helpful?</div>
          <div class="vfrc-feedback--buttons">
            <button class="vfrc-feedback--button" data-feedback="1">${SVG_Thumb}</button>
            <button class="vfrc-feedback--button" data-feedback="0">${SVG_Thumb}</button>
            <button class="vfrc-feedback--skip-btn">Continue</button>
          </div>
        </div>
        
        <div class="vfrc-feedback--comment-section">
          <div class="vfrc-feedback--comment-label">Would you like to add a comment? (optional)</div>
          <textarea 
            class="vfrc-feedback--comment-input" 
            placeholder="Tell us more about your experience..."
            maxlength="500"
          ></textarea>
          <div class="vfrc-feedback--comment-actions">
            <button class="vfrc-feedback--comment-btn skip">Skip</button>
            <button class="vfrc-feedback--comment-btn submit">Submit</button>
          </div>
        </div>
      </div>
    `;
    
    let selectedFeedback = null;
    const commentSection = feedbackContainer.querySelector('.vfrc-feedback--comment-section');
    const commentInput = feedbackContainer.querySelector('.vfrc-feedback--comment-input');
    const submitBtn = feedbackContainer.querySelector('.vfrc-feedback--comment-btn.submit');
    const skipBtn = feedbackContainer.querySelector('.vfrc-feedback--comment-btn.skip');
    const skipMainBtn = feedbackContainer.querySelector('.vfrc-feedback--skip-btn');
    
    // Handle "Continue" button (skip feedback entirely)
    skipMainBtn.addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { 
          feedback: null,
          comment: null,
          skipped: true
        }
      });
      
      feedbackContainer.style.display = 'none';
    });
    
    // Handle thumbs up/down click
    feedbackContainer.querySelectorAll('.vfrc-feedback--button').forEach((button) => {
      button.addEventListener('click', function () {
        selectedFeedback = this.getAttribute('data-feedback');
        
        // Disable and highlight selected button
        feedbackContainer.querySelectorAll('.vfrc-feedback--button').forEach((btn) => {
          btn.classList.add('disabled');
          if (btn === this) {
            btn.classList.add('selected');
          }
        });
        
        // Hide the main skip button
        skipMainBtn.style.display = 'none';
        
        // Show comment section
        commentSection.classList.add('visible');
        commentInput.focus();
      });
    });
    
    // Handle submit with comment
    submitBtn.addEventListener('click', function () {
      const comment = commentInput.value.trim();
      
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { 
          feedback: selectedFeedback,
          comment: comment || null,
          skipped: false
        }
      });
      
      feedbackContainer.style.display = 'none';
    });
    
    // Handle skip comment (submit feedback without comment)
    skipBtn.addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { 
          feedback: selectedFeedback,
          comment: null,
          skipped: false
        }
      });
      
      feedbackContainer.style.display = 'none';
    });
    
    element.appendChild(feedbackContainer);
  }
};

function removePreviousFeedbackElements() {
  const chatWidget = document.querySelector('#voiceflow-chat').shadowRoot.querySelector('.vfrc-chat--dialog');
  const feedbackWidget = chatWidget.querySelector('.vfrc-feedback');
  
  if (feedbackWidget) {
    feedbackWidget.closest('.vfrc-system-response').remove();
  }
}

export default FeedbackExtension2;
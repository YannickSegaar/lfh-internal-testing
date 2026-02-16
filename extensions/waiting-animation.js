// === Last Frontier Heliskiing - Waiting Animation Extension ===
// Replaces VoiceFlow's default three-dot typing indicator with a branded
// spinner + shimmer text animation during AI Agent Step processing.
//
// Requires two Custom Action steps in VoiceFlow:
//   1. Before Agent Step: emit trace "ext_waitingAnimation" with payload { text: {waiting_message} }
//   2. After Agent Step: emit trace "ext_doneAnimation"
//
// See README-waiting-animation.md for VoiceFlow canvas setup instructions.

export const WaitingAnimationExtension = {
  name: 'WaitingAnimation',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_waitingAnimation' ||
    trace.payload?.name === 'ext_waitingAnimation',
  render: async ({ trace, element }) => {
    // Signal any prior animation to stop, then wait for cleanup
    window.vf_done = true;
    await new Promise((resolve) => setTimeout(resolve, 250));

    const text = trace.payload?.text || 'One moment...';
    const timeout = 15000;

    const waitingContainer = document.createElement('div');
    waitingContainer.innerHTML = `
      <style>
        .vfrc-message--extension-WaitingAnimation {
          background-color: transparent !important;
          background: none !important;
        }
        .lfh-waiting-container {
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #42494e;
          display: flex;
          align-items: center;
        }
        .lfh-waiting-text {
          display: inline-block;
          margin-left: 10px;
        }
        .lfh-waiting-letter {
          display: inline-block;
          animation: lfhShine 1s linear infinite;
        }
        @keyframes lfhShine {
          0%, 100% { color: rgba(66, 73, 78, 0.5); }
          50% { color: #42494e; }
        }
        .lfh-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(66, 73, 78, 0.3);
          border-top: 2px solid #e62b1e;
          border-radius: 50%;
          animation: lfhSpin 1s linear infinite;
          flex-shrink: 0;
        }
        @keyframes lfhSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="lfh-waiting-container">
        <div class="lfh-spinner"></div>
        <span class="lfh-waiting-text">${text
          .split('')
          .map((letter, index) =>
            letter === ' '
              ? ' '
              : `<span class="lfh-waiting-letter" style="animation-delay: ${
                  index * (1000 / text.length)
                }ms">${letter}</span>`
          )
          .join('')}</span>
      </div>
    `;

    element.appendChild(waitingContainer);

    // Advance the VoiceFlow flow past the Custom Action
    window.voiceflow.chat.interact({ type: 'continue' });

    // Poll for done signal from DoneAnimationExtension
    window.vf_done = false;
    const checkDoneInterval = setInterval(() => {
      if (window.vf_done) {
        clearInterval(checkDoneInterval);
        waitingContainer.style.display = 'none';
        window.vf_done = false;
      }
    }, 100);

    // Safety timeout — auto-hide if DoneAnimation never fires
    setTimeout(() => {
      clearInterval(checkDoneInterval);
      waitingContainer.style.display = 'none';
    }, timeout);
  },
};


export default WaitingAnimationExtension;
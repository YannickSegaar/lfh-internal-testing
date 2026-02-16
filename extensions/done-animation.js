// === Last Frontier Heliskiing - Waiting Animation Extension ===
// Replaces VoiceFlow's default three-dot typing indicator with a branded
// spinner + shimmer text animation during AI Agent Step processing.
//
// Requires two Custom Action steps in VoiceFlow:
//   1. Before Agent Step: emit trace "ext_waitingAnimation" with payload { text: {waiting_message} }
//   2. After Agent Step: emit trace "ext_doneAnimation"
//
// See README-waiting-animation.md for VoiceFlow canvas setup instructions.

export const DoneAnimationExtension = {
  name: 'DoneAnimation',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_doneAnimation' ||
    trace.payload?.name === 'ext_doneAnimation',
  render: async ({ trace, element }) => {
    // Signal the WaitingAnimation to hide
    window.vf_done = true;

    // Brief delay for coordination with the polling interval
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Advance the VoiceFlow flow past this Custom Action
    window.voiceflow.chat.interact({ type: 'continue' });
  },
};

export default DoneAnimationExtension;
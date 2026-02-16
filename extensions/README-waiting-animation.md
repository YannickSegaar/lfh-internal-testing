# Waiting Animation Extension — VoiceFlow Setup Guide

Replaces the default three-dot typing indicator with a branded LFH spinner and context-aware shimmer text during AI Agent Step processing.

## How It Works

The VoiceFlow AI Agent Step does not emit traces during processing, so extensions cannot hook into it directly. The workaround uses two Custom Action steps that sandwich the Agent Step:

```
User Input → [Code Step: Keyword Detector] → [Custom Action: ext_waitingAnimation]
  → [Agent Step] → [Custom Action: ext_doneAnimation] → [Exit Condition Router]
```

1. **Keyword Detector** reads the user's message and picks a context-aware loading message
2. **ext_waitingAnimation** shows the spinner + shimmer text, then calls `interact({ type: 'continue' })` to advance the flow into the Agent Step
3. The Agent Step processes normally while the animation plays
4. **ext_doneAnimation** sets `window.vf_done = true`, which the animation polls for — the animation hides and the flow continues

## VoiceFlow Canvas Setup

### Step 1: Create the `waiting_message` Variable

In VoiceFlow project settings, add a new variable called `waiting_message` (type: string).

### Step 2: Add the Code Step (Keyword Detector)

1. Place a **Code Step** in your flow, between the user input capture and the Agent Step
2. Paste the contents of `voiceflow/code-steps/waiting-message-detector.js`
3. Ensure the Code Step has access to the `last_utterance` variable (this should already exist in your flow)
4. The Code Step outputs the `waiting_message` variable

### Step 3: Add Custom Action — ext_waitingAnimation

1. Place a **Custom Action** step after the Code Step, before the Agent Step
2. Set the trace type to: `ext_waitingAnimation`
3. Set the payload to:
   ```json
   {
     "text": "{waiting_message}"
   }
   ```

### Step 4: Add Custom Action — ext_doneAnimation

1. Place a **Custom Action** step after the Agent Step, before any exit condition routing
2. Set the trace type to: `ext_doneAnimation`
3. No payload is needed (it's a pure control signal)

### Step 5: Register Extensions on the Website

Both extensions are exported from `waiting-animation.js`. Register them in the widget configuration (already added to `widget-settings.json`):

```json
{
  "name": "WaitingAnimation",
  "src": "/wp-content/themes/lastfrontier/js/voiceflow/waiting-animation.js"
},
{
  "name": "DoneAnimation",
  "src": "/wp-content/themes/lastfrontier/js/voiceflow/waiting-animation.js"
}
```

### Step 6 (Optional): Hide Default Typing Indicator

To prevent showing both the default dots and the custom animation, add this CSS to the shadow DOM styles (already added to `lastfrontier-shadow-styles.js`):

```css
.vfrc-system-response--indicator {
  display: none !important;
}
```

Only enable this after confirming the custom animation works correctly.

## Files

| File | Purpose |
|------|---------|
| `voiceflow/extensions/waiting-animation.js` | WaitingAnimation + DoneAnimation extension code |
| `voiceflow/code-steps/waiting-message-detector.js` | Keyword detection logic for VoiceFlow Code Step |
| `voiceflow/config/widget-settings.json` | Widget config with extensions registered |
| `voiceflow/styling/js/lastfrontier-shadow-styles.js` | Shadow DOM styles (optional indicator hide) |

## Message Categories

The keyword detector scans the user's message and picks a loading message from the matched category:

| Category | Example Keywords | Example Messages |
|----------|-----------------|-----------------|
| Booking | book, price, cost, availability | "Checking availability...", "Looking into pricing..." |
| Tours | tour, safari, package, 4-day | "Pulling up the tour calendar...", "Checking the packages..." |
| Lodges | lodge, cabin, Bell 2, Ripley | "Checking in with the lodge crew...", "Pulling up lodge details..." |
| Terrain | terrain, snow, powder, conditions | "Scanning the terrain maps...", "Checking conditions up top..." |
| Safety | safety, avalanche, beacon, rescue | "Reviewing safety protocols...", "Checking with the safety team..." |
| Preparation | gear, equipment, fitness, pack | "Checking the gear list...", "Pulling up the essentials..." |
| Location | location, access, airport, Stewart | "Mapping out the route...", "Checking access details..." |
| Fallback | *(no keyword match)* | "Looking into that for you...", "One moment..." |

## Timing

- Animation polls `window.vf_done` every 100ms
- Safety timeout auto-hides the animation after 15 seconds
- DoneAnimation includes a 250ms coordination delay before advancing the flow

/**
 * VoiceFlow Extensions Aggregator
 *
 * This file imports and re-exports all VoiceFlow chat widget extensions.
 * Individual extensions are located in the ./extensions/ directory.
 */

// Individual extensions
export { SnowfallExtension1 } from './extensions/snowfall.js';
export { PulseSnowsportsLeadForm1 } from './extensions/pulse-lead-form-v1.js';
export { PulseSnowsportsLeadForm2 } from './extensions/pulse-lead-form-v2.js';
export { LastFrontierHeliskiingLeadForm1 } from './extensions/lfh-lead-form-v1.js';
export { LastFrontierHeliskiingLeadForm2 } from './extensions/lfh-lead-form-v2.js';
export { LastFrontierHeliskiingLeadForm3 } from './extensions/lfh-lead-form-v3.js';
export { LastFrontierHeliskiingLeadForm4 } from './extensions/lfh-lead-form-v4.js';
export { LastFrontierHeliskiingLeadForm_Widget1 } from './extensions/lfh-widget-v1.js';
export { LastFrontierHeliskiingLeadForm_Widget2 } from './extensions/lfh-widget-v2.js';
export { LastFrontierGroupOffers2027_v1 } from './extensions/lfh-group-offers.js';
export { LastFrontierTourShowcase1 } from './extensions/tour-showcase-carousel.js';
export { FeedbackExtension1 } from './extensions/lfh-feedback-v1.js';
export { FeedbackExtension2 } from './extensions/lfh-feedback-v2.js';
export { FeedbackExtension3 } from './extensions/lfh-feedback-v3.js';
export { FeedbackExtension4 } from './extensions/lfh-feedback-v4.js';
export { FeedbackExtension5 } from './extensions/lfh-feedback-v5.js';
export { FeedbackExtension6 } from './extensions/lfh-feedback-v6.js';
export { FeedbackExtension7 } from './extensions/lfh-feedback-v7.js';
export { FeedbackExtension8 } from './extensions/lfh-feedback-v8.js';
export { FeedbackExtension9 } from './extensions/lfh-feedback-v9.js';
export { FeedbackExtension10 } from './extensions/lfh-feedback-v10.js';
export { LastFrontierLeadForm_v3 } from './extensions/lead-capture-form-v3.js';
export { LastFrontierLeadForm_v4 } from './extensions/lead-capture-form-v4.js';
export { LastFrontierBrowserSelfService } from './extensions/browser-self-service.js';
export { LastFrontierBrowserSelfService_v2 } from './extensions/browser-self-service-v2.js';
export { LastFrontierBrowserSelfService_v3 } from './extensions/browser-self-service-v3.js';
export { LastFrontierBrowserSelfService_v4 } from './extensions/browser-self-service-v4-widget.js';
export { LFHTourExplorerGrid } from './extensions/lfh-tour-explorer-grid.js';
export { LFHTourExplorerCarousel } from './extensions/lfh-tour-explorer-carousel.js';
export { LFHTourExplorerTabs } from './extensions/lfh-tour-explorer-tabs.js';
export { LFHLodgeCompareWidget } from './extensions/lfh-lodge-compare-widget.js';
export { LFHLodgeCompareWidgetV2 } from './extensions/lfh-lodge-compare-widget-v2.js';
export { LFHWeatherConditionsWidgetV1 } from './extensions/lfh-weather-conditions-widget-v1.js';
export { LFHWeatherConditionsWidgetV2 } from './extensions/lfh-weather-conditions-widget-v2.js';
export { WaitingAnimationExtension } from './extensions/waiting-animation.js';
export { DoneAnimationExtension } from './extensions/done-animation.js';
export { LastFrontierWelcomeCarousel } from './extensions/welcome-carousel.js';
export { LastFrontierWelcomePath } from './extensions/welcome-path-selector.js';
export { LastFrontierWelcomeGrid } from './extensions/welcome-grid.js';
export { LastFrontierWelcomeGridV2 } from './extensions/welcome-grid-v2.js';
export { LFHTourExplorerGridBooking } from './extensions/lfh-tour-explorer-grid-booking.js';

// Import for allExtensions array
import { SnowfallExtension1 } from './extensions/snowfall.js';
import { PulseSnowsportsLeadForm1 } from './extensions/pulse-lead-form-v1.js';
import { PulseSnowsportsLeadForm2 } from './extensions/pulse-lead-form-v2.js';
import { LastFrontierHeliskiingLeadForm1 } from './extensions/lfh-lead-form-v1.js';
import { LastFrontierHeliskiingLeadForm2 } from './extensions/lfh-lead-form-v2.js';
import { LastFrontierHeliskiingLeadForm3 } from './extensions/lfh-lead-form-v3.js';
import { LastFrontierHeliskiingLeadForm4 } from './extensions/lfh-lead-form-v4.js';
import { LastFrontierHeliskiingLeadForm_Widget1 } from './extensions/lfh-widget-v1.js';
import { LastFrontierHeliskiingLeadForm_Widget2 } from './extensions/lfh-widget-v2.js';
import { LastFrontierGroupOffers2027_v1 } from './extensions/lfh-group-offers.js';
import { LastFrontierTourShowcase1 } from './extensions/tour-showcase-carousel.js';
import { FeedbackExtension1 } from './extensions/lfh-feedback-v1.js';
import { FeedbackExtension2 } from './extensions/lfh-feedback-v2.js';
import { FeedbackExtension3 } from './extensions/lfh-feedback-v3.js';
import { FeedbackExtension4 } from './extensions/lfh-feedback-v4.js';
import { FeedbackExtension5 } from './extensions/lfh-feedback-v5.js';
import { FeedbackExtension6 } from './extensions/lfh-feedback-v6.js';
import { FeedbackExtension7 } from './extensions/lfh-feedback-v7.js';
import { FeedbackExtension8 } from './extensions/lfh-feedback-v8.js';
import { FeedbackExtension9 } from './extensions/lfh-feedback-v9.js';
import { FeedbackExtension10 } from './extensions/lfh-feedback-v10.js';
import { LastFrontierLeadForm_v3 } from './extensions/lead-capture-form-v3.js';
import { LastFrontierLeadForm_v4 } from './extensions/lead-capture-form-v4.js';
import { LastFrontierBrowserSelfService } from './extensions/browser-self-service.js';
import { LastFrontierBrowserSelfService_v2 } from './extensions/browser-self-service-v2.js';
import { LastFrontierBrowserSelfService_v3 } from './extensions/browser-self-service-v3.js';
import { LastFrontierBrowserSelfService_v4 } from './extensions/browser-self-service-v4-widget.js';
import { LFHTourExplorerGrid } from './extensions/lfh-tour-explorer-grid.js';
import { LFHTourExplorerCarousel } from './extensions/lfh-tour-explorer-carousel.js';
import { LFHTourExplorerTabs } from './extensions/lfh-tour-explorer-tabs.js';
import { LFHLodgeCompareWidget } from './extensions/lfh-lodge-compare-widget.js';
import { LFHLodgeCompareWidgetV2 } from './extensions/lfh-lodge-compare-widget-v2.js';
import { LFHWeatherConditionsWidgetV1 } from './extensions/lfh-weather-conditions-widget-v1.js';
import { LFHWeatherConditionsWidgetV2 } from './extensions/lfh-weather-conditions-widget-v2.js';
import { WaitingAnimationExtension } from './extensions/waiting-animation.js';
import { DoneAnimationExtension } from './extensions/done-animation.js';
import { LastFrontierWelcomeCarousel } from './extensions/welcome-carousel.js';
import { LastFrontierWelcomePath } from './extensions/welcome-path-selector.js';
import { LastFrontierWelcomeGrid } from './extensions/welcome-grid.js';
import { LastFrontierWelcomeGridV2 } from './extensions/welcome-grid-v2.js';
import { LFHTourExplorerGridBooking } from './extensions/lfh-tour-explorer-grid-booking.js';

// Convenience: Export all as array
export const allExtensions = [
  SnowfallExtension1,
  PulseSnowsportsLeadForm1,
  PulseSnowsportsLeadForm2,
  LastFrontierHeliskiingLeadForm1,
  LastFrontierHeliskiingLeadForm2,
  LastFrontierHeliskiingLeadForm3,
  LastFrontierHeliskiingLeadForm4,
  LastFrontierHeliskiingLeadForm_Widget1,
  LastFrontierHeliskiingLeadForm_Widget2,
  LastFrontierGroupOffers2027_v1,
  LastFrontierTourShowcase1,
  FeedbackExtension1,
  FeedbackExtension2,
  FeedbackExtension3,
  FeedbackExtension4,
  FeedbackExtension5,
  FeedbackExtension6,
  FeedbackExtension7,
  FeedbackExtension8,
  // FeedbackExtension9, // disabled — v10 handles ext_feedback9 during testing
  FeedbackExtension10,
  LastFrontierLeadForm_v3,
  LastFrontierLeadForm_v4,
  LastFrontierBrowserSelfService,
  LastFrontierBrowserSelfService_v2,
  LastFrontierBrowserSelfService_v3,
  LastFrontierBrowserSelfService_v4,
  LFHTourExplorerGrid,
  LFHTourExplorerCarousel,
  LFHTourExplorerTabs,
  LFHLodgeCompareWidget,
  LFHLodgeCompareWidgetV2,
  LFHWeatherConditionsWidgetV1,
  LFHWeatherConditionsWidgetV2,
  WaitingAnimationExtension,
  DoneAnimationExtension,
  LastFrontierWelcomeCarousel,
  LastFrontierWelcomePath,
  LastFrontierWelcomeGrid,
  LastFrontierWelcomeGridV2,
  LFHTourExplorerGridBooking,
];

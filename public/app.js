// Initialize LaunchDarkly client
const ldclient = LDClient.initialize(
  '<get your Client-Side ID from https://app.launchdarkly.com/settings/projects>',
  { key: 'anon', anonymous: true },
  { bootstrap: 'localstorage' }
);

const CONFIG = {
  ACCELERATION: 0.001,
  BG_CLOUD_SPEED: 0.2,
  BOTTOM_PAD: 10,
  CLEAR_TIME: 3000,
  CLOUD_FREQUENCY: 0.5,
  GAMEOVER_CLEAR_TIME: 750,
  GAP_COEFFICIENT: 0.6,
  GRAVITY: 0.6,
  INITIAL_JUMP_VELOCITY: 12,
  INVERT_FADE_DURATION: 12000,
  INVERT_DISTANCE: 700,
  MAX_BLINK_COUNT: 3,
  MAX_CLOUDS: 6,
  MAX_OBSTACLE_LENGTH: 3,
  MAX_OBSTACLE_DUPLICATION: 2,
  MAX_SPEED: 13,
  MIN_JUMP_HEIGHT: 35,
  MOBILE_SPEED_COEFFICIENT: 1.2,
  RESOURCE_TEMPLATE_ID: 'audio-resources',
  SPEED: 6,
  SPEED_DROP_COEFFICIENT: 3
};

// Run game
const runner = new Runner('.interstitial-wrapper', CONFIG);

// Lesson 3: Dark Mode feature (client-side flag)
const darkMode = new DarkMode

// When LD client is ready, evaluate flags
ldclient.on('ready', function() {
  ldclient.variation('dark-mode', false) ?
    darkMode.enableFeature() :
    darkMode.disableFeature();

  // Lesson 3.1: Sets gravitational pull
  runner.updateConfigSetting('GRAVITY', ldclient.variation('gravity', 0.6));
})

// Listen to flag change in real-time
ldclient.on('change:dark-mode', (isFeatureEnabled) => (
  isFeatureEnabled ?
    darkMode.enableFeature() :
    darkMode.disableFeature()
));

// Lesson 3.1: Update gravity settings in real-time
ldclient.on('change:gravity', gravityCoefficient => (
  runner.updateConfigSetting('GRAVITY', gravityCoefficient)
));
const { getDefaultConfig } = require('@expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Prefer CommonJS `main` field (tslib's CommonJS build) before ESM `module`.
config.resolver.resolverMainFields = ['react-native', 'main', 'module'];

module.exports = withNativeWind(config, { input: './app/global.css' });

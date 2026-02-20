module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    'nativewind/babel', // preset (includes worklets plugin + css-interop + jsx transform)
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@features': './src/features',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@store': './src/store',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@types': './src/types',
          '@assets': './assets',
        },
      },
    ],
  ],
};

module.exports = {
  styleguideComponents: {
    Wrapper: require.resolve('./styleguidist/Wrapper.jsx')
  },
  components: 'packages/**/*.jsx',
  ignore: [
    '**/packages/Manage/**',
    '**/packages/InkBackend/**',
    '**/packages/PasswordResetBackend/**',
    '**/packages/MediumDraft/CustomImageSideButton.jsx',
    '**/node_modules/**',
    '**/*.test.{js,jsx}'
  ]
}

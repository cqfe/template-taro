import cqfeEslintConfig from '@cqfe/eslint-config'

export default [
  ...cqfeEslintConfig,
  {
    ignores: ['**/demo/**'],
  },
]

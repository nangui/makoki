export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type must be one of these
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Formatting, missing semicolons, etc.
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Adding tests
        'build', // Build system or dependencies
        'ci', // CI configuration
        'chore', // Maintenance tasks
        'revert', // Revert a commit
        'init', // Initial commit
      ],
    ],
    // Subject must not be empty
    'subject-empty': [2, 'never'],
    // Type must not be empty
    'type-empty': [2, 'never'],
    // Subject must be lowercase
    'subject-case': [2, 'always', 'lower-case'],
    // Max header length
    'header-max-length': [2, 'always', 100],
    // Scope can be empty or one of these
    'scope-enum': [
      1,
      'always',
      [
        'background',
        'content',
        'popup',
        'types',
        'data',
        'generators',
        'config',
        'deps',
        'eslint',
        'github',
        'cursor',
        'assets',
        'scripts',
        'release',
      ],
    ],
  },
}

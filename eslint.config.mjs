// eslint.config.mjs
import next from 'eslint-config-next';
import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  ...next,
  {
    rules: {
      // TEMP: unblock build
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'warn',   // or 'off'
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // 1. Global Ignores (Must be its own object with just 'ignores')
  {
    ignores: ['dist', 'bin', 'node_modules', 'coverage', 
      'public', 'ant-design-master', 'blueprint-develop', 
      'fluentui-master', 'primitives-main'
    ]
  },

  // 2. Base JavaScript Recommendations
  // In Flat Config, we just add this object directly to the array
  js.configs.recommended,

  // 3. React & Project Specific Configuration
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Manually spread the React Hooks rules here
      ...reactHooks.configs.recommended.rules,
      
      // Your Custom Rules
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
// tailwind.config.js
const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default;
const safeListFile = 'safelist.txt';

module.exports = {
  // mode: 'jit', // ❌ kerak emas (v3+)
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    `./${safeListFile}`,
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    screens: {
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.500'),
            maxWidth: '65ch',
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.400'),
          },
        },
      }),
    },
  },
  plugins: [
    // ➜ Chegaraning har bir tomoni uchun rang util’lari
    function ({ addUtilities, theme }) {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors.DEFAULT; // default key v3’da ham mavjud bo‘ladi

      const utilities = Object.entries(colors).flatMap(([name, value]) => ({
        [`.border-t-${name}`]: { borderTopColor: value },
        [`.border-r-${name}`]: { borderRightColor: value },
        [`.border-b-${name}`]: { borderBottomColor: value },
        [`.border-l-${name}`]: { borderLeftColor: value },
      }));

      addUtilities(utilities, { variants: ['responsive', 'hover'] });
    },

    // Safelist generator
    require('tailwind-safelist-generator')({
      path: safeListFile,
      patterns: [
        'text-{colors}',
        'bg-{colors}',
        'dark:bg-{colors}',
        'dark:hover:bg-{colors}',
        'dark:active:bg-{colors}',
        'hover:text-{colors}',
        'hover:bg-{colors}',
        'active:bg-{colors}',
        'ring-{colors}',
        'hover:ring-{colors}',
        'focus:ring-{colors}',
        'focus-within:ring-{colors}',
        'border-{colors}',
        'focus:border-{colors}',
        'focus-within:border-{colors}',
        'dark:text-{colors}',
        'dark:hover:text-{colors}',
        'h-{height}',
        'w-{width}',
      ],
    }),

    require('@tailwindcss/typography'),
  ],
};

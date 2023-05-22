const defaultTheme = require('tailwindcss/defaultTheme')

const sans = defaultTheme.fontFamily.sans.filter(font => font !== 'Roboto')

module.exports = {
  content: [
    './src/ui/components/**/*.{js,vue,ts}',
    './src/ui/layouts/**/*.vue',
    './src/ui/pages/**/*.vue',
    './src/ui/plugins/**/*.{js,ts}',
    './src/ui/nuxt.config.{js,ts}'
  ],
  theme: {
    container: {
      center: true,
      screens: {
        mobile: '1200px',
        tablet: '1350px',
        desktop: '1500px'
      }
    },
    fontFamily: {
      sans: ['"Open sans"', ...sans],
      serif: ['Gotham', ...defaultTheme.fontFamily.serif]
    },
    extend: {
      colors: {
        black: {
          pure: '#000000',
          light: '#363636',
          dark: '#110C11',
          medium: '#2e2d2e',
          DEFAULT: '#272527',
          50: '#27252788',
          mid: '#2E2D2E',
          soft: '#1C1C1C'
        },
        blue: {
          light: '#90AFC5',
          DEFAULT: '#336B87',
          dark: '#274C69',
          medium: '#44C1EE'
        },
        'blue-electric': '#44C1EE',
        'green-dark': '#16580C',
        'gray-medium': '#676767'
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          '2xl': '3rem'
        }
      },
      zIndex: {
        60: '60',
        70: '70'
      }
    }
  },
  plugins: [],
  prefix: 'pe-admin-'
}

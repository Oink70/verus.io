module.exports = {
  darkMode: false, // or 'media' or 'class'
  preserveHtmlElements: false,
  theme: {
    screens: {
      sm: '640px',
      md: '786px',
      lg: '1236px',
      xl: '1236px',
    },
    fontFamily: {
      display: ['geomanistbook', 'sans-serif'],
      body: ['geomanistbook', 'sans-serif'],
      p: ['Source Sans Pro', 'sans-serif'],
      foot: ['geomanistregular', 'sans-serif'],
      nav: ['geomanistregular', 'sans-serif'],
    },
    fontSize: {
      xs: ['.75rem', { lineHeight: '1rem' }],
      sm: ['.9375rem', { lineHeight: '1.25rem' }],
      custom2: ['19px', { lineHeight: '1.25rem' }],
      base: ['1.0625rem', { lineHeight: '1.5rem' }],
      lg: ['1.1875rem', { lineHeight: '1.75rem' }],
      xl: ['1.3125rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5625rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.375rem', { lineHeight: '2.5rem' }],
      '5xl': ['3.1875rem', { lineHeight: '1rem' }],
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        gray: {
          105: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          205: '#ddd',
          300: '#e0e0e0',
          305: '#e9e9e9',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        navlink: {
          default: '#353535',
          hover: '#8d8d8d',
          active: '#000',
        },
        tablink: {
          default: '#b1b1b1',
          active: '#3165d4',
        },
        bluebutton: {
          default: '#3165d4',
          hover: '#2856b9',
        },
        bluetrans: {
          default: '#ccdaf8',
          alter: '#f4f7ff',
        },
        greenbutton: {
          default: '#d6ffdc',
          hover: '#4aa658',
        },
        menu: {
          active: '#f7faff',
        },
        'theme-white': '#fff',
        'theme-blue': '#3165D4',
        'theme-green': '#4AA658',
        'theme-black': '#1d1e22',
        'theme-feature': '#92a3c7',
        custom: {
          default: '#575757',
        },
      },
      borderRadius: {
        sm: '.125rem',
        default: '.3125rem',
        lg: '.4375rem',
      },
      boxShadow: {
        outline: '2px 2px 3px 0 rgba(0,0,0,0.22)',
        lg: '2px 2px 4px 0 rgba(0,0,0,0.07), 4px 4px 28px 0 rgba(0,0,0,0.13)',
        xl: '2px 2px 4px 0 rgba(0,0,0,0.07), 4px 4px 28px 0 rgba(0,0,0,0.33)',
        menu: '2px 2px 11px 0 rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'earning-bg': "url('/images/backgrounds/earning-bg.svg')",
        'features-bg': "url('/images/backgrounds/features-bg.svg')",
        'footer-bg': "url('/images/backgrounds/footer-bg.svg')",
        'light-bg': "url('/images/backgrounds/light-bg.svg')",
        'newsletter-bg': "url('/images/backgrounds/newsletter-bg.svg')",
      },
      listStyleType: {
        roman: 'lower-roman',
        alpha: 'lower-alpha',
      },
    },
    aspectRatio: {
      none: 0,
      square: [1, 1],
      '16/9': [16, 9],
      '4/3': [4, 3],
      '21/9': [21, 9],
    },
  },
  variants: {
    aspectRatio: ['responsive'],
    extend: {
      display: ['hover'],
    },
  },
  plugins: [
    require('tailwindcss-responsive-embed'),
    require('tailwindcss-aspect-ratio'),
  ],
  purge: false,
}

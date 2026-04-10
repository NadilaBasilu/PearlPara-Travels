/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ocean-blue':   '#1a6eb5',
        'ocean-dark':   '#0f4d82',
        'palm-green':   '#2d7a4f',
        'sandy-beige':  '#f7f3ec',
        'sunset-orange':'#e8722a',
        'sunset-dark':  '#c95e1a',
        'pearl-white':  '#ffffff',
        'deep-navy':    '#0d1f35',
        'gold':         '#c9a84c',
        'gold-light':   '#e8c97a',
        'warm-gray':    '#6b6560',
      },
      fontFamily: {
        // Body — clean, modern, highly legible
        sans:      ['DM Sans', 'sans-serif'],
        // Display headings — luxury serif
        display:   ['Cormorant Garamond', 'Georgia', 'serif'],
        // Logo & section labels — elegant caps
        cinzel:    ['Cinzel', 'serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float':   'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

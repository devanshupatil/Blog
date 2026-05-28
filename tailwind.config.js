import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['opacity-100', 'translate-y-0'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          bg: '#fdf6ee',
          light: '#fef3e6',
          border: '#f0ddc8',
        },
        editorial: {
          text: '#2d1f0f',
          muted: '#7c5c3e',
          accent: '#e07b39',
          subtle: '#c4a882',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        reading: '1.75',
      },
      typography: (theme) => ({
        editorial: {
          css: {
            '--tw-prose-body': theme('colors.editorial.text'),
            '--tw-prose-headings': theme('colors.editorial.text'),
            '--tw-prose-links': theme('colors.editorial.accent'),
            '--tw-prose-code': theme('colors.editorial.text'),
            '--tw-prose-pre-bg': theme('colors.cream.light'),
            '--tw-prose-quote-borders': theme('colors.editorial.accent'),
            'font-family': theme('fontFamily.sans').join(', '),
            'line-height': '1.75',
            'h1, h2, h3, h4': {
              'font-family': theme('fontFamily.serif').join(', '),
            },
            'code, pre': {
              'background-color': theme('colors.cream.light'),
            },
            blockquote: {
              'border-left-color': theme('colors.editorial.accent'),
              'background-color': theme('colors.cream.light'),
              'padding': '0.75rem 1rem',
              'border-radius': '0 0.25rem 0.25rem 0',
            },
          },
        },
        // Invert (dark) variant — overrides pre/code to dark GitHub palette
        invert: {
          css: {
            '--tw-prose-pre-bg': '#161b22',
            '--tw-prose-code': '#e6edf3',
            'pre': {
              'background-color': '#161b22 !important',
              'border': '1px solid #30363d',
            },
            'code': {
              'background-color': '#1f2428',
              'color': '#e6edf3',
            },
            ':not(pre) > code': {
              'background-color': '#1f2428',
              'color': '#e6edf3',
              'border-radius': '3px',
              'padding': '0.1em 0.3em',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

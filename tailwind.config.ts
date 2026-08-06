import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Institutional research palette: deep slate ground, restrained accent.
        ink: {
          950: '#0a0e14',
          900: '#0f141c',
          850: '#141b25',
          800: '#1a2230',
          700: '#26303f',
          600: '#3a4658',
          500: '#5b6878',
          400: '#8592a3',
          300: '#adb8c6',
          200: '#d2d9e2',
          100: '#eaeef3',
          50: '#f6f8fa',
        },
        accent: {
          900: '#06373c',
          800: '#0a474d',
          700: '#0c5359',
          600: '#0f5f66',
          500: '#14808a',
          400: '#2aa1a9',
          300: '#5cc3c8',
          200: '#9adfe2',
          100: '#d6f0f1',
        },
        signal: {
          fresh: '#1d7a5f',
          recent: '#8a6d1f',
          established: '#5b6878',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
};

export default config;

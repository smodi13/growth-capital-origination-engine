import type { Config } from 'tailwindcss';

/**
 * Institutional research design system.
 *
 * The ground is white. Every primary surface is #FFFFFF, separated by hairline
 * borders rather than by changes in value, with two neutral greys available
 * where a section needs to sit back from the page. That is what makes this read
 * as investment research rather than as a dashboard: hierarchy comes from type
 * and rule weight, not from stacked dark panels.
 *
 * Cobalt is the primary accent and teal the analytical secondary. Both are
 * accents only. Neither is permitted to carry a page, hero, section, table, or
 * navigation background. Navy survives in three places where a dark ground
 * genuinely aids reading: table header rows, the footer, and a single
 * recommendation banner.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark navy. Permitted only on table header rows, the footer, and one
        // recommendation banner. Never a page, hero, or section ground.
        navy: {
          950: '#0b1220',
          900: '#101828',
          850: '#172033',
          800: '#1f2b42',
          700: '#2b3852',
          600: '#3a4761',
          500: '#4c5a75',
        },
        // Neutral grounds. 50 is the page and card surface.
        ivory: {
          50: '#ffffff',
          100: '#f7f8fa',
          200: '#f2f4f7',
          300: '#e4e7ec',
        },
        // Text and rules, read on a white ground.
        slate: {
          950: '#0b1220',
          900: '#101828',
          800: '#172033', // primary text
          700: '#344054',
          600: '#667085', // secondary text, and the lightest that clears AA small
          500: '#8a94a6', // muted text, large or non-essential only
          400: '#98a2b3',
          300: '#b0b8c4',
          200: '#d0d5dd', // strong border
          100: '#e4e7ec', // border
          50: '#f2f4f7',
        },
        // Muted cobalt. Primary accent.
        cobalt: {
          900: '#0f2444',
          800: '#14305e',
          700: '#1a4478',
          600: '#215695',
          500: '#2f6bb3',
          400: '#4f89cd',
          300: '#7fa9dd',
          200: '#b3cbeb',
          100: '#dde8f6',
          50: '#f0f5fb', // analyst judgment ground
        },
        // Restrained teal. Secondary analytical accent.
        teal: {
          900: '#0a2b2c',
          800: '#0f3f41',
          700: '#1d5f64',
          600: '#2a7076',
          500: '#347c82',
          400: '#4f9aa0',
          300: '#7fbcc0',
          200: '#b3dade',
          100: '#ddf0f1',
          50: '#f0f8f8',
        },
        // Financial state. Never the only carrier of meaning.
        positive: {
          800: '#1b5a40',
          700: '#20684a',
          600: '#287a57',
          500: '#2f8f66',
          400: '#4faa83',
          200: '#a9dcc4',
          100: '#edf7f2',
        },
        caution: {
          800: '#6f4a12',
          700: '#7f5615',
          600: '#946319',
          500: '#b07c26',
          400: '#cfa054',
          200: '#f0dcae',
          100: '#fff8e7',
        },
        risk: {
          800: '#7d3333',
          700: '#933b3b',
          600: '#a64444',
          500: '#c05a55',
          400: '#d48b87',
          200: '#efc2bf',
          100: '#fff1f1',
        },
      },
      fontFamily: {
        // Editorial display face for major headlines. The stack resolves to
        // fonts already present on the operating system, so nothing is fetched.
        display: [
          'Iowan Old Style',
          'Palatino Linotype',
          'Palatino',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'serif',
        ],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      fontSize: {
        '3xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.02em' }],
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        hero: ['clamp(2.25rem, 5.2vw, 4rem)', { lineHeight: '1.04', letterSpacing: '-0.022em' }],
        display: ['clamp(1.75rem, 3.4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.018em' }],
        title: ['clamp(1.25rem, 2vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.012em' }],
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        panel: '0 1px 3px rgba(16, 24, 40, 0.04)',
        lift: '0 2px 6px rgba(16, 24, 40, 0.07), 0 12px 24px -12px rgba(16, 24, 40, 0.10)',
        nav: '0 1px 2px rgba(16, 24, 40, 0.05)',
        ring: '0 0 0 1px rgba(47, 107, 179, 0.35)',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translate3d(0, 10px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 520ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 400ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;

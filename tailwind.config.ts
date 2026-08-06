import type { Config } from 'tailwindcss';

/**
 * Institutional research design system.
 *
 * The palette is built around three grounds rather than one: a deep navy that
 * carries the chrome and the hero, a graphite that separates panels from that
 * ground, and an ivory content surface used where sustained reading happens.
 * Having more than one ground is what lets hierarchy exist at all.
 *
 * Accents are a muted cobalt for interactive and structural emphasis and a
 * restrained teal for analytical highlights. Financial state uses a muted green
 * and a restrained amber and red, never as the only carrier of meaning.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy ground. Chrome, hero, and dark sections.
        navy: {
          950: '#070b14',
          900: '#0b1220',
          850: '#0f172a',
          800: '#141f36',
          700: '#1c2a45',
          600: '#273954',
          500: '#3a4d6b',
        },
        // Graphite. Panel surfaces on the navy ground.
        graphite: {
          900: '#111823',
          800: '#182130',
          700: '#212c3e',
          600: '#2c3849',
          500: '#3c4859',
          400: '#5a6779',
          300: '#8a96a6',
        },
        // Ivory content surface for sustained reading.
        ivory: {
          50: '#fdfcfa',
          100: '#f8f6f2',
          200: '#efece6',
          300: '#e2ded6',
        },
        // Cool neutral text and rules.
        slate: {
          950: '#0a1020',
          900: '#111a2e',
          800: '#1e2a41',
          700: '#33415c',
          // Ramp tuned so 400, 500, and 600 all clear WCAG AA at small sizes
          // against both navy-950 and the graphite panel surface.
          600: '#7b8aa2',
          500: '#8b99ae',
          400: '#a1adbe',
          300: '#b3bdcc',
          200: '#d5dbe4',
          100: '#e9edf2',
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
        },
        // Restrained teal. Secondary accent for analytical emphasis.
        teal: {
          900: '#0a2b2c',
          800: '#0f3f41',
          700: '#145458',
          600: '#186a6f',
          500: '#1f858b',
          400: '#3aa3a9',
          300: '#6cc2c6',
          200: '#a8dde0',
          100: '#d8f0f1',
        },
        // Financial state. Never the only signal.
        positive: {
          700: '#14603f',
          600: '#1a7a50',
          500: '#249c66',
          400: '#48b585',
          200: '#a9dcc4',
          100: '#dcf0e6',
        },
        caution: {
          700: '#7a5312',
          600: '#9a6a18',
          500: '#c08829',
          400: '#d9a94f',
          200: '#f0dcae',
          100: '#faf1dd',
        },
        risk: {
          700: '#7d2320',
          600: '#9c2c28',
          500: '#bf3d38',
          400: '#d46b66',
          200: '#efc2bf',
          100: '#fae4e3',
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
        panel: '0 1px 2px rgba(7, 11, 20, 0.28), 0 8px 24px -12px rgba(7, 11, 20, 0.45)',
        lift: '0 2px 4px rgba(7, 11, 20, 0.3), 0 16px 36px -16px rgba(7, 11, 20, 0.6)',
        ring: '0 0 0 1px rgba(47, 107, 179, 0.4)',
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

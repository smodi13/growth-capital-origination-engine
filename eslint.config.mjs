import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const config = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'coverage/**'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Static export ships no raster images at all, so the image rule would
      // never fire. It is disabled explicitly rather than left ambiguous.
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;

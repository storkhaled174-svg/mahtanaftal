import localFont from 'next/font/local';

// Preserve Inter/Orbitron while avoiding network-dependent build-time font downloads.
export const header = localFont({src:'../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',variable:'--font-header',display:'swap'});
export const body = localFont({src:'../node_modules/@fontsource/orbitron/files/orbitron-latin-400-normal.woff2',variable:'--font-body',display:'swap'});
export const display = localFont({src:'../node_modules/@fontsource/orbitron/files/orbitron-latin-700-normal.woff2',variable:'--font-display',display:'swap'});

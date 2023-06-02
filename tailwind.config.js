/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': 'var(--font-poppins)',
        'krona-one': 'var(--font-krona-one)',
      },
      colors: {
        'branding-blue': '#0E7AEA',
        'branding-gray': '#E8E8E8',
      }
    },
  },
  plugins: [],
};

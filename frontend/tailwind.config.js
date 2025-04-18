module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/index.css',  // Ensure index.css is included
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#000033', // Customize this hex color
      },
    },
  },
  plugins: [],
};

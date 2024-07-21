const colors = require('./src/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 注意：更新這裡以包含所有組件文件的路徑。
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      },
      colors,
    },
  },
  plugins: [],
};

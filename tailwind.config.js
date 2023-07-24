/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
          main:'#5b18ac',
          borderGrey:'rgba(128, 128, 128, 0.744)',
          likeBg:'#eeeeeed6',
      },
    },
    screens: {
      '2xl': {'max': '1535px'},

      'xl': {'max': '1125px'},

      'lg': {'max': '1023px'},      

      'md': {'max': '767px'},      

      'sm': {'max': '639px'},
      
    }
  },
  plugins: [],
}


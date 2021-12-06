module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          spartan:'#18443b',
          green:'#008208',
          lime:'#7bbd00',
          excellence:'#0b9a6d'
        }
      }
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

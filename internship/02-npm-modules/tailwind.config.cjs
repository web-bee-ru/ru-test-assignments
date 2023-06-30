const defaultTheme = require('tailwindcss/defaultTheme');

const rem2px = (input, fontSize = 16) => {
  if (input == null) return input;

  switch (typeof input) {
    case 'object':
      if (Array.isArray(input)) {
        return input.map(val => rem2px(val, fontSize));
      } else {
        const ret = {};
        for (const key in input) {
          ret[key] = rem2px(input[key]);
        }
        return ret;
      }
    case 'string':
      return input.replace(/(\d*\.?\d+)rem$/, (_, val) => parseFloat(val) * fontSize + 'px');
    default:
      return input;
  }
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{js,jsx,ts,tsx}'],
  theme: {
    spacing: rem2px(defaultTheme.spacing),
    extend: {
      fontSize: {
        'x1.25': ['1.25rem', '1.75rem'],
        'x1.5': ['1.5rem', '1.9rem'],
        'x1.75': ['1.75rem', '2.1rem'],
        x2: ['2rem', '2.25rem'],
        'x2.25': ['2.25rem', '2.5rem'],
        'x2.5': ['2.5rem', '2.65rem'],
        'x2.75': ['2.75rem', '2.85rem'],
        x3: ['3rem', '1'],
        x4: ['4rem', '1'],
        x5: ['5rem', '1'],
      },
    },
  },
  corePlugins: { container: false },
};

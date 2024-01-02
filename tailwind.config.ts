import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '4.3': '4.3rem',
        '4.6': '4.6rem',
      },
      skew: {
        '12': '-20deg',
      },
      colors: {
        'marked': '#7C599F',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  }
}
export default config

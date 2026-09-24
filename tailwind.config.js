/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0D12',
          soft: '#5E6572',
          faint: '#9297A3',
        },
        canvas: {
          DEFAULT: '#FAFAFB',
          surface: '#FFFFFF',
        },
        line: {
          DEFAULT: '#E4E7EC',
          soft: '#EEF0F3',
        },
        accent: {
          DEFAULT: '#2452E8',
          hover: '#1B3FC4',
          soft: '#EEF2FF',
        },
        signal: {
          success: '#12805C',
          successSoft: '#E7F5EF',
          warning: '#B4720A',
          warningSoft: '#FBF1E1',
        },
      },
      fontFamily: {
        display: ['"Manrope"', 'ui-sans-serif', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(11,13,18,0.04), 0 12px 32px -16px rgba(11,13,18,0.16)',
        panelLg: '0 2px 4px rgba(11,13,18,0.04), 0 24px 48px -20px rgba(11,13,18,0.18)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        dash: {
          to: { strokeDashoffset: '0' },
        },
        flow: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateX(280%)', opacity: '0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
        dash: 'dash 1.2s ease-out forwards',
        flow: 'flow 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

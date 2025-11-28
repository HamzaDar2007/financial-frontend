/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Aurora Dark Theme
                void: '#0B0E14',
                obsidian: '#151923',
                charcoal: '#1E2330',
                // Gold Standard
                gold: {
                    DEFAULT: '#D4AF37',
                    light: '#F5D76E',
                    dark: '#B8941F',
                },
                // Accent Colors
                emerald: '#10B981',
                ruby: '#EF4444',
                // Text Colors
                silver: '#94a3b8',
            },
            fontFamily: {
                sans: ['IBM Plex Sans Arabic', 'Almarai', 'system-ui', 'sans-serif'],
            },
            backdropBlur: {
                'glass': '20px',
            },
            animation: {
                'shimmer': 'shimmer 2s linear infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}

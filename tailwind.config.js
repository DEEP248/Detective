/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                noir: {
                    50: '#f7f5f2',
                    100: '#ede8e0',
                    200: '#ddd5c8',
                    300: '#cfc2b0',
                    400: '#c4b5a0',
                    500: '#ab9b88',
                    600: '#978772',
                    700: '#5c4c40',
                    800: '#4d4038',
                    900: '#3a312c',
                    950: '#221c18',
                },
                blood: {
                    400: '#c45555',
                    500: '#a33a3a',
                    600: '#8b2c2c',
                    700: '#6b2020',
                },
                amber: {
                    300: '#f0c674',
                    400: '#e6b655',
                    500: '#d4a434',
                },
                evidence: '#c9a84c',
                suspect: '#7a8fa6',
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                glow: '0 0 20px rgba(201, 168, 76, 0.15)',
                'glow-warm': '0 0 30px rgba(201, 168, 76, 0.2)',
                card: '0 4px 24px rgba(0, 0, 0, 0.4)',
                'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6)',
            },
            backgroundImage: {
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'flicker': 'flicker 4s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                slideUp: {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                flicker: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.85 },
                    '75%': { opacity: 0.95 },
                },
            },
        },
    },
    plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.{js,jsx,ts,tsx}',
        './resources/views/**/*.blade.php',
    ],
    theme: {
        extend: {
            colors: {
                accent: '#18d26e',
                'accent-light': '#35e888',
                dark: '#040404',
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
                heading: ['Raleway', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

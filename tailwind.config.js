/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
        extend: {
            colors: {
                "primary": "#ee8208",
                "primary-dark": "#d67507",
                "secondary": "#FEF1E2",
                "secondary-dark": "#FCEBD7",
                "error": "#ff5756",
                "base-100": "#ffffff",
                "base-200": "#d8d8d8",
                "base-300": "#666",
            }
        },
    },
    plugins: [],
}


export default {
	darkMode: ["class"],
	content: [
		".index.html",
		"./pages/**/*.{js,jsx}",
    	"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{html,js,jsx}"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {}
	},
	plugins: [require("tailwindcss-animate")],
};
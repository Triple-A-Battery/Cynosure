/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				red: '#EB4747',
				green: '#70E9A1',
				accent: '#71C9DA',
				background: '#D9D9D9',
				foreground: '#1A1A1A'
			}
		}
	},
	plugins: [require('daisyui')]
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				red: '#EF9995',
				blue: '#71C9DA',
				yellow: '#FFF200',
				accent: '#A4CBB4',
				background: '#ECE3CA',
				foreground: '#2E282A'
			},
			fontFamily: {
				sans: ['"Jost"'],
				serif: ['"Jost"']
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['retro']
	}
};

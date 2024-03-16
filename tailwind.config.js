/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				red: '#EB4747',
				blue: '#71C9DA',
				yellow: '#FFF200',
				accent: '#70E9A1',
				background: '#D9D9D9',
				foreground: '#1A1A1A'
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

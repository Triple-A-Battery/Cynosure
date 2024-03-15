import chromeAdapter from 'sveltekit-adapter-chrome-extension';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

let adapters = [
	chromeAdapter({
		pages: 'build/extension',
		assets: 'build/extension',
		strict: false
	})
]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: {
			name: 'svelte-adapter-chrome',
			async adapt(argument) {
				await Promise.all(adapters.map(item =>
					Promise.resolve(item).then(resolved => resolved.adapt(argument))
				))
			}
		},
		appDir: "app",
		csrf: { // Server stuff down the line
			checkOrigin: false,
		},
		alias: {
			'$extension': 'src/extension'
		}
	}
};

export default config;

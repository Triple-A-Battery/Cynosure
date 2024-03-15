import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { PORT } from './env';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: PORT
	}
});

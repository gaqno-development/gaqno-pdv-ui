import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import { FEDERATION_SHARED } from '@gaqno-development/frontcore/config/federation-shared'

export default defineConfig(async () => {
	const tailwindcss = (await import('@tailwindcss/vite')).default
	
	return {
	base: '/',
	server: {
		port: 3006,
		origin: 'http://localhost:3006',
		fs: {
			allow: ['.', '../shared'],
		},
	},
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: 'pdv',
			filename: 'remoteEntry.js',
			exposes: {
				'./App': './src/App.tsx',
			},
			shared: FEDERATION_SHARED as any,
		}),
	],
	build: {
		modulePreload: false,
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
		commonjsOptions: {
			transformMixedEsModules: true,
			requireReturnsDefault: 'preferred',
		},
		rollupOptions: { output: { format: 'es' } },
	},
	optimizeDeps: { include: ['use-sync-external-store'] },
	}
})

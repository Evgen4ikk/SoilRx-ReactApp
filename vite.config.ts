import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            // svgr options: https://react-svgr.com/docs/options/
            svgrOptions: {
                // ...
            },

            // esbuild options, to transform jsx to js
            esbuildOptions: {
                // ...
            },

            // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
            include: '**/*.svg?react',

            //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should ignore. By default no files are ignored.
            exclude: '',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app': path.resolve(__dirname, './src/app'),
            '@features': path.resolve(__dirname, './src/features'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@ui': path.resolve(__dirname, './src/shared/ui'),
            '@lib': path.resolve(__dirname, './src/shared/lib'),
            '@hooks': path.resolve(__dirname, './src/shared/hooks'),
            '@typ': path.resolve(__dirname, './src/shared/types'),
            '@model': path.resolve(__dirname, './src/shared/model'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@widgets': path.resolve(__dirname, './src/widgets'),
        },
    },
})

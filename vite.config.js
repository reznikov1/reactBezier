import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    plugins:
    [
        react(),
        tsconfigPaths()
    ],
    root: 'src/',
    publicDir: "../public/",
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    }
}
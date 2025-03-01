import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // 'iro': ['@jaames/iro']
                },
            },
        },
    },
    plugins: [],
    base: "/cursor-collab-side-project",
});

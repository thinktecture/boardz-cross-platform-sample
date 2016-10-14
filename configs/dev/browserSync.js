module.exports = {
    port: 8000,
    files: ['./build/web/**/*.{html,css,js}'],
    server: {
        baseDir: './build/web',
        middleware: { 0: null }
    },
    open: false,
    injectChanges: true
};

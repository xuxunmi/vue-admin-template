module.exports = {
    purge: {
        content: ['./public/*.html', './src/**/*.{vue,js,ts,jsx,tsx}']
    },
    theme: {
        extend: {}
    },
    corePlugins: {
        preflight: false
    },
    plugins: []
};

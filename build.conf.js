module.exports = {
    module: { 
        name: 'pipEntry',
        styles: 'index',
        export: 'pip.entry',
        standalone: 'pip.entry'
    },
    build: {
        js: false,
        ts: false,
        tsd: true,
        bundle: true,
        html: true,
        sass: true,
        lib: true,
        images: true,
        dist: false
    },
    file: {
        lib: [
            '../pip-suite-data/dist/**/*',
            '../pip-suite-rest/dist/**/*',
            '../pip-suite-pictures/dist/**/*',
            '../node_modules/pip-webui-all/dist/**/*',            
        ]
    },
    samples: {
        port: 8140,
        https: false
    },
    api: {
        port: 8141
    }
};

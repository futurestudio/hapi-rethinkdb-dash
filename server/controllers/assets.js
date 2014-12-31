// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
    images: {
        handler: {
            directory: { path: './public/images' }
        }
    },
    css: {
        handler: {
            directory: { path: './public/css' }
        }
    },
    js: {
        handler: {
            directory: { path: './public/js' }
        }
    }
};

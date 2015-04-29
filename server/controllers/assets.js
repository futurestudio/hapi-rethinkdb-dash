/**
 * The assets controller serves css, js, images
 */
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

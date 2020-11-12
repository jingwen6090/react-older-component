const postCssBorder1px = require('./config/postcss-border-1px');
module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1'],
            grid: true
        }),
        postCssBorder1px
    ]
}
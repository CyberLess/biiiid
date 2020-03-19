// =========================================================
// Gulp Task: server
// =========================================================

let path = require('../settings/path.json'),
	browserSync = require('browser-sync').create();

	var opts = {
		server: "dist",
		notify: false,
		// proxy: "local.dev",
	}

module.exports = (gulp, plugins) => {
    return () => {
	    var stream = 
			// -------------------------------------------- Start Task
			    browserSync.init(opts);

			    gulp.watch(path.watch.css, gulp.parallel('sass'))
			    gulp.watch(path.watch.js, gulp.series('js'))
			    gulp.watch(path.watch.html, gulp.series('pug', 'pageList'))
			    gulp.watch(path.watch.img, gulp.series('imageCompress'))
			    gulp.watch(path.watch.svg, gulp.series('svgSpriteBuild'))

			    browserSync.watch(Object.values(path.watch)).on('change', browserSync.reload);
			// ---------------------------------------------- End Task
	    return stream;
    };
};
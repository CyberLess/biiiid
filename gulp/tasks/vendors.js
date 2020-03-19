// =========================================================
// Gulp Task: vendors
// =========================================================

let path = require('../settings/path.json'),
	merge = require('merge-stream');

module.exports = (gulp, plugins) => {
    return () => {
	    var fonts =
		    gulp.src(path.src.fonts)
		        .pipe(plugins.newer(path.build.fonts))
		        .pipe(gulp.dest(path.build.fonts));

	    var attach =
		    gulp.src(path.src.attach)
		        .pipe(plugins.newer(path.build.attach))
		        .pipe(gulp.dest(path.build.attach));

	    var api =
		    gulp.src(path.src.api)
		        .pipe(plugins.newer(path.build.api))
		        .pipe(gulp.dest(path.build.api));

	    var media =
		    gulp.src(path.src.media)
		        .pipe(plugins.newer(path.build.media))
		        .pipe(gulp.dest(path.build.media));

		return merge( fonts, attach, api, media); 
    };
};
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	react = require('gulp-react'),
	replace = require('gulp-replace'),
	jshint = require('gulp-jshint'),
	browserify = require('gulp-browserify'),
	del = require('del'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	runSequence = require('run-sequence'),
	zip = require('gulp-zip');
	
var env, outputDir;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
	outputDir = 'builds/development/';
} else {
	outputDir = 'builds/production/';
}

gulp.task('default', function() {
	runSequence('clean',
				['firefox', 'chrome']
				);
});

gulp.task('watch', function() {
	gulp.watch('components/jsx/*.js', ['default']);
});

gulp.task('firefox', function() {
	runSequence('jsx-js-ff',
				['extension-js-ff', 'thirdparty-js-ff', 'babelext-js-ff', 'graphics-ff', 'ff-specific-js', 'ff-specific']
				);
});

gulp.task('chrome', function() {
	runSequence('jsx-js-chrome',
				['extension-js-chrome', 'thirdparty-js-chrome', 'babelext-js-chrome', 'graphics-chrome', 'chrome-specific-js', 'chrome-specific'],
				'chrome-zip'
				);
});

gulp.task('jsx-js-ff', function(){
  return gulp.src('components/jsx/*.js')
    .pipe(replace('replace_with_settings_graphic', 'self.options.pngUrl_settings'))
	.pipe(replace('replace_with_boxchecked_graphic', 'self.options.pngUrl_checkBoxChecked'))
	.pipe(replace('replace_with_boxblank_graphic', 'self.options.pngUrl_checkBoxBlank'))
	.pipe(replace('replace_with_delete_graphic', 'self.options.pngUrl_delete'))
	.pipe(replace('replace_with_addcircle_graphic', 'self.options.pngUrl_addCircle'))
	.pipe(replace('replace_with_save_graphic', 'self.options.pngUrl_save'))
	.pipe(replace('replace_with_cancel_graphic', 'self.options.pngUrl_cancel'))
	.pipe(react())
	.pipe(jshint())
    .pipe(jshint.reporter('default'))
	.pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('components/jsx/precompiled/firefox'));
});

gulp.task('jsx-js-chrome', function(){
  return gulp.src('components/jsx/*.js')
    .pipe(replace('replace_with_settings_graphic', 'chrome.extension.getURL("graphics/ic_settings_applications_black_18dp.png")'))
	.pipe(replace('replace_with_boxchecked_graphic', 'chrome.extension.getURL("graphics/ic_check_box_black_18dp.png")'))
	.pipe(replace('replace_with_boxblank_graphic', 'chrome.extension.getURL("graphics/ic_check_box_outline_blank_black_18dp.png")'))
	.pipe(replace('replace_with_delete_graphic', 'chrome.extension.getURL("graphics/ic_delete_black_18dp.png")'))
	.pipe(replace('replace_with_addcircle_graphic', 'chrome.extension.getURL("graphics/ic_add_circle_black_24dp.png")'))
	.pipe(replace('replace_with_save_graphic', 'chrome.extension.getURL("graphics/ic_save_black_24dp.png")'))
	.pipe(replace('replace_with_cancel_graphic', 'chrome.extension.getURL("graphics/ic_cancel_black_24dp.png")'))
	.pipe(react())
	.pipe(jshint())
    .pipe(jshint.reporter('default'))
	.pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('components/jsx/precompiled/chrome'));
});

gulp.task('extension-js-ff', function(){
  return gulp.src('components/jsx/precompiled/firefox/extension.js')
	.pipe(browserify())
	.pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'Firefox/data'));
});

gulp.task('extension-js-chrome', function(){
  return gulp.src('components/jsx/precompiled/chrome/extension.js')
	.pipe(browserify())
	.pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'Chrome'));
});

gulp.task('thirdparty-js-ff', function() {
	return gulp.src('components/scripts/thirdparty/*.js')
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'Firefox/data/thirdparty'));
});

gulp.task('thirdparty-js-chrome', function() {
	gulp.src('components/scripts/thirdparty/*.js')
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'Chrome/thirdparty'));
});

gulp.task('babelext-js-ff', function() {
	return gulp.src('components/scripts/BabelExt.js')
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'Firefox/data'));
});

gulp.task('babelext-js-chrome', function() {
	gulp.src('components/scripts/BabelExt.js')
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'Chrome'));
});

gulp.task('graphics-ff', function() {
	return gulp.src('components/graphics/*.png')
		.pipe(gulp.dest(outputDir + 'Firefox/data/graphics'));
});

gulp.task('graphics-chrome', function() {
	gulp.src('components/graphics/*.png')
		.pipe(gulp.dest(outputDir + 'Chrome/graphics'));
});

gulp.task('ff-specific', function() {
	return gulp.src('components/browser_specific/Firefox/*.*')
		.pipe(gulp.dest(outputDir + 'Firefox'));
});

gulp.task('chrome-specific', function() {
	gulp.src('components/browser_specific/Chrome/*.*')
		.pipe(gulp.dest(outputDir + 'Chrome'));
});

gulp.task('ff-specific-js', function() {
	return gulp.src('components/scripts/browser_specific/Firefox/lib/main.js')
		.pipe(gulp.dest(outputDir + 'Firefox/lib'));
});

gulp.task('chrome-specific-js', function() {
	gulp.src('components/scripts/browser_specific/Chrome/background.js')
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'Chrome'));
});

gulp.task('clean', function(cb) {
	del(['builds/**/*'], cb);
});

// Dist tasks
gulp.task('chrome-zip', function() {
	gulp.src(outputDir + '/chrome/**/*')
		.pipe(zip('moggo.zip'))
		.pipe(gulp.dest('dist/chrome'));
});
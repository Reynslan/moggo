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
    zip = require('gulp-zip'),
    shell = require('gulp-shell'),
    jest = require('gulp-jest');
    
var env, outputDir;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
    outputDir = 'builds/development/';
    
    gulp.task('default', function() {
    runSequence('clean',
                'unit-test',
                ['firefox', 'chrome']
                );
    });
} else {
    outputDir = 'builds/production/';
    
    gulp.task('default', function() {
    runSequence('clean',
                /* jest bugged with NODE_ENV=production, so skip it*/
                ['firefox', 'chrome']
                );
    });
}

gulp.task('watch', function() {
    gulp.watch('components/jsx/*.js', ['default']);
});

gulp.task('watch-jest', function() {
    gulp.watch('components/__tests__/*.js', ['unit-test']);
});

gulp.task('firefox', function() {
    runSequence('jsx-js-ff',
                ['extension-js-ff', 'thirdparty-js-ff', 'graphics-ff', 'ff-specific-js', 'ff-specific'],
                'ff-dist'
                );
});

gulp.task('chrome', function() {
    runSequence('jsx-js-chrome',
                ['extension-js-chrome', 'thirdparty-js-chrome', 'babelext-js-chrome', 'graphics-chrome', 'chrome-specific-js', 'chrome-specific'],
                'chrome-dist'
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
    .pipe(replace('_replace_with_Browser_', 'Firefox'))
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('components/scripts/preprocessed/firefox'));
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
    .pipe(replace('_replace_with_Browser_', 'Chrome'))
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('components/scripts/preprocessed/chrome'));
});

gulp.task('extension-js-ff', function(){
  return gulp.src('components/scripts/preprocessed/firefox/extension.js')
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'Firefox/data'));
});

gulp.task('extension-js-chrome', function(){
  return gulp.src('components/scripts/preprocessed/chrome/extension.js')
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

gulp.task('unit-test', function() {
    runSequence('make-jestable',
                'jest'
                );
});

gulp.task('make-jestable', function () {
    return gulp.src('components/jsx/*.js')
        .pipe(replace('_replace_with_Browser_', 'Firefox'))
        .pipe(gulp.dest('components/jsx/jestable'));
});

gulp.task('jest', function () {
    return gulp.src('components/__tests__')
        .pipe(jest({
        rootDir: "components",
        scriptPreprocessor: "./preprocessor.js",
        unmockedModulePathPatterns: [
            "react"
        ],
        globals: {
            "replace_with_settings_graphic": "",
            "replace_with_boxchecked_graphic": "",
            "replace_with_boxblank_graphic": "",
            "replace_with_delete_graphic": "",
            "replace_with_addcircle_graphic": "",
            "replace_with_save_graphic": "",
            "replace_with_cancel_graphic": ""
        }
    }));
});

// Dist tasks
gulp.task('chrome-dist', function() {
    gulp.src(outputDir + '/chrome/**/*')
        .pipe(zip('moggo.zip'))
        .pipe(gulp.dest('dist/chrome'));
});

gulp.task('ff-xpi', shell.task([
  'cd addon-sdk-1.17/bin & activate & cd.. & cd.. & cd ' + outputDir + 'Firefox & cfx xpi'
]));

gulp.task('ff-xpi-move', function() {
    gulp.src(outputDir + '/firefox/*.xpi')
        .pipe(gulp.dest('dist/firefox'));
});

gulp.task('ff-dist', function() {
    runSequence('ff-xpi',
                'ff-xpi-move'
                );
});
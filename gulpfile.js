/**
 * Created by bapur on 7/17/2017.
 */
var  gulp= require('gulp'),
    clean=require('gulp-clean'),
    inject=require('gulp-inject'),
    bowerFiles=require('gulp-main-bower-files'),
    bower=require('main-bower-files')
    angularFilesort=require('gulp-angular-filesort'),
    naturalFilesort=require('gulp-natural-sort'),
    filter=require('gulp-filter'),
    concat=require('gulp-concat'),
    cleanCss=require('gulp-clean-css'),
    uglify=require('gulp-uglify'),
    merge=require('merge-stream'),
    gutil = require('gulp-util'),
    war=require('gulp-war'),
    zip=require('gulp-zip'),
    browserSync=require('browser-sync'),
    pump = require('pump'),
    babelify = require('babelify'),
    lib    = require('bower-files')(),
    path = require('path'),
    babel = require('gulp-babel'),
    mainBowerFiles = require('main-bower-files'),
    sourcemaps=require('gulp-sourcemaps'),
    browserify=require('gulp-browserify'),
    filter = require('gulp-filter'),
    fs = require('fs'),
    prettify = require('gulp-html-prettify');
    beautify = require('gulp-beautify');
    autoprefixer = require('gulp-autoprefixer');

gulp.task('beautify', function() {
    gulp.src('./src/controllers/*.js')
        .pipe(beautify({indent_size: 3}))
        .pipe(gulp.dest('./src/controllers/'))
});
gulp.task('htmlbeautify', function() {
  gulp.src('./src/views/*.html')
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./src/views/'))
});

var config ={
    paths:{
        src:'./src',
        build:'./build',
        bower:'./bower_components'
    }
};

gulp.task('clean',function () {
    return gulp.src(config.paths.build,{read:false})
        .pipe(clean());
});

gulp.task('inject',function () {
    var cssFiles=gulp.src([
        config.paths.src+'/**/*.css'
    ],{read:false});
    var jsFiles=gulp.src([
        config.paths.src+'/app/**/*.js'
    ]);

    return gulp.src(config.paths.src+'/index.html')
        .pipe(inject(gulp.src(bower(),{read:false}),{name:'bower'}))
        .pipe(inject(cssFiles,{ignorePath:'src',addRootSlash: false}))
        .pipe(inject(jsFiles.pipe(angularFilesort()).pipe(angularFilesort()),{ignorePath:'src',addRootSlash: false}))
        .pipe(gulp.dest(config.paths.build));
});
gulp.task('js', function () {
    gulp.src(config.paths.src+'/app/controllers/uploadFileController.js')
        .pipe(browserify({
            transform: ['babelify'],
        }))
        .pipe(gulp.dest('./public/js'))
});
gulp.task('serve',['inject'],function () {
    browserSync.init({
        server:{
            baseDir:[config.paths.build,config.paths.bower,config.paths.src],
            routes: {
                "/bower_components": "bower_components",
            }
        },
        files:[
            config.paths.src+'/**'
        ]
    });
});

gulp.task('minifyCss',function () {
    var appStyles=gulp.src(config.paths.src+'/app/views/styles/**/*.css')
        .pipe(concat('app.min.css'))
      //  .pipe(cleanCss({debug:true}))

        .pipe(cleanCss({debug:true,compatibility:'ie8'}))
        .pipe(gulp.dest(config.paths.build+'/style'));
    var filtercss =filter('**/*.css', { restore: true });
    var vendorStyles=gulp.src(config.paths.bower)
        .pipe(bowerFiles())
        .pipe(filtercss)
        .pipe(concat('vendor.min.css'))
        .pipe(cleanCss({debug:true,compatibility:'ie8'}))
        .pipe(filtercss.restore)
        .pipe(gulp.dest(config.paths.build+'/style'));
    return merge(vendorStyles,appStyles);
});


var localConfig = {
    buildSrc: './build/**/*'
};
gulp.task('minifyJs',function () {

    var filterJS =filter('**/*.js', { restore: true });
    var vendorScripts=gulp.src('./bower.json')
        .pipe(bowerFiles())
        .pipe(filterJS)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(gulp.dest(config.paths.build+'/scripts'));

    var appScripts=gulp.src(config.paths.src+'/app/**/*.js')
        .pipe(angularFilesort())
        .pipe(angularFilesort())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.build+'/scripts'));
    return merge(vendorScripts,appScripts);
});

function convertFile(file) {
    var ext = path.extname(file);
    var min = file.substr(0, file.length - ext.length);
    min += '.min' + ext;
    return fs.existsSync(min) ? min : file;
}
gulp.task('htmls',function () {
    return gulp.src([config.paths.src+'/app/views/**/*.html','!'+config.paths.src+'/index.html'])
        .pipe(gulp.dest(config.paths.build));
});
gulp.task('docs',function () {
    return gulp.src([config.paths.src+'/app/views/docs/*.pdf'])
        .pipe(gulp.dest(config.paths.build+'/docs'));
});

gulp.task('fonts',function () {
    var bower_fonts= gulp.src(bower())
        .pipe(filter(['**/*.{eat,svg,ttf,woff,woff2}']))
        .pipe(gulp.dest(config.paths.build+'/fonts'));
    var template_fonts= gulp.src(config.paths.src)
        .pipe(filter(['**/*.{eat,svg,ttf,woff,woff2}']))
        .pipe(gulp.dest(config.paths.build+'/fonts'));
    return merge(bower_fonts,template_fonts);
});
gulp.task('images',function () {
    return gulp.src(config.paths.src+'/app/views/images/**/*.{jpg,png,svg}')
        .pipe(gulp.dest(config.paths.build+'/images'));
});
gulp.task('other',function () {
    return gulp.src([config.paths.src+'**/*.*','!**/*.html','!**/*.css','!**/*.js'])
        .pipe(gulp.dest(config.paths.build));
});
gulp.task('war', function () {
    gulp.src(["build/*"])
        .pipe(war({
            welcome: 'src/index.html',
            displayName: 'Grunt WAR',
        }))
        .pipe(zip('myApp.zip'))
        .pipe(gulp.dest(config.paths.build));

});
gulp.task('build',['minifyCss','minifyJs','htmls','images','fonts','other','docs'],function () {
    var vendorFiles=gulp.src([
        config.paths.build+'/style/vendor.min.css',
        config.paths.build+'/scripts/vendor.min.js',
    ],{read:false});
    var appFiles=gulp.src([
        config.paths.build+'/style/app.min.css',
        config.paths.build+'/scripts/app.min.js',
    ],{read:false});
    return gulp.src(config.paths.src+'/index.html')
        .pipe(inject(vendorFiles,{name:'vendor',ignorePath:'build',addRootSlash: false}))
        .pipe(inject(appFiles,{name:'app',ignorePath:'build',addRootSlash: false}))
        .pipe(gulp.dest(config.paths.build));
});

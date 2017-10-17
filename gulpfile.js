var gulp           = require('gulp'),
		gutil          = require('gulp-util'),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		rsync          = require('gulp-rsync'),
		bourbon 			 = require('node-bourbon'),
		pug 					 = require('gulp-pug'),
		plumber				 = require('gulp-plumber'),
		svgmin				 = require('gulp-svgmin'),
		svgstore			 = require('gulp-svgstore'),
		watch					 = require('gulp-watch'),
		svgo 					 = require('gulp-svgo'),
		babel 				 = require('gulp-babel');


gulp.task('symbols', function() {
	return gulp.src('app/img/icons/*.svg')
	.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))
	.pipe(svgo({
		plugins: [{
			removeStyleElement: true
		},{
			removeScriptElement: true
		},{
			removeAttrs: true
		},{
			removeUnusedNS: true
		},{
			removeUnknownsAndDefaults: true
		},{
			removeHiddenElems: true
		},{
			removeXMLNS: true
		},{
			cleanupAttrs: true
		},{
			removeAttrs: {
				attrs: ['id', 'class']
			}
		},{
			cleanupNumericValues: true
		},{
			convertTransform: true
		},{
			convertPathData: true
		},{
			removeEmptyText: true
		},{
			cleanupListOfValues: true
		},{
			sortAttrs: true
		},{
			transformsWithOnePath: true
		}]
	}))
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename('sprite.pug'))
	.pipe(gulp.dest('app/mixins'))
});

gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	.pipe(babel({presets: ['es2015']}))
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/svg4everybody/svg4everybody.min.js',
		'app/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './build'
		},
		notify: false,
		open: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand', includePaths: require('node-bourbon').includePaths}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('pug', function() {
	return gulp.src('app/*.pug')
	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('./build/'))
	.on('end', browserSync.reload)
});

gulp.task('watch', ['sass', 'js', 'pug', 'browser-sync'], function() {
	gulp.watch(['app/blocks/**/*.sass', 'app/sass/**/*.sass'], ['sass']);
	gulp.watch(['app/*.pug', 'app/blocks/**/*.pug', 'app/settings/settings.pug', 'app/mixins/*.pug'], ['pug']);
	gulp.watch(['app/libs/**/*.js', 'app/js/common.js'], ['js']);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('./build/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'rffensick.ru',
		user:      'ilyaskkq_rffensick',
		password:  '1998edya',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'./build/**',
	'./build/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('barbershop'));

});

gulp.task('rsync', function() {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		archive: true,
		silent: false,
		compress: true
	}));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);

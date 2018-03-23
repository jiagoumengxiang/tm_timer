var gulp = require('gulp');
var connect=require("gulp-connect");

gulp.task('hrframe',function(){
    gulp.src(["web/*","web/**/*"])
        .pipe(gulp.dest('dist/'));
    gulp.src(["src/*","src/**/*"])
        .pipe(gulp.dest('dist/app'));
    gulp.src(["doc/*","doc/**/*"])
        .pipe(gulp.dest('dist/doc'));
});

gulp.task('watch',function() {
    gulp.watch(['src/*','src/**/*','web/*','web/**/*','doc/*',"doc/**/*"], ['hrframe']);
});

gulp.task('server', function(done) {
    connect.server({
        root:'dist',
        livereload:false,
        middleware: function(connect, opt) {
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    });
});

gulp.task("default",['hrframe','watch','server']);

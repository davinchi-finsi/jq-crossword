const gulp = require('gulp');
const rollup = require('rollup');
const rollupConfig = require('./rollup.config');
const rimraf = require("rimraf");
const chalk = require('chalk');
const sass = require('gulp-sass');
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
/*Clean dist folders*/
gulp.task("clean",()=>{
    rimraf.sync("dist");
    rimraf.sync("esm2015");
});
/*Copy raw files*/
gulp.task("copy",()=>{
    gulp.src("./src/jquery-ui-deps.js")
        .pipe(gulp.dest("./esm2015/"))
});
/*Rollup*/
gulp.task('rollup', async function () {
    const onwarn=({ loc, frame, message })=>{
        // print location if applicable
        if (loc) {
            console.warn(chalk.red(`${loc.file} (${loc.line}:${loc.column}) ${message}`));
            if (frame) console.warn(chalk.yellow(frame));
        } else {
            console.warn(chalk.yellow(message));
        }
    };
    for(let config of rollupConfig){
        console.time(config.output.file);
        config.onwarn=onwarn;
        const bundle = await rollup.rollup(config);
        console.log(chalk.blue(`${config.input} -> ${config.output.file}`));
        await bundle.write(config.output);
        console.timeEnd(config.output.file);
    }
});
/*Styles*/
gulp.task('sass', function () {
    return gulp.src([
        '!./src/styles/crossword.theme.scss',
        './src/styles/*.scss'
    ],{base: "./src/styles" })
        .pipe(sass({
            outputStyle: 'expanded',
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('esm2015'))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${chalk.blue("Minimized")}: ${details.name} ${chalk.blue(details.stats.originalSize)} -> ${chalk.blue(details.stats.minifiedSize)}`);
            if(details.errors.length > 0){
                for(let error of details.errors) {
                    console.log(chalk.red(error));
                }
            }
            if(details.warnings.length > 0){
                for(let warn of details.warnings){
                    console.log(chalk.orange(warn));
                }
            }
        }))
        .pipe(rename({
            suffix:".min",
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('esm2015'))
});
/*Build*/
gulp.task("build",["clean","sass","copy","rollup"]);
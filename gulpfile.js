const gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglifyes    = require('uglify-es'),
    composer    = require('gulp-uglify/composer'),
    uglify      = composer(uglifyes, console), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    del         = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin    = require('gulp-imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    autoprefixer = require('gulp-autoprefixer'); // Подключаем библиотеку для автоматического добавления префиксов

let build = { // Переменные для перемещения в prodaction
   'html': 'src/index.html',
   'css': 'src/css/main.css',
   'js': 'src/js/main.js',
   'img': ['src/images/**/*.*', '!src/image/other'],
   'icons': 'src/images/other',
   'fonts': 'src/fonts/**/*.ttf'
},
    raw = { // Переменные для прелбразования
      'scss': 'src/scss/**/*.scss',
       'css': [
           'src/fonts/fonts.css',
           'src/css/zeroing.css',
           'src/css/style.css'
       ],
       'js': [
           'node_modules/jquery/dist/jquery.min.js',
           'src/js/basket.js',
           'src/js/good.js',
           'src/js/index.js'
       ]
    },
    destDew = {
      'css': 'src/css',
       'js': 'src/js'
    };

// Development

// Обработка scss файлов

gulp.task('sass', function(){ // Создаем таск Sass
   return gulp.src(raw.scss) // Берем источник
       .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
       .pipe(gulp.dest(destDew.css)) // Выгружаем результата в папку src/css
});

// Конкатенация, добавление префиксрв и минимизация css файлов в main.css

gulp.task('concatCss', function () {
   return gulp.src(raw.css)
       .pipe(concat('main.css')) // Создаем файл main.css
       .pipe(autoprefixer()) // Добавление префиксов
       .pipe(cssnano()) // Минифицируем css
       .pipe(gulp.dest(destDew.css))
});

// Конкатенация js фалов в main.js

gulp.task('concatJs', function() {
   return gulp.src(raw.js) // Берем все необходимые библиотеки
       .pipe(concat('main.js')) // Собираем их в кучу в новом файле main.js
       .pipe(uglify()) // Сжимаем JS файл
       .pipe(gulp.dest(destDew.js)); // Выгружаем в папку src/js
});

// Создаем web-сервер

gulp.task('browser-sync', function() { // Создаем таск browser-sync
   browserSync({ // Выполняем browser Sync
      server: { // Определяем параметры сервера
         baseDir: 'src' // Директория для сервера - src
      },
      notify: false // Отключаем уведомления
   });
});

// Перезагрузка страницы

gulp.task('reload', function () {
   return gulp.src(build.html) // Отправляем в перезагрузку index.html
       .pipe(browserSync.reload({ stream: true }))
});

// Отслеживание изменения в файлах

gulp.task('watch', function() {
   gulp.watch([build.html, build.css, build.js], gulp.parallel('reload')); // Наблюдение за HTML, css, js и перезапуск

   gulp.watch(raw.scss, gulp.parallel('sass')); // Наблюдение за sass файлами
   gulp.watch(raw.css, gulp.parallel('concatCss')); // Наблюдение за css файлами
   gulp.watch(raw.js, gulp.parallel('concatJs')); // Наблюде за библиотеками js

});

// Запуск по default

gulp.task('default',
    gulp.series(
      gulp.parallel(
        'concatJs',
        gulp.series('sass', 'concatCss')
      ),
      gulp.parallel('browser-sync', 'watch')
    ));

// Prodaction

// Очистка папки dist

gulp.task('clean', function() {
   return del.sync(['dist/**/*.*', '!dist/img']); // Удаляем папку dist перед сборкой
});

// Перемещение в dist

gulp.task('move', function () {
    gulp.src(build.html)
        .pipe(gulp.dest('dist'));
    gulp.src(build.css)
        .pipe(gulp.dest('dist'));
    gulp.src(build.js)
        .pipe(gulp.dest('dist'));
    gulp.src(build.fonts)
        .pipe(gulp.dest('dist'));
});

// Оптимизация и перенос изображений

gulp.task('buildimg', function () {
   gulp.src(build.img)
       .pipe(imagemin([imageminMozjpeg({
           quality: 85,
           progressive: true
       })]))
       .pipe(gulp.dest('dist/img'));
   gulp.src(build.icons)
       .pipe(imagemin([imageminMozjpeg({
           quality: 85,
           progressive: false
       })]))
       .pipe(gulp.dest('dist/img'));
});

// Сборка проекта

gulp.task('build', gulp.series(gulp.parallel('clean', 'concatJs', gulp.series('sass', 'concatCss')), 'move'));
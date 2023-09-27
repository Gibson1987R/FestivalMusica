//todo llamar desde el package.json al gulpfile, const name = require('script')

//* Estas extensiones son de CSS
const { src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass')) //! Requiere instalar gulp-sass para conectar
const plumber = require('gulp-plumber')

//*Esta extensiones son de IMAGENES
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function imagenes(done) {
  const options = {
    optimazationLevel: 3,
  }
  src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(options)))
    .pipe(dest('build/img'))
  done()
}

function versionWebp(done) {
  const options = {
    quality: 50,
  }
  src('src/img/**/*.{png,jpg}')
    .pipe(webp(options))
    .pipe(dest('build/img'))
  done()
}
function versionAvif(done) {
  const options = {
    quality: 50,
  }
  src('src/img/**/*.{png,jpg}')
    .pipe(avif(options))
    .pipe(dest('build/img'))
  done()
}

//* Los pasos a hacer dentro de la funcion:
function css(done) {
  src('src/scss/**/*.scss') // 1 identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) // 2 Complilarlo
    .pipe(dest('build/css')) // 3 Almacenarl o

  done() // Callback que avisa a gulp cuando llegamos al final
}

function dev(done) {
  watch('src/scss/**/*.scss', css)
  done()
}
exports.imagenes = imagenes
exports.css = css
exports.versionWebp = versionWebp
exports.versionAvif = versionAvif
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev)

//TODO para llamar esto desde node utilizamos npx gulp tarea; mientras que si usamos package.json es npm run tarea

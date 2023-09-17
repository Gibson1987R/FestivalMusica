//todo llamar desde el package.json al gulpfile, const name = require('script')
const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass')) //! Requiere instalar gulp-sass para conectar

//* Los pasos a hacer dentro de la funcion:
function css(done) {
  src('src/scss/**/*.scss') // 1 identificar el archivo SASS
    .pipe(sass()) // 2 Complilarlo
    .pipe(dest('build/css')) // 3 Almacenarlo

  done() // Callback que avisa a gulp cuando llegamos al final
}

function dev(done) {
  watch('src/scss/**/*.scss', css)
  done()
}
exports.css = css
exports.dev = dev

//TODO para llamar esto desde node utilizamos npx gulp tarea; mientras que si usamos package.json es npm run tarea

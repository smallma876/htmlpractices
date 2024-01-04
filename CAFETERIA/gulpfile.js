// colocando este requiere("gulp")estamos extrayendo o importando lo que hemos instalando como las
//dos dependencias que instalamos (sass) y (gulp-sass) se almacenan en el package.jason "gulp-sass": "^5.1.0",
// "sass": "^1.69.5" y para usarlos en el gulpfile.js se importaran con requiere 

// src es una funcion de gulp que te permite identificar que archivo vamos a compilar , se usa dentro de la funcion de gulp 
// dest es una funciom de gulp que te permite indicar el destino donde se creara la carpeta de css
const { src, dest, watch, series, parallel } = require("gulp"); //cuando veas las llaves {} significa que esta dependencia (gulp) exporta multiples funciones,este gulp exporta multiples funciones


// CSS Y SASS

// para compilar hay que importar SASS Y GULP-SASS
const sass = require("gulp-sass")(require("sass")); // aqui el sass despues de const no tiene llaves significa que solo exporta una funcion que es compilas la hoja de estilos 
const postcss = require ("gulp-postcss");
const autoprefixer = require("autoprefixer");

const imagemin = require("gulp-imagemin");  // llamamos la dependencia imagemin que instalamos y la aplicamos en la tarea que creamos con el nomnbre imagenes 
const webp = require("gulp-webp");
const avif = require("gulp-avif");
//CREAMOS UNA TAREA PARA PASAR LAS IMAGENES DENTRO DE BUILD


//se debe utilizar en la tarea de css y se utiliza en un pipe antes de comenzar a compilar el sass y antes de almacenarlo en el dest 
const sourcemaps = require("gulp-sourcemaps");

// para mejorar y simplificars nuestro archivo css(reduce el peso del archivo, etc)
const cssnano = require("cssnano");


function imagenes(done){
    src("src/img/**/*")  // aqui indicamos con los asterisctos que cargue todos los archivos de la carpeta imagen
        .pipe(imagemin({ optimizationLevel:3 })) // es importante el orden en el que ponemos los pipes, agreamos la funcion optimazationlevel para reducir el tamaño en mb de las imagenes
        .pipe(dest("build/img"));     // aqui indicamos a donde se iran esas imagenes "build"
 
        done();
}

function versionWebp(done){       // el nombre despues de la funcion lo decidimos nosotros
    src("src/img/**/*.{png,jpg}")  // aqui indicamos que ubique a todas las imagene png y jpg dentro de la carpeta img ya que los demas formatos con svg ya son de poco mb
        .pipe(webp())   // aqui aplicamos la dependecia que trajimos "webp" y lo convierta a este formato
        .pipe(dest("build/img"))  // indicamos donde se guardara las nuebas imagenes

        done();
}

function versionAvif(){
    const opciones ={                   // opciones de avif que se puedne aplicar tamnien en webp va del 0 al 100 por default viene en 90 
        quality:50                      // con "50" estarías comprimiendo la imagen con un nivel de calidad más bajo, lo que generaría archivos más pequeños pero con una potencial pérdida de detalles visuales en comparación con una configuración de quality: 90
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"))
}


function css( done ){  
    //compilar sass
    //pasos :1 - identificar archivo(saber que hoja de estilos de sass vamos a compilar) 2 - compilarla , 3 - guardar el .css
    //la forma en que iras definiendo estos pasos sera por medio de los pipes de gulp 
    //gulp es un herramienta enfocada en este tipo de tarea repetitivas, una de estar es compilar sass ya que estos 3 pasos lo 
    //hace todo el tiempo, para hay una api que trabaja con estos escenarios
    
    src("src/scss/app.scss")                   // identifico la hoja de estilo 
        .pipe( sourcemaps.init() )
        .pipe( sass() )                        // compilo mi hoja de estilos     //definimos objetos con las llaves dentro de la funcion de sass // con outputstyle puedo indicar como mostrarme las propiedades y valores en hoja de estilo css
        .pipe( postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write("."))
        .pipe( dest("build/css") )             // guardo mi hoja de estilo 
    
    done();         // done es una funcion que se manda a llamar cuando llega a esta linea y gulp entiende que aqui finaliza la tarea

}

function dev(){       // funcion desarrollo 
    watch("src/scss/**/*.scss", css);
    watch("src/img/**/*", imagenes)    // si se agregan o se quitan imagenes se manda a llamar esa tarea de imagenes

}

//TAREAS POR DEFULT
//se utilizan tambien para realizar multiples tareas al mismo tiempo con
//2 funciones mas de gulp que agregaremos SERIES PARALLEL

exports.css = css;   // con exports mandamos a llamar a esta tarea 
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp
exports.versionAvif = versionAvif
exports.default = series( css, dev)

//series - ejecuta la primerta tarea, la completa y pasa ala siguiente tarea 
//parallel - todas inician al mismpo tiempo



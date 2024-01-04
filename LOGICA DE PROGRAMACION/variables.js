let edad    // declaramos la variable edad con let o var

edad = 43   // asignamos un valor ala variable

console.log(edad)   // obtenemos el valor de la variable en la consola

console.log("el siguiente años vas a tener" , edad + 1)


let nombre

nombre = "luis mallma chavez"

console.log("hola" , nombre)


// OPERADORES MATEMATICOS

let primera
let segunda

primera = 12
segunda = 1

console.log(primera + segunda)


let ingresos
let gastos 
let cambio 

ingresos = 100
gastos = 50

cambio = ingresos - gastos

console.log( cambio)

console.log()


let porciones
let hijos
let porcionesCadaHijo

porciones = 8
hijos = 3
sobrante = porciones % hijos   // simbolo % no arrojara en la consola la cantidad restante de la diviision  


// OPERADORES DE ASIGNACION

let alumnos 
alumnos = 25

alumnos = alumnos + 1


// OPERADORES DE COMPARACION

const edad = 15;
const mayoriaDeEdad = 18;

const esMayor = edad > mayoriaDeEdad ;

console.log(esMayor)  //siempre que guarde la ejecucion de una comparaion si o si me devueve un true o false


// se utiliza const para valores que son constantes, no puedes cambiar el valor de una variable que has declarado const


// OPERADORES LOGICOS
// son los que nos dicen puede pasar "esto O esto" y tambien estan los que dicen que tiene que pasar "esto Y esto"


let edad = 25;
let genero = "F";
const mayoriaDeEdad = 18;

const esMayor = edad >= mayoriaDeEdad;
const esMujer = genero == "F";              // para comparar con el igual se debe poner doble o triple =

const puedeEntrar = mayoriaDeEdad && esMujer;  // el doble & indica Y 

console.log(puedeEntrar);



let edad = 50;
let genero = "F";
const mayoriaDeEdad = 50;

const esMayor = edad >= mayoriaDeEdad;
const esMujer = genero == "f";

const puedeEntrar = esMAyor || esMujer  // el doble | indica "O" 

console.log(puedeEntrar)


//Variables utilizadas
var movimiento;
let i = 5; //número de columna
let j = 5; //número de fila

var historialMovimientos = [];
var longitudViborita = 1;

var viborita;
var esComida = [];

var milisegundos = 1000;
let aumentarVelocidad = false;

//Detecta la tecla presionada y llama a la función de movimiento correspondiente
window.addEventListener('keyup', handleGame, false);

function handleGame(e) {
    let evento = e.keyCode;
    if (evento === 40) {
        moveDown();
    } else if (evento === 39) {
        moveRight();
    } else if (evento === 37) {
        moveLeft();
    } else if (evento === 38) {
        moveUp();
    };
};

function moveDown() {
    clearInterval(movimiento);//Elimina intervalo preexistente para cambiarde dirección
    dificultad();
    movimiento = setInterval(function movimiento() {
        if (j + 1 === 11) {//Se encarga de incrementar el tamaño de la viborita
            if (document.getElementById('1-' + i).classList.contains('comida')) {
                longitudViborita++;
                document.getElementById('1-' + i).classList.remove('comida');
                esComida.pop();
            }
        } else {
            if (document.getElementById((j + 1) + '-' + i).classList.contains('comida')) {
                longitudViborita++;
                document.getElementById((j + 1) + '-' + i).classList.remove('comida');
                esComida.pop();
            };
        };
        j++;
        j > 10 ? j = 1 : j = j;//Evita que el juego se detenga al llegar a un borde
        historialMovimientos.push(j + '-' + i);
        viborita = historialMovimientos.slice(longitudViborita * (-1));
        viboritaPintada();
        if (!comidaDisponible()) {//Repone 'comida' de ser necesario; evita que se generen dos o más simultáneamente
            comida();
        };
    }, milisegundos, false);
    return i, j;
};
function moveRight() {
    clearInterval(movimiento);
    dificultad();
    movimiento = setInterval(function movimiento() {
        if (i + 1 === 11) {
            if (document.getElementById(j + '-1').classList.contains('comida')) {
                longitudViborita++;
                document.getElementById(j + '-1').classList.remove('comida');
                esComida.pop();
            }
        } else {
            if (document.getElementById(j + '-' + (i + 1)).classList.contains('comida')) {
                longitudViborita++;
                document.getElementById(j + '-' + (i + 1)).classList.remove('comida');
                esComida.pop();
            };
        };
        i++;
        i > 10 ? i = 1 : i = i;
        historialMovimientos.push(j + '-' + i);
        viborita = historialMovimientos.slice(longitudViborita * (-1))
        viboritaPintada();
        if (!comidaDisponible()) {
            comida();
        };
    }, milisegundos, false);
    return i, j;
};
function moveLeft() {
    clearInterval(movimiento);
    dificultad();
    movimiento = setInterval(function movimiento() {
        if (i - 1 === 0) {
            if (document.getElementById(j + '-10').classList.contains('comida')) {
                longitudViborita++;
                document.getElementById(j + '-10').classList.remove('comida');
                esComida.pop();
            }
        } else {
            if (document.getElementById(j + '-' + (i - 1)).classList.contains('comida')) {
                longitudViborita++;
                document.getElementById(j + '-' + (i - 1)).classList.remove('comida');
                esComida.pop();
            };
        };
        i--;
        i < 1 ? i = 10 : i = i;
        historialMovimientos.push(j + '-' + i);
        viborita = historialMovimientos.slice(longitudViborita * (-1));
        viboritaPintada();
        if (!comidaDisponible()) {
            comida();
        };
    }, milisegundos, false);
    return i, j;
};
function moveUp() {
    clearInterval(movimiento);
    dificultad();
    movimiento = setInterval(function movimiento() {
        if (j - 1 === 0) {
            if (document.getElementById('10-' + i).classList.contains('comida')) {
                longitudViborita++;
                document.getElementById('10-' + i).classList.remove('comida');
                esComida.pop();
            }
        } else {
            if (document.getElementById(j - 1 + '-' + i).classList.contains('comida')) {
                longitudViborita++;
                document.getElementById(j - 1 + '-' + i).classList.remove('comida');
                esComida.pop();
            };
        };
        j--;
        j < 1 ? j = 10 : j = j;
        historialMovimientos.push(j + '-' + i);
        viborita = historialMovimientos.slice(longitudViborita * (-1));
        viboritaPintada();
        if (!comidaDisponible()) {
            comida();
        };

    }, milisegundos, false);
    return i, j;
};

function viboritaPintada() {//Se encarga de que sólo las casillas que componen laviborita se vean en color negro
    for (let l = 0; l < historialMovimientos.length; l++) {
        document.getElementById(historialMovimientos[l]).classList.remove('viborita');
        document.getElementById(historialMovimientos[l]).style.backgroundColor = 'white';
    }
    for (let k = 0; k < viborita.length; k++) {
        if (document.getElementById(viborita[viborita.length - 1]).classList.contains('viborita')) {//Verifica que la viborita no 'se coma' a sí misma
            alert('Perdiste \nLongitud: ' + viborita.length);
            location.reload();
        } else {
            document.getElementById(viborita[k]).style.backgroundColor = 'black';
            document.getElementById(viborita[k]).classList.add('viborita');
        }

    };
};

function comida() {//Genera la 'comida' en un lugar aleatorio del tablero
    let comidaI = Math.floor(Math.random() * 10);
    let comidaJ = Math.floor(Math.random() * 10);
    if (comidaI > 0 && comidaJ > 0) {
        document.getElementById(comidaJ + '-' + comidaI).classList.add('comida');
        esComida.push(comidaJ + '-' + comidaI);
    } else {//En caso de que el número de fila o de columna sea 0; filas y columnas están numeradas a partir de 1
        let options = ['1-1', '5-5', '10-10', '3-7', '9-8', '6-10', '10-6', '5-3', '7-1', '2-1'];
        let rndm = Math.floor(Math.random() * 9);
        document.getElementById(options[rndm]).classList.add('comida');
        esComida.push(options[rndm]);
    };
};

function comidaDisponible() {//Verifica si hay comida generada
    let isTrue;
    if (esComida.length > 0) {
        isTrue = true;
    } else {
        isTrue = false;
    };
    return isTrue;
};

function dificultad() {//Aumenta la velocidad de movimiento (con tiempo del intervalo) de acuerdo a la longitud de la viborita
    if (longitudViborita > 5 && longitudViborita < 10 && !aumentarVelocidad) {
        aumentarVelocidad = true;
        milisegundos = Math.floor(milisegundos - milisegundos / 10);
    } else if (longitudViborita === 10 && aumentarVelocidad) {
        aumentarVelocidad = false;
    } else if (longitudViborita > 10 && longitudViborita < 20 && !aumentarVelocidad) {
        aumentarVelocidad = true;
        milisegundos = Math.floor(milisegundos - milisegundos / 10);
        milisegundos = Math.floor(milisegundos - milisegundos / 10);
    } else if (longitudViborita === 20 && aumentarVelocidad) {
        aumentarVelocidad = false;
    } else if (longitudViborita > 20 && longitudViborita < 35 && !aumentarVelocidad) {
        aumentarVelocidad = true;
        milisegundos = Math.floor(milisegundos - milisegundos / 10);
    } else if (longitudViborita === 35 && aumentarVelocidad) {
        aumentarVelocidad = false;
    } else if (longitudViborita > 35 && longitudViborita < 55 && !aumentarVelocidad) {
        aumentarVelocidad = true;
        milisegundos = Math.floor(milisegundos - milisegundos / 10);
    } else if (longitudViborita === 55 && aumentarVelocidad) {
        aumentarVelocidad = false;
    } else if (longitudViborita > 55 && longitudViborita < 80 && !aumentarVelocidad) {
        aumentarVelocidad = true;
        milisegundos = Math.floor(milisegundos - milisegundos / 10);
    } else if (longitudViborita === 80 && aumentarVelocidad) {
        aumentarVelocidad = false;
    } else if (longitudViborita > 80 && longitudViborita < 100 && !aumentarVelocidad) {
        aumentarVelocidad = true;
        milisegundos = Math.floor(milisegundos - milisegundos / 10);
    } else if (longitudViborita === 100) {//Se gana cuando se completa el tablero
        alert('¡Felicitaciones, has ganado!')
        location.reload();
    };
};
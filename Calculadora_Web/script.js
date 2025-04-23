// Seleccionar elementos
const pantalla = document.getElementById('pantalla');
const botones = document.querySelectorAll('.botones button');

let operacionActual = '';
let operacionAnterior = '';
let operador = null;

// Función para actualizar la pantalla
function actualizarPantalla(valor) {
    pantalla.textContent = valor;
}

// Función para manejar los clics en los botones
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;

        if (!isNaN(valor) || valor === '.') {
            // Si es un número o un punto decimal
            operacionActual += valor;
            actualizarPantalla(operacionActual);
        } else if (valor === 'C') {
            // Limpiar la pantalla
            operacionActual = '';
            operacionAnterior = '';
            operador = null;
            actualizarPantalla('0');
        } else if (valor === '=') {
            // Calcular el resultado
            if (operacionAnterior && operacionActual && operador) {
                operacionActual = calcular(operacionAnterior, operacionActual, operador);
                operacionAnterior = '';
                operador = null;
                actualizarPantalla(operacionActual);
            }
        } else {
            // Si es un operador (+, -, x, /)
            if (operacionActual) {
                if (operacionAnterior) {
                    operacionAnterior = calcular(operacionAnterior, operacionActual, operador);
                } else {
                    operacionAnterior = operacionActual;
                }
                operacionActual = '';
            }
            operador = valor === 'x' ? '*' : valor; // Reemplazar 'x' por '*'
            actualizarPantalla(operacionAnterior);
        }
    });
});

// Función para realizar cálculos
function calcular(num1, num2, operador) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (operador) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return b !== 0 ? (a / b).toString() : 'Error';
        default:
            return '0';
    }
}
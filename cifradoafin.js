function cifrartexto() {
    var texto = document.getElementById("textoacifrar").value;
    var a = parseInt(document.getElementById("valor_a").value);
    var b = parseInt(document.getElementById("valor_b").value);
    if (texto === "" || a === "" || b === "") {
        alert("Por favor, llene todos los espacios.");
        return false; // Detener la ejecución si hay campos vacíos
    }
    var abecedario = [
        ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        [0, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
        []
    ];

    var mcd = calcularMCD(a, 27);

    if (mcd === 1) {
        for (var i = 0; i < abecedario[1].length; i++) {
            abecedario[2][i] = (a * abecedario[1][i] + b) % 27;
        }
        texto = removerTildes(texto)
        texto = texto.toUpperCase();
        generarBarras(texto)
        var cifrado = [];

        for (i = 0; i < texto.length; i++) {
            var letra = texto.charAt(i);

            // Buscar la letra en la primera fila de la matriz
            var columna = abecedario[0].indexOf(letra);

            // Si la letra se encuentra en la matriz, agregar el valor correspondiente a la variable 'nuevoTexto'
            if (columna !== -1) {
                cifrado.push(abecedario[2][columna]);
            } else {
                // Si la letra no se encuentra, puedes decidir cómo manejar este caso
                // Por ejemplo, podrías agregar la misma letra al 'nuevoTexto' o simplemente dejarlo en blanco
                cifrado.push('-');
            }
        }
        columna = "";
        // Inicializar la variable para almacenar el resultado final
        var textofinal = "";

        // Recorrer el 'nuevoTexto' letra por letra
        for (i = 0; i < cifrado.length; i++) {
            var letraNuevoTexto = cifrado[i];
            // Buscar la letra en la segunda fila de la matriz
            columna = abecedario[1].indexOf(letraNuevoTexto);
            // Si la letra se encuentra en la matriz, agregar el valor correspondiente a la variable 'textofinal'
            if (columna !== -1) {
                textofinal += abecedario[0][columna];
            } else {
                // Si la letra no se encuentra, puedes decidir cómo manejar este caso
                // Por ejemplo, podrías agregar la misma letra al 'textofinal' o simplemente dejarlo en blanco
                textofinal += ' ';
            }
        }
        var resultadoTextarea = document.getElementById("resultadoTexto");
        resultadoTextarea.value = textofinal; // textofinal es el texto cifrado
        return true;
    } else {
        alert("El número ingresado para 'a' no cumple con los requisitos.");
        return false; // 'a' no es coprimo de 27
    }

}
function removerTildes(texto) {
    const tildes = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
    };

    return texto.replace(/[áéíóúÁÉÍÓÚñÑ]/g, letra => tildes[letra] || letra);
}

function calcularFrecuencias(texto) {
    const frecuencias = new Map();
    const textoSinEspacios = texto.replace(/\s/g, '').toUpperCase();

    for (const letra of textoSinEspacios) {
        if (frecuencias.has(letra)) {
            frecuencias.set(letra, frecuencias.get(letra) + 1);
        } else {
            frecuencias.set(letra, 1);
        }
    }

    const sortedFrecuencias = [...frecuencias.entries()]
        .sort((a, b) => b[1] - a[1]);

    return sortedFrecuencias;
}

function generarBarras(texto) {
    const canvas = document.getElementById('barrasCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const frecuencias = calcularFrecuencias(texto);

    const barWidth = 60;
    const chartHeight = 160;
    const spacing = 20;
    let x = spacing;

    const maxFrecuencia = frecuencias[0][1]; // Frecuencia de la letra con mayor frecuencia
    const padding = 30; // Espacio entre la parte superior del contenedor y la parte superior de las barras

    for (const [letra, frecuencia] of frecuencias) {
        const barHeight = (frecuencia / maxFrecuencia) * (chartHeight - padding);
        const y = chartHeight - barHeight;

        ctx.fillStyle = 'lightgreen';
        ctx.fillRect(x, y, barWidth, barHeight);

        ctx.fillStyle = 'black';
        ctx.fillText(letra, x + barWidth / 2 - 5, y + barHeight + 15);

        // Ajustar la posición del valor numérico
        if (frecuencia.toString().length > 1) {
            ctx.fillText(frecuencia, x + barWidth / 2 - 10, y - 10);
        } else {
            ctx.fillText(frecuencia, x + barWidth / 2 - 5, y - 5);
        }

        x += barWidth + spacing;
    }
}
function calcularMCD(x, y) {
    while (y !== 0) {
        var temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}
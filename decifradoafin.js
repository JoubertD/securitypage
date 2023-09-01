function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1;
}

// Función para descifrar usando el cifrado afín
function afinDecrypt(text, a, b) {
    text = removerTildes(text)
    text = text.toUpperCase();
    generarBarras(text)
    const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    const m = alphabet.length;
    const aInverse = modInverse(a, m);
    let decryptedText = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            const decryptedIndex = (aInverse * (index - b + m)) % m;
            decryptedText += alphabet[decryptedIndex];
        } else {
            decryptedText += char;
        }
    }

    return decryptedText;
}

// Función para realizar el descifrado al hacer clic en el botón "Decifrar"
function decifrado() {
    const texto = document.getElementById('textoadecifrar').value;
    const a = parseInt(document.getElementById('a_decifrar').value);
    const b = parseInt(document.getElementById('b_decifrar').value);

    const resultadoDecifrado = afinDecrypt(texto, a, b);

    const resultadoTextarea = document.getElementById('resultadodecifrar');
    resultadoTextarea.value = resultadoDecifrado;
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
    const canvas = document.getElementById('barrasdecifrarCanvas');
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
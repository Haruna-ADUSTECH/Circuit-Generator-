function generateCircuit() {
    const R = document.getElementById('resistor').value;
    const C = document.getElementById('capacitor').value;
    const L = document.getElementById('inductor').value;
    const circuitType = document.getElementById('circuitType').value;
    const sourceType = document.getElementById('sourceType').value;

    const canvas = document.getElementById('circuit');
    const ctx = canvas.getContext('2d');

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the source if selected
    if (sourceType !== "none") {
        ctx.beginPath();
        if (sourceType === "voltage") {
            ctx.arc(50, 200, 20, 0, 2 * Math.PI);
            ctx.fillText("V", 45, 205);
        } else if (sourceType === "current") {
            ctx.moveTo(50, 180);
            ctx.lineTo(50, 220);
            ctx.lineTo(70, 200);
            ctx.closePath();
            ctx.fill();
            ctx.fillText("I", 45, 205);
        }
        ctx.stroke();
    }

    // Draw the circuit elements
    let startX = 100;

    if (R) {
        drawResistor(ctx, startX, 200, circuitType);
        startX += 100;
    }

    if (C) {
        drawCapacitor(ctx, startX, 200, circuitType);
        startX += 100;
    }

    if (L) {
        drawInductor(ctx, startX, 200, circuitType);
        startX += 100;
    }

    // Show download button if a circuit is generated
    document.getElementById('downloadBtn').style.display = (R || C || L) ? "block" : "none";
}

function drawResistor(ctx, x, y, type) {
    ctx.beginPath();
    if (type === "series") {
        ctx.moveTo(x, y);
        ctx.lineTo(x + 50, y);
    } else {
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x, y + 30);
    }
    ctx.stroke();
    ctx.fillText("R", x + 25, y - 10);
}

function drawCapacitor(ctx, x, y, type) {
    ctx.beginPath();
    if (type === "series") {
        ctx.moveTo(x, y - 10);
        ctx.lineTo(x, y + 10);
        ctx.moveTo(x + 20, y - 10);
        ctx.lineTo(x + 20, y + 10);
    } else {
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x + 50, y - 30);
        ctx.moveTo(x, y + 30);
        ctx.lineTo(x + 50, y + 30);
    }
    ctx.stroke();
    ctx.fillText("C", x + 10, y - 10);
}

function drawInductor(ctx, x, y, type) {
    ctx.beginPath();
    if (type === "series") {
        ctx.arc(x + 25, y, 20, Math.PI, 0, true);
    } else {
        ctx.arc(x, y - 30, 20, 0, 2 * Math.PI);
    }
    ctx.stroke();
    ctx.fillText("L", x + 20, y - 10);
}

function downloadImage() {
    const canvas = document.getElementById('circuit');
    const link = document.createElement('a');
    link.download = 'circuit.png';
    link.href = canvas.toDataURL();
    link.click();
          }

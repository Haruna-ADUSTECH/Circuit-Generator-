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

    let startX = 50;
    let startY = 200;

    // Draw the source if selected
    if (sourceType !== "none") {
        ctx.beginPath();
        if (sourceType === "voltage") {
            ctx.arc(startX, startY, 20, 0, 2 * Math.PI);
            ctx.fillText("+", startX - 15, startY - 15);
            ctx.fillText("-", startX - 15, startY + 25);
        } else if (sourceType === "current") {
            ctx.arc(startX, startY, 20, 0, 2 * Math.PI);
            ctx.moveTo(startX - 10, startY - 10);
            ctx.lineTo(startX + 10, startY + 10);
            ctx.moveTo(startX - 10, startY + 10);
            ctx.lineTo(startX + 10, startY - 10);
        }
        ctx.stroke();
        startX += 50;
    }

    // Draw components based on user input
    if (circuitType === "series") {
        if (R) {
            drawResistor(ctx, startX, startY);
            startX += 100;
        }
        if (C) {
            drawCapacitor(ctx, startX, startY);
            startX += 100;
        }
        if (L) {
            drawInductor(ctx, startX, startY);
            startX += 100;
        }
    } else if (circuitType === "parallel") {
        let components = [];
        if (R) components.push(drawResistor);
        if (C) components.push(drawCapacitor);
        if (L) components.push(drawInductor);

        components.forEach((drawComponent, index) => {
            drawComponent(ctx, startX + index * 50, startY - 50 + index * 50);
        });
    }

    // Show download button if a circuit is generated
    document.getElementById('downloadBtn').style.display = (R || C || L) ? "block" : "none";
}

function drawResistor(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 25, y - 20);
    ctx.lineTo(x + 50, y + 20);
    ctx.lineTo(x + 75, y - 20);
    ctx.lineTo(x + 100, y);
    ctx.stroke();
    ctx.fillText("R", x + 45, y - 30);
}

function drawCapacitor(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y - 20);
    ctx.lineTo(x, y + 20);
    ctx.moveTo(x + 30, y - 20);
    ctx.lineTo(x + 30, y + 20);
    ctx.stroke();
    ctx.fillText("C", x + 15, y - 30);
}

function drawInductor(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x + 20, y, 20, Math.PI, 0, false);
    ctx.arc(x + 60, y, 20, Math.PI, 0, false);
    ctx.stroke();
    ctx.fillText("L", x + 35, y - 30);
}

function downloadImage() {
    const canvas = document.getElementById('circuit');
    const link = document.createElement('a');
    link.download = 'circuit.png';
    link.href = canvas.toDataURL();
    link.click();
            }

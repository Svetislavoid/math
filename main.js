/* ------------ Functions ------------ */

const sinfunc = (x) => {
    return Math.sin(x * Math.PI / 180);
}

const cosfunc = (x) => {
    return Math.cos(x * Math.PI / 180);
}

const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x))
}

const squared = (x) => {
    return x*x;
}

const setCanvasSize = (canvas, width, height) => {
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
}

const redrawCanvas = (canvas, redraw) => {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    if (redraw) {
        ctx.fillStyle = 'white';
        ctx.fillRect(-width/2, -height/2, width, height);
    }
}

const setOriginInCenter = (canvas) => {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.setTransform(1,0,0,-1,width/2,height/2);
}

const drawCoordinateLines = (canvas) => {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, 2 * Math.PI);
    ctx.moveTo(-width/2, 0);
    ctx.lineTo(width/2, 0);
    ctx.stroke();
    ctx.moveTo(0, -height/2);
    ctx.lineTo(0, height/2);
    ctx.stroke();
    ctx.closePath();
}

const addPendulum = (canvas, currentAngle, options) => {
    const ctx = canvas.getContext("2d");

    const {
        x = 0,
        y = 0,
        radius = 50,
        period = 1,
        color = 'black',
        drawLines = true,
        drawJoint = true,
        jointRadius = 2
    } = options;

    const x1 = x + radius * Math.cos(period * currentAngle);
    const y1 = y + radius * Math.sin(period * currentAngle);

    ctx.strokeStyle = color;

    ctx.beginPath();
    if (drawLines) {
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
    }
    drawJoint ? ctx.arc(x1, y1, jointRadius, 0, 2 * Math.PI) : null;
    ctx.stroke();
    ctx.closePath();

    return {x: x1, y: y1};
}

/* ------------ Options ------------ */

const options = {
    REDRAW: true,
    ANGLE_INCREMENT: 0.5,
    FRAME_RATE: 60,
    RADIUS1: 120,
    RADIUS2: 70,
    RADIUS3: 25,
    PERIOD1: -5.7,
    PERIOD2: 10.8,
    PERIOD3: -7.48
};

/* ------------ Main ------------ */

window.onload = () => {

    const {
        REDRAW,
        ANGLE_INCREMENT,
        FRAME_RATE,
        RADIUS1,
        RADIUS2,
        RADIUS3,
        PERIOD1,
        PERIOD2,
        PERIOD3
    } = options;

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");

    setCanvasSize(canvas, 600, 400);

    const width = canvas.width;
    const height = canvas.height;

    setOriginInCenter(canvas);

    let theta = 0;

    const timeout = setInterval(() => {
        const angle = theta * Math.PI / 180;

        redrawCanvas(canvas, REDRAW);
        drawCoordinateLines(canvas);

        let firstPendulum = addPendulum(canvas, angle, {
            x: 0,
            y: 0,
            radius: RADIUS1,
            period: PERIOD1,
            color: 'black',
            drawLines: true,
            drawJoint: true,
            jointRadius: 3
        });
        let secondPendulum = addPendulum(canvas, angle, {
            x: firstPendulum.x,
            y: firstPendulum.y,
            radius: RADIUS2,
            period: PERIOD2,
            color: 'green',
            drawLines: true,
            drawJoint: true,
            jointRadius: 2
        });
        let thirdPendulum = addPendulum(canvas, angle, {
            x: secondPendulum.x,
            y: secondPendulum.y,
            radius: RADIUS3,
            period: PERIOD3,
            color: 'red',
            drawLines: true,
            drawJoint: true,
            jointRadius: 1
        });
        let fourthPendulum = addPendulum(canvas, angle, {drawJoint: false});

        theta += ANGLE_INCREMENT;

    }, 1000 / FRAME_RATE);

    // ctx.strokeStyle = "red";
    // ctx.beginPath();

    // for (let i = - width/2; i <= width/2; i++) {
    //     ctx.moveTo(i, 100 * sinfunc(i));
    //     ctx.lineTo(i + 1, 100 * sinfunc(i + 1));
    //     ctx.stroke();
    // }

    // ctx.closePath();

    // ctx.strokeStyle = "blue";
    // ctx.beginPath();

    // for (let i = - width/2; i <= width/2; i++) {
    //     ctx.moveTo(i, 100 * cosfunc(i));
    //     ctx.lineTo(i + 1, 100 * cosfunc(i + 1));
    //     ctx.stroke();
    // }

    // ctx.closePath();

    // ctx.strokeStyle = "green";
    // ctx.beginPath();

    // for (let i = - width/2; i <= width/2; i++) {
    //     ctx.moveTo(i, 100 * sigmoid(i));
    //     ctx.lineTo(i + 1, 100 * sigmoid(i + 1));
    //     ctx.stroke();
    // }

    // ctx.closePath();

    // ctx.strokeStyle = "purple";
    // ctx.beginPath();

    // for (let i = - width/2; i <= width/2; i++) {
    //     ctx.moveTo(i, squared(i) / 100);
    //     ctx.lineTo(i + 1, squared(i + 1) / 100);
    //     ctx.stroke();
    // }

    // ctx.closePath();

}

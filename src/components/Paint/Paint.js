import React from 'react';

function Paint(props) {
    const canvas = React.useRef()
    const ctx = React.useRef();
    const lastX = React.useRef(0);
    const lastY = React.useRef(0);
    let hue = 0, direction = true, isDrawing = false;

    React.useEffect(() => {
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;
        ctx.current = canvas.current.getContext("2d");
        ctx.current.strokeStyle = '#BADA55';
        ctx.current.lineJoin = "round";
        ctx.current.lineCap = "round";
        ctx.current.lineWidth = 20;
    }, []);

    const handleMouseDown = (e) => {
        console.log('mousing down', e)
        isDrawing = true;
        lastX.current = e.nativeEvent.offsetX;
        lastY.current = e.nativeEvent.offsetY;
    }

    const handleMouseMove = (e) => {
        if (isDrawing) {
            ctx.current.strokeStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.current.beginPath();
            ctx.current.moveTo(lastX.current, lastY.current);
            ctx.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            ctx.current.stroke();
            [lastX.current, lastY.current] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

            hue++;
            if (hue >= 360) {
                hue = 0;
            }

            if (ctx.current.lineWidth >= 100 || ctx.current.lineWidth <= 1) {
                direction = !direction;
            }

            if (direction) {
                ctx.current.lineWidth++;
            } else {
                ctx.current.lineWidth--;
            }
        }
    }

    return (
        <div>
            <canvas
                ref={canvas}
                id="paint"
                onMouseDown={handleMouseDown}
                onMouseUp={() => isDrawing = false}
                onMouseOut={() => isDrawing = false}
                onMouseMove={handleMouseMove}
            />
        </div>
    );
}

export default Paint;
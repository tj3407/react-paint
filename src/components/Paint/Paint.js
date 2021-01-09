import React from "react";

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      console.log("setting size", window.innerHeight, window.innerWidth);
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function Paint(props) {
  const [width, height] = useWindowSize();
  const canvas = React.useRef();
  const ctx = React.useRef();
  const lastX = React.useRef(0);
  const lastY = React.useRef(0);
  let hue = 0,
    direction = true,
    isDrawing = false;

  React.useEffect(() => {
    draw();
  }, []);

  React.useEffect(() => {
    draw();
  }, [width, height]);

  const draw = () => {
    console.log(width, height);
    canvas.current.width = width;
    canvas.current.height = height;
    ctx.current = canvas.current.getContext("2d");
    ctx.current.strokeStyle = "#BADA55";
    ctx.current.lineJoin = "round";
    ctx.current.lineCap = "round";
    ctx.current.lineWidth = 20;
  };

  const handleMouseDown = (e) => {
    isDrawing = true;
    lastX.current = e.nativeEvent.offsetX;
    lastY.current = e.nativeEvent.offsetY;
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      ctx.current.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.current.beginPath();
      ctx.current.moveTo(lastX.current, lastY.current);
      ctx.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.current.stroke();
      [lastX.current, lastY.current] = [
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
      ];

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
  };

  return (
    <div>
      <canvas
        ref={canvas}
        id="paint"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseUp={() => (isDrawing = false)}
        onTouchEnd={() => (isDrawing = false)}
        onMouseOut={() => (isDrawing = false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      />
    </div>
  );
}

export default Paint;

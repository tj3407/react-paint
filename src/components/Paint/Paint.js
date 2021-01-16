import React from "react";

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
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
    isDrawing = false,
    isWriting = false,
    hasInput = false;

  React.useEffect(() => {
    draw();
  }, []);

  React.useEffect(() => {
    canvas.current.className = "";
    draw();
  }, [width, height, props.toggleClear]);

  React.useEffect(() => {
    ctx.current.strokeStyle = props.color;
  }, [props.color]);

  React.useEffect(() => {
    if (Number(props.lineWidth) > 0) {
      canvas.current.className = "";
      canvas.current.classList.add("pencil");
      ctx.current.lineWidth = props.lineWidth;
    }
  }, [props.lineWidth]);

  React.useEffect(() => {
    if (props.isSquare) {
      canvas.current.className = "";
      canvas.current.classList.add("square");
    }
  }, [props.isSquare]);

  React.useEffect(() => {
    if (props.isText) {
      canvas.current.className = "";
      canvas.current.classList.add("text");
      isWriting = true;
    }
  }, [props.isText]);

  const handleTextClick = (e) => {
    if (!isWriting) return;

    write(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const write = (x, y) => {
    const textarea = document.createElement("textarea");

    textarea.id = "canvas-textarea";
    textarea.style.position = "fixed";
    textarea.style.left = x - 4 + "px";
    textarea.style.top = y - 4 + "px";

    textarea.onblur = handleInputBlur;
    textarea.onkeydown = handleKeyDown;
    document.body.appendChild(textarea);
    textarea.focus();
    hasInput = true;
  };

  const handleKeyDown = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      console.log(e.target.value);
    }
  };

  const handleRemoveInput = (e) => {
    document.body.removeChild(e.target);
    hasInput = false;
  };

  const handleInputBlur = (e) => {
    const textArray = e.target.value.split("\n");
    drawText(
      textArray,
      parseInt(e.target.style.left, 10),
      parseInt(e.target.style.top, 10)
    );
    handleRemoveInput(e);
  };

  function drawText(txtArray, x, y) {
    ctx.current.textBaseline = "top";
    ctx.current.textAlign = "left";
    txtArray.forEach((txt, i) => ctx.current.fillText(txt, x, y + i * 16));
  }

  const draw = () => {
    canvas.current.width = width;
    canvas.current.height = height;
    ctx.current = canvas.current.getContext("2d");
    ctx.current.lineJoin = "round";
    ctx.current.lineCap = "round";
    ctx.current.font = "16px Arial";
    ctx.current.lineWidth = 20;
  };

  const handleMouseDown = (e) => {
    isDrawing = true;
    lastX.current = e.nativeEvent.offsetX;
    lastY.current = e.nativeEvent.offsetY;
  };

  const handleMouseMove = (e) => {
    if (isDrawing && !isWriting) {
      //   ctx.current.strokeStyle = `hsl(${hue}, 100%, 50%)`;
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
        onClick={handleTextClick}
      />
    </div>
  );
}

export default Paint;

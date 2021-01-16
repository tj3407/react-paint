import React from "react";
import { moveCaretToEnd, moveCaretToPosition } from "../../utils/utils";

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
    canvas.current.className = "";
    isWriting = props.isText;

    if (props.isSquare) {
      canvas.current.classList.add("square");
    }

    if (props.isText) {
      canvas.current.classList.add("text");
    }

    if (props.isPencil) {
      canvas.current.classList.add("pencil");
    }
  }, [props.isSquare, props.isPencil, props.isText]);

  const handleTextClick = (e) => {
    if (!isWriting) return;

    write(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const write = (x, y) => {
    const textarea = document.createElement("textarea");

    textarea.id = "canvas-textarea";
    textarea.rows = 5;
    textarea.cols = 30;
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

    if (keyCode === 9) {
      e.target.value =
        e.target.value.slice(0, e.target.selectionStart) +
        "  " +
        e.target.value.slice(e.target.selectionStart);

      moveCaretToPosition(e.target, e.target.selectionStart);
      return false;
    }

    if (keyCode === 57) {
      setTimeout(() => {
        e.target.value += ")";
        moveCaretToEnd(e.target);
      }, 0);
    }

    if (keyCode === 219) {
      setTimeout(() => {
        e.target.value += "}";
        moveCaretToEnd(e.target);
      }, 0);
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
    ctx.current.fillStyle = props.color;
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

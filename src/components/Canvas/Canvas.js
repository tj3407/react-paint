import React from "react";
import PropTypes from "prop-types";
import { moveCaretToPosition } from "../../utils/utils";

import { useWindowSize } from "../../hooks/hooks";

const Canvas = (props) => {
  const [width, height] = useWindowSize();
  const canvas = React.useRef();
  const ctx = React.useRef();
  const lastX = React.useRef(0);
  const lastY = React.useRef(0);
  const rect = React.useRef({});

  let hue = 0,
    isDrawing = false,
    hasInput = false;

  React.useEffect(() => {
    draw();
  }, []);

  React.useEffect(() => {
    draw();
  }, [width, height, props.toggleClear]);

  React.useEffect(() => {
    if (props.color) ctx.current.strokeStyle = props.color;

    if (props.canvasClass && canvas.current)
      canvas.current.className = props.canvasClass;
  }, [props.color, props.canvasClass]);

  React.useEffect(() => {
    if (Number(props.lineWidth) > 0) {
      ctx.current.lineWidth = props.lineWidth;
    }
  }, [props.lineWidth]);

  const draw = () => {
    canvas.current.width = width;
    canvas.current.height = height;
    canvas.current.classList.add = props.canvasClass;
    ctx.current = canvas.current.getContext("2d");
    ctx.current.lineJoin = "round";
    ctx.current.lineCap = "round";
    ctx.current.font = "16px Arial";
    ctx.current.strokeStyle = props.color;
    ctx.current.lineWidth = props.lineWidth;
  };

  const handleTextClick = (e) => {
    if (!props.isText) return;

    write(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const write = (x, y) => {
    const textarea = document.createElement("textarea");

    textarea.class = "canvas-textarea";
    textarea.rows = 1;
    textarea.cols = 20;
    textarea.style.position = "fixed";
    textarea.style.padding = "10px";
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

    if (keyCode === 57 && e.shiftKey) {
      setTimeout(() => {
        e.target.value =
          e.target.value.slice(0, e.target.selectionStart) +
          ")" +
          e.target.value.slice(e.target.selectionStart);
        moveCaretToPosition(e.target, e.target.selectionStart + 1);
      }, 0);
    }

    if (keyCode === 219 && e.shiftKey) {
      setTimeout(() => {
        e.target.value =
          e.target.value.slice(0, e.target.selectionStart) +
          "}" +
          e.target.value.slice(e.target.selectionStart);
        moveCaretToPosition(e.target, e.target.selectionStart + 1);
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

  const drawSquare = (e) => {
    rect.current.w = e.nativeEvent.offsetX - rect.current.startX;
    rect.current.h = e.nativeEvent.offsetY - rect.current.startY;
    ctx.current.strokeStyle = props.color;
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

    ctx.current.strokeRect(
      rect.current.startX,
      rect.current.startY,
      rect.current.w,
      rect.current.h
    );
  };

  const handleMouseUp = () => {
    if (props.isSquare) {
      props.onDrawFinish();
    }

    isDrawing = false;
  };

  const handleMouseDown = (e) => {
    isDrawing = true;

    if (props.isSquare) {
      rect.current.startX = e.nativeEvent.offsetX;
      rect.current.startY = e.nativeEvent.offsetY;
    } else {
      lastX.current = e.nativeEvent.offsetX;
      lastY.current = e.nativeEvent.offsetY;
    }
  };

  const handleMouseMove = (e) => {
    if (props.isSquare && isDrawing) {
      drawSquare(e);
    } else if (isDrawing && !props.isText) {
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
    <canvas
      ref={canvas}
      id="paint"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchEnd={() => (isDrawing = false)}
      onMouseOut={() => (isDrawing = false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onClick={handleTextClick}
      style={props.style}
    />
  );
};

Canvas.propTypes = {};

export default Canvas;

import React from "react";
import Canvas from "../../components/Canvas/Canvas";

function Paint(props) {
  const [canvasCount, setCanvasCount] = React.useState(0);
  const [canvasClass, setCanvasClass] = React.useState("pencil");

  React.useEffect(() => {
    setCanvasCount(canvasCount + 1);

    if (props.isSquare) {
      setCanvasClass("square");
    }

    if (props.isText) {
      setCanvasClass("text");
    }

    if (props.isPencil) {
      setCanvasClass("pencil");
    }
  }, [props.isSquare, props.isPencil, props.isText]);

  const canvasArray = new Array(canvasCount).fill(0);

  return (
    <div id="canvas">
      {canvasArray.map((item, index) => (
        <Canvas
          key={index}
          color={props.color}
          lineWidth={props.lineWidth}
          style={{ zIndex: index }}
          isSquare={props.isSquare}
          isText={props.isText}
          canvasClass={canvasClass}
          onDrawFinish={() => setCanvasCount(canvasCount + 1)}
        />
      ))}
    </div>
  );
}

export default Paint;

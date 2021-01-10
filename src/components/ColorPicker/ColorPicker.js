import React from "react";
import PropTypes from "prop-types";
import { InputLabel, Input } from "@material-ui/core";
import { ColorLens } from "@material-ui/icons";
import { debounce } from "lodash";
import "./ColorPicker.css";

ColorPicker.propTypes = {
  onColorChange: PropTypes.func,
};

function ColorPicker(props) {
  const colorPickerRef = React.useRef();
  const colorHandler = React.useCallback(
    debounce((color) => props.onColorChange(color), 300),
    []
  );

  const handleColorChange = (e) => {
    colorHandler(e.target.value);
    colorPickerRef.current.style.color = e.target.value;
  };

  return (
    <InputLabel className="color-label">
      <div className="color-icon">
        <ColorLens ref={colorPickerRef} />
      </div>
      <Input
        type="color"
        className="color-input"
        onChange={handleColorChange}
      />
    </InputLabel>
  );
}

export default ColorPicker;

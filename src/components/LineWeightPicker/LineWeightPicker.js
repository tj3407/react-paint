import React from "react";
import PropTypes from "prop-types";
import {
  Popper,
  ClickAwayListener,
  Fade,
  Paper,
  Input,
} from "@material-ui/core";
import { LineWeight } from "@material-ui/icons";
import { debounce } from "lodash";

const LineWeightPicker = ({
  isOpen,
  anchorEl,
  placement,
  lineWidth,
  onLineWidthChange,
}) => {
  const [open, setOpen] = React.useState(isOpen);
  const lineWeightHandler = React.useCallback(
    debounce((lineWidth) => onLineWidthChange(lineWidth), 300),
    []
  );

  const handleLineWidthChange = (e) => {
    lineWeightHandler(e.target.value);
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <LineWeight />
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
          className="lineweight-input"
        >
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Fade {...TransitionProps} timeout={350}>
                <Paper className="lineweight-input-paper" elevation={0}>
                  <Input
                    type="range"
                    disableUnderline
                    onChange={handleLineWidthChange}
                    defaultValue={lineWidth}
                    inputProps={{
                      min: 1,
                    }}
                  />
                </Paper>
              </Fade>
            </ClickAwayListener>
          )}
        </Popper>
      </div>
    </>
  );
};

LineWeightPicker.propTypes = {
  isOpen: PropTypes.bool,
  anchorEl: PropTypes.object,
  placement: PropTypes.string,
  lineWidth: PropTypes.string,
  onLineWidthChange: PropTypes.func,
};

export default LineWeightPicker;

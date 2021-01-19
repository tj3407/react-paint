import React from "react";
import Paint from "./components/Paint/Paint";
import "./App.css";
import {
  AppBar,
  Switch,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import {
  Create,
  Brush,
  Gesture,
  CheckBoxOutlineBlank,
  RadioButtonUnchecked,
  WbSunny,
  NightsStay,
  Clear,
  GetAppRounded,
  TextFields,
} from "@material-ui/icons";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import LineWeightPicker from "./components/LineWeightPicker/LineWeightPicker";
import { getTheme } from "./theme/theme";

const originalSelection = {
  color: false,
  pencil: false,
  curve: false,
  brush: false,
  text: false,
  lineWidth: false,
  square: false,
  circle: false,
};

function App() {
  const [color, setColor] = React.useState("");
  const [lineWidth, setlineWidth] = React.useState("");
  const [theme, setTheme] = React.useState(false);
  const [toggleClear, setToggleClear] = React.useState(false);
  const [selection, setSelection] = React.useState({
    ...originalSelection,
    pencil: true,
  });

  // Line weight
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  // Square
  const [isSquare, setIsSquare] = React.useState(false);

  // Text
  const [isText, setIsText] = React.useState(false);

  // Pencil
  const [isPencil, setIsPencil] = React.useState(false);

  const handleThemeChange = () => {
    setTheme(!theme);
  };

  const handleClearCanvas = () => {
    setSelection({ ...originalSelection });
    setlineWidth("");
    setToggleClear(!toggleClear);
  };

  const handleColorChange = (color) => {
    setIsSquare(false);
    setIsText(false);
    setColor(color);
  };

  const handlePencilClick = () => {
    setSelection({ ...originalSelection, pencil: true });
    setIsSquare(false);
    setIsText(false);
    setIsPencil(true);
    setlineWidth("1");
  };

  const handleTextClick = () => {
    setSelection({ ...originalSelection, text: true });
    setIsPencil(false);
    setIsSquare(false);
    setIsText(true);
  };

  const handleLineWeightClick = (newPlacement) => (event) => {
    setSelection({ ...originalSelection, lineWidth: true });
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleSquareClick = () => {
    setSelection({ ...originalSelection, square: true });
    setIsPencil(false);
    setIsText(false);
    setIsSquare(true);
  };

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      <div className="App">
        <AppBar position="fixed" color="primary" elevation={0}>
          <Toolbar className="app-header">
            <Typography variant="h6">React Paint</Typography>
            <IconButton>
              <GetAppRounded />
            </IconButton>
            <div className="dark-mode-switch">
              <div>
                <WbSunny />
              </div>
              <Switch
                checked={theme}
                onChange={handleThemeChange}
                color="default"
              />
              <div>
                <NightsStay />
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          PaperProps={{ className: "app-drawer" }}
          color="primary"
        >
          <List className="drawer-content">
            <ListItem button className={`drawer-content-button`}>
              <ColorPicker onColorChange={handleColorChange} />
            </ListItem>
            <ListItem
              button
              className={`drawer-content-button ${
                selection.pencil ? (theme ? "selected-dark" : "selected") : ""
              }`}
              onClick={handlePencilClick}
              selected={selection.pencil}
            >
              <ListItemIcon className="drawer-icon">
                <Create />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className={`drawer-content-button ${
                selection.curve ? (theme ? "selected-dark" : "selected") : ""
              }`}
              onClick={() =>
                setSelection({ ...originalSelection, curve: true })
              }
              selected={selection.curve}
            >
              <ListItemIcon className="drawer-icon">
                <Gesture />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className={`drawer-content-button ${
                selection.brush ? (theme ? "selected-dark" : "selected") : ""
              }`}
              onClick={() =>
                setSelection({ ...originalSelection, brush: true })
              }
              selected={selection.brush}
            >
              <ListItemIcon className="drawer-icon">
                <Brush />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className={`drawer-content-button ${
                selection.text ? (theme ? "selected-dark" : "selected") : ""
              }`}
              onClick={handleTextClick}
              selected={selection.text}
            >
              <ListItemIcon className="drawer-icon">
                <TextFields />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className={`drawer-content-button ${
                selection.lineWidth
                  ? theme
                    ? "selected-dark"
                    : "selected"
                  : ""
              }`}
              onClick={handleLineWeightClick("right")}
              selected={selection.lineWidth}
            >
              <ListItemIcon className="drawer-icon">
                <LineWeightPicker
                  isOpen={open}
                  lineWidth={lineWidth}
                  anchorEl={anchorEl}
                  placement={placement}
                  onLineWidthChange={(value) => setlineWidth(value)}
                />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className={`drawer-content-button ${
                selection.square ? (theme ? "selected-dark" : "selected") : ""
              }`}
              onClick={handleSquareClick}
              selected={selection.square}
            >
              <ListItemIcon className="drawer-icon">
                <CheckBoxOutlineBlank />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className={`drawer-content-button ${
                selection.circle ? (theme ? "selected-dark" : "selected") : ""
              }`}
              onClick={() =>
                setSelection({ ...originalSelection, circle: true })
              }
              selected={selection.circle}
            >
              <ListItemIcon className="drawer-icon">
                <RadioButtonUnchecked />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className={`drawer-content-button`}
              onClick={handleClearCanvas}
            >
              <ListItemIcon className="drawer-icon">
                <Clear />
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
        <Paint
          toggleClear={toggleClear}
          color={color}
          lineWidth={lineWidth}
          isSquare={selection.square}
          isText={selection.text}
          isPencil={selection.pencil}
          theme={theme}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

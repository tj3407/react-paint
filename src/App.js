import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
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
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
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

const themeObject = {
  palette: {
    type: "dark",
  },
};

const light = {
  palette: {
    type: "light",
  },
};

const dark = {
  palette: {
    type: "dark",
  },
};

function App() {
  const themeConfig = createMuiTheme(themeObject);
  const [color, setColor] = React.useState("");
  const [lineWidth, setlineWidth] = React.useState("");
  const [theme, setTheme] = React.useState(false);
  const [toggleClear, setToggleClear] = React.useState(false);
  const appliedTheme = createMuiTheme(theme ? dark : light);

  // Line weight
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  // Square
  const [isSquare, setIsSquare] = React.useState(false);

  // Text
  const [isText, setIsText] = React.useState(false);

  const handleThemeChange = () => {
    setTheme(!theme);
  };

  const handleClearCanvas = () => {
    setlineWidth("");
    setToggleClear(!toggleClear);
  };

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handlePencilClick = () => {
    setIsSquare(false);
    setlineWidth("1");
  };

  const handleTextClick = () => {
    setIsText(true);
  };

  const handleLineWeightClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleSquareClick = () => {
    setIsSquare(true);
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="fixed" color="inherit" elevation={0}>
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
        <Drawer variant="permanent" PaperProps={{ className: "app-drawer" }}>
          <List className="drawer-content">
            <ListItem button className="drawer-content-button">
              <ColorPicker onColorChange={handleColorChange} />
            </ListItem>
            <ListItem
              button
              className="drawer-content-button"
              onClick={handlePencilClick}
            >
              <ListItemIcon className="drawer-icon">
                <Create />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className="drawer-content-button"
              onClick={handlePencilClick}
            >
              <ListItemIcon className="drawer-icon">
                <Gesture />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className="drawer-content-button"
              onClick={handlePencilClick}
            >
              <ListItemIcon className="drawer-icon">
                <Brush />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className="drawer-content-button"
              onClick={handleTextClick}
            >
              <ListItemIcon className="drawer-icon">
                <TextFields />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className="drawer-content-button"
              onClick={handleLineWeightClick("right")}
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
              className="drawer-content-button"
              onClick={handleSquareClick}
            >
              <ListItemIcon className="drawer-icon">
                <CheckBoxOutlineBlank />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className="drawer-content-button"
              onClick={handlePencilClick}
            >
              <ListItemIcon className="drawer-icon">
                <RadioButtonUnchecked />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className="drawer-content-button"
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
          isSquare={isSquare}
          isText={isText}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

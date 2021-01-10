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
  Grid,
  Input,
  InputLabel,
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
  LineWeight,
  Gesture,
  CheckBoxOutlineBlank,
  RadioButtonUnchecked,
  WbSunny,
  NightsStay,
  Clear,
  GetAppRounded,
} from "@material-ui/icons";
import ColorPicker from "./components/ColorPicker/ColorPicker";

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
  const [lineWidth, setlineWidth] = React.useState(0);
  const [theme, setTheme] = React.useState(false);
  const [toggleClear, setToggleClear] = React.useState(false);
  const appliedTheme = createMuiTheme(theme ? dark : light);

  const handleThemeChange = () => {
    setTheme(!theme);
  };

  const handleClearCanvas = () => {
    setlineWidth(0);
    setToggleClear(!toggleClear);
  };

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handlePencilClick = () => {
    setlineWidth(1);
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
              onClick={handlePencilClick}
            >
              <ListItemIcon className="drawer-icon">
                <LineWeight />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              className="drawer-content-button"
              onClick={handlePencilClick}
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
          {/* </Grid> */}
        </Drawer>
        <Paint toggleClear={toggleClear} color={color} lineWidth={lineWidth} />
      </div>
    </ThemeProvider>
  );
}

export default App;

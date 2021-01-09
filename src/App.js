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
  RadioButtonChecked,
  RadioButtonUnchecked,
  WbSunny,
  NightsStay,
} from "@material-ui/icons";

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
  const [theme, setTheme] = React.useState(false);
  const appliedTheme = createMuiTheme(theme ? dark : light);

  const handleThemeChange = () => {
    setTheme(!theme);
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="fixed" color="inherit" elevation={0}>
          <Toolbar className="app-header">
            <Typography variant="h6">React Paint</Typography>
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
          <Grid
            container
            direction="column"
            alignItems="center"
            className="drawer-content"
          >
            <IconButton>
              <Create />
            </IconButton>
            <IconButton>
              <Gesture />
            </IconButton>
            <IconButton>
              <Brush />
            </IconButton>
            <IconButton>
              <LineWeight />
            </IconButton>
            <IconButton>
              <CheckBoxOutlineBlank />
            </IconButton>
            <IconButton>
              <RadioButtonUnchecked />
            </IconButton>
          </Grid>
        </Drawer>
        <Paint />
      </div>
    </ThemeProvider>
  );
}

export default App;

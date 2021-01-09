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
  const [theme, setTheme] = React.useState(true);
  const appliedTheme = createMuiTheme(theme ? light : dark);

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
            <Switch
              checked={theme}
              onChange={handleThemeChange}
              color="default"
            />
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

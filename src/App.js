import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Paint from "./components/Paint/Paint";
import './App.css';
import { AppBar, Switch, Toolbar, Typography, ThemeProvider, CssBaseline } from "@material-ui/core";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";

const themeObject = {
  palette: {
    type: "dark",
  },
}

const light = {
  palette: {
    type: "light",
  },
}

const dark = {
  palette: {
    type: "dark",
  },
}

function App() {
  const themeConfig = createMuiTheme(themeObject)
  const [theme, setTheme] = React.useState(true)
  const appliedTheme = createMuiTheme(theme ? light : dark)

  const handleThemeChange = () => {
    setTheme(!theme);
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="fixed" color="inherit">
          <Toolbar className="app-header">
            <Typography variant="h6">React Paint</Typography>
            <Switch checked={theme} onChange={handleThemeChange} color="inherit" />
          </Toolbar>
        </AppBar>
        <Paint />
      </div>
    </ThemeProvider>
  );
}

export default App;

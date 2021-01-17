import { createMuiTheme } from "@material-ui/core/styles";
import { orange, deepPurple, deepOrange } from "@material-ui/core/colors";

export const getTheme = (theme) => {
  const palletType = theme ? "dark" : "light";
  const mainPrimaryColor = theme ? orange[500] : "#ffff";
  const mainContrastText = theme ? "#fff" : "rgba(0, 0, 0, 0.54)";
  const mainSecondaryColor = theme ? deepOrange[900] : deepPurple[500];

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
        contrastText: mainContrastText,
      },
      secondary: {
        main: mainSecondaryColor,
        contrastText: "#fff",
      },
    },
  });

  return darkTheme;
};

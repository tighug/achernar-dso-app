import { createMuiTheme } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: teal[500],
    },
    background: {
      default: "#1E2126",
      paper: "#272b33",
    },
  },
});

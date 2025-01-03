import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import ContextProvider from "./components/ContextProvider";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1c2e20",
    },
    secondary: {
      main: "#2c4e34",
    },
    contrastText: "#f7e7d6",
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ThemeProvider>
);

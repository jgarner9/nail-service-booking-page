import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import ContextProvider from "./components/ContextProvider";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

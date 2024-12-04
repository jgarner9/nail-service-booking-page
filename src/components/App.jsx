import { useState } from "react";
import Header from "./Header";
import StepTracker from "./StepTracker";
import ServicePage from "./ServicePage";
import useServices from "../hooks/useServices";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import ContextProvider from "./ContextProvider";
import AppointmentDatePage from "./AppointmentDatePage";
import CustomerInfoPage from "./CustomerInfoPage";
import ConfirmationPage from "./ConfirmationPage";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const services = useServices();
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

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <div id="app-wrapper">
          <Header>
            <StepTracker currentStep={currentStep}></StepTracker>
          </Header>
          <div id="page-wrapper">
            {currentStep === 1 && <ServicePage services={services} />}
            {currentStep === 2 && <AppointmentDatePage />}
            {currentStep === 3 && <CustomerInfoPage />}
            {currentStep === 4 && <ConfirmationPage />}
            <div id="nav-wrapper">
              {currentStep > 1 && (
                <Button
                  id="back-button"
                  variant="outlined"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  color="#2C4E34"
                >
                  Back
                </Button>
              )}
              {currentStep < 4 && (
                <Button
                  id="next-button"
                  variant="contained"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  sx={{ bgcolor: "#2C4E34" }}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </ContextProvider>
    </ThemeProvider>
  );
}

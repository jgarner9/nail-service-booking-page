import { useState } from "react";
import Header from "./Header";
import StepTracker from "./StepTracker";
import ServicePage from "./ServicePage";
import useServices from "./hooks/useServices";
import { Button } from "@mui/material";
import ContextProvider from "./ContextProvider";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const services = useServices();
  console.log(currentStep);

  return (
    <ContextProvider>
      <div id="app-wrapper">
        <Header>
          <StepTracker currentStep={currentStep}></StepTracker>
        </Header>
        <div id="page-wrapper">
          {currentStep === 1 && <ServicePage services={services} />}
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
  );
}

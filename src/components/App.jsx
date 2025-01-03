import { useContext, useState } from "react";
import Header from "./Header";
import StepTracker from "./StepTracker";
import ServicePage from "./ServicePage";
import useServices from "../hooks/useServices";
import { Button, CircularProgress } from "@mui/material";
import AppointmentDatePage from "./AppointmentDatePage";
import CustomerInfoPage from "./CustomerInfoPage";
import ConfirmationPage from "./ConfirmationPage";
import dayjs from "dayjs";
import { context } from "./ContextProvider";
import submitAppointment from "../utils/submitAppointment";
import validateStepChange from "../utils/validateStepChange";
import AppointmentBookedPage from "./AppointmentBookedPage";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    selectedService,
    selectedDate,
    selectedTime,
    customerInfo,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useContext(context);
  const services = useServices();

  return (
    <div id="app-wrapper">
      <Header>
        <StepTracker currentStep={currentStep}></StepTracker>
      </Header>
      <div id="page-wrapper">
        {currentStep === 1 && <ServicePage services={services} />}
        {currentStep === 2 && <AppointmentDatePage />}
        {currentStep === 3 && <CustomerInfoPage />}
        {currentStep === 4 && <ConfirmationPage services={services} />}
        {isLoading && currentStep === 5 && (
          <>
            <h2>Request Processing</h2>
            <br />
            <CircularProgress />
          </>
        )}
        {!isLoading && currentStep === 5 && <AppointmentBookedPage />}
        <div id="nav-wrapper">
          {currentStep > 1 && currentStep <= 4 && (
            <Button
              id="back-button"
              variant="outlined"
              onClick={() => {
                setError(null);
                setCurrentStep(currentStep - 1);
              }}
            >
              Back
            </Button>
          )}
          {currentStep < 4 && (
            <Button
              id="next-button"
              variant="contained"
              onClick={() =>
                validateStepChange(
                  currentStep,
                  setCurrentStep,
                  selectedService,
                  selectedDate,
                  selectedTime,
                  customerInfo,
                  setError
                )
              }
            >
              Next
            </Button>
          )}
          {currentStep === 4 && (
            <Button
              variant="contained"
              id="submit-button"
              onClick={() => {
                submitAppointment(
                  selectedService,
                  customerInfo.id,
                  dayjs(selectedDate).format("MM-DD-YYYY"),
                  selectedTime,
                  services.find((service) => service.id === selectedService)
                    .duration,
                  customerInfo.notes,
                  setIsLoading
                );
                setCurrentStep(5);
              }}
            >
              Submit
            </Button>
          )}
        </div>
        {error && (
          <div id="error-message-wrapper">
            <h2 id="error-message">{error}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

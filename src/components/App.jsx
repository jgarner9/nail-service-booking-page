import { useContext, useState } from "react";
import Header from "./Header";
import StepTracker from "./StepTracker";
import ServicePage from "./ServicePage";
import useServices from "../hooks/useServices";
import {
  Button,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AppointmentDatePage from "./AppointmentDatePage";
import CustomerInfoPage from "./CustomerInfoPage";
import ConfirmationPage from "./ConfirmationPage";
import dayjs from "dayjs";
import { context } from "./ContextProvider";
import submitAppointment from "../utils/submitAppointment";
import validateStepChange from "../utils/validateStepChange";

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
              <h3>
                This process can take up to three minutes. You may close the
                tab, but please look out for a booking email to indicate this
                was successful.
              </h3>
              <h3>
                Once booked, please lookout for a confirmation email indicating
                the appointment was accepted.
              </h3>
              <br />
              <CircularProgress />
            </>
          )}
          {!isLoading && currentStep === 5 && <h1>Appointment Booked!</h1>}
          <div id="nav-wrapper">
            {currentStep > 1 && currentStep < 4 && (
              <Button
                id="back-button"
                variant="outlined"
                onClick={() => setCurrentStep(currentStep - 1)}
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
                    import.meta.env.VITE_PROVIDER_ID,
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
    </ThemeProvider>
  );
}

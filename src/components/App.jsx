import { useContext, useState } from "react";
import Header from "./Header";
import StepTracker from "./StepTracker";
import ServicePage from "./ServicePage";
import useServices from "../hooks/useServices";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import AppointmentDatePage from "./AppointmentDatePage";
import CustomerInfoPage from "./CustomerInfoPage";
import ConfirmationPage from "./ConfirmationPage";
import dayjs from "dayjs";
import { context } from "./ContextProvider";

function handleSubmit(
  serviceId,
  providerId,
  customerId,
  date,
  time,
  duration,
  notes
) {
  const start = dayjs(`${date} ${time}`).format("MM-DD-YYYY HH:mm:ss");
  const end = start.add(duration, "minutes").format("MM-DD-YYYY HH:mm:ss");

  fetch("https://example.com/api/appointment", {
    method: "POST",
    body: JSON.stringify({
      serviceId: serviceId,
      providerId: providerId,
      customerId: customerId,
      color: "#f4787d",
      status: "Booked",
      start: start,
      end: end,
      location: null,
      notes: notes,
    }),
  });
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const { selectedService, selectedDate, selectedTime, customerInfo } =
    useContext(context);
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
          <div id="nav-wrapper">
            {currentStep > 1 && (
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
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </Button>
            )}
            {currentStep === 4 && (
              <Button
                variant="contained"
                id="submit-button"
                onClick={() => {
                  handleSubmit(
                    selectedService,
                    import.meta.env.VITE_PROVIDER_ID,
                    customerInfo.id,
                    selectedDate,
                    selectedTime,
                    services.find((service) => service.id === selectedService)
                      .duration,
                    customerInfo.notes
                  );
                  setCurrentStep(5);
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

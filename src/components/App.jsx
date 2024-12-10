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
import customParseFormat from "dayjs/plugin/customParseFormat";

function handleSubmit(
  serviceId,
  providerId,
  customerId,
  date,
  time,
  duration,
  notes
) {
  dayjs.extend(customParseFormat);
  const start = dayjs(`${date} ${time}`, "MM-DD-YYYY HH:mm").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const end = dayjs(start, "YYYY-MM-DD HH:mm:ss")
    .add(duration, "minutes")
    .format("YYYY-MM-DD HH:mm:ss");

  fetch(`${import.meta.env.VITE_EA_BASE_URL}/appointments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_EA_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      serviceId: parseInt(serviceId),
      providerId: parseInt(providerId),
      customerId: parseInt(customerId),
      status: "Booked",
      start: start,
      end: end,
      notes: notes,
      location: "Online",
    }),
  })
    .then((res) => {
      console.log(res.json());
    })
    .then((data) => {
      console.log("Appointment created");
      console.log(data);
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
                    dayjs(selectedDate).format("MM-DD-YYYY"),
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

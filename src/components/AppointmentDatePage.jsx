import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useContext } from "react";
import dayjs from "dayjs";
import { context } from "./ContextProvider.jsx";
import useAvailabilities from "../hooks/useAvailabilities.jsx";
import { Button, Stack } from "@mui/material";

export default function AppointmentDatePage() {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } =
    useContext(context);
  let availabilities = useAvailabilities(selectedDate);

  return (
    <div id="appointment-date-page-wrapper">
      <h1 className="title">Appointment</h1>
      <div id="date-picker-wrapper">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            views={["day"]}
            value={selectedDate}
            minDate={dayjs(new Date())}
            maxDate={dayjs(new Date()).add(3, "month")}
            onChange={(e) => {
              setSelectedDate(dayjs(e));
              setSelectedTime(null);
              availabilities = [];
            }}
          />
        </LocalizationProvider>
        <Stack id="available-times-wrapper" spacing={1}>
          <h2>Available on {selectedDate.format("MM-DD-YYYY")}</h2>
          {availabilities?.length === 0 ? (
            <h3>
              <em>No available times</em>
            </h3>
          ) : (
            availabilities?.length !== 0 &&
            availabilities?.map((availability) => {
              return (
                <Button
                  key={availability}
                  sx={{ width: "320px" }}
                  variant={
                    selectedTime === availability ? "contained" : "outlined"
                  }
                  onClick={() => setSelectedTime(availability)}
                >
                  {availability}
                </Button>
              );
            })
          )}
        </Stack>
      </div>
    </div>
  );
}

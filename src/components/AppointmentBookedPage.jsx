import { useContext } from "react";
import formatTime from "../utils/formatTime";
import { context } from "./ContextProvider";

export default function AppointmentBookedPage() {
  const { selectedService, selectedDate, selectedTime, customerInfo, services } =
    useContext(context);

  return (
    <>
      <h1>Appointment Booked!</h1>
      <h2>
        Service:{" "}
        {services.find((service) => service.id === selectedService).name}
      </h2>
      <h2>Date: {selectedDate.format("MM-DD-YYYY")}</h2>
      <h2>Time: {formatTime(selectedTime)}</h2>
      <h2>
        Customer Info: {customerInfo.firstName} {customerInfo.lastName}
      </h2>
    </>
  );
}

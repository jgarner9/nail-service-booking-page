import { useContext } from "react";
import useCustomer from "../hooks/useCustomer";
import { context } from "./ContextProvider";

export default function ConfirmationPage({ services }) {
  const { selectedService, selectedDate, selectedTime, customerInfo } =
    useContext(context);

  useCustomer();
  return (
    <div id="confirmation-page-wrapper">
      <h1 className="title">Confirmation</h1>
      <h2>
        Service:{" "}
        {services.find((service) => service.id === selectedService).name}
      </h2>
      <h2>Date: {selectedDate.format("MM-DD-YYYY")}</h2>
      <h2>Time: {selectedTime}</h2>
      <h2>
        Customer Info: {customerInfo.firstName} {customerInfo.lastName}
      </h2>
    </div>
  );
}

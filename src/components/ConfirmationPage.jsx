import { useContext } from "react";
import useCustomer from "../hooks/useCustomer";
import { context } from "./ContextProvider";

export default function ConfirmationPage() {
  const { selectedService, selectedDate, selectedTime, customerInfo } =
    useContext(context);

  useCustomer();
  return (
    <div id="confirmation-page-wrapper">
      <h1 className="title">Confirmation</h1>
      <h2>
        <bold>Service:</bold> {selectedService}
      </h2>
      <h2>
        <bold>Date:</bold> {selectedDate.format("MM-DD-YYYY")}
      </h2>
      <h2>
        <bold>Time:</bold> {selectedTime}
      </h2>
      <h2>
        <bold>Customer Info:</bold> {customerInfo.firstName}{" "}
        {customerInfo.lastName}
      </h2>
    </div>
  );
}

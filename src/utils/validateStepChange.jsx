export default function validateStepChange(
  step,
  setStep,
  selectedService,
  selectedDate,
  selectedTime,
  customerInfo,
  setError
) {
  if (step === 1 && selectedService === "default") {
    setError("Please select a service.");
  } else if (step === 2 && (!selectedDate || !selectedTime)) {
    setError("Please select a date / time.");
  } else if (
    step === 3 &&
    (customerInfo.firstName === "" ||
      customerInfo.lastName === "" ||
      customerInfo.phoneNumber === "" ||
      customerInfo.email === "")
  ) {
    setError("Please fill out all fields.");
  } else {
    //reset error on page change
    setError(null);
    return setStep(step + 1);
  }
}

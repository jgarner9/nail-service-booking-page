export default function validateStepChange(
  step,
  setStep,
  selectedService,
  setError
) {
  if (step === 1 && selectedService === "default") {
    setError("Please select a service.");
  } else {
    //reset error on page change
    setError(null);
    return setStep(step + 1);
  }
}

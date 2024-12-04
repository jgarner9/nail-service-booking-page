export default function StepTracker({ currentStep }) {
  return (
    <div id="step-tracker-wrapper">
      <h2 className={`step${currentStep === 1 ? " current-step" : ""}`}>1</h2>
      <h2 className={`step${currentStep === 2 ? " current-step" : ""}`}>2</h2>
      <h2 className={`step${currentStep === 3 ? " current-step" : ""}`}>3</h2>
      <h2 className={`step${currentStep === 4 ? " current-step" : ""}`}>4</h2>
    </div>
  );
}

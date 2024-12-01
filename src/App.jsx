import { useState } from "react";
import Header from "./Header";
import StepTracker from "./StepTracker";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div id="app-wrapper">
      <Header>
        <StepTracker currentStep={currentStep}></StepTracker>
      </Header>
    </div>
  );
}

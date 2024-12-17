import { createContext, useMemo, useState } from "react";
import dayjs from "dayjs";
// eslint-disable-next-line react-refresh/only-export-components
export const context = createContext(null);

export default function ContextProvider({ children }) {
  const [selectedService, setSelectedService] = useState("default");
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const value = useMemo(
    () => ({
      selectedService,
      setSelectedService,
      selectedDate,
      setSelectedDate,
      selectedTime,
      setSelectedTime,
      customerInfo,
      setCustomerInfo,
      isLoading,
      setIsLoading,
      error,
      setError
    }),
    [selectedService, selectedDate, selectedTime, customerInfo, isLoading, error]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
}

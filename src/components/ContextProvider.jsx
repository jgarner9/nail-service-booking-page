import { createContext, useMemo, useState } from "react";
import dayjs from "dayjs";
// eslint-disable-next-line react-refresh/only-export-components
export const context = createContext(null);

export default function ContextProvider({ children }) {
  const [selectedService, setSelectedService] = useState("default");
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedTime, setSelectedTime] = useState(null);

  const value = useMemo(
    () => ({
      selectedService,
      setSelectedService,
      selectedDate,
      setSelectedDate,
      selectedTime,
      setSelectedTime
    }),
    [selectedService, selectedDate, selectedTime]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
}

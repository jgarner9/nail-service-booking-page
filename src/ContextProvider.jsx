import { createContext, useMemo, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const context = createContext(null);

export default function ContextProvider({ children }) {
  const [selectedService, setSelectedService] = useState("default");

  const value = useMemo(
    () => ({ selectedService, setSelectedService }),
    [selectedService, setSelectedService]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
}

import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { context } from "../components/ContextProvider";

export default function useAvailabilities(selectedDate) {
  const [availabilities, setAvailabilities] = useState([]);
  const { selectedService, setIsLoading } = useContext(context);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/availability`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: selectedService,
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAvailabilities(data.availabilities);
        setIsLoading(false);
      });
  }, [selectedService, selectedDate, setIsLoading]);

  return availabilities;
}

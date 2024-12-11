import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { context } from "../components/ContextProvider";

export default function useAvailabilities(selectedDate) {
  const [availabilities, setAvailabilities] = useState([]);
  const { selectedService, setIsLoading } = useContext(context);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/availability?serviceId=${selectedService}&date=${dayjs(
        selectedDate
      ).format("YYYY-MM-DD")}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAvailabilities(data.availabilities);
        setIsLoading(false);
      });
  }, [selectedService, selectedDate, setIsLoading]);

  return availabilities;
}

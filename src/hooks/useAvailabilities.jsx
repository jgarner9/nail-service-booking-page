import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { context } from "../components/ContextProvider";

export default function useAvailabilities(selectedDate) {
  const [availabilities, setAvailabilities] = useState([]);
  const { selectedService } = useContext(context);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_EA_API_KEY}`,
    };
    fetch(
      `${import.meta.env.VITE_EA_BASE_URL}/availabilities?providerId=${
        import.meta.env.VITE_PROVIDER_ID
      }&serviceId=${selectedService}&date=${dayjs(selectedDate).format(
        "YYYY-MM-DD"
      )}`,
      {
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => setAvailabilities(data));
  }, [selectedService, selectedDate]);

  return availabilities;
}

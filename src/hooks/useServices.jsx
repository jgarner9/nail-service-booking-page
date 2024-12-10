import { useContext, useEffect, useState } from "react";
import { context } from "../components/ContextProvider";

export default function useServices() {
  const [services, setServices] = useState(null);
  const { setIsLoading } = useContext(context);

  useEffect(() => {
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_EA_API_KEY}`,
    };

    fetch(`${import.meta.env.VITE_EA_BASE_URL}/services`, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setIsLoading(false);
      });
  }, []);

  return services;
}

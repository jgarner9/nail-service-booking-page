import { useContext, useEffect, useState } from "react";
import { context } from "../components/ContextProvider";

export default function useServices() {
  const [services, setServices] = useState(null);
  const { setIsLoading } = useContext(context);

  useEffect(() => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_BASE_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setIsLoading(false);
      });
  }, [setIsLoading]);

  return services;
}

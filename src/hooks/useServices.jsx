import { useEffect, useState } from "react";

export default function useServices() {
  const [services, setServices] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_EA_API_KEY}`,
    };
    fetch("http://100.86.159.34/index.php/api/v1/services", {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return services;
}

import { useContext, useEffect } from "react";
import { context } from "../components/ContextProvider";

export default function useCustomer() {
  const { customerInfo } = useContext(context);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_EA_API_KEY}`,
    };
    fetch(
      `${import.meta.env.VITE_EA_BASE_URL}/customers?q=${customerInfo.email}`,
      {
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data[0].id) {
          fetch(`${import.meta.env.VITE_EA_BASE_URL}/customers/${data[0].id}`, {
            method: "PUT",
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify(customerInfo),
          });
        } else {
          fetch(`${import.meta.env.VITE_EA_BASE_URL}/customers`, {
            method: "POST",
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify(customerInfo),
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

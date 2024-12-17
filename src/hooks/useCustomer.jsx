import { useContext, useEffect } from "react";
import { context } from "../components/ContextProvider";

export default function useCustomer() {
  const { customerInfo, setCustomerInfo } = useContext(context);
  const copy = { ...customerInfo };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/customer?email=${
        customerInfo.email
      }&firstName=${customerInfo.firstName}&lastName=${
        customerInfo.lastName
      }&phone=${customerInfo.phone}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCustomerInfo({ ...data.customer, notes: copy.notes });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

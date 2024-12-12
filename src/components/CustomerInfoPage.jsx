import { Stack, TextField } from "@mui/material";
import { useContext } from "react";
import { context } from "./ContextProvider";

export default function CustomerInfoPage() {
  const { customerInfo, setCustomerInfo } = useContext(context);

  return (
    <div id="customer-info-page-wrapper">
      <h1 className="title">Customer Information</h1>
      <Stack spacing={2}>
        <TextField
          placeholder="First Name"
          variant="outlined"
          fullWidth
          value={customerInfo.firstName}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, firstName: e.target.value })
          }
        />
        <TextField
          placeholder="Last Name"
          variant="outlined"
          fullWidth
          value={customerInfo.lastName}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, lastName: e.target.value })
          }
        />
        <TextField
          placeholder="Phone Number"
          variant="outlined"
          fullWidth
          value={customerInfo.phone}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, phone: e.target.value })
          }
        />
        <TextField
          placeholder="Email"
          variant="outlined"
          fullWidth
          value={customerInfo.email}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, email: e.target.value })
          }
        />
        <TextField
          placeholder="Notes"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={customerInfo.notes}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, notes: e.target.value })
          }
        />
      </Stack>
    </div>
  );
}

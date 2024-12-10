import { MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { context } from "./ContextProvider";

export default function ServicePage({ services }) {
  const { selectedService, setSelectedService, isLoading } =
    useContext(context);

  return (
    <div id="service-page-wrapper">
      <h1 className="title">Services</h1>
      <Select
        id="service-select"
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        fullWidth
        sx={{ marginBottom: "50px" }}
      >
        <MenuItem disabled value="default">
          <em className="placeholder-text">Select A Service</em>
        </MenuItem>
        {isLoading && (
          <MenuItem disabled value="loading">
            Loading...
          </MenuItem>
        )}
        {services?.map((service) => {
          return (
            <MenuItem key={service.id} value={service.id}>
              {service.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}

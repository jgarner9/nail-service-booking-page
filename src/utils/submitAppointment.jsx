import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function submitAppointment(
  serviceId,
  providerId,
  customerId,
  date,
  time,
  duration,
  notes,
  setIsLoading
) {
  dayjs.extend(customParseFormat);
  const start = dayjs(`${date} ${time}`, "MM-DD-YYYY HH:mm").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const end = dayjs(start, "YYYY-MM-DD HH:mm:ss")
    .add(duration, "minutes")
    .format("YYYY-MM-DD HH:mm:ss");

  setIsLoading(true);
  fetch(`${import.meta.env.VITE_EA_BASE_URL}/appointments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_EA_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      serviceId: parseInt(serviceId),
      providerId: parseInt(providerId),
      customerId: parseInt(customerId),
      status: "Booked",
      start: start,
      end: end,
      notes: notes,
      location: "Online",
    }),
  })
    .then((res) => {
      res.json();
    })
    .then(() => {
      setIsLoading(false);
    });
}

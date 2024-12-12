import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function submitAppointment(
  serviceId,
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
  fetch(`${import.meta.env.VITE_BASE_URL}/appointment`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      serviceId: serviceId,
      customerId: customerId,
      start: start,
      end: end,
      notes: notes,
    }),
  })
    .then((res) => {
      res.json();
    })
    .then(() => {
      setIsLoading(false);
    });
}

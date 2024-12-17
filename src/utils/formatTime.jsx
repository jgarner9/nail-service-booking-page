export default function formatTime(time) {
  let hour = parseInt(time.split(":")[0]);
  let minutes = time.split(":")[1];
  if (hour > 12) hour -= 12;
  return `${hour}:${minutes}`;
}

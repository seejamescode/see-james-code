export default function(previous) {
  const current = new Date();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;
  let value = Math.round(elapsed / msPerYear);

  if (elapsed < 0) {
    return new Date(previous)
      .toString()
      .split(" ")
      .slice(1, 4)
      .join(" ");
  } else if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)}s`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)}min`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)}h`;
  } else if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)}d`;
  } else if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)}mon`;
  }
  return `${value}y`;
}

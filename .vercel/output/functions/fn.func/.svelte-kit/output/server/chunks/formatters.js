const formatDateTime = (date) => {
  try {
    return new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "short"
    }).format(date);
  } catch (error) {
    console.error("error: ", error);
  }
};
const formatTime = (s) => {
  const regex = /[A-Z]/g;
  if (s.match(regex)) {
    console.warn("Not a time: ", s);
    return "";
  }
  if (s.includes("-")) {
    const r = s.replace("-", ":");
    const t = r.replace("-", ":");
    return t;
  }
  if (s.includes(":")) {
    return s;
  }
  if (s.includes(".")) {
    s.replace(".", ":");
    return s;
  }
  if (s.length === 4) {
    const str = s.split("");
    const time = `${str[0]}${str[1]}:${str[2]}${str[3]}:00`;
    return time;
  }
  return "";
};
export {
  formatTime as a,
  formatDateTime as f
};

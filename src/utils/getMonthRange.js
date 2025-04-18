// utils/getMonthRange.js
import dayjs from "dayjs";

export const getMonthRange = (monthIndex) => {
  // monthIndex son ekanligini tekshir
  if (typeof monthIndex !== "number" || isNaN(monthIndex)) {
    console.warn("❌ monthIndex is invalid:", monthIndex);
    return { start: "Invalid Date", end: "Invalid Date" };
  }

  const year = dayjs().year();
  const date = dayjs(`${year}-${monthIndex + 1}-01`); // monthIndex 0-based, dayjs esa 1-based

  return {
    start: date.startOf("month").format("YYYY-MM-DD"),
    end: date.endOf("month").format("YYYY-MM-DD"),
  };
};

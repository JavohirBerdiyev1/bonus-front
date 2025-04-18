// components/shared/MonthSelect.js
import React from "react";
import { Select } from "components/ui";

export const months = [
  { label: "Yanvar", value: 0 },
  { label: "Fevral", value: 1 },
  { label: "Mart", value: 2 },
  { label: "Aprel", value: 3 },
  { label: "May", value: 4 },
  { label: "Iyun", value: 5 },
  { label: "Iyul", value: 6 },
  { label: "Avgust", value: 7 },
  { label: "Sentyabr", value: 8 },
  { label: "Oktyabr", value: 9 },
  { label: "Noyabr", value: 10 },
  { label: "Dekabr", value: 11 },
];

const MonthSelect = ({ value, onChange, className }) => {
  return (
    <Select
      className={className}
      options={months}
      value={months.find((m) => m.value === value)}
      onChange={(option) => onChange(option.value)}
      placeholder="Oyni tanlang"
    />
  );
};

export default MonthSelect;

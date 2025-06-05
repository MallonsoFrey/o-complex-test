"use client";

import { IMaskInput } from "react-imask";

interface PhoneInputProps {
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

export const PhoneInput = ({ value, className, onChange }: PhoneInputProps) => {
  return (
    <IMaskInput
      mask="+{7} (000) 000-00-00"
      placeholder="+7 (___) ___-__-__"
      value={value}
      onAccept={(val) => onChange(val)}
      overwrite
      unmask={false}
      className={`bg-[#222222] rounded-xl p-2 ${className}`}
    />
  );
};

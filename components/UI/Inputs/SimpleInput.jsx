// Exam/UI/Buttons/SimpleInput.jsx
import Image from "next/image";
import "./SimpleInput.css";
import { useState } from "react";

export default function SimpleInput({
  label = "Type Here",
  id = "inputField",
  cssClass = "",
  fontstyle = "",
  size = "h-12 w-full rounded-full",
  padding = "px-5",
  border = "",
  theme = "light",
  darkTheme = "",
  lightTheme = "border border-solid border-black/[.08] hover:border-black/[.3] focus:border-black/[.3]",
  value,
  type = "text",
  form = "",
  icon = false,
  onClick,
  disabled = false,
  required = false,
  onChange,
}) {
  const [focusLabel, setFocusLabel] = useState(false);

  return (
    <div className="inputDiv relative w-full">
      <label
        htmlFor={id}
        className={`inputLabel ${(focusLabel || value) && "FocusLabel"}`}
      >
        {icon && <Image src={icon} alt="icon" width={16} height={16} />}
        {label} {required && <span>*</span>}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        form={form}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onClick={() => {
          onClick;
          setFocusLabel(true);
        }}
        onBlur={() => {
          if (value.length === 0) setFocusLabel(false);
        }}
        style={{ border: border }}
        className={`simpleInput ${cssClass} ${padding} ${size} ${fontstyle}
          ${disabled ? "disabledInput" : ""}
          ${theme === "dark" ? darkTheme : ""}
          ${theme === "light" ? lightTheme : ""}
        `}
      />
    </div>
  );
}

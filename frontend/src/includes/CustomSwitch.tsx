import React from "react";

type CustomSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  color?: string;
};

export default function CustomSwitch({
  checked,
  onChange,
  label,
  color = "#ff804b",
}: CustomSwitchProps) {
  return (
    <label className="custom-switch-preference">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        tabIndex={0}
      />
      <span
        className="switch-slider"
        style={{
          background: checked ? color : "#585e62",
          transition: "background 0.23s",
        }}
      >
        <span
          className="switch-icon"
          style={{
            left: checked ? 25 : 5,
            background: "#fff",
            color: checked ? color : "#585e62",
            transition:
              "left 0.23s cubic-bezier(.77,0,.18,1.1), color 0.23s",
          }}
        >
          {checked ? (
            // Check icon
            <svg width={22} height={22} viewBox="0 0 20 20">
              <polyline
                points="4 11 9 16 16 5"
                fill="none"
                stroke={color}
                strokeWidth={2.5}
              />
            </svg>
          ) : (
            // Cross icon
            <svg width={22} height={22} viewBox="0 0 20 20">
              <line
                x1="6"
                y1="6"
                x2="14"
                y2="14"
                stroke="#585e62"
                strokeWidth={2.5}
              />
              <line
                x1="14"
                y1="6"
                x2="6"
                y2="14"
                stroke="#585e62"
                strokeWidth={2.5}
              />
            </svg>
          )}
        </span>
      </span>
      <span className="switch-label">{label}</span>
    </label>
  );
}
import { MenuItem, TextField } from "@mui/material";

interface InlineTextProps {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "number";
  ariaLabel: string;
}

export const InlineTextField = ({ value, onChange, type = "text", ariaLabel }: InlineTextProps) => (
  <TextField
    size="small"
    value={value}
    type={type}
    onChange={(event) => onChange(event.target.value)}
    inputProps={{ "aria-label": ariaLabel }}
    fullWidth
  />
);

interface InlineSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  ariaLabel: string;
}

export const InlineSelectField = ({ value, onChange, options, ariaLabel }: InlineSelectProps) => (
  <TextField
    select
    size="small"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    inputProps={{ "aria-label": ariaLabel }}
    fullWidth
  >
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

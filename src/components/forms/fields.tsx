import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { ReactNode } from "react";

interface BaseFieldProps {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

interface TextLikeProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  minRows?: number;
  type?: "text" | "email" | "tel" | "number" | "date" | "url";
}

export const TextFieldControl = ({
  label,
  name,
  value,
  onChange,
  required,
  disabled,
  error,
  placeholder,
  multiline,
  minRows,
  type = "text",
}: TextLikeProps) => (
  <TextField
    name={name}
    label={label}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    required={required}
    disabled={disabled}
    error={Boolean(error)}
    helperText={error}
    placeholder={placeholder}
    multiline={multiline}
    minRows={minRows}
    type={type}
    fullWidth
  />
);

interface SelectFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

export const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  disabled,
  error,
}: SelectFieldProps) => (
  <FormControl fullWidth size="small" required={required} disabled={disabled} error={Boolean(error)}>
    <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Select
      labelId={`${name}-label`}
      name={name}
      label={label}
      value={value}
      displayEmpty
      onChange={(event: SelectChangeEvent<string>) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {error ? <FormHelperText>{error}</FormHelperText> : null}
  </FormControl>
);

interface BooleanFieldProps extends BaseFieldProps {
  value: boolean;
  onChange: (value: boolean) => void;
  variant?: "checkbox" | "switch";
}

export const BooleanField = ({
  label,
  name,
  value,
  onChange,
  disabled,
  variant = "checkbox",
}: BooleanFieldProps) => (
  <FormControlLabel
    control={
      variant === "switch" ? (
        <Switch name={name} checked={value} onChange={(_, checked) => onChange(checked)} disabled={disabled} />
      ) : (
        <Checkbox name={name} checked={value} onChange={(_, checked) => onChange(checked)} disabled={disabled} />
      )
    }
    label={label}
  />
);

export const FieldGrid = ({ children }: { children: ReactNode }) => (
  <Stack
    sx={{
      display: "grid",
      gap: 2,
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, minmax(0, 1fr))",
        md: "repeat(3, minmax(0, 1fr))",
      },
    }}
  >
    {children}
  </Stack>
);

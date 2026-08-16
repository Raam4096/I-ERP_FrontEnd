import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useState, type ReactNode } from "react";

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
    slotProps={type === "date" ? { inputLabel: { shrink: true } } : undefined}
  />
);

interface SelectFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  includeEmpty?: boolean;
  emptyLabel?: string;
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
  includeEmpty,
  emptyLabel = "Select",
}: SelectFieldProps) => {
  const hasEmptyOption = Boolean(includeEmpty) || options.some((option) => option.value === "");
  const shrink = Boolean(value) || hasEmptyOption;

  return (
    <FormControl fullWidth size="small" required={required} disabled={disabled} error={Boolean(error)}>
      <InputLabel id={`${name}-label`} shrink={shrink}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        name={name}
        label={label}
        value={value}
        displayEmpty={hasEmptyOption}
        notched={shrink}
        onChange={(event: SelectChangeEvent<string>) => onChange(event.target.value)}
        renderValue={(selected) => {
          const match = options.find((option) => option.value === selected)?.label;
          if (match) {
            return match;
          }
          if (hasEmptyOption) {
            return (
              <Box component="span" sx={{ color: "text.disabled" }}>
                {emptyLabel}
              </Box>
            );
          }
          return "";
        }}
      >
        {includeEmpty ? (
          <MenuItem value="">
            <em>{emptyLabel}</em>
          </MenuItem>
        ) : null}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
};

interface CreatableSelectFieldProps extends SelectFieldProps {
  onCreateOption: (value: string) => void;
  createTitle?: string;
}

export const CreatableSelectField = ({
  onCreateOption,
  createTitle = "Add option",
  ...selectProps
}: CreatableSelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [createError, setCreateError] = useState<string | undefined>();

  const commit = () => {
    const next = draft.trim();
    if (!next) {
      setCreateError("Enter a name to add.");
      return;
    }
    const exists = selectProps.options.some(
      (option) => option.value.toLowerCase() === next.toLowerCase() || option.label.toLowerCase() === next.toLowerCase(),
    );
    if (exists) {
      setCreateError("That option already exists.");
      return;
    }
    onCreateOption(next);
    setDraft("");
    setCreateError(undefined);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        "&:hover .ierp-create-option, &:focus-within .ierp-create-option": {
          opacity: 1,
        },
      }}
    >
      <SelectField {...selectProps} includeEmpty={selectProps.includeEmpty ?? true} />
      <Tooltip title={createTitle}>
        <IconButton
          className="ierp-create-option"
          aria-label={createTitle}
          size="small"
          onClick={() => setOpen(true)}
          sx={{
            position: "absolute",
            top: 8,
            right: 36,
            opacity: 0,
            transition: "opacity 140ms ease",
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            width: 24,
            height: 24,
            "&:hover": {
              bgcolor: "chrome.hover",
            },
            "@media (hover: none)": {
              opacity: 1,
            },
          }}
        >
          <AddIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{createTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setCreateError(undefined);
            }}
            error={Boolean(createError)}
            helperText={createError}
            sx={{ mt: 1 }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commit();
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setOpen(false);
              setDraft("");
              setCreateError(undefined);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={commit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

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

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search records…",
  fullWidth = true,
}: SearchInputProps) => (
  <TextField
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    fullWidth={fullWidth}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      },
    }}
    inputProps={{ "aria-label": placeholder }}
  />
);

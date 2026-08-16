export const isBlank = (value: string | undefined | null): boolean =>
  !value || value.trim().length === 0;

export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

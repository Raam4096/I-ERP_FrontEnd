/**
 * UI permission checks hide controls only. The API still enforces authorization.
 */
export const hasPermission = (granted: string[], required?: string | string[]): boolean => {
  if (!required) {
    return true;
  }

  const needed = Array.isArray(required) ? required : [required];
  if (granted.includes("*")) {
    return true;
  }

  return needed.every((key) => granted.includes(key));
};

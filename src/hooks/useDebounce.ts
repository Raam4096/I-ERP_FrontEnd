import { useEffect, useState } from "react";

/**
 * Search boxes should not hit the API on every keystroke. Debouncing keeps
 * server-side filtering aligned with the list query contract.
 */
export const useDebounce = <T>(value: T, delay = 350): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

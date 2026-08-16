export const formatCurrency = (value: number, currency = "USD"): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);

export const formatCompactNumber = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(value);

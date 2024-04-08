interface IStandarize {
  value: number;
  country: "en-US" | "es-VE" | "es" | "en";
  currency: "USD" | "VES" | "EUR" | "GBP";
}

export default function standarize({ value, country, currency }: IStandarize) {
  if (isNaN(Number(value))) {
    return "Invalid number";
  }

  return Number(value).toLocaleString(country, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
}

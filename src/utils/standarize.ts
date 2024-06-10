interface IStandarize {
  value: number;
  country: string;
  currency: "USD" | "VES" | "EUR" | "COP";
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

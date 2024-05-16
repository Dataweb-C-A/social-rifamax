export const initials = (value: string) => {
  const parsed = value.match(/(\b\S)?/g)

  return parsed?.join("").toUpperCase() ?? ""
}
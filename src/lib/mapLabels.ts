// Map-screen label abbreviations, so two-column named cells fit at 13px.
export function abbreviateSliceName(name: string): string {
  return name.replace("Developed ", "Dev ").replace("International ", "Intl ");
}

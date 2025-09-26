export const normalize = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\u00C0-\u024F]+/g, "");

export const filterData = <T>(
  data: T[],
  terms: string[],
  toHaystack: (item: T) => string,
) => {
  if (terms.length === 0) return data;
  const normTerms = terms.map(normalize);
  return data.filter((item) => {
    const hay = normalize(toHaystack(item));
    return normTerms.every((t) => hay.includes(t));
  });
};

export const uniqueOptions = <T>(data: T[], toLabel: (item: T) => string) => {
  const set = new Set<string>();
  data.forEach((d) => set.add(toLabel(d)));
  return Array.from(set);
};

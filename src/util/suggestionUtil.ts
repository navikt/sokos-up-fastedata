export const getSortedSuggestions = (
  options: string[],
  query: string,
  showAllWhenEmpty: boolean,
): string[] => {
  if (!query && !showAllWhenEmpty) return [];
  if (!query && showAllWhenEmpty) return options;

  const matchingOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase()),
  );

  return matchingOptions.sort((a, b) => {
    const [codeA] = a.split(" - ");
    const [codeB] = b.split(" - ");

    const codeAStartsWithQuery = codeA
      .toLowerCase()
      .startsWith(query.toLowerCase());
    const codeBStartsWithQuery = codeB
      .toLowerCase()
      .startsWith(query.toLowerCase());

    if (codeAStartsWithQuery && !codeBStartsWithQuery) return -1;
    if (!codeAStartsWithQuery && codeBStartsWithQuery) return 1;

    const nameA = a.substring(a.indexOf(" - ") + 3).toLowerCase();
    const nameB = b.substring(b.indexOf(" - ") + 3).toLowerCase();

    const nameAStartsWithQuery = nameA.startsWith(query.toLowerCase());
    const nameBStartsWithQuery = nameB.startsWith(query.toLowerCase());

    if (nameAStartsWithQuery && !nameBStartsWithQuery) return -1;
    if (!nameAStartsWithQuery && nameBStartsWithQuery) return 1;

    return a.localeCompare(b);
  });
};

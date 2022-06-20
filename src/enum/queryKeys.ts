export const queryKeys = {
  addrSearch: (
    searchKeyword: string,
    searchCurrentPage: number,
    searchCountPerPage: number,
  ) =>
    [
      'addrSearch',
      searchKeyword,
      searchCurrentPage,
      searchCountPerPage,
    ] as const,
};

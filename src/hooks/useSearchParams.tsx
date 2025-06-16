import { useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

type CustomSearch = {
  readonly page?: string;
};

type UseSearchParamsOptions = Parameters<typeof useSearch>[0] & {
  readonly page?: string;
};

export function useSearchParams<TSearch extends CustomSearch = CustomSearch>(
  opts: UseSearchParamsOptions
): TSearch & CustomSearch {
  const { page, select, ...searchOpts } = opts;
  const search = useSearch(searchOpts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!search.page) {
      navigate({
        to: opts.from,
        search: {
          ...search,
          page: page,
        },
        replace: true,
      });
    }
  }, [search.page, navigate, page, search, opts.from]);

  return {
    ...search,
    page: search.page ?? search.default,
  };
}

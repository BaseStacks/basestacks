import { useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

type CustomSearch = {
  page?: string;
};

type UseSearchParamsOptions = Parameters<typeof useSearch>[0] & {
  page?: string;
};

export function useSearchParams<TSearch extends CustomSearch = CustomSearch>(
  opts: UseSearchParamsOptions
): TSearch & { page: string } {
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
  }, [search.page, navigate, page]);

  return {
    ...search,
    page: search.page || search.default,
  };
}

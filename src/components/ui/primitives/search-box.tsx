import { SearchIcon } from "lucide-react";

interface searchBoxProps {
  search?: string;
  setSearch: (value: string) => void;
  placeholder?: string;
}
function SearchBox(props: searchBoxProps) {
  const { search, setSearch, placeholder } = props;
  return (
    <div className="search-box border border-gray-300 rounded-lg flex items-center px-2">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-0"
      />
    </div>
  );
}

export default SearchBox;

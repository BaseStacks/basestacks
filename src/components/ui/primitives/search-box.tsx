import { SearchIcon } from "lucide-react";
import { Input } from "./input";

interface SearchBoxProps {
  setSearch: (value: string) => void;
  placeholder?: string;
}

export function SearchBox(props: SearchBoxProps) {
  const { setSearch, placeholder } = props;
  return (
    <div className="search-box border border-gray-300 rounded-lg flex items-center pl-2 gap-2 w-fit">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm border-none !bg-transparent shadow-none !focus:outline-none !focus:ring-0 !focus:border-transparent focus-visible:ring-1 focus-visible:ring-transparent"
      />
    </div>
  );
}
import { SearchIcon } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  readonly setSearch: (value: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
}

export function SearchBox(props: SearchBoxProps) {
  const { setSearch, placeholder = "Quick search...", className } = props;
  return (
    <div
      className={cn(
        className,
        "search-box border border-gray-300 rounded-lg flex items-center pl-2 gap-2 w-fit"
      )}
    >
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

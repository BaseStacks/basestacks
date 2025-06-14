import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Button } from "../../primitives/button";

export function HeaderSorted({ title, column }) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="!px-0 w-full h-[50px] justify-start"
    >
      {title}
      {column.getIsSorted() == false ? (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <ChevronUp className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}

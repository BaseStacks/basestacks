import { SortAsc } from "lucide-react";
import React from "react";
import { Button } from "../../primitives/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../primitives/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../feedback/popover";
import { FieldTypeIcon } from "../../icons/FieldTypIcon";
import { useFields } from "@/states";

export function RecordSorts() {
  const { fields } = useFields();

  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" aria-expanded={open}>
          <SortAsc /> Sort
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Select a field" className="h-9" />
          <CommandList>
            <CommandEmpty>No field found.</CommandEmpty>
            <CommandGroup className="gap-1">
              {fields.map((field) => (
                <CommandItem key={field.id} value={field.id}>
                  <FieldTypeIcon type={field.type} />
                  <div className="grow">{field.name}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

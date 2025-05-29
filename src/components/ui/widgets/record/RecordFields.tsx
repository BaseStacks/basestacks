import { List, GripVertical, Plus, Eye, Text } from "lucide-react";
import { Button } from "../../primitives/button";
import React from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../primitives/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";
import { Switch } from "../../primitives/switch";
import { Separator } from "../../primitives/separator";
import { useFields } from "@/states";
import { FieldTypeIcon } from "../../icons/FieldTypIcon";

export function RecordFields() {
    const { fields } = useFields();

    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild >
                <Button size="sm" variant="ghost" aria-expanded={open}>
                    <List /> Fields
                </Button>
            </PopoverTrigger >
            <PopoverContent align="start" className="p-0">
                <Command>
                    <CommandInput placeholder="Search fields..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No field found.</CommandEmpty>
                        <CommandGroup>
                            {fields.map((field) => (
                                <CommandItem key={field.id} value={field.id}>
                                    <GripVertical />
                                    <FieldTypeIcon type={field.type} />
                                    <div className="grow">{field.name}</div>
                                    <Switch id={field.id} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                <Separator />
                <div className="p-1 flex flex-row justify-between">
                    <div>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Eye /> System fields
                        </Button>
                    </div>
                    <div>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Plus /> Add field
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
};
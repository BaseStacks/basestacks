import { Download, Filter, Plus, Save } from "lucide-react";
import React from "react";
import { Button } from "../../primitives/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";
import { Separator } from "../../primitives/separator";

export function RecordFilters() {

    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild >
                <Button size="sm" variant="ghost" aria-expanded={open}>
                    <Filter /> Filters
                </Button>
            </PopoverTrigger >
            <PopoverContent align="start" className="p-0">
                <div className="p-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Download /> Load saved filters
                    </Button>
                </div>
                <Separator />
                <div className="p-1">
                    <span className="text-xs text-muted-foreground block p-4">
                        No filters applied
                    </span>
                </div>
                <Separator />
                <div className="p-1 flex flex-row justify-between">
                    <div>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Plus /> Add filter
                        </Button>
                    </div>
                    <div>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Save /> Save
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
};
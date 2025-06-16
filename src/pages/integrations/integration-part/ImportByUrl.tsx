import { Link } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/primitives/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/feedback/popover";
import { Textarea } from "@/components/ui/primitives/textarea";

export function ImportByUrl() {
  const [open, setOpen] = useState<boolean>();
  const onSubmit = () => {
    alert("import successfully");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Link /> Use connection URL
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-3 w-100">
        <div className="flex flex-col gap-3">
          <span className="text-sm">
            Auto populate connection configuration using database connection URL
          </span>
          <Textarea className="h-[100px]" placeholder="Enter Url" />
          <div className="flex justify-end gap-2">
            <Button
              className="border"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import { Asterisk, Eye, EyeOff, Plus } from "lucide-react";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Separator } from "./separator";
import type { Control } from "react-hook-form";

type SelectItemType = Readonly<{
  readonly label: string;
  readonly value: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
}>;

interface FormFieldCustomProps {
  readonly name: string;
  readonly control: Control<any>;
  readonly required?: boolean;
  readonly label?: string;
  readonly placeholder?: string;
  readonly type?: "text" | "password" | "select";
  readonly selectItems?: Array<SelectItemType>;
  readonly actionItems?: Array<SelectItemType>;
}

export function FormFieldCustom({
  name,
  control,
  required,
  label,
  placeholder,
  type = "text",
  selectItems,
  actionItems,
}: FormFieldCustomProps) {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel>
              {label}
              {required && <Asterisk className="inline text-red-500 w-2 h-2" />}
            </FormLabel>
          )}
          <FormControl>
            {type === "text" ?
              <Input placeholder={placeholder} {...field} />
            : type === "password" ?
              <div className="relative">
                <Input type={show ? "text" : "password"} {...field} />
                <Button
                  variant="ghost"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {show ?
                    <EyeOff size={18} />
                  : <Eye size={18} />}
                </Button>
              </div>
            : <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectItems?.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                        onClick={item.onClick}
                        className="cursor-pointer"
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                    {actionItems && (
                      <>
                        <Separator className="my-1" />
                        {actionItems.map((item) => (
                          <Button
                            key={item.value}
                            variant="link"
                            value={item.value}
                            onClick={item.onClick}
                            disabled={item.disabled}
                          >
                            <Plus />
                            {item.label}
                          </Button>
                        ))}
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            }
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

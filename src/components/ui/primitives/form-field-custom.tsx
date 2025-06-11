import { Asterisk, Eye, EyeOff } from "lucide-react";
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
import type { Control } from "react-hook-form";

type selectItem = {
  label: string;
  value: string;
};

interface FormFieldCustomProps {
  name: string;
  control: Control<any>;
  required?: boolean;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "select";
  selectItems?: Array<selectItem>;
}

export function FormFieldCustom({
  name,
  control,
  required,
  label,
  placeholder,
  type = "text",
  selectItems,
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
            {type === "text" ? (
              <Input placeholder={placeholder} {...field} />
            ) : type === "password" ? (
              <div className="relative">
                <Input type={show ? "text" : "password"} {...field} />
                <Button
                  variant="ghost"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            ) : (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectItems?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

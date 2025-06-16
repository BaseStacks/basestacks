import { FormProvider } from "react-hook-form";
import { RoleSelector } from "./RoleSelector";
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";

export function AddMember({ form }: Readonly<{ readonly form: any }>) {
  return (
    <div className="flex gap-2">
      <FormProvider {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Enter email addresses" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="access"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RoleSelector value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </FormProvider>
    </div>
  );
}

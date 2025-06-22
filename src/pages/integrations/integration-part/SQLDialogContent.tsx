import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { ImportByUrl } from "./ImportByUrl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/primitives/accordion";
import { Button } from "@/components/ui/primitives/button";
import { FormLabel } from "@/components/ui/primitives/form";
import { FormFieldCustom } from "@/components/ui/primitives/form-field-custom";
import { Label } from "@/components/ui/primitives/label";
import { Separator } from "@/components/ui/primitives/separator";
import { Switch } from "@/components/ui/primitives/switch";
import { Textarea } from "@/components/ui/primitives/textarea";
import { ConnectionLayoutDialog } from "@/pages/shared/ConnectionLayoutDialog";

type DatabaseType = {
  readonly connectionName: string;
  readonly hostName: string;
  readonly port: string;
  readonly username: string;
  readonly password: string;
  readonly databaseName: string;
  readonly ssl?: string;
  readonly parameters: Array<{
    readonly key: string;
    readonly value: string;
  }>;
};

export function SQLDialogContent() {
  const form = useForm<DatabaseType>({
    defaultValues: {
      connectionName: "",
      hostName: "localhost",
      port: "3306",
      username: "root",
      password: "",
      databaseName: "",
      ssl: "no",
      parameters: [],
    },
  });
  const [useSSL, setUseSSL] = useState(false);
  const [rawJson, setRawJson] = useState(
    JSON.stringify(form.getValues(), null, 2)
  );

  useEffect(() => {
    const subscription = form.watch((value) => {
      setRawJson(JSON.stringify(value, null, 2));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parameters",
  });

  const dataSSL = [
    { label: "No", value: "no" },
    { label: "Allowed", value: "allowed" },
    { label: "Preferred", value: "preferred" },
    { label: "Required", value: "required" },
    { label: "Required-CA", value: "required-ca" },
    { label: "Required-Identity", value: "required-identity" },
  ];
  return (
    <ConnectionLayoutDialog>
      <FormProvider {...form}>
        <div key="form-section-1" className="space-y-4">
          <h3 className="text-lg font-semibold">General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldCustom
              name="connectionName"
              label="Connection name"
              control={form.control}
              placeholder="Enter connection name"
              required
            />
          </div>
        </div>

        <div key="form-section-2" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Connection details</h3>
            <ImportByUrl />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldCustom
              name="hostName"
              control={form.control}
              label="Host address"
              placeholder="Enter host address"
              required
            />
            <FormFieldCustom
              name="port"
              control={form.control}
              label="Port number"
              placeholder="Enter port number"
              required
            />
            <FormFieldCustom
              name="username"
              control={form.control}
              label="Username"
              placeholder="Enter username"
              required
            />
            <FormFieldCustom
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter password"
              type="password"
              required
            />
            <FormFieldCustom
              name="databaseName"
              control={form.control}
              label="Database name"
              placeholder="Enter database name"
            />
          </div>
          <div key="form-section-3" className="space-y-2">
            <FormLabel>Connection parameters</FormLabel>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <FormFieldCustom
                  name={`parameters.${field.id}.key`}
                  control={form.control}
                  placeholder="Key"
                />
                <div className="flex gap-2">
                  <FormFieldCustom
                    name={`parameters.${field.id}.key`}
                    control={form.control}
                    placeholder="Value"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                    className="max-w-fit"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              className="border"
              onClick={() => append({ key: "", value: "" })}
            >
              + Add
            </Button>
          </div>
        </div>
        <Separator className="my-2" />
        <div key="form-section-4" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-3">
            <div key="ssl-switch" className="flex items-center space-x-2">
              <Switch
                id="use-ssl"
                defaultChecked={useSSL}
                onCheckedChange={() => {
                  setUseSSL(!useSSL);
                  form.setValue("ssl", "no");
                }}
              />
              <Label htmlFor="use-ssl">Use SSL</Label>
            </div>
            {useSSL && (
              <div key="ssl-select" className="rounded-lg border p-4">
                <FormFieldCustom
                  name="ssl"
                  label="SSL mode"
                  control={form.control}
                  placeholder="Select a fruit"
                  type="select"
                  selectItems={dataSSL}
                />
              </div>
            )}
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="w-fit justify-start">
                Advanced setting
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <div className="mt-4">
                  <FormLabel className="mb-2 block">Raw JSON</FormLabel>
                  <Textarea
                    className="w-full min-h-[200px] border p-2 rounded font-mono text-sm"
                    value={rawJson}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setRawJson(newValue);
                      try {
                        const parsed = JSON.parse(newValue);
                        form.reset(parsed);
                      } catch (error) {
                        console.error("Invalid JSON");
                      }
                    }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </FormProvider>
    </ConnectionLayoutDialog>
  );
}

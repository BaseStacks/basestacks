import { GitCommitHorizontal } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type { DataSourceType } from "@/components/api/data-type/overview/overview";
import { useDialog } from "@/components/ui/DialogProvider";
import { FormFieldCustom } from "@/components/ui/primitives/form-field-custom";
import { Toast } from "@/lib/toast";
import { Integration } from "@/pages/integrations/Integration";
import { Switch } from "@/components/ui/primitives/switch";
import { cn } from "@/lib/utils";
import { getTextColorClass } from "@/lib/colorUtils";
import { FormField } from "@/components/ui/primitives/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/primitives/accordion";

interface EditDataSourceProps {
  readonly initialData: DataSourceType;
}

export function EditDataSource({ initialData }: EditDataSourceProps) {
  const form = useForm({
    defaultValues: initialData,
  });

  const { openDialog } = useDialog();
  return (
    <FormProvider {...form}>
      <div key="form-section-1" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldCustom
            label="Data Source Name"
            required
            name="sourceName"
            control={form.control}
            placeholder="Enter data source name"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldCustom
            label="Select Connection"
            required
            name="connection"
            control={form.control}
            placeholder="Enter connection name"
            type="select"
            selectItems={[
              { label: "MySQL Connection", value: "mysql" },
              { label: "PostgreSQL Connection", value: "postgresql" },
              { label: "MongoDB Connection", value: "mongodb" },
            ]}
            actionItems={[
              {
                label: "Add New Connection",
                value: "add-new-connection",
                onClick: () => {
                  openDialog(
                    {
                      title: "Add New Connection",
                      iconTitle: GitCommitHorizontal,
                      content: <Integration />,
                    },
                    () => {
                      Toast.success({
                        title: "Connection added successfully!",
                      });
                    }
                  );
                },
              },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldCustom
            label="Database"
            required
            name="database"
            control={form.control}
            placeholder="Enter database name"
          />
        </div>
      </div>

      <div key="form-section-1" className="space-y-4">
        <h3 className="text-lg font-semibold">Permissions</h3>
        <div className="flex gap-2 border rounded-md p-3">
          <FormField
            name="allowReadWrite"
            control={form.control}
            render={({ field }) => <Switch onCheckedChange={field.onChange} />}
          />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Allow Data Write/Edit</span>
            <span className={cn("text-xs", getTextColorClass("gray"))}>
              This option allows creating, updating, or deleting records within
              database tables. Ideal for administrative users needing to change
              data directly.
            </span>
          </div>
        </div>
        <div className="flex gap-2 border rounded-md p-3">
          <FormField
            name="allowSchemaChanges"
            control={form.control}
            render={({ field }) => <Switch onCheckedChange={field.onChange} />}
          />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Allow Schema Change</span>
            <span className={cn("text-xs", getTextColorClass("gray"))}>
              Not recommended: This option allows modification of database
              schema, including adding, altering, or deleting tables and
              columns. Use with caution, as changes may impact the structural
              integrity of your database.
            </span>
          </div>
        </div>
      </div>
      <div key="form-section-1" className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="advanced-options">
            <div className="w-fit">
              <AccordionTrigger>Advanced options</AccordionTrigger>
            </div>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-6">
                <FormFieldCustom
                  type="select"
                  label="Inflection - Table name"
                  name="tableName"
                  control={form.control}
                  selectItems={[
                    {
                      label: "None",
                      value: "none",
                    },
                    {
                      label: "Camelize",
                      value: "camelize",
                    },
                  ]}
                />
                <FormFieldCustom
                  type="select"
                  label="Inflection - Field name"
                  name="FieldName"
                  control={form.control}
                  selectItems={[
                    {
                      label: "None",
                      value: "none",
                    },
                    {
                      label: "Camelize",
                      value: "camelize",
                    },
                  ]}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </FormProvider>
  );
}

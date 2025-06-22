import { GitCommitHorizontal } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type { DataSourceType } from "./AddDataSource";
import { useDialog } from "@/components/ui/DialogProvider";
import { FormFieldCustom } from "@/components/ui/primitives/form-field-custom";
import { Toast } from "@/lib/toast";
import { Integration } from "@/pages/integrations/Integration";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldCustom
          label="Data Source Name"
          required
          name="name"
          control={form.control}
          placeholder="Enter data source name"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldCustom
          label="Connection Name"
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
                    Toast.success({ title: "Connection added successfully!" });
                  }
                );
              },
            },
          ]}
        />
      </div>
    </FormProvider>
  );
}

import { GitCommitHorizontal } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type { DbType } from "@/pages/integrations/Connection";
import { useDialog } from "@/components/ui/DialogProvider";
import { FormFieldCustom } from "@/components/ui/primitives/form-field-custom";
import { Toast } from "@/lib/toast";
import { Integration } from "@/pages/integrations/Integration";

export type DataSourceType = {
  id: string;
  name: string;
  type: DbType;
  connection: string;
  database?: string;
  visible: boolean;
};

export function AddDataSource() {
  const form = useForm({
    defaultValues: {
      name: "",
      type: "Mysql" as DbType,
      connection: "",
      visible: true,
    },
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

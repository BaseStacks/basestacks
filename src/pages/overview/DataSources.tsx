import { useForm } from "react-hook-form";
import { useState } from "react";
import { HardDrive, Pencil, Trash2 } from "lucide-react";
import { ConnectionLayoutDialog } from "../shared/ConnectionLayoutDialog";
import { EditDataSource } from "./data-source-part/EditDataSource";
import { AddDataSource } from "./data-source-part/AddDataSource";
import type { DataSourceType } from "./data-source-part/AddDataSource";
import type { ColumnDef } from "@tanstack/react-table";
import type { DbType } from "../integrations/Connection";
import { DataTable } from "@/components/ui/data-display/data-table/data-table";
import { Toast } from "@/lib/toast";
import { HeaderSorted } from "@/components/ui/data-display/data-table/header-sorted";
import { ActionButton } from "@/components/ui/data-display/data-table/action-button";
import { Switch } from "@/components/ui/primitives/switch";
import { useDeleteModal } from "@/components/ui/DeleteDialogProvider";
import { useDialog } from "@/components/ui/DialogProvider";
import { SearchBox } from "@/components/ui/primitives/search-box";
import { Button } from "@/components/ui/primitives/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/navigation/breadcrumb";

import mysqlIcon from "@/assets/integrations/MySQL 6 Logo.png";
import postgreSQLIcon from "@/assets/integrations/PostgreSQL Elephant.png";
import mongoIcon from "@/assets/integrations/MongoDB Icon.svg";

const defaultData: Array<DataSourceType> = [
  {
    id: "1",
    name: "MySQL Database",
    type: "Mysql",
    connection: "MySQL Connection",
    visible: true,
    database: "test12312414",
  },
  {
    id: "2",
    name: "PostgreSQL Database",
    type: "PostgreSQL",
    connection: "PostgreSQL Connection",
    visible: false,
  },
  {
    id: "3",
    name: "MongoDB Database",
    type: "MongoDB",
    connection: "MongoDB Connection",
    visible: true,
  },
];
export function DataSources() {
  const { openDialog, closeDialog } = useDialog();
  const { openDeleteModal } = useDeleteModal();
  const [data, setData] = useState<Array<DataSourceType>>(defaultData);

  const form = useForm({
    defaultValues: {
      email: "",
      type: "Mysql" as DbType,
    },
  });

  const editSourceHandler = (row: DataSourceType) => {
    openDialog(
      {
        title: "Edit Data Source",
        iconTitle: HardDrive,
        showFooter: true,
        content: (
          <ConnectionLayoutDialog
            children={<EditDataSource initialData={row} />}
          />
        ),
        leftContent: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={closeDialog}>
                  Data Sources
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="font-semibold">
                <BreadcrumbLink href="#">{row.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
        buttons: [
          {
            type: "button",
            label: "Test Connection",
            onClick: () => {
              form.handleSubmit((value) => {
                // Simulate a connection test
                Toast.info({
                  title: `Testing connection for ${value.email}...`,
                });
              });
            },
          },
          {
            type: "submit",
            label: "Submit",
          },
        ],
      },
      () => {
        form.handleSubmit((value) => {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === row.id ? { ...item, ...value } : item
            )
          );
          form.reset();
          Toast.success({ title: "Data source updated successfully!" });
          closeDialog();
        })();
      }
    );
  };
  const columns: Array<ColumnDef<DataSourceType>> = [
    {
      accessorKey: "visible",
      header: "Visible",
      cell: ({ row }: any) => <Switch defaultChecked={row.original.visible} />,
      meta: {
        headerClass: "text-center",
        cellClass: "text-center",
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return <HeaderSorted title="Name" column={column} />;
      },
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
    },
    {
      accessorKey: "connection",
      header: ({ column }) => {
        return <HeaderSorted title="Connection Name" column={column} />;
      },
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return <HeaderSorted title="Type" column={column} />;
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-x-2">
            {row.original.type === "Mysql" ?
              <img src={mysqlIcon} alt="mysql-icon" width="16" />
            : row.original.type === "PostgreSQL" ?
              <img src={postgreSQLIcon} alt="postgresql-icon" width="16" />
            : <img src={mongoIcon} alt="mongodb-icon" width="16" />}
            <span>{row.original.type}</span>
          </div>
        );
      },
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionButton
          id={row.original.id}
          listAction={[
            {
              title: "Edit",
              icon: Pencil,
              onClick: () => {},
            },
            {
              title: "Remove",
              icon: Trash2,
              color: "red",
              onClick: () => {
                openDeleteModal(
                  {
                    title: "Delete Data Source",
                    description:
                      "Are you sure you want to delete this data source? This action cannot be undone.",
                    confirmText: "Delete",
                    cancelText: "Cancel",
                    value: row.original.name,
                  },
                  () => {
                    setData((prevData) =>
                      prevData.filter((item) => item.id !== row.original.id)
                    );
                    Toast.success({
                      title: "Data source deleted successfully!",
                    });
                  }
                );
              },
            },
          ]}
        />
      ),
      meta: {
        headerClass: "text-right",
        cellClass: "text-right",
      },
    },
  ];
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col justify-center text-center">
        <div className="flex justify-between mb-6">
          <SearchBox placeholder="Search here..." setSearch={() => {}} />

          <Button
            onClick={() =>
              openDialog(
                {
                  title: "Add Data Source",
                  iconTitle: HardDrive,
                  content: (
                    <ConnectionLayoutDialog children={<AddDataSource />} />
                  ),
                  buttons: [
                    {
                      type: "button",
                      label: "Test Connection",
                      onClick: () => {
                        form.handleSubmit((value) => {
                          // Simulate a connection test
                          Toast.info({
                            title: `Testing connection for ${value.email}...`,
                          });
                        })();
                      },
                    },
                    {
                      type: "submit",
                      label: "Add source",
                      variant: "secondary",
                    },
                  ],
                },
                () => {
                  form.handleSubmit((value) => {
                    setData((prevData) => [
                      ...prevData,
                      {
                        id: (prevData.length + 1).toString(),
                        name: value.email,
                        type: value.type,
                        connection: "New Connection",
                        visible: true,
                      },
                    ]);
                    form.reset();
                    Toast.success({ title: "Member added successfully!" });
                    closeDialog();
                  })();
                }
              )
            }
          >
            + New Data Source
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          onRowClick={editSourceHandler}
        />
      </div>
    </div>
  );
}

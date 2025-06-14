import {
  useDeleteDialog,
  type DeleteDialogContent,
} from "@/components/ui/DeleteDialogProvider";
import { Button } from "@/components/ui/primitives/button";
import ActionButton from "@/components/ui/data-display/data-table/action-button";
import { DataTable } from "@/components/ui/data-display/data-table/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Toast } from "@/lib/toast";
import { Form } from "@/components/ui/primitives/form";
import { useForm } from "react-hook-form";
import { TableCell, TableRow } from "@/components/ui/data-display/table";
import { Input } from "@/components/ui/primitives/input";
import noData from "@/assets/No Data.svg";

export type TokenProps = {
  id: string;
  name: string;
  creator: string;
  token: string;
};

const listToken: TokenProps[] = [
  {
    id: "1",
    name: "Admin Access",
    creator: "alice@example.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin123",
  },
  {
    id: "2",
    name: "Integration Key",
    creator: "bob@example.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.intkey456",
  },
  {
    id: "3",
    name: "Service Token",
    creator: "carol@example.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.service789",
  },
];

export function Tokens() {
  const [data, setData] = useState<TokenProps[]>(listToken);
  const [showedToken, setShowedToken] = useState<string[]>([]);
  const [showAddToken, setShowAddToken] = useState(false);
  const { openDialog } = useDeleteDialog();

  const form = useForm<TokenProps>({
    defaultValues: {
      id: "",
      name: "",
      creator: "user@example.com",
      token: "",
    },
  });
  const handleClickDelete = (token: DeleteDialogContent) => {
    openDialog(token, (item) => {
      setData((prev) => prev.filter((token) => token.id !== item.id));
      Toast.error({
        title: "Token deleted",
        description: `Token "${item.value}" has been deleted.`,
      });
    });
  };
  const columns: Array<ColumnDef<TokenProps>> = [
    {
      accessorKey: "name",
      header: "Token Name",
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
    },
    {
      accessorKey: "creator",
      header: "Creator",
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
    },
    {
      accessorKey: "token",
      header: "Token",
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
      cell: ({ row }) => (
        <div className="w-70 overflow-hidden whitespace-nowrap text-ellipsis">
          {showedToken.find((o) => o === row.original.id) ? (
            <p className="truncate">{row.original.token}</p>
          ) : (
            <span>************************************</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionButton
          id={row.original.id}
          type="button"
          listAction={[
            {
              title: "View token",
              icon: Eye,
              onClick: () => {
                setShowedToken((prev) =>
                  prev.includes(row.original.id)
                    ? prev.filter((o) => o !== row.original.id)
                    : [...prev, row.original.id]
                );
              },
            },
            {
              title: "Copy token",
              icon: Copy,
              onClick: () => {
                navigator.clipboard.writeText(row.original.token);
                Toast.info({
                  title: "Token copied to clipboard!",
                  Icon: Copy,
                });
              },
            },
            {
              title: "Remove token",
              icon: Trash2,
              color: "red",
              onClick: () => {
                handleClickDelete({
                  title: "Confirm Delete",
                  description: `Are you sure you want to delete the token "${row.original.name}"? This action cannot be undone.`,
                  value: row.original.name,
                  id: row.original.id,
                });
              },
            },
          ]}
        />
      ),
      meta: {
        headerClass: "text-center ",
        cellClass: "text-center",
      },
    },
  ];

  const onSubmit = (data: TokenProps) => {
    setData((prev) => [
      ...prev,
      {
        ...data,
        id: String(prev.length + 1),
        creator: "user@example.com",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
          Math.random().toString(36).substring(2, 15),
      },
    ]);
    setShowAddToken(false);
    form.reset();
    Toast.success({
      title: "Token created",
      description: `Token "${data.name}" has been created.`,
    });
  };
  const onCancel = () => {
    setShowAddToken(false);
    form.reset();
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="flex flex-col justify-center gap-5">
        <div className="flex justify-between items-start">
          <div className="">
            <h2 className="text-xl font-semibold">API Tokens</h2>
            <p>
              Create personal API tokens to use in automation or external apps.
            </p>
          </div>
          <Button onClick={() => setShowAddToken(true)}>Add new token</Button>
        </div>
        <Form {...form}>
          <DataTable
            columns={columns}
            data={data}
            customRow={
              showAddToken ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex items-center justify-between gap-4"
                    >
                      <Input
                        {...form.register("name", { required: "true" })}
                        placeholder="Token Name"
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={onCancel}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                      </div>
                    </form>
                  </TableCell>
                </TableRow>
              ) : null
            }
            emptyTable={
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <img src={noData} alt="" />
                <div className="text-2xl font-semibold">
                  No API Tokens created
                </div>
                <span>
                  Looks like you haven’t generated any API tokens yet.
                </span>
                <Button onClick={() => setShowAddToken(true)}>
                  Create new token
                </Button>
              </div>
            }
          />
        </Form>
      </div>
    </div>
  );
}

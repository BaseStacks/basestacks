import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../../primitives/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../primitives/select";
import type {
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/data-display/table";
import { cn } from "@/lib/utils";
import { getBgColorClass } from "@/lib/colorUtils";

interface PaginationProps {
  pageSize: string | number;
  totalItems: number;
  pageCount: number;
  page: number;
}
interface DataTableColumnMeta {
  headerClass?: string;
  cellClass?: string;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue>
    extends DataTableColumnMeta {}
}

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: Array<TData>;
  paginationInfo?: PaginationProps;
  showPagination?: boolean;
  customRow?: React.ReactNode;
  emptyTable?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginationInfo = {
    pageCount: 20,
    pageSize: 10,
    page: 1,
    totalItems: 50,
  },
  showPagination = false,
  customRow,
  emptyTable,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationProps>(paginationInfo);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <div>
      {table.getRowModel().rows.length || customRow ?
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader
              className={cn(
                "rounded-lg",
                `dark:${getBgColorClass("gray", "600")}`,
                getBgColorClass("gray", "100")
              )}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "text-sm font-medium px-4",
                          getBgColorClass("gray", "100"),
                          `dark:${getBgColorClass("gray", "800")}`,
                          header.column.columnDef.meta?.headerClass ?? ""
                        )}
                      >
                        {header.isPlaceholder ? null : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {customRow}
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`text-sm py-2 px-4 ${
                        cell.column.columnDef.meta?.cellClass ?? ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            {showPagination && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={100} className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <div className="text-muted-foreground text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={`${pagination.pageSize}`}
                          onValueChange={(value) => {
                            setPagination({ ...pagination, pageSize: value });
                          }}
                        >
                          <SelectTrigger>
                            {`${pagination.pageSize} / pages`}
                          </SelectTrigger>
                          <SelectContent side="top">
                            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                              <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="hidden size-8 lg:flex"
                            onClick={() =>
                              setPagination({
                                ...pagination,
                                page: 1,
                              })
                            }
                            disabled={pagination.page == 1}
                          >
                            <ChevronsLeft />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() =>
                              setPagination({
                                ...pagination,
                                page: pagination.page - 1,
                              })
                            }
                            disabled={pagination.page == 1}
                          >
                            <ChevronLeft />
                          </Button>
                          {Array.from(
                            { length: pagination.pageCount },
                            (_, i) => i + 1
                          )
                            .filter((page) => {
                              const isFirst = page <= 2;
                              const isLast = page > pagination.pageCount - 2;
                              const isNearCurrent =
                                Math.abs(page - pagination.page) <= 1;
                              return isFirst || isLast || isNearCurrent;
                            })
                            .reduce<Array<number>>((acc, page, i) => {
                              if (i === 0 || page - acc[acc.length - 1] === 1) {
                                acc.push(page);
                              } else {
                                acc.push(-1, page);
                              }
                              return acc;
                            }, [])
                            .map((page, i) =>
                              page === -1 ?
                                <span key={`ellipsis-${i}`} className="px-2">
                                  ...
                                </span>
                              : <Button
                                  key={page}
                                  variant={
                                    pagination.page === page ?
                                      "default"
                                    : "outline"
                                  }
                                  size="icon"
                                  className="size-8"
                                  onClick={() =>
                                    setPagination({ ...pagination, page })
                                  }
                                >
                                  {page}
                                </Button>
                            )}
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() =>
                              setPagination({
                                ...pagination,
                                page: pagination.page + 1,
                              })
                            }
                            disabled={pagination.page == pagination.pageCount}
                          >
                            <ChevronRight />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="hidden size-8 lg:flex"
                            onClick={() =>
                              setPagination({
                                ...pagination,
                                page: pagination.pageCount,
                              })
                            }
                            disabled={pagination.page == pagination.pageCount}
                          >
                            <ChevronsRight />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
      : <div className="flex flex-col items-center justify-center gap-4 p-8">
          {emptyTable || (
            <>
              <p className="text-muted-foreground">No data available.</p>
            </>
          )}
        </div>
      }
    </div>
  );
}

import { cn } from '@/lib/utils';
import { DataGridCell, DataGridContainer, DataGridHeader, DataGridHeaderGroup, DataGridProvider, DataGridRow, DataGridScrollArea, useDataGrid, usePlugin, LayoutPlugin, useDataGridState, DataGridRowContainer, DataGridCellContent, CellSelectionPlugin } from '@basestacks/datagrid';
import { useMemo, useState } from 'react';

export function BsDataGrid() {
    const [data, setData] = useState<any[]>([{
        id: 1,
        name: 'John Doe',
        email: 's@gmail.com'
    }, {
        id: 2,
        name: 'Jane Smith',
        email: 'd@gmail.com'
    }]);

    const columns = useMemo(() => [
        {
            key: 'id',
            header: 'ID'
        },
        {
            key: 'name',
            header: 'Name'
        },
        {
            key: 'email',
            header: 'Email'
        },
    ], []);

    const dataGrid = useDataGrid({
        rowKey: 'id',
        data: data,
        columns: columns,
        onChange: setData,
    });

    usePlugin(dataGrid, LayoutPlugin);

    const headers = useDataGridState(dataGrid.state.headers);
    const rows = useDataGridState(dataGrid.state.rows);

    return (
        <DataGridProvider dataGrid={dataGrid}>
            <DataGridContainer className={clxs.table}>
                <DataGridHeaderGroup className={clxs.headerGroup}>
                    {headers.map((header, index) => (
                        <DataGridHeader key={index} header={header} className={cn(clxs.header, clxs.cellPinned)} />
                    ))}
                    <span className="absolute right-0 w-[-15px] h-full bg-white dark:bg-gray-950" />
                </DataGridHeaderGroup>
                <DataGridScrollArea className="h-[300px] overflow-auto">
                    <DataGridRowContainer className="relative">
                        {rows.map((row) => (
                            <DataGridRow key={row.id} row={row} className={cn(clxs.row, clxs.rowPinned)}>
                                {row.cells.map((cell) => (
                                    <DataGridCell key={cell.id} cell={cell} className={cn(clxs.cell, clxs.cellActive, clxs.cellSelected, clxs.cellPinned, clxs.cellEditing)}>
                                        <DataGridCellContent cell={cell} className="overflow-hidden line-clamp-1 break-words w-full first-letter:uppercase" />
                                    </DataGridCell>
                                ))}
                            </DataGridRow>
                        ))}
                    </DataGridRowContainer>
                </DataGridScrollArea>
            </DataGridContainer>
        </DataGridProvider>
    );
}


const clxs = {
    table: 'text-sm max-h-[400px]',
    headerGroup: 'bg-white dark:bg-gray-950 ',
    header: 'bg-white dark:bg-gray-950 flex items-center border border-transparent p-2 text-left font-medium text-gray-400 dark:text-gray-200',
    row: 'overflow-hidden border-gray-200 dark:border-gray-600',
    rowPinned: `
        data-pinned:z-20
        data-pinned-top-last:border-b-2
        data-pinned-bottom-first:border-t-2
    `,
    cell: 'user-select-none bg-white flex items-center border border-transparent p-2 text-gray-500 outline-blue-600 dark:text-gray-400 dark:bg-gray-800',
    cellActive: `
        data-active:bg-white 
        data-active:outline 
        data-active:outline-offset-[-1px]
        data-active:bg-gray-800
        dark:data-active:bg-gray-800
    `,
    cellSelected: `
        data-selected:bg-blue-950
        data-[edge-top=true]:border-t-blue-600
        data-[edge-left=true]:border-l-blue-600 
        data-[edge-right=true]:border-r-blue-600 
        data-[edge-bottom=true]:border-b-blue-600
    `,
    cellPinned: `
        data-pinned:z-10
        data-pinned-left-last:border-r-gray-600 
        data-pinned-right-first:border-l-gray-600
        dark:data-pinned-left-last:border-r-gray-600
        dark:data-pinned-right-first:border-l-gray-600
    `,
    cellEditing: `
        data-[editing="inline"]:outline-2
        data-[editing="inline"]:outline-offset-[-2px]
        data-[editing="floating"]:outline-none
        data-[editing="floating"]:border-transparent
    `,
    selectedRangeRect: 'absolute pointer-events-none outline-2 outline-offset-[-2px] outline-blue-600 bg-blue-600/5',
    editor: '',
};

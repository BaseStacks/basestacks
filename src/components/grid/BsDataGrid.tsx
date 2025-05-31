import { cn } from '@/lib/utils';
import { DataGridCell, DataGridContainer, DataGridHeader, DataGridHeaderGroup, DataGridProvider, DataGridRow, DataGridScrollArea, useDataGrid, usePlugin, LayoutPlugin, useDataGridState, DataGridRowContainer, DataGridCellContent, CellSelectionPlugin, CellEditablePlugin, CellFillPlugin, ColumnPinningPlugin, CopyPastePlugin, HistoryPlugin, RowPinningPlugin, StayInViewPlugin, type Column } from '@basestacks/datagrid';
import { GripVertical } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../ui/primitives/button';

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

    const columns = useMemo((): Column[] => [
        {
            key: 'id',
            header: 'ID',
            width: 75,
            selectable: false,
            cell: ({ value }) => (
                <div className='px-2'>
                    <Button variant="ghost" size="iconXs" >
                        <span className='justify-center group-hover/row:hidden'>{value}</span>
                        <GripVertical className='hidden group-hover/row:flex' />
                    </Button>
                </div>
            )
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
    usePlugin(dataGrid, CellSelectionPlugin);
    usePlugin(dataGrid, CellFillPlugin);
    usePlugin(dataGrid, StayInViewPlugin);
    usePlugin(dataGrid, CellEditablePlugin);
    usePlugin(dataGrid, ColumnPinningPlugin, {
        pinnedLeftColumns: [],
        pinnedRightColumns: []
    });
    usePlugin(dataGrid, RowPinningPlugin, {
        pinnedTopRows: [],
        pinnedBottomRows: []
    });
    usePlugin(dataGrid, CopyPastePlugin);
    usePlugin(dataGrid, HistoryPlugin);

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
    headerGroup: 'border-b',
    header: 'flex items-center border-r px-4 text-left font-bold',
    row: 'border-b group/row',
    rowPinned: `
        data-pinned:z-20
        data-pinned-top-last:border-b-2
        data-pinned-bottom-first:border-t-2
    `,
    cell: 'flex items-center border-r',
    cellActive: `
        data-active:outline 
        data-active:outline-offset-[-1px]
    `,
    cellSelected: `
        data-selected:bg-primary/20
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
    selectedRangeRect: 'absolute pointer-events-none outline-2 outline-offset-[-2px] outline-primary bg-blue-600/5',
    editor: '',
};

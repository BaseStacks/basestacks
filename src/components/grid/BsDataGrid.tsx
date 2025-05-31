import { CellEditablePlugin, CellFillPlugin, CellSelectionPlugin, ColumnPinningPlugin, CopyPastePlugin, DataGridCell, DataGridCellContent, DataGridContainer, DataGridFillHandle, DataGridFillRange, DataGridFloatingEditor, DataGridFooter, DataGridFooterGroup, DataGridHeader, DataGridHeaderGroup, DataGridProvider, DataGridRow, DataGridRowContainer, DataGridScrollArea, HistoryPlugin, LayoutPlugin, RowPinningPlugin, StayInViewPlugin, useDataGrid, useDataGridState, usePlugin } from '@basestacks/datagrid';
import { GripVertical, Maximize2, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../ui/primitives/button';
import { Checkbox } from '../ui/primitives/checkbox';

import type { Column, ColumnKey, RowKey } from '@basestacks/datagrid';
import { cn } from '@/lib/utils';

export function BsDataGrid() {
    const [data, setData] = useState<Array<any>>([{
        id: 1,
        name: 'John Doe',
        email: 's@gmail.com'
    }, {
        id: 2,
        name: 'Jane Smith',
        email: 'd@gmail.com'
    }]);

    const columns = useMemo((): Array<Column> => [
        {
            key: 'row-header',
            dataKey: 'id',
            header: 'ID',
            width: 100,
            selectable: false,
            cell: ({ rowIndex }) => (
                <div className='px-2 flex items-center gap-1'>
                    <Button variant="ghost" size="iconXs" >
                        <span className='justify-center group-hover/row:hidden'>{rowIndex + 1}</span>
                        <GripVertical className='hidden group-hover/row:flex' />
                    </Button>
                    <Checkbox className='hidden group-hover/row:flex' />
                    <Button variant="ghost" size="iconXs" className='hidden group-hover/row:flex' >
                        <Maximize2 />
                    </Button>
                </div>
            )
        },
        {
            key: 'name',
            header: 'Name',
            cell: ({ value }) => (
                <div className='px-2'>
                    <span className='first-letter:uppercase'>{value}</span>
                </div>
            ),
        },
        {
            key: 'email',
            header: 'Email',
            cell: ({ value }) => (
                <div className='px-2'>
                    <span className='first-letter:uppercase'>{value}</span>
                </div>
            )
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
        pinnedLeftColumns: [] as Array<ColumnKey>,
        pinnedRightColumns: [] as Array<ColumnKey>
    });
    usePlugin(dataGrid, RowPinningPlugin, {
        pinnedTopRows: [] as Array<RowKey>,
        pinnedBottomRows: [] as Array<RowKey>
    });
    usePlugin(dataGrid, CopyPastePlugin);
    usePlugin(dataGrid, HistoryPlugin);

    const headers = useDataGridState(dataGrid.state.headers);
    const rows = useDataGridState(dataGrid.state.rows);
    const footers = useDataGridState(dataGrid.state.footers);

    return (
        <DataGridProvider dataGrid={dataGrid}>
            <DataGridContainer className={clxs.container}>
                <DataGridHeaderGroup className={clxs.headerGroup}>
                    {headers.map((header, index) => (
                        <DataGridHeader key={index} header={header} className={cn(clxs.header, clxs.cellPinned)} />
                    ))}
                    <Button
                        variant="ghost"
                        className='absolute right-0 top-0 translate-x-full w-[42px] h-[42px] border-b border-r rounded-none'
                    >
                        <Plus />
                    </Button>
                </DataGridHeaderGroup>
                <DataGridScrollArea className="flex-grow overflow-auto">
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
                        <div className='h-[42px] w-full border-b border-r absolute bottom-0 translate-y-full'>
                            <Button variant='ghost' className='w-full h-full rounded-none justify-start !pl-4'>
                                <Plus />
                            </Button>
                        </div>
                    </DataGridRowContainer>
                    <DataGridFillHandle className="size-2 bg-primary z-99 cursor-cell -translate-full" />
                    <DataGridFillRange className="border border-dashed border-primary  z-99 " />
                    <DataGridFloatingEditor className="!z-99" />
                </DataGridScrollArea>
                <DataGridFooterGroup className='border-t'>
                    {footers.map((footer, index) => (
                        <DataGridFooter
                            key={index}
                            footer={footer}
                            className={cn(clxs.header, clxs.cellPinned)}
                        />
                    ))}
                </DataGridFooterGroup>
            </DataGridContainer>
        </DataGridProvider>
    );
}

const clxs = {
    container: 'text-sm flex flex-col h-full',
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
        data-selected:bg-primary/10
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

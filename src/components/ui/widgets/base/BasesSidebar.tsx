import { ChevronDown, ChevronRight, ChevronsLeftIcon, Database, Ellipsis, Grid2x2, LayoutDashboard, Plus, PlusCircle, Search, Square, SquareKanban, Table2, XIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "../../primitives/button";
import { Label } from "../../primitives/label";
import { getTextColorClass } from "@/lib/colorUtils";
import { useBases, useSidebarStatus, useTables, useViews } from "@/states";
import { useIsMobile } from "@/hooks/ui/useIsMobile";

export function BasesSidebar() {
    const isMobile = useIsMobile();
    const sidebarStatus = useSidebarStatus();
    const { getActiveBase } = useBases();

    const activeBase = getActiveBase();

    return (
        <div>
            <div className="h-16 px-4 flex items-center justify-between">
                <div className="grow">
                    <Button size="lg" variant="ghost" className="!px-4">
                        <Database className={getTextColorClass(activeBase.color)} /> {activeBase.name}
                        <ChevronDown />
                    </Button>
                </div>
                {
                    isMobile ? (
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => sidebarStatus.toggleMobile()}
                        >
                            <XIcon />
                        </Button>
                    )
                        : (
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => sidebarStatus.toggle()}
                            >
                                <ChevronsLeftIcon />
                            </Button>
                        )
                }
            </div>
            <div className="flex flex-col gap-2 px-4">
                <div className="py-2 w-full">
                    <Button variant="outline" className="!px-4 w-full">
                        <Search />
                        <span className="grow text-left block font-light">Quick search</span>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">Ctrl K</span>
                        </kbd>
                    </Button>
                </div>
                <div className="w-full flex flex-col gap-1 mb-4">
                    <Button variant="ghost" className="!px-4 w-full">
                        <PlusCircle />
                        <span className="grow text-left ">New table</span>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link
                            to="."
                            search={{ page: 'overview' }}
                            className="!px-4 w-full"
                        >
                            <LayoutDashboard />
                            <span className="grow text-left block">Overview</span>
                        </Link>
                    </Button>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="px-4 mb-2">
                        Tables
                    </Label>
                    <TableList />
                </div>
            </div>
        </div>
    );
}

function TableList() {
    const { tables, activeTableId: activeBaseId } = useTables();

    const [expandedTables, setExpandedTables] = useState<Array<string>>(() => activeBaseId ? [activeBaseId] : [])

    const handleToggleTable = (tableId: string) => {
        setExpandedTables((prev) => {
            if (prev.includes(tableId)) {
                return prev.filter(id => id !== tableId);
            } else {
                return [...prev, tableId];
            }
        })
    };

    return (
        <div className="flex flex-col gap-1">
            {
                tables.map((table) => (
                    <div
                        key={table.id}
                        className="flex flex-col gap-1"
                    >
                        <Button
                            variant="ghost"
                            className="!px-4 w-full !pr-1 group"
                            asChild
                        >
                            <Link
                                to="."
                                search={{ page: 'table', tableId: table.id }}
                            >
                                <Table2 />
                                <span className="grow text-left ">{table.name}</span>
                                <div className="hidden group-hover:flex">
                                    <Button variant="ghost" size="iconXs" >
                                        <Ellipsis />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="iconXs"
                                        onClick={(e) => {
                                            handleToggleTable(table.id);
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}>
                                        {table.id === activeBaseId ? <ChevronDown /> : <ChevronRight />}
                                    </Button>
                                </div>
                            </Link>
                        </Button>
                        {expandedTables.includes(table.id) && (
                            <ViewList tableId={table.id} />
                        )}
                    </div>
                ))
            }
        </div>
    )
}

interface ViewListProps {
    readonly tableId: string;
}

function ViewList({ tableId }: ViewListProps) {
    const { getViewsByTableId } = useViews();

    const views = useMemo(() => getViewsByTableId(tableId), [getViewsByTableId, tableId]);

    return (
        <div className="flex flex-col gap-1">
            <Button
                variant="ghost"
                className="!px-10 w-full"
            >
                <Plus /> <span className="grow text-left">New view</span>
            </Button>
            {views.map((view) => (
                <Button
                    key={view.id}
                    variant="ghost"
                    className="!pl-10 !pr-1 w-full group"
                    asChild
                >
                    <Link
                        to="."
                        search={{ page: 'view', viewId: view.id, tableId: tableId }}
                    >
                        <ViewIcon type={view.type} />
                        <span className="grow text-left">{view.name}</span>
                        <Button
                            variant="ghost"
                            size="iconXs"
                            className="invisible group-hover:visible"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}>
                            <Ellipsis />
                        </Button>
                    </Link>
                </Button>
            ))}
        </div>
    );
}

function ViewIcon({ type }: Readonly<{ readonly type: string }>) {
    switch (type) {
        case 'grid':
            return <Grid2x2 />;
        case 'kanban':
            return <SquareKanban />;
        default:
            return <Square />;
    }

}
import { create } from 'zustand'
import type { Color } from './Types';

interface UseSidebarStatus {
    visible: boolean;
    mobileVisible: boolean;
    toggle: () => void;
    toggleMobile: () => void;
}

export const useSidebarStatus = create<UseSidebarStatus>((set) => ({
    visible: true,
    mobileVisible: false,
    toggle: () => set((state) => ({ visible: !state.visible })),
    toggleMobile: () => set((state) => ({ mobileVisible: !state.mobileVisible })),
}))

export interface UserState {
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
    setUser: (user: { name: string; email: string; avatar?: string }) => void;
}

export const useUserState = create<UserState>((set) => ({
    user: {
        name: 'John Doe',
        email: 'abc@example.com',
        avatar: 'https://example.com/avatar.jpg',
    },
    setUser: (user) => set({ user }),
}));


export interface WorkspacesState {
    workspaces: Array<{
        id: string;
        name: string;
    }>;
    activeWorkspaceId: string;
    addWorkspace: (workspace: { name: string }) => void;
}

export const useWorkspaces = create<WorkspacesState>((set) => ({
    workspaces: [{
        id: '1',
        name: 'Workspace 1',
    }, {
        id: '2',
        name: 'Workspace 2',
    }],
    activeWorkspaceId: '1',
    addWorkspace: (workspace) =>
        set((state) => ({
            workspaces: [...state.workspaces, { id: String(state.workspaces.length + 1), ...workspace }],
        }))
}));

export interface Base {
    id: string;
    name: string;
    description?: string;
    color: Color;
}

export interface BasesState {
    bases: Array<Base>;
    activeBaseId: string;
    getActiveBase: () => Base;
    addBase: (base: Base) => void;
}

export const useBases = create<BasesState>((set, get) => ({
    bases: [{
        id: '1',
        name: 'Base 1',
        description: 'This is the first base.',
        color: 'green',
    }, {
        id: '2',
        name: 'Base 2',
        description: 'This is the second base.',
        color: 'blue',
    }],
    activeBaseId: '1',
    getActiveBase: () => get().bases.find(base => base.id === get().activeBaseId)!,
    addBase: (base) => set((state) => ({ bases: [...state.bases, base] })),
}));

export interface Table {
    id: string;
    name: string;
    baseId: string;
    showViews?: boolean;
}

export interface TablesState {
    tables: Array<Table>;
    activeTableId?: string;
    addTable: (table: Table) => void;
}

export const useTables = create<TablesState>((set) => ({
    tables: [{
        id: '1',
        name: 'Table 1',
        baseId: '1',
    }, {
        id: '2',
        name: 'Table 2',
        baseId: '1',
    }],
    activeTableId: '1',
    addTable: (table) => set((state) => ({ tables: [...state.tables, table] })),
    setShowViews: (tableId: string, showViews: boolean) => set((state) => ({
        tables: state.tables.map(table =>
            table.id === tableId ? { ...table, showViews } : table
        )
    }))
}));

export interface View {
    id: string;
    name: string;
    type: 'grid' | 'kanban' | 'calendar' | 'gallery';
    tableId: string;
}

export interface ViewsState {
    views: Array<View>;
    activeViewId?: string;
    getViewsByTableId: (tableId: string) => Array<View>;
    addView: (view: View) => void;
}

export const useViews = create<ViewsState>((set, get) => ({
    views: [{
        id: '1',
        name: 'View 1',
        type: 'grid',
        tableId: '1',
    }, {
        id: '2',
        name: 'View 2',
        type: 'kanban',
        tableId: '1',
    }],
    activeViewId: '1',
    addView: (view) => set((state) => ({ views: [...state.views, view] })),
    getViewsByTableId: (tableId: string) => get().views.filter(view => view.tableId === tableId),
}));

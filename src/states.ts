import { create } from "zustand";
import type { Color } from "./Types";

interface UseSidebarStatus {
  readonly visible: boolean;
  readonly mobileVisible: boolean;
  readonly toggle: () => void;
  readonly toggleMobile: () => void;
}

export const useSidebarStatus = create<UseSidebarStatus>((set) => ({
  visible: true,
  mobileVisible: false,
  toggle: () => set((state) => ({ visible: !state.visible })),
  toggleMobile: () => set((state) => ({ mobileVisible: !state.mobileVisible })),
}));

interface User {
  readonly name: string;
  readonly email: string;
  readonly avatar?: string;
}

export interface UserState {
  readonly user: User;
  readonly setUser: (user: User) => void;
}

export const useUserState = create<UserState>((set) => ({
  user: {
    name: "John Doe",
    email: "abc@example.com",
    avatar: "https://example.com/avatar.jpg",
  },
  setUser: (user) => set({ user }),
}));

interface Workspace {
  readonly id: string;
  readonly name: string;
}

export interface WorkspacesState {
  readonly workspaces: Array<Workspace>;
  readonly activeWorkspaceId: string;
  readonly addWorkspace: (workspace: Pick<Workspace, "name">) => void;
}

export const useWorkspaces = create<WorkspacesState>((set) => ({
  workspaces: [
    {
      id: "1",
      name: "Workspace 1",
    },
    {
      id: "2",
      name: "Workspace 2",
    },
  ],
  activeWorkspaceId: "1",
  addWorkspace: (workspace) =>
    set((state) => ({
      workspaces: [
        ...state.workspaces,
        { id: String(state.workspaces.length + 1), ...workspace },
      ],
    })),
}));

export interface Base {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly color: Color;
}

export interface BasesState {
  readonly bases: Array<Base>;
  readonly activeBaseId: string;
  readonly getActiveBase: () => Base;
  readonly addBase: (base: Base) => void;
}

export const useBases = create<BasesState>((set, get) => ({
  bases: [
    {
      id: "1",
      name: "Base 1",
      description: "This is the first base.",
      color: "green",
    },
    {
      id: "2",
      name: "Base 2",
      description: "This is the second base.",
      color: "blue",
    },
  ],
  activeBaseId: "1",
  getActiveBase: () => {
    const activeBase = get().bases.find(
      (base) => base.id === get().activeBaseId
    );
    if (!activeBase) {
      throw new Error(`Base with ID ${get().activeBaseId} not found`);
    }
    return activeBase;
  },
  addBase: (base) => set((state) => ({ bases: [...state.bases, base] })),
}));

export interface Table {
  readonly id: string;
  readonly name: string;
  readonly baseId: string;
  readonly showViews?: boolean;
}

export interface TablesState {
  readonly tables: Array<Table>;
  readonly activeTableId?: string;
  readonly addTable: (table: Table) => void;
}

export const useTables = create<TablesState>((set) => ({
  tables: [
    {
      id: "1",
      name: "Table 1",
      baseId: "1",
    },
    {
      id: "2",
      name: "Table 2",
      baseId: "1",
    },
  ],
  activeTableId: "1",
  addTable: (table) => set((state) => ({ tables: [...state.tables, table] })),
  setShowViews: (tableId: string, showViews: boolean) =>
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, showViews } : table
      ),
    })),
}));

export interface View {
  readonly id: string;
  readonly name: string;
  readonly type: "grid" | "kanban" | "calendar" | "gallery";
  readonly tableId: string;
}

export interface ViewsState {
  readonly views: Array<View>;
  readonly activeViewId?: string;
  readonly getViewsByTableId: (tableId: string) => Array<View>;
  readonly addView: (view: View) => void;
}

export const useViews = create<ViewsState>((set, get) => ({
  views: [
    {
      id: "1",
      name: "View 1",
      type: "grid",
      tableId: "1",
    },
    {
      id: "2",
      name: "View 2",
      type: "kanban",
      tableId: "1",
    },
  ],
  activeViewId: "1",
  addView: (view) => set((state) => ({ views: [...state.views, view] })),
  getViewsByTableId: (tableId: string) =>
    get().views.filter((view) => view.tableId === tableId),
}));

export interface Field {
  readonly id: string;
  readonly name: string;
  readonly type: "single-line-text" | "number" | "date" | "select" | "checkbox";
  readonly options?: Array<string>; // For select fields
  readonly tableId: string;
}

export interface FieldsState {
  readonly fields: Array<Field>;
  readonly addField: (field: Field) => void;
  readonly getFieldsByTableId: (tableId: string) => Array<Field>;
}

export const useFields = create<FieldsState>((set, get) => ({
  fields: [
    {
      id: "1",
      name: "Field 1",
      type: "single-line-text",
      tableId: "1",
    },
    {
      id: "2",
      name: "Field 2",
      type: "number",
      tableId: "1",
    },
  ],
  addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
  getFieldsByTableId: (tableId: string) =>
    get().fields.filter((field) => field.tableId === tableId),
}));

import { create } from 'zustand'
import type { Color } from './Types';

interface UseSidebarStatus {
    visible: boolean;
    toggle: () => void;
}

export const useSidebarStatus = create<UseSidebarStatus>((set) => ({
    visible: true,
    toggle: () => set((state) => ({ visible: !state.visible })),
}))

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

export interface BasesState {
    bases: Array<{
        id: string;
        name: string;
        color: Color;
    }>;
    activeBaseId: string;
    addBase: (base: { id: string; name: string; color: Color }) => void;
}

export const useBases = create<BasesState>((set) => ({
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
    addBase: (base) =>
        set((state) => ({
            bases: [...state.bases, base],
        })),
}));

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

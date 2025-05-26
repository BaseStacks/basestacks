import { create } from 'zustand'

interface UseSidebarStatus {
    visible: boolean;
    toggle: () => void;
}

export const useSidebarStatus = create<UseSidebarStatus>((set) => ({
    visible: true,
    toggle: () => set((state) => ({ visible: !state.visible })),
}))
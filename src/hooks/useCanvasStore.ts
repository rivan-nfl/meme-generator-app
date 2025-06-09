import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

export type CanvasItem = {
    id: string;
    type: 'text' | 'image';
    content: string | ImageSourcePropType;
    position: { x: number; y: number };
    color?: string;
};

interface CanvasState {
    backgroundImage: ImageSourcePropType | null;
    items: CanvasItem[];
    selectedItemId: string | null;
    setBackgroundImage: (image: ImageSourcePropType | null) => void;
    setItems: (items: CanvasItem[]) => void;
    updateItem: (id: string, changes: Partial<CanvasItem>) => void;
    duplicateItem: (id: string) => void;
    removeItem: (id: string) => void;
    setSelectedItemId: (id: string | null) => void;
}

const useCanvasStore = create<CanvasState>((set, get) => ({
    backgroundImage: null,
    items: [],
    selectedItemId: null,
    setBackgroundImage: (image) => set({ backgroundImage: image }),
    setItems: (items) => set({ items }),
    updateItem: (id, changes) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, ...changes, position: { ...item.position, ...changes.position } } : item
            ),
        })),
    duplicateItem: (id) => {
        const itemToDuplicate = get().items.find((item) => item.id === id);
        if (!itemToDuplicate) return;
        const duplicated = {
            ...itemToDuplicate,
            id: `${itemToDuplicate.id}-copy-${Date.now()}`,
            position: {
                x: itemToDuplicate.position.x + 20,
                y: itemToDuplicate.position.y + 20,
            },
        };
        set((state) => ({ items: [...state.items, duplicated] }));
    },
    removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    setSelectedItemId: (id) => set({ selectedItemId: id }),
}));

export default useCanvasStore;
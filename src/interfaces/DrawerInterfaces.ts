export interface DrawerStore {
    isOpen: boolean;
    toggleDrawer: () => void;
    closeDrawer: () => void;
    openDrawer: () => void;
}

export enum AnchorType {
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom',
}
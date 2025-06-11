import { useShallow } from "zustand/shallow";
import useDrawerStore from "../../stores/DrawerStore";
import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";


const DrawerToggler: React.FC = () => {
    // STORES
    const { toggleDrawer } = useDrawerStore(useShallow(state => ({
        toggleDrawer: state.toggleDrawer,
    })));

    return (
        <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
        >
            <MenuIcon />
        </IconButton>
    )
};

export default DrawerToggler;
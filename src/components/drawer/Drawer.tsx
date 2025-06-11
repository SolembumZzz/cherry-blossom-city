import React from "react";

import useDrawerStore from "../../stores/DrawerStore";
import { useShallow } from 'zustand/shallow';

import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material";
import { AnchorType } from "../../interfaces/DrawerInterfaces";
import { Inbox as InboxIcon, Mail as MailIcon } from "@mui/icons-material";

const Drawer: React.FC = () => {
    // STORES
    const { isOpen, closeDrawer, openDrawer } = useDrawerStore(useShallow((state) => ({
        isOpen: state.isOpen,
        closeDrawer: state.closeDrawer,
        openDrawer: state.openDrawer,
    })));

    const list = () => (
        <React.Fragment>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );

    return (
        <SwipeableDrawer
            anchor={AnchorType.RIGHT}
            open={isOpen}
            onClose={closeDrawer}
            onOpen={openDrawer}
        >
            {list()}
        </SwipeableDrawer>
    )
};

export default Drawer;
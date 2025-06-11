import { useState } from "react";
import DrawerToggler from "./DrawerToggler";
import SearchField from "./SearchField";
import NotificationButton from "./NotifcationButton";

import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, styled, Toolbar, Tooltip, Typography } from "@mui/material";
import img from "../../assets/images/avatar-placeholder.jpg";

const Header: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const StyledAppBar = styled(AppBar)(() => ({
        position: "absolute",
    }));

    const StyledToolbar = styled(Toolbar)(({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-between',
            padding: theme.spacing(0),
        }
    }));

    const WelcomeWrapper = styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    }));

    const ButtonWrapper = styled(Box)(({ theme }) => ({
        display: "flex",
        gap: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
        },
        justifyContent: 'flex-end',
    }));

    return (
        <StyledAppBar>
            <StyledToolbar>
                <Box>
                    <Tooltip title='Open settings'>
                        <IconButton onClick={handleOpenUserMenu}>
                            <Avatar src={img} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <WelcomeWrapper>
                    <Typography>
                        Welcome,
                    </Typography>
                    <Typography
                        variant="h5"
                    >
                        Han Nguyen
                    </Typography>
                </WelcomeWrapper>
                <ButtonWrapper>
                    <SearchField />
                    <NotificationButton />
                    <DrawerToggler />
                </ButtonWrapper>
            </StyledToolbar >
        </StyledAppBar >
    )
};

export default Header;
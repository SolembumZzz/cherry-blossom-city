import { alpha, Box, ClickAwayListener, Grow, IconButton, InputBase, styled, Theme, useMediaQuery } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material";
import { useRef, useState } from "react";


const SearchField: React.FC = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return isMobile ? <XsSearchField /> : <SmSearchField />
};

const SmSearchField: React.FC = () => {
    const SearchWrapper = styled('div')(({ theme }) => ({
        display: 'flex',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('md')]: {
                width: '12em',
                '&:focus': {
                    width: '20em',
                },
            },
        },
    }));

    return (
        <SearchWrapper>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": 'search' }}
            />
        </SearchWrapper>
    )
};

const XsSearchField: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const searchIcoRef = useRef<HTMLButtonElement>(null);

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        if (isOpen) {
            if (searchIcoRef.current?.contains(event.target as Node))
                return;
        }
        
        setIsOpen(false);
    };

    const SearchInputWrapper = styled(Box)(({ theme }) => ({
        position: 'fixed',
        top: '64px',
        left: 0,
        width: '80vw',
        transform: 'translateX(10vw)',
        zIndex: theme.zIndex.appBar + 1,
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        width: '100%',
        padding: theme.spacing(0.5),
        backgroundColor: alpha(theme.palette.primary.main, 0.8),
        borderRadius: 1,
        '& .MuiInputBase-input': {
            textAlign: 'end',
            padding: theme.spacing(0.5, 1),
            backgroundColor: 'white',
        },
    }));

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Search"
                onClick={() => setIsOpen(prevState => !prevState)}
                ref={searchIcoRef}
            >
                <SearchIcon />
            </IconButton>
            {
                isOpen &&
                <ClickAwayListener onClickAway={handleClickAway}>

                    <SearchInputWrapper>
                        <Grow
                            in={isOpen}
                            style={{
                                transformOrigin: 'top center'
                            }}
                            {...(isOpen ? { timeout: 500 } : {})}
                        >
                            <StyledInputBase
                                placeholder="Search..."
                                inputProps={{ 'aria-label': 'search', autoFocus: true }}
                            />
                        </Grow>
                    </SearchInputWrapper>
                </ClickAwayListener >
            }
        </>
    )
};

export default SearchField;
import { useState } from "react";

import { BottomNavigationAction, BottomNavigation as Navigation } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QrScanner from "../QrScanner/QrScanner";

const BottomNavigation = () => {
    const [selectedNavigation, setSelectedNavigation] = useState<number>(0);
    const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);

    const handleScannerClose = () => {
        setIsScannerOpen(false);
    };

    const onScan = (data: string | null) => {
        console.log(data);
    };


    return (
        <>
            <Navigation
                onChange={(_, newValue) => setSelectedNavigation(newValue)}
                showLabels
                value={selectedNavigation}
                sx={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Scan QR" icon={<QrCodeScannerIcon />} onClick={() => setIsScannerOpen(true)} />
                <BottomNavigationAction label="Personal" icon={<AccountCircleIcon />} />
            </Navigation>
            <QrScanner
                isOpen={isScannerOpen}
                onClose={handleScannerClose}
                onScan={onScan}
            />
        </>
    )
};

export default BottomNavigation;

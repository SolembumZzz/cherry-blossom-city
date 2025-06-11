import React, { useEffect, useRef, useState } from 'react';
import { QrScannerProps } from '../../interfaces/QrScannerInterfaces';
import { AppBar, Box, Button, Dialog, IconButton, Theme, Toolbar, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { SlideUp } from '../../assets/MaterialUI/Transition';

import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const QrScanner: React.FC<QrScannerProps> = ({
    isOpen = false,
    onClose = () => { },
    onScan
}) => {
    const defaultScanResult = null;

    const webcamRef = useRef<Webcam>(null);
    const [scanResult, setScanResult] = useState<string | null>(defaultScanResult);

    const handleClose = () => {
        setScanResult(defaultScanResult);
        onClose();
    };

    const captureAndScan = () => {
        if (!webcamRef.current) return;

        const imageSrc = webcamRef.current.getScreenshot();

        if (imageSrc) {
            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;

                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

                    if (qrCode) {
                        setScanResult(qrCode.data); // Display QR code data
                    }
                }
            };
        }
    };

    useEffect(() => {
        const interval = setInterval(captureAndScan, 500); // Scan every 500ms
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={handleClose}
                slots={{
                    transition: SlideUp,
                }}
                sx={(theme: Theme) => ({
                    "& .MuiPaper-root": {
                        backgroundColor: theme.palette.primary.main,
                    },
                })}
            >
                <AppBar
                    sx={{
                        position: 'relative'
                    }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            QR Scan
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexGrow: 1,
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Webcam
                                ref={webcamRef}
                                audio={false}
                                screenshotFormat="image/png"
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    border: '1px solid #ccc',
                                }}
                                videoConstraints={{
                                    facingMode: {
                                        ideal: 'environment'
                                    }
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '20%',
                                    left: '25%',
                                    width: '50%',
                                    height: '30%',
                                    border: '2px solid red',
                                    pointerEvents: 'none',
                                }}
                            ></div>
                        </div>
                        {scanResult && (
                            <div style={{ marginTop: '20px' }}>
                                <h3>QR Code Data:</h3>
                                <p>{scanResult}</p>
                            </div>
                        )}
                    </div>
                </Box>
            </Dialog>
        </>
    );
};

export default QrScanner;
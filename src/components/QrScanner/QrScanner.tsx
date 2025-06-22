import React, { useEffect, useRef, useState } from 'react';
import { QrScannerProps } from '../../interfaces/QrScannerInterfaces';
import { AppBar, Box, Button, Dialog, IconButton, styled, Theme, Toolbar, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { SlideUp } from '../../theme/Transition';

import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const QrScanner: React.FC<QrScannerProps> = ({
    isOpen = false,
    onClose = () => { },
    onScan
}) => {
    // CONSTANTS
    const defaultScanResult = null;

    // REFS
    const webcamRef = useRef<Webcam>(null);

    // STATES
    const [scanResult, setScanResult] = useState<string | null>(defaultScanResult);


    // CUSTOM FUNCTIONS
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

    // EFFECTS
    useEffect(() => {
        const interval = setInterval(captureAndScan, 500); // Scan every 500ms

        return () => {
            clearInterval(interval);
        }
    }, []);

    // TEMPLATES
    const ContentWrapper = styled(Box)({
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
    });

    const CameraWrapper = styled(Box)({
        width: '90%',
        maxWidth: 500,
        position: 'relative',
        aspectRatio: '4 / 3',
        borderRadius: 1,
        overflow: 'hidden',
    });

    const Diode = styled('div')(({ theme }) => ({
        width: '100%',
        height: '100%',
        position: 'relative',
        animation: 'beam .01s infinite',

        '@keyframes beam': {
            '50%': {
                opacity: 0,
            },
        },

        '&>.laser': {
            position: 'absolute',
            width: '100%',
            animation: 'scanning 1.5s infinite',
            animationTimingFunction: 'linear',
            animationDirection: 'alternate',
            height: theme.spacing(0.25),
            backgroundColor: theme.palette.error.main,
            boxShadow: `0 0 ${theme.spacing(0.5)} ${theme.palette.primary.main}`,
        },

        '@keyframes scanning': {
            '0%': {
                top: '10%'
            },
            '100%': {
                top: '90%',
            }
        },
    }));

    const ScanEffect: React.FC = () => {
        return (
            <Diode>
                <div className="laser"></div>
            </Diode>
        )
    };

    const ScanResultWrapper = styled(Box)({
        display: 'flex',
        position: 'absolute',
        bottom: 8,
    });

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
                <ContentWrapper>
                    <CameraWrapper>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/png"
                            videoConstraints={{
                                facingMode: {
                                    ideal: 'environment'
                                }
                            }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <ScanEffect />
                    </CameraWrapper>
                    {scanResult && (
                        <ScanResultWrapper>
                            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                Scanned:
                            </Typography>
                            <Typography variant="body2">
                                {scanResult}
                            </Typography>
                        </ScanResultWrapper>
                    )}
                </ContentWrapper>
            </Dialog>
        </>
    );
};

export default QrScanner;
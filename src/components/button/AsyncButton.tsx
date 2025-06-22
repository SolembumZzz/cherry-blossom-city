import React, { useCallback, useState } from 'react';
import { AsyncButtonProps } from '../../interfaces/ButtonInterface';

import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Fab } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { green } from '@mui/material/colors';

enum AsyncButtonState {
    IDLE,
    LOADING,
    SUCCESS,
};

const AsyncButton: React.FC<AsyncButtonProps> = ({
    asyncButtonType = 'default',
    asyncAction,
    children,
    loadingText,
    actionDoneText,
    onSuccess,
    lingerDuration = 1000,
    progressColor = 'inherit',
    ...muiButtonProps
}) => {
    const [status, setStatus] = useState<AsyncButtonState>(AsyncButtonState.IDLE);

    const handleClick = useCallback(async () => {
        if (status === AsyncButtonState.LOADING) {
            return;
        }

        try {
            setStatus(AsyncButtonState.LOADING);

            const result = await asyncAction();

            setStatus(AsyncButtonState.SUCCESS);
            onSuccess?.(result);

            setTimeout(() => {
                setStatus(AsyncButtonState.IDLE);
            }, lingerDuration);

        } catch (error) {
            setStatus(AsyncButtonState.IDLE);
        }
    }, [asyncAction, onSuccess, status, lingerDuration]);

    const isLoading = status === AsyncButtonState.LOADING;
    const isSuccess = status === AsyncButtonState.SUCCESS;

    switch (asyncButtonType) {
        case 'circle':
            return (
                <React.Fragment>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={{
                            position: 'relative',
                            ...(isSuccess && {
                                bgcolor: green[500],
                                '&:hover': {
                                    bgcolor: green[700],
                                },
                            }),
                        }}
                        onClick={handleClick}
                    >
                        {isSuccess ? <CheckIcon /> : <SaveIcon />}
                        {
                            isLoading &&
                            <CircularProgress
                                size={67}
                                sx={{
                                    color: progressColor,
                                    position: 'absolute',
                                    zIndex: 1,
                                }}
                            />
                        }
                    </Fab>
                </React.Fragment>
            )
        default:
            return (
                <MuiButton
                    {...muiButtonProps}
                    onClick={handleClick}
                    disabled={muiButtonProps.disabled || isLoading || isSuccess}
                    sx={{
                        ...muiButtonProps.sx,
                        position: 'relative',
                    }}
                >
                    {
                        isLoading
                        && (
                            <CircularProgress
                                size={20}
                                sx={{
                                    color: progressColor,
                                    position: 'absolute',
                                    transform: 'translate(50%, 50%)',
                                }}
                            />
                        )
                    }
                    {
                        isLoading
                            ? loadingText
                            : isSuccess
                                ? (actionDoneText ?? children)
                                : children
                    }
                </MuiButton>
            );
    }
};

export default AsyncButton;
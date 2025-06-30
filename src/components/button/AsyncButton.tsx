import React, { useCallback, useState } from 'react';
import { AsyncButtonProps } from '../../interfaces/AsyncButtonInterface';

import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Fab } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import ErrorIcon from '@mui/icons-material/Error';
import { green } from '@mui/material/colors';

export enum AsyncButtonState {
    IDLE,
    LOADING,
    SUCCESS,
    FAIL,
};

const AsyncButton: React.FC<AsyncButtonProps> = ({
    asyncButtonType = 'default',
    asyncAction,
    children,
    loadingText,
    actionDoneText,
    isAsyncActionSuccess = true,
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

            await asyncAction();

            setStatus(isAsyncActionSuccess ? AsyncButtonState.SUCCESS : AsyncButtonState.FAIL);

            setTimeout(() => {
                setStatus(AsyncButtonState.IDLE);
            }, lingerDuration);

        } catch (error) {
            setStatus(AsyncButtonState.IDLE);
        }
    }, [asyncAction, isAsyncActionSuccess, status, lingerDuration]);

    const isLoading = status === AsyncButtonState.LOADING;

    const iconTemplate = () => {
        switch (status) {
            case AsyncButtonState.SUCCESS:
                return <CheckIcon />
            case AsyncButtonState.FAIL:
                return <ErrorIcon />
            default:
                return <SaveIcon />
        }
    };

    switch (asyncButtonType) {
        case 'circle':
            return (
                <React.Fragment>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={{
                            position: 'relative',
                            ...(isAsyncActionSuccess && {
                                bgcolor: green[500],
                                '&:hover': {
                                    bgcolor: green[700],
                                },
                            }),
                        }}
                        onClick={handleClick}
                    >
                        {iconTemplate()}
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
                    disabled={muiButtonProps.disabled || isLoading || isAsyncActionSuccess}
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
                            : isAsyncActionSuccess
                                ? (actionDoneText ?? children)
                                : children
                    }
                </MuiButton>
            );
    }
};

export default AsyncButton;
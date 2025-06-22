import { CircularProgressPropsColorOverrides } from '@mui/material';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { OverridableStringUnion } from '@mui/types';

export interface AsyncButtonProps extends MuiButtonProps {
    /**
     * @default DEFAULT
     */
    asyncButtonType?: 'default' | 'circle',

    /** 
    * A function that performs your async work and returns a Promise.
    * The button will show its spinner until this Promise settles.
    */
    asyncAction: () => Promise<any>;

    /** Text (or node) to display while loading */
    loadingText?: React.ReactNode;

    /** Text (or node) to display on success; if omitted falls back to children */
    actionDoneText?: React.ReactNode;

    /** 
     * duration to display the success text
     * @default 1000
     */
    lingerDuration?: number,

    /**
     * Callback fired with the resolved value of `action`.
     * You can use this to update parent state or show notifications.
     */
    onSuccess?: (value: any) => void;

    /**
     * @default inherit
     */
    progressColor?: string,
};
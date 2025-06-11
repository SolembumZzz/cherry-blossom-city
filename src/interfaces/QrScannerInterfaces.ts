export interface QrScannerProps {
    isOpen?: boolean,
    onClose?: () => void
    onScan?: (data: string | null) => void
}
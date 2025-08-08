// components/QRReaderModal.tsx
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/library';

export interface QRReaderModalProps {
    open: boolean;
    onClose: () => void;
    onScan: (data: string | null) => void;
}

const QRReaderModal = ({ open, onClose, onScan }: QRReaderModalProps) => {
    const [error, setError] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const codeReader = useRef<BrowserMultiFormatReader | null>(null);

    useEffect(() => {
        if (!open) {
            setError(null);
            setIsScanning(false);
            // Stop scanning when modal is closed
            if (codeReader.current) {
                codeReader.current.reset();
            }
            return;
        }

        // Initialize scanner when modal opens
        const startScanning = async () => {
            try {
                setIsScanning(true);
                setError(null);

                if (!codeReader.current) {
                    codeReader.current = new BrowserMultiFormatReader();
                }

                const videoElement = videoRef.current;
                if (!videoElement) return;

                // Get available video devices
                const videoInputDevices = await codeReader.current.listVideoInputDevices();

                if (videoInputDevices.length === 0) {
                    throw new Error('No camera devices found');
                }

                // Use the first available camera (usually back camera)
                const selectedDeviceId = videoInputDevices[0].deviceId;

                // Start decoding from video device
                codeReader.current.decodeFromVideoDevice(
                    selectedDeviceId,
                    videoElement,
                    (result, error) => {
                        if (result) {
                            onScan(result.getText());
                            onClose();
                        }
                        if (error && error.name !== 'NotFoundException') {
                            setError('Failed to scan QR code');
                        }
                    }
                );
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Camera access denied');
                setIsScanning(false);
            }
        };

        startScanning();

        // Cleanup function
        return () => {
            if (codeReader.current) {
                codeReader.current.reset();
            }
        };
    }, [open, onScan, onClose]);

    if (!open) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
            <div className="relative bg-[#111] rounded-xl shadow-xl p-6 w-11/12 max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-neon hover:text-neon/80"
                    aria-label="Close modal"
                    title="Close"
                >
                    <X className="h-6 w-6" />
                </button>

                <h3 className="text-lg font-semibold text-neon mb-4 text-center">
                    Scan QR Code
                </h3>

                <div className="relative">
                    {isScanning ? (
                        <video
                            ref={videoRef}
                            className="w-full h-64 bg-black rounded-lg"
                            autoPlay
                            playsInline
                            muted
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                            <p className="text-gray-400">Initializing camera...</p>
                        </div>
                    )}
                </div>

                {error && (
                    <p className="mt-2 text-red-400 text-sm text-center">{error}</p>
                )}
            </div>
        </motion.div>
    );
};

export default QRReaderModal;

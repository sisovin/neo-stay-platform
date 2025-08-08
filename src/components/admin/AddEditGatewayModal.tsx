// components/AddEditGatewayModal.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Gateway } from './PaymentMethods';

export interface AddEditGatewayModalProps {
    open: boolean;
    onClose: () => void;
    gateway: Gateway | null;          // null → add mode
    onSave: (gw: Gateway) => void;
}

const AddEditGatewayModal = ({
    open,
    onClose,
    gateway,
    onSave,
}: AddEditGatewayModalProps) => {
    const [form, setForm] = useState<Gateway>({
        id: '',
        name: '',
        type: 'Other',
        active: true,
        apiKey: '',
        apiSecret: '',
        default: false,
    });

    useEffect(() => {
        if (gateway) setForm(gateway);
        else setForm({
            id: '',
            name: '',
            type: 'Other',
            active: true,
            apiKey: '',
            apiSecret: '',
            default: false,
        });
    }, [gateway]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setForm((f) => ({
            ...f,
            [name]: type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.type) return;
        // Assign a new ID if adding
        if (!form.id) form.id = `gw-${Date.now()}`;
        onSave(form);
        onClose();
    };

    if (!open) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
            <div className="bg-[#111] rounded-xl shadow-xl w-full max-w-md mx-4 p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-neon hover:text-neon/80"
                    title="Close modal"
                >
                    <X className="h-6 w-6" />
                </button>

                <h3 className="text-lg font-semibold text-neon mb-4">
                    {gateway ? 'Edit Gateway' : 'Add New Gateway'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-neon mb-1">
                            Gateway Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter gateway name"
                            className="w-full bg-[#222] px-3 py-2 rounded-md text-neon focus:outline-none focus:ring-2 ring-neon"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-neon mb-1">
                            Type
                        </label>
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full bg-[#222] px-3 py-2 rounded-md text-neon focus:outline-none focus:ring-2 ring-neon"
                            aria-label="Gateway Type"
                        >
                            <option value="ABA PayWay">ABA PayWay</option>
                            <option value="Bakong NBS">Bakong NBS</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* API Key / Secret */}
                    {(form.type === 'ABA PayWay' || form.type === 'Bakong NBC') && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-neon mb-1">
                                    API Key
                                </label>
                                <input
                                    type="text"
                                    name="apiKey"
                                    value={form.apiKey}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter API Key"
                                    className="w-full bg-[#222] px-3 py-2 rounded-md text-neon focus:outline-none focus:ring-2 ring-neon"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neon mb-1">
                                    API Secret
                                </label>
                                <input
                                    type="password"
                                    name="apiSecret"
                                    value={form.apiSecret}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter API Secret"
                                    className="w-full bg-[#222] px-3 py-2 rounded-md text-neon focus:outline-none focus:ring-2 ring-neon"
                                />
                            </div>
                        </>
                    )}

                    {/* Status toggles */}
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 text-neon">
                            <input
                                type="checkbox"
                                name="active"
                                checked={form.active}
                                onChange={handleChange}
                                className="accent-neon"
                                title="Active"
                                aria-label="Active"
                            />
                            <span>Active</span>
                        </label>
                        <label className="flex items-center space-x-2 text-neon">
                            <input
                                type="checkbox"
                                name="default"
                                checked={form.default}
                                onChange={handleChange}
                                className="accent-neon"
                            />
                            <span>Set as Default</span>
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-[#333] rounded-md text-neon hover:bg-[#444] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center space-x-2 px-5 py-2 bg-neon text-[#111] rounded-md hover:bg-neon/80 transition-colors"
                        >
                            <Check className="h-5 w-5" />
                            <span>{gateway ? 'Save Changes' : 'Create Gateway'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};
export default AddEditGatewayModal;
// components/PaymentMethods.tsx
import { useState, useMemo } from 'react';
import { DataTable } from '../transactions/DataTable';
import { StatusBadge } from '../transactions/StatusBadge';
import { ActionMenu } from '../transactions/ActionMenu';
import { Plus, X, Edit, QrCode } from 'lucide-react';
import AddEditGatewayModal from './AddEditGatewayModal';
import QRReaderModal from './QRReaderModal';


export interface Gateway {
    id: string;
    name: string;
    type: 'ABA PayWay' | 'Bakong NBC' | 'Other';
    active: boolean;
    apiKey: string;
    apiSecret: string;
    default: boolean;
}

const PaymentMethods = () => {
    /* -----------------  State  ----------------- */
    const [gateways, setGateways] = useState<Gateway[]>([
        {
            id: 'gw-001',
            name: 'ABA PayWay',
            type: 'ABA PayWay',
            active: true,
            apiKey: 'ABAPAY123',
            apiSecret: 'SECRET123',
            default: true,
        },
        {
            id: 'gw-002',
            name: 'Bakong NBC',
            type: 'Bakong NBC',
            active: false,
            apiKey: '',
            apiSecret: '',
            default: false,
        },
    ]);

    const [editing, setEditing] = useState<Gateway | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [selectedGatewayForQR, setSelectedGatewayForQR] = useState<Gateway | null>(null);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    /* -----------------  Handlers  ----------------- */
    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const setDefault = (id: string) => {
        setGateways((g) =>
            g.map((x) => ({
                ...x,
                default: x.id === id ? true : false
            }))
        );
        showNotification('Default payment gateway updated successfully', 'success');
    };

    const toggleActive = (id: string) => {
        const gateway = gateways.find(g => g.id === id);
        setGateways((g) =>
            g.map((x) =>
                x.id === id ? { ...x, active: !x.active } : x
            )
        );
        showNotification(
            `Gateway ${gateway?.active ? 'deactivated' : 'activated'} successfully`,
            'success'
        );
    };

    const deleteGateway = (id: string) => {
        const gateway = gateways.find(g => g.id === id);

        // Prevent deletion of default gateway if it's the only one
        if (gateway?.default && gateways.length === 1) {
            alert('Cannot delete the only payment gateway. Add another gateway first.');
            return;
        }

        // Warn if deleting default gateway
        if (gateway?.default) {
            if (!window.confirm('This is your default payment gateway. Are you sure you want to delete it? Another gateway will need to be set as default.')) {
                return;
            }
        } else {
            if (!window.confirm('Are you sure you want to delete this payment gateway?')) {
                return;
            }
        }

        setGateways((g) => {
            const remainingGateways = g.filter((x) => x.id !== id);

            // If we deleted the default gateway, set the first remaining as default
            if (gateway?.default && remainingGateways.length > 0) {
                remainingGateways[0].default = true;
            }

            showNotification('Payment gateway deleted successfully', 'success');
            return remainingGateways;
        });
    };

    const openEdit = (gw: Gateway) => {
        setEditing(gw);
        setShowAddEdit(true);
    };

    const openAdd = () => {
        setEditing(null);
        setShowAddEdit(true);
    };

    const columns = [
        { key: 'name' as keyof Gateway, label: 'Name', sortable: true },
        { key: 'type' as keyof Gateway, label: 'Type', sortable: true },
        {
            key: 'default' as keyof Gateway,
            label: 'Default',
            formatter: (v: boolean) =>
                v ? <StatusBadge status="Completed" /> : <StatusBadge status="Failed" />,
        },
        {
            key: 'active' as keyof Gateway,
            label: 'Active',
            formatter: (v: boolean) =>
                v ? <StatusBadge status="Completed" /> : <StatusBadge status="Failed" />,
        },
        {
            key: 'id' as keyof Gateway,
            label: 'Actions',
            formatter: (_: any) => {
                // Since we need the full row object, we'll need to find it by id
                // This is a workaround since DataTable only passes the cell value
                const rowId = _ as string;
                const row = gateways.find(g => g.id === rowId);
                if (!row) return null;

                return (
                    <ActionMenu
                        items={[{
                            label: 'Edit',
                            icon: Edit,
                            onClick: () => openEdit(row),
                        },
                        {
                            label: 'Delete',
                            icon: X,
                            onClick: () => deleteGateway(row.id),
                        },
                        {
                            label: row.default ? 'Unset Default' : 'Set Default',
                            icon: Plus,
                            onClick: () => setDefault(row.id),
                        },
                        {
                            label: row.active ? 'Deactivate' : 'Activate',
                            icon: Plus,
                            onClick: () => toggleActive(row.id),
                        },
                        {
                            label: 'QR Code',
                            icon: QrCode,
                            onClick: () => {
                                setSelectedGatewayForQR(row);
                                setShowQR(true);
                            },
                        },
                        ]}
                        className="ml-2"
                    />
                );
            },
        },
    ];

    /* -----------------  Render  ----------------- */
    return (
        <div className="space-y-4 bg-black min-h-screen p-6 text-white">
            {/* Notification */}
            {notification && (
                <div className={`p-4 rounded-md ${notification.type === 'success'
                    ? 'bg-green-900/30 text-green-400 border border-green-800/50'
                    : 'bg-red-900/30 text-red-400 border border-red-800/50'
                    }`}>
                    {notification.message}
                </div>
            )}

            <div className="flex flex-wrap justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-white">
                    Payment Gateways
                </h2>
                <button
                    onClick={openAdd}
                    className="flex items-center space-x-1 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 px-4 py-2 rounded-md transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    <span>Add Gateway</span>
                </button>
            </div>

            <DataTable<Gateway>
                data={gateways}
                columns={columns}
                rowsPerPage={10}
                emptyMessage="No payment gateways found"
            />

            {/* Add / Edit modal */}
            <AddEditGatewayModal
                open={showAddEdit}
                onClose={() => {
                    setShowAddEdit(false);
                    setEditing(null);
                }}
                gateway={editing}
                onSave={(gw) => {
                    setGateways((g) => {
                        // If editing existing gateway
                        if (editing && editing.id) {
                            showNotification('Payment gateway updated successfully', 'success');
                            return g.map((x) => (x.id === gw.id ? gw : x));
                        }

                        // If adding new gateway, generate unique ID
                        const newGateway = {
                            ...gw,
                            id: gw.id || `gw-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                        };

                        showNotification('Payment gateway created successfully', 'success');

                        // If setting as default, unset others
                        if (newGateway.default) {
                            return [...g.map(x => ({ ...x, default: false })), newGateway];
                        }

                        return [...g, newGateway];
                    });
                    setShowAddEdit(false);
                    setEditing(null);
                }}
            />

            {/* QR‑Reader modal */}
            <QRReaderModal
                open={showQR}
                onClose={() => {
                    setShowQR(false);
                    setSelectedGatewayForQR(null);
                }}
                onScan={(data) => {
                    console.log('QR data scanned:', data);
                    if (selectedGatewayForQR) {
                        console.log('Gateway context:', selectedGatewayForQR.name);
                        // Here you could process the QR data for the specific gateway
                        alert(`QR Code scanned for ${selectedGatewayForQR.name}: ${data}`);
                    }
                    setShowQR(false);
                    setSelectedGatewayForQR(null);
                }}
            />
        </div>
    );
};

export default PaymentMethods;


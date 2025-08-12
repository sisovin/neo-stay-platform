// components/PaymentTransactions.tsx
import { useMemo, useState } from 'react';
import { DataTable } from '../transactions/DataTable';
import { StatusBadge } from '../transactions/StatusBadge';
import { ActionMenu } from '../transactions/ActionMenu';
import { Edit, Trash2, RotateCcw } from 'lucide-react';
import { Transaction } from '@/types/admin';


const PaymentTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 'TXN-001',
            user: 'John Doe',
            amount: 120.50,
            method: 'ABA PayWay',
            status: 'Completed',
            date: '2024-07-12',
        },
        {
            id: 'TXN-002',
            user: 'Jane Smith',
            amount: 89.99,
            method: 'Bakong NBC',
            status: 'Pending',
            date: '2024-07-11',
        },
        {
            id: 'TXN-003',
            user: 'Bob Wilson',
            amount: 245.75,
            method: 'ABA PayWay',
            status: 'Failed',
            date: '2024-07-10',
        },
        {
            id: 'TXN-004',
            user: 'Alice Johnson',
            amount: 67.25,
            method: 'Bakong NBC',
            status: 'Processing',
            date: '2024-07-09',
        },
    ]);

    const columns = [
        { key: 'id' as keyof Transaction, label: 'ID', sortable: true },
        { key: 'user' as keyof Transaction, label: 'User', sortable: true },
        {
            key: 'amount' as keyof Transaction,
            label: 'Amount',
            sortable: true,
            formatter: (v: number) => `$${v.toFixed(2)}`,
        },
        { key: 'method' as keyof Transaction, label: 'Method', sortable: true },
        {
            key: 'status' as keyof Transaction,
            label: 'Status',
            formatter: (v: Transaction['status']) => <StatusBadge status={v} />,
        },
        { key: 'date' as keyof Transaction, label: 'Date', sortable: true },
    ];

    // Create a custom actions column component since DataTable expects unique keys
    const ActionsColumn = ({ transaction }: { transaction: Transaction }) => (
        <ActionMenu
            items={[
                {
                    label: 'View Details',
                    icon: Edit,
                    onClick: () => alert(`View details for transaction ${transaction.id}`),
                },
                {
                    label: 'Refund',
                    icon: Trash2,
                    onClick: () => {
                        if (window.confirm(`Are you sure you want to refund transaction ${transaction.id}?`)) {
                            setTransactions((t) => t.filter((x) => x.id !== transaction.id));
                        }
                    },
                },
                {
                    label: transaction.status === 'Pending' ? 'Approve' : 'Update Status',
                    icon: RotateCcw,
                    onClick: () =>
                        setTransactions((t) =>
                            t.map((x) =>
                                x.id === transaction.id ? {
                                    ...x,
                                    status: transaction.status === 'Pending' ? 'Completed' : 'Processing' as Transaction['status']
                                } : x
                            )
                        ),
                },
            ]}
            className="ml-2"
        />
    );

    // The DataTable component accepts `any` generic; we cast the columns accordingly.
    return (
        <div className="space-y-4 bg-black min-h-screen p-6 text-white">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-white">
                    Payment Transactions
                </h2>
            </div>

            <div className="bg-zinc-900/50 rounded-lg border border-zinc-800">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="text-left p-4 text-zinc-300 font-medium">ID</th>
                                <th className="text-left p-4 text-zinc-300 font-medium">User</th>
                                <th className="text-left p-4 text-zinc-300 font-medium">Amount</th>
                                <th className="text-left p-4 text-zinc-300 font-medium">Method</th>
                                <th className="text-left p-4 text-zinc-300 font-medium">Status</th>
                                <th className="text-left p-4 text-zinc-300 font-medium">Date</th>
                                <th className="text-left p-4 text-zinc-300 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                                    <td className="p-4 text-white">{transaction.id}</td>
                                    <td className="p-4 text-white">{transaction.user}</td>
                                    <td className="p-4 text-white">${transaction.amount.toFixed(2)}</td>
                                    <td className="p-4 text-white">{transaction.method}</td>
                                    <td className="p-4">
                                        <StatusBadge status={transaction.status} />
                                    </td>
                                    <td className="p-4 text-white">{transaction.date}</td>
                                    <td className="p-4">
                                        <ActionsColumn transaction={transaction} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {transactions.length === 0 && (
                    <div className="text-center py-8 text-zinc-400">
                        No payment transactions found
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentTransactions;

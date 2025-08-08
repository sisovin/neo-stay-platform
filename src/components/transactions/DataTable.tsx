// components/DataTable.tsx
import { useState, useMemo } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';
import { ArrowUp, Search } from 'lucide-react';
import { motion } from 'framer-motion';

type Column<T> = {
    key: keyof T;
    label: string;
    sortable?: boolean;
    formatter?: (value: any) => React.ReactNode;
};

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    rowsPerPage?: number;
    emptyMessage?: string;
}

export const DataTable = <T extends {}>({
    data,
    columns,
    rowsPerPage = 10,
    emptyMessage = 'No data found',
}: DataTableProps<T>) => {
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const sortedData = useMemo(() => {
        if (!sortKey) return data;
        const sorted = [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (aVal === bVal) return 0;
            if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
            return sortDir === 'asc' ? -1 : 1;
        });
        return sorted;
    }, [data, sortKey, sortDir]);

    const filteredData = useMemo(() => {
        if (!search) return sortedData;
        const lower = search.toLowerCase();
        return sortedData.filter((row) =>
            Object.values(row).some((v) => v?.toString().toLowerCase().includes(lower))
        );
    }, [sortedData, search]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handleSort = (col: Column<T>) => {
        if (!col.sortable) return;
        if (sortKey === col.key) {
            setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(col.key);
            setSortDir('asc');
        }
    };

    return (
        <div className="p-4 bg-[#222] rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-1">
                    <Search className="h-5 w-5 text-neon" />
                    <input
                        type="text"
                        placeholder="Search…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-[#333] px-2 py-1 rounded text-neon placeholder:text-neon/50 focus:outline-none"
                    />
                </div>
                <span className="text-sm text-neon/70">
                    {filteredData.length} / {data.length}
                </span>
            </div>

            <div className="overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-[#111]">
                            {columns.map((col) => (
                                <TableHead
                                    key={col.key as string}
                                    className={`${col.sortable ? 'cursor-pointer' : 'cursor-default'} text-white`}
                                    onClick={() => handleSort(col)}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{col.label}</span>
                                        {col.sortable && (
                                            <motion.span
                                                initial={{ rotate: 0 }}
                                                animate={{
                                                    rotate: sortKey === col.key ? (sortDir === 'asc' ? 0 : 180) : 0,
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ArrowUp className="h-4 w-4" />
                                            </motion.span>
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedData.length ? (
                            paginatedData.map((row, i) => (
                                <TableRow key={i} className="bg-[#222] hover:bg-[#333] text-white">
                                    {columns.map((col) => (
                                        <TableCell key={col.key as string}>
                                            {col.formatter ? col.formatter(row[col.key]) : String(row[col.key] ?? '')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-6 text-neon/70">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2 text-neon">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1 rounded hover:bg-neon/10 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span>
                        {page} / {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className="px-3 py-1 rounded hover:bg-neon/10 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

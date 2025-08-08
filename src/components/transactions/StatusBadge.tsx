// components/StatusBadge.tsx
import { motion } from 'framer-motion';

export interface StatusBadgeProps {
    status: 'Pending' | 'Completed' | 'Failed' | 'Processing';
    className?: string;
}

export const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
    const map = {
        Pending: 'yellow-400',
        Completed: 'green-400',
        Failed: 'red-400',
        Processing: 'blue-400',
    };

    return (
        <motion.span
            className={`inline-block px-2 py-0.5 rounded text-xs font-semibold text-${map[status]} bg-${map[status]}/10 ${className}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {status}
        </motion.span>
    );
};

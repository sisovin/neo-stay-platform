// components/ActionMenu.tsx
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ActionMenuItem {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
}

export interface ActionMenuProps {
    items: ActionMenuItem[];
    className?: string;
}

export const ActionMenu = ({ items, className = '' }: ActionMenuProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className={`relative inline-block ${className}`}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center space-x-1 text-neon hover:text-neon/80"
                aria-label="Open action menu"
                title="Open action menu"
            >
                <ChevronDown className="h-5 w-5" />
            </button>

            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-[#111] rounded-md shadow-lg border border-neon/20"
                >
                    <ul>
                        {items.map((i, idx) => (
                            <li
                                key={idx}
                                onClick={() => {
                                    i.onClick();
                                    setOpen(false);
                                }}
                                className="flex items-center space-x-2 px-4 py-2 hover:bg-neon/10 cursor-pointer"
                            >
                                <i.icon className="h-5 w-5 text-neon" />
                                <span>{i.label}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

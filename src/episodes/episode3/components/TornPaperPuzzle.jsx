import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 6 fragments, correct order is 0-5 (top-left to bottom-right, 2 columns x 3 rows)
const FRAGMENT_TEXTS = [
    'To: Sanya Mehra, CEO',
    'From: Priya Deshmukh, Co-founder',
    'I am resigning effective immediately.',
    'I made unauthorized transfers totaling',
    '₹40,28,000 over the past 8 months.',
    'I am sorry, Sanya. For everything. — Priya',
];

const FRAGMENT_COLORS = [
    'from-amber-950/40 to-noir-900',
    'from-red-950/30 to-noir-900',
    'from-amber-950/30 to-noir-900',
    'from-slate-950/40 to-noir-900',
    'from-red-950/40 to-noir-900',
    'from-amber-950/50 to-noir-900',
];

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    // Ensure it's not already solved
    if (a.every((v, i) => v === i)) {
        [a[0], a[a.length - 1]] = [a[a.length - 1], a[0]];
    }
    return a;
}

export default function TornPaperPuzzle({ onSolve }) {
    const [order, setOrder] = useState(() => shuffle([0, 1, 2, 3, 4, 5]));
    const [selected, setSelected] = useState(null);
    const [solved, setSolved] = useState(false);

    const handleClick = useCallback((index) => {
        if (solved) return;
        if (selected === null) {
            setSelected(index);
        } else {
            // Swap the two fragments
            const newOrder = [...order];
            [newOrder[selected], newOrder[index]] = [newOrder[index], newOrder[selected]];
            setOrder(newOrder);
            setSelected(null);

            // Check if solved
            if (newOrder.every((v, i) => v === i)) {
                setSolved(true);
                setTimeout(() => onSolve?.(), 2000);
            }
        }
    }, [selected, order, solved, onSolve]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-noir-900 border border-noir-700/50 rounded-2xl p-6 max-w-md mx-auto"
        >
            <div className="text-center mb-4">
                <span className="text-2xl mb-2 block">📄</span>
                <h3 className="text-sm font-semibold text-noir-200">Assemble the Torn Letter</h3>
                <p className="text-[11px] text-noir-500 mt-1">Click two pieces to swap them. Arrange in correct order.</p>
            </div>

            <div className="space-y-2">
                {order.map((fragIndex, position) => (
                    <motion.button
                        key={position}
                        onClick={() => handleClick(position)}
                        layout
                        layoutId={`frag-${fragIndex}`}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200
                            bg-gradient-to-r ${FRAGMENT_COLORS[fragIndex]}
                            ${solved
                                ? 'border-green-500/40'
                                : selected === position
                                    ? 'border-evidence ring-2 ring-evidence/20'
                                    : fragIndex === position
                                        ? 'border-green-700/30'
                                        : 'border-noir-700/30 hover:border-noir-500/50'
                            }
                            ${solved ? 'cursor-default' : 'cursor-pointer'}`}
                        whileHover={!solved ? { x: 3 } : {}}
                        whileTap={!solved ? { scale: 0.98 } : {}}
                    >
                        <p className={`text-xs font-mono leading-relaxed
                            ${solved ? 'text-green-300' : 'text-noir-300'}`}>
                            {FRAGMENT_TEXTS[fragIndex]}
                        </p>
                        {/* Torn paper effect */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-noir-700/20 to-transparent" />
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {solved && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 rounded-lg bg-green-900/20 border border-green-700/30 text-center"
                    >
                        <p className="text-xs text-green-400 font-semibold">✓ Letter assembled!</p>
                        <p className="text-[10px] text-green-500/70 mt-1">A confession letter... This proves everything.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {!solved && (
                <p className="text-[10px] text-noir-600 text-center mt-3">
                    {selected !== null ? 'Now click another piece to swap' : `${order.filter((v, i) => v === i).length}/6 pieces in place`}
                </p>
            )}
        </motion.div>
    );
}

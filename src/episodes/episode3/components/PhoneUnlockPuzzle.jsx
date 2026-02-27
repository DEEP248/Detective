import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Phone unlock pattern — 3x3 grid, correct pattern traces "7" (0→1→2→5→7)
const CORRECT_PATTERN = [0, 1, 2, 5, 7];

const DOT_POSITIONS = [
    { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
    { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
    { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
];

export default function PhoneUnlockPuzzle({ onSolve, clueText }) {
    const [pattern, setPattern] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [error, setError] = useState('');
    const [solved, setSolved] = useState(false);

    const handleDotClick = (index) => {
        if (solved) return;
        if (pattern.includes(index)) return;

        const newPattern = [...pattern, index];
        setPattern(newPattern);
        setError('');
    };

    const checkPattern = () => {
        if (pattern.length !== CORRECT_PATTERN.length) {
            setError(`Need ${CORRECT_PATTERN.length} dots. Try again.`);
            setPattern([]);
            return;
        }
        const match = pattern.every((v, i) => v === CORRECT_PATTERN[i]);
        if (match) {
            setSolved(true);
            setTimeout(() => onSolve?.(), 1500);
        } else {
            setError('Wrong pattern. Think about her lucky number.');
            setPattern([]);
        }
    };

    const dotSize = 56;
    const gap = 20;
    const gridSize = dotSize * 3 + gap * 2;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-noir-900 border border-noir-700/50 rounded-2xl p-6 max-w-sm mx-auto"
        >
            <div className="text-center mb-4">
                <span className="text-2xl mb-2 block">📱</span>
                <h3 className="text-sm font-semibold text-noir-200">Unlock Sanya's Phone</h3>
                <p className="text-[11px] text-noir-500 mt-1">{clueText || 'Draw the pattern. Hint: her lucky number.'}</p>
            </div>

            {/* Pattern grid */}
            <div className="flex justify-center mb-4">
                <div
                    className="relative"
                    style={{ width: gridSize, height: gridSize }}
                >
                    {/* Lines between selected dots */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                        {pattern.map((dotIdx, i) => {
                            if (i === 0) return null;
                            const prev = DOT_POSITIONS[pattern[i - 1]];
                            const curr = DOT_POSITIONS[dotIdx];
                            const x1 = prev.col * (dotSize + gap) + dotSize / 2;
                            const y1 = prev.row * (dotSize + gap) + dotSize / 2;
                            const x2 = curr.col * (dotSize + gap) + dotSize / 2;
                            const y2 = curr.row * (dotSize + gap) + dotSize / 2;
                            return (
                                <motion.line
                                    key={`${pattern[i - 1]}-${dotIdx}`}
                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke={solved ? '#4ade80' : '#c9a84c'}
                                    strokeWidth={3}
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            );
                        })}
                    </svg>

                    {/* Dots */}
                    {DOT_POSITIONS.map((pos, i) => {
                        const isSelected = pattern.includes(i);
                        const x = pos.col * (dotSize + gap);
                        const y = pos.row * (dotSize + gap);
                        return (
                            <motion.button
                                key={i}
                                onClick={() => handleDotClick(i)}
                                className={`absolute rounded-full border-2 transition-all duration-150 flex items-center justify-center
                                    ${isSelected
                                        ? solved ? 'border-green-400 bg-green-400/20' : 'border-evidence bg-evidence/20'
                                        : 'border-noir-600 bg-noir-800 hover:border-noir-400'
                                    }`}
                                style={{ left: x, top: y, width: dotSize, height: dotSize, zIndex: 2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={`w-3 h-3 rounded-full ${solved ? 'bg-green-400' : 'bg-evidence'}`}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2 justify-center">
                <button
                    onClick={() => { setPattern([]); setError(''); }}
                    className="px-4 py-2 rounded-lg text-xs text-noir-400 border border-noir-700/40 hover:text-noir-200 transition-colors"
                >
                    Clear
                </button>
                <button
                    onClick={checkPattern}
                    disabled={pattern.length === 0 || solved}
                    className="px-6 py-2 rounded-lg text-xs font-semibold bg-evidence/20 text-evidence border border-evidence/30 
                               hover:bg-evidence/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                    {solved ? '✓ Unlocked!' : 'Try Pattern'}
                </button>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[11px] text-red-400 text-center mt-3"
                    >
                        {error}
                    </motion.p>
                )}
                {solved && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[11px] text-green-400 text-center mt-3"
                    >
                        Phone unlocked! Reading messages...
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

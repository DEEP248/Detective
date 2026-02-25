import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';
import { hints, getAvailableHints } from '../logic/puzzleLogic';

export default function HintSystem() {
    const [isOpen, setIsOpen] = useState(false);
    const discoveredEvidence = useGameStore(s => s.discoveredEvidence);
    const usedHints = useGameStore(s => s.usedHints);
    const hintPenalty = useGameStore(s => s.hintPenalty);
    const useHint = useGameStore(s => s.useHint);

    const availableHints = getAvailableHints(discoveredEvidence.length, usedHints);

    const usedHintData = hints.filter(h => usedHints.includes(h.id));

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-noir-700/40 
                   bg-noir-800/50 text-xs text-noir-400 hover:text-evidence hover:border-evidence/30
                   transition-all duration-200"
            >
                <span>💡</span>
                <span className="hidden sm:inline">Hints</span>
                {availableHints.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-evidence/20 text-evidence text-[10px] 
                         flex items-center justify-center">
                        {availableHints.length}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-20"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute right-0 top-full mt-2 w-80 bg-noir-900 border border-noir-700/50 
                         rounded-xl shadow-2xl z-30 overflow-hidden"
                        >
                            <div className="p-4 border-b border-noir-700/30">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-noir-200">Investigation Hints</h3>
                                    <span className="text-[10px] text-noir-500">Penalty: -{hintPenalty} pts</span>
                                </div>
                                <p className="text-[10px] text-noir-500 mt-1">
                                    Using hints reduces your final score. Use sparingly.
                                </p>
                            </div>

                            <div className="p-3 max-h-64 overflow-y-auto space-y-2">
                                {/* Show used hints first */}
                                {usedHintData.length > 0 && (
                                    <div className="space-y-2 mb-3">
                                        {usedHintData.map(hint => (
                                            <div key={hint.id} className="p-3 bg-noir-800/30 rounded-lg border border-noir-700/20">
                                                <p className="text-xs text-noir-300">{hint.text}</p>
                                                <span className="text-[10px] text-noir-600 mt-1 block">
                                                    Used • {hint.cost > 0 ? `-${hint.cost} pts` : 'Free'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Available hints */}
                                {availableHints.length > 0 ? (
                                    availableHints.map(hint => (
                                        <button
                                            key={hint.id}
                                            onClick={() => useHint(hint.id, hint.cost)}
                                            className="w-full p-3 bg-evidence/5 border border-evidence/10 rounded-lg 
                               text-left hover:bg-evidence/10 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[10px] text-evidence/60">Hint #{hint.id}</span>
                                                <span className="text-[10px] text-amber-400/60">
                                                    {hint.cost > 0 ? `-${hint.cost} pts` : 'Free'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-noir-400">Click to reveal this hint</p>
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-xs text-noir-500 text-center py-3">
                                        {usedHintData.length > 0
                                            ? 'No more hints available at this stage. Discover more evidence.'
                                            : 'No hints available yet. Start investigating.'}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

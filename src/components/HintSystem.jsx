import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function HintSystem() {
    const [isOpen, setIsOpen] = useState(false);
    const discoveredEvidence = useGameStore(s => s.discoveredEvidence);
    const usedHints = useGameStore(s => s.usedHints);
    const hintPenalty = useGameStore(s => s.hintPenalty);
    const useHint = useGameStore(s => s.useHint);
    const episodeData = useGameStore(s => s.episodeData);
    const setActiveTab = useGameStore(s => s.setActiveTab);

    const hints = episodeData?.hints || [];
    const getAvailableHints = episodeData?.getAvailableHints || (() => []);
    const availableHints = getAvailableHints(discoveredEvidence.length, usedHints);
    const usedHintData = hints.filter(h => usedHints.includes(h.id));

    const handleRevealSolution = () => {
        if (confirm("This will reveal the full solution and end the game. Are you sure?")) {
            // Force all 3 attempts used, then show FailedRevealScreen via accusation tab
            useGameStore.setState({
                accusationAttempts: 3,
                caseSolved: false,
                activeTab: 'accusation',
            });
            setIsOpen(false);
        }
    };

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
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/40"
                            onClick={() => setIsOpen(false)}
                        />
                        {/* Panel — fixed center on mobile, absolute on desktop */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="fixed inset-x-4 top-20 sm:inset-auto sm:absolute sm:right-0 sm:top-full sm:mt-2 
                                       w-auto sm:w-80 max-w-sm mx-auto sm:mx-0
                                       bg-noir-900 border border-noir-700/50 
                                       rounded-xl shadow-2xl z-50 overflow-hidden"
                        >
                            <div className="p-4 border-b border-noir-700/30">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-noir-200">💡 Investigation Hints</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] text-noir-500">-{hintPenalty} pts</span>
                                        <button onClick={() => setIsOpen(false)} className="text-noir-500 hover:text-noir-300 text-lg leading-none">×</button>
                                    </div>
                                </div>
                                <p className="text-[10px] text-noir-500 mt-1">
                                    Using hints reduces your final score.
                                </p>
                            </div>

                            <div className="p-3 max-h-64 overflow-y-auto space-y-2">
                                {/* Used hints */}
                                {usedHintData.map(hint => (
                                    <div key={hint.id} className="p-3 bg-noir-800/30 rounded-lg border border-noir-700/20">
                                        <p className="text-xs text-noir-300">{hint.text}</p>
                                        <span className="text-[10px] text-noir-600 mt-1 block">
                                            ✓ Used • {hint.cost > 0 ? `-${hint.cost} pts` : 'Free'}
                                        </span>
                                    </div>
                                ))}

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
                                            ? 'No more hints available. Discover more evidence.'
                                            : 'No hints available yet. Start investigating.'}
                                    </p>
                                )}
                            </div>

                            {/* Reveal Full Solution */}
                            <div className="p-3 bg-red-900/10 border-t border-red-900/20 text-center">
                                <button
                                    onClick={handleRevealSolution}
                                    className="text-[10px] text-red-400 hover:text-red-300 transition-colors font-semibold uppercase tracking-widest"
                                >
                                    🔓 Reveal Full Solution
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

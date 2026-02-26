import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function AccusationPanel() {
    const [selectedSuspect, setSelectedSuspect] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [lastResult, setLastResult] = useState(null);

    const accusationAttempts = useGameStore(s => s.accusationAttempts);
    const maxAttempts = useGameStore(s => s.maxAccusationAttempts);
    const caseSolved = useGameStore(s => s.caseSolved);
    const attemptAccusation = useGameStore(s => s.attemptAccusation);
    const discoveredEvidence = useGameStore(s => s.discoveredEvidence);
    const canMake = useGameStore(s => s.canMakeAccusation);
    const episodeData = useGameStore(s => s.episodeData);

    const suspects = episodeData?.suspects || [];
    const validateAccusation = episodeData?.validateAccusation;

    const handleSubmit = () => {
        if (!selectedSuspect || !validateAccusation) return;
        const result = validateAccusation(selectedSuspect);
        setLastResult(result);
        setShowResult(true);
        attemptAccusation(result);
    };

    if (caseSolved) {
        return <SolvedScreen />;
    }

    if (accusationAttempts >= maxAttempts) {
        return <FailedRevealScreen />;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-serif font-bold text-noir-100">Make Your Accusation</h2>
                <p className="text-xs text-noir-400 mt-1">
                    You have {maxAttempts - accusationAttempts} attempt(s) remaining. Choose wisely.
                </p>
            </div>

            {/* Requirements */}
            <div className="bg-noir-800/40 rounded-xl p-4 border border-noir-700/30">
                <p className="text-label mb-2">Case Requirements</p>
                <ul className="space-y-1.5 text-xs text-noir-400">
                    <li className={`flex items-center gap-2 ${discoveredEvidence.length >= 8 ? 'text-emerald-400' : ''}`}>
                        <span>{discoveredEvidence.length >= 8 ? '✓' : '○'}</span>
                        Discover at least 8 pieces of evidence ({discoveredEvidence.length} found)
                    </li>
                    <li className={`flex items-center gap-2 ${selectedSuspect ? 'text-emerald-400' : ''}`}>
                        <span>{selectedSuspect ? '✓' : '○'}</span>
                        Select the killer from the suspects below
                    </li>
                </ul>
            </div>

            {!canMake() ? (
                <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-5 text-center">
                    <p className="text-amber-300 text-sm">
                        You need to discover more evidence before making an accusation. Keep investigating.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {/* Suspect Selection */}
                    <div>
                        <p className="text-label mb-3">Who is the killer?</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {suspects.map(suspect => (
                                <button
                                    key={suspect.id}
                                    onClick={() => setSelectedSuspect(suspect.id)}
                                    className={`p-4 rounded-xl border text-left transition-all duration-200
                                        ${selectedSuspect === suspect.id
                                            ? 'border-evidence bg-evidence/10 ring-1 ring-evidence/30'
                                            : 'border-noir-700/40 bg-noir-800/30 hover:border-noir-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{suspect.portrait}</span>
                                        <div>
                                            <p className="text-sm font-medium text-noir-100">{suspect.name}</p>
                                            <p className="text-[10px] text-noir-500">{suspect.role}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedSuspect}
                            className="btn-danger disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            ⚖️ Submit Accusation ({maxAttempts - accusationAttempts} remaining)
                        </button>
                    </div>
                </div>
            )}

            {/* Failed attempt modal */}
            <AnimatePresence>
                {showResult && lastResult && !lastResult.success && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="absolute inset-0 bg-black/80" onClick={() => setShowResult(false)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative max-w-lg w-full bg-noir-900 border border-red-800/40 rounded-2xl p-8"
                        >
                            <div className="text-center space-y-4">
                                <div className="text-5xl">❌</div>
                                <h3 className="text-xl font-serif font-bold text-red-300">Wrong Suspect</h3>
                                <p className="text-sm text-noir-300 leading-relaxed">{lastResult.message}</p>
                                <button
                                    onClick={() => { setShowResult(false); setSelectedSuspect(''); }}
                                    className="btn-secondary mt-4"
                                >
                                    Return to Investigation
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Shown when all 3 attempts are exhausted — reveals the answer
function FailedRevealScreen() {
    const [showReveal, setShowReveal] = useState(false);
    const goHome = useGameStore(s => s.goHome);
    const resetGame = useGameStore(s => s.resetGame);
    const episodeData = useGameStore(s => s.episodeData);

    const getRevealData = episodeData?.getRevealData;
    const suspects = episodeData?.suspects || [];
    const trueTimeline = episodeData?.trueTimeline || [];
    const revealData = getRevealData ? getRevealData() : null;

    if (!revealData) return null;

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="text-6xl">📁</div>
                <h2 className="text-3xl font-serif font-bold text-red-300">Case Closed — Unsolved</h2>
                <p className="text-sm text-noir-400 max-w-lg mx-auto leading-relaxed">
                    You have exhausted all 3 accusation attempts. The investigation has been
                    transferred to another detective. The case file has been sealed.
                </p>
            </motion.div>

            {!showReveal ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center space-y-4"
                >
                    <p className="text-xs text-noir-500">Would you like to see the real answer?</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => setShowReveal(true)} className="btn-primary">
                            🔓 Reveal the Truth
                        </button>
                        <button onClick={goHome} className="btn-secondary">
                            Back to Cases
                        </button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    {/* The killer revealed */}
                    <div className="bg-red-900/15 border border-red-800/30 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-red-900/30 border border-red-800/40
                                          flex items-center justify-center text-3xl">
                                {suspects.find(s => s.id === revealData.killerId)?.portrait || '🔴'}
                            </div>
                            <div>
                                <p className="text-xs text-red-400/60 uppercase tracking-wider">The Killer</p>
                                <h3 className="text-2xl font-serif font-bold text-red-300">{revealData.killerName}</h3>
                            </div>
                        </div>
                        <p className="text-sm text-noir-300 leading-relaxed">{revealData.summary}</p>
                    </div>

                    {/* Method */}
                    <div className="bg-noir-800/50 border border-noir-700/40 rounded-2xl p-6">
                        <h4 className="text-label mb-3">Method</h4>
                        <p className="text-sm text-noir-300 leading-relaxed">{revealData.method}</p>
                    </div>

                    {/* Motive */}
                    <div className="bg-noir-800/50 border border-noir-700/40 rounded-2xl p-6">
                        <h4 className="text-label mb-3">Motive</h4>
                        <p className="text-sm text-noir-300 leading-relaxed">{revealData.motive}</p>
                    </div>

                    {/* Key evidence */}
                    <div className="bg-noir-800/50 border border-noir-700/40 rounded-2xl p-6">
                        <h4 className="text-label mb-3">10 Key Evidence Points</h4>
                        <div className="space-y-2">
                            {revealData.keyEvidence.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="flex items-start gap-3 p-2 bg-noir-900/40 rounded-lg"
                                >
                                    <span className="text-xs font-mono text-evidence/60 mt-0.5">{i + 1}.</span>
                                    <p className="text-xs text-noir-300">{point}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* True timeline */}
                    <div className="bg-noir-800/50 border border-evidence/20 rounded-2xl p-6">
                        <h4 className="text-label mb-3">The True Timeline</h4>
                        <div className="space-y-3">
                            {trueTimeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 * i }}
                                    className="flex gap-3 p-3 bg-noir-900/40 rounded-lg"
                                >
                                    <span className="text-xs font-mono text-evidence/70 whitespace-nowrap min-w-[70px]">
                                        {item.time}
                                    </span>
                                    <p className="text-xs text-noir-300 leading-relaxed">{item.event}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Try again */}
                    <div className="text-center pt-4">
                        <p className="text-xs text-noir-500 mb-4">
                            Now that you know the truth, want to try another case?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button onClick={resetGame} className="btn-primary">
                                🔄 Retry This Case
                            </button>
                            <button onClick={goHome} className="btn-secondary">
                                Browse Cases
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function SolvedScreen() {
    const getScore = useGameStore(s => s.getScore);
    const accusationAttempts = useGameStore(s => s.accusationAttempts);
    const hintPenalty = useGameStore(s => s.hintPenalty);
    const startTime = useGameStore(s => s.startTime);
    const endTime = useGameStore(s => s.endTime);
    const goHome = useGameStore(s => s.goHome);
    const episodeData = useGameStore(s => s.episodeData);

    const getRevealData = episodeData?.getRevealData;
    const trueTimeline = episodeData?.trueTimeline || [];
    const revealData = getRevealData ? getRevealData() : null;
    const duration = endTime && startTime ? Math.floor((endTime - startTime) / 60000) : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
        >
            {/* Dramatic header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center space-y-4"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                    className="text-7xl"
                >
                    ⚖️
                </motion.div>
                <h2 className="text-4xl font-serif font-bold text-evidence text-shadow-warm">
                    Case Solved
                </h2>
                <p className="text-noir-300">Justice has been served.</p>
            </motion.div>

            {/* The truth */}
            {revealData && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="bg-noir-800/50 border border-evidence/20 rounded-2xl p-6 space-y-4"
                >
                    <h3 className="text-lg font-serif font-bold text-evidence">
                        The Truth: {revealData.killerName}
                    </h3>
                    <p className="text-sm text-noir-300 leading-relaxed">{revealData.summary}</p>

                    <div className="divider" />

                    <h4 className="text-label">The True Timeline</h4>
                    <div className="space-y-3 mt-3">
                        {trueTimeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2 + i * 0.15 }}
                                className="flex gap-3 p-3 bg-noir-900/40 rounded-lg"
                            >
                                <span className="text-xs font-mono text-evidence/70 whitespace-nowrap min-w-[70px]">
                                    {item.time}
                                </span>
                                <p className="text-xs text-noir-300 leading-relaxed">{item.event}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Score */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
                className="bg-noir-900/60 border border-noir-700/40 rounded-2xl p-6"
            >
                <h3 className="text-label mb-4">Case Report</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-evidence">{getScore()}</p>
                        <p className="text-[10px] text-noir-500 mt-1">Final Score</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-noir-200">{duration}m</p>
                        <p className="text-[10px] text-noir-500 mt-1">Time Taken</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-noir-200">{accusationAttempts}</p>
                        <p className="text-[10px] text-noir-500 mt-1">Accusations</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-noir-200">-{hintPenalty}</p>
                        <p className="text-[10px] text-noir-500 mt-1">Hint Penalty</p>
                    </div>
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
                className="text-center flex justify-center gap-4"
            >
                <button onClick={goHome} className="btn-primary">
                    🔍 Browse More Cases
                </button>
            </motion.div>
        </motion.div>
    );
}

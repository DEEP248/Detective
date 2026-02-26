import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal';
import useGameStore from '../store/gameStore';

export default function SuspectProfile({ suspectId, onClose }) {
    const suspects = useGameStore(s => s.episodeData?.suspects) || [];
    const suspect = suspects.find(s => s.id === suspectId);
    const revealedQuestions = useGameStore(s => s.revealedQuestions);
    const revealQuestion = useGameStore(s => s.revealQuestion);
    const interviewSuspect = useGameStore(s => s.interviewSuspect);
    const [activeTab, setActiveTab] = useState('profile');

    if (!suspect) return null;

    const revealed = revealedQuestions[suspectId] || [];
    const allRevealed = revealed.length === suspect.interviewQuotes.length;

    const handleRevealQuestion = (index) => {
        revealQuestion(suspectId, index);
        if (revealed.length + 1 >= suspect.interviewQuotes.length) {
            interviewSuspect(suspectId);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'interview', label: 'Interview' },
        { id: 'notes', label: 'Case Notes' },
    ];

    return (
        <Modal isOpen={!!suspectId} onClose={onClose} title={null} size="lg">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-5">
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-5xl border-2"
                        style={{
                            borderColor: suspect.color + '80',
                            backgroundColor: suspect.color + '15',
                        }}
                    >
                        {suspect.portrait}
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-noir-50">{suspect.name}</h2>
                        <p className="text-sm text-noir-400 mt-1">{suspect.role}</p>
                        <p className="text-xs text-noir-500">Age {suspect.age} • {suspect.personality}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-noir-800/50 rounded-lg p-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200
                ${activeTab === tab.id
                                    ? 'bg-noir-700 text-evidence shadow-sm'
                                    : 'text-noir-400 hover:text-noir-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'profile' && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-5"
                        >
                            <div>
                                <p className="text-label mb-2">Background</p>
                                <p className="text-sm text-noir-300 leading-relaxed">{suspect.description}</p>
                            </div>

                            <div className="divider" />

                            <div>
                                <p className="text-label mb-2">Stated Alibi</p>
                                <div className="bg-noir-800/40 rounded-lg p-4 border border-noir-700/30">
                                    <p className="text-sm text-noir-200 leading-relaxed italic">"{suspect.alibi}"</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-label mb-2">Known Motive</p>
                                <div className="bg-blood-700/10 rounded-lg p-4 border border-blood-700/20">
                                    <p className="text-sm text-noir-200 leading-relaxed">{suspect.motive}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'interview' && (
                        <motion.div
                            key="interview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <p className="text-xs text-noir-400 mb-4">
                                Click on each question to reveal the suspect's response.
                                {!allRevealed && ` ${suspect.interviewQuotes.length - revealed.length} questions remaining.`}
                            </p>

                            {suspect.interviewQuotes.map((quote, index) => (
                                <div key={index} className="space-y-2">
                                    <button
                                        onClick={() => handleRevealQuestion(index)}
                                        disabled={revealed.includes(index)}
                                        className={`w-full text-left p-3 rounded-lg border transition-all duration-200
                      ${revealed.includes(index)
                                                ? 'border-noir-700/30 bg-noir-800/30'
                                                : 'border-evidence/20 bg-evidence/5 hover:bg-evidence/10 cursor-pointer'
                                            }`}
                                    >
                                        <p className="text-sm font-medium text-evidence/90">
                                            Q: {quote.q}
                                        </p>
                                    </button>

                                    <AnimatePresence>
                                        {revealed.includes(index) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="ml-4 pl-4 border-l-2 border-noir-700"
                                            >
                                                <p className="text-sm text-noir-300 leading-relaxed py-2 italic">
                                                    "{quote.a}"
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            {allRevealed && (
                                <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-800/30 rounded-lg">
                                    <p className="text-xs text-emerald-400">
                                        ✓ All interview questions have been conducted with {suspect.name}.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'notes' && (
                        <motion.div
                            key="notes"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-3"
                        >
                            <p className="text-label mb-3">Investigator's Notes</p>
                            {suspect.notes.map((note, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-3 p-3 bg-noir-800/30 rounded-lg"
                                >
                                    <span className="text-noir-500 text-sm mt-0.5">•</span>
                                    <p className="text-sm text-noir-300 leading-relaxed">{note}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Modal>
    );
}

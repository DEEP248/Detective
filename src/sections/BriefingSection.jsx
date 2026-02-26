import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function BriefingSection() {
    const [currentPage, setCurrentPage] = useState(0);
    const proceedToInvestigation = useGameStore(s => s.proceedToInvestigation);
    const episodeData = useGameStore(s => s.episodeData);
    const goHome = useGameStore(s => s.goHome);

    const briefing = episodeData?.briefing;
    const pages = briefing?.pages || [];
    const caseNumber = briefing?.caseNumber || 'DD-XXXX';
    const isLastPage = currentPage === pages.length - 1;

    if (pages.length === 0) return null;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
            {/* Back button */}
            <button
                onClick={goHome}
                className="absolute top-6 left-6 z-20 text-xs text-noir-500 hover:text-evidence transition-colors"
            >
                ← Back to Cases
            </button>

            <div className="max-w-3xl w-full">
                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-8">
                    {pages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300
                                ${i === currentPage ? 'bg-evidence w-6' : 'bg-noir-700 hover:bg-noir-500'}`}
                        />
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="card-dark p-6 md:p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-label">Case Briefing</span>
                            <span className="text-noir-600">•</span>
                            <span className="text-label">{currentPage + 1} of {pages.length}</span>
                            <span className="text-noir-600">•</span>
                            <span className="text-[10px] font-mono text-noir-600">{caseNumber}</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-evidence/10 border border-evidence/20 
                                flex items-center justify-center text-2xl">
                                {pages[currentPage].icon}
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-noir-100">
                                {pages[currentPage].title}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {pages[currentPage].content.map((paragraph, i) => (
                                <p key={i} className="text-sm text-noir-300 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Warning on last page */}
                        {isLastPage && (
                            <div className="bg-red-900/10 border border-red-800/20 rounded-xl p-4 mt-6">
                                <p className="text-sm text-red-300/80 font-medium mb-1">⚠️ Warning</p>
                                <p className="text-xs text-noir-400">
                                    You have 3 accusation attempts. Select the right suspect carefully.
                                    Red herrings are present. Trust the evidence, not your instincts.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 0}
                        className="btn-secondary disabled:opacity-0"
                    >
                        ← Previous
                    </button>

                    {isLastPage ? (
                        <button onClick={proceedToInvestigation} className="btn-primary">
                            Enter Investigation →
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="btn-primary"
                        >
                            Continue →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

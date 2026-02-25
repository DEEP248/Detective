import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';
import { victimProfile } from '../data/relationships';

const briefingPages = [
    {
        title: 'The Victim',
        content: (
            <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-900/20 border border-red-800/40 
                        flex items-center justify-center text-4xl">
                        💀
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-xl text-noir-100">Victor Hale</h3>
                        <p className="text-sm text-noir-400">Age 58 • Founder, Hale & Reed Investments</p>
                    </div>
                </div>
                <p className="text-sm text-noir-300 leading-relaxed">
                    Victor Hale was found dead in the library of his own manor at 9:32 PM, during a private
                    dinner party he was hosting. The cause of death is blunt force trauma to the right temporal
                    region — a single, devastating blow.
                </p>
                <p className="text-sm text-noir-300 leading-relaxed">
                    The murder weapon appears to be the library's cast-iron fireplace poker, which is missing
                    from its stand. Victor was a powerful man who controlled those around him with money and
                    influence. In the weeks before his death, he was making enemies faster than he could count.
                </p>
                <p className="text-sm text-evidence/80 bg-evidence/5 p-3 rounded-lg border border-evidence/10">
                    Key mystery: The library window was locked from the inside. The door was ajar.
                    No forced entry anywhere. How did the killer escape a locked room?
                </p>
            </div>
        ),
    },
    {
        title: 'The Scene',
        content: (
            <div className="space-y-4">
                <p className="text-sm text-noir-300 leading-relaxed">
                    Hale Manor is a Victorian-era estate in Surrey. The dinner party was intimate — just six
                    guests and the host. A severe storm was raging outside, with heavy rain from 8:30 PM onward.
                </p>
                <div className="bg-noir-800/40 rounded-xl p-4 border border-noir-700/30 space-y-2">
                    <p className="text-label">Critical Timeline</p>
                    <div className="space-y-2 font-mono text-xs">
                        <div className="flex gap-3">
                            <span className="text-evidence/70 min-w-[64px]">9:10 PM</span>
                            <span className="text-noir-300">Victor excuses himself to the library</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-red-400 min-w-[64px]">9:17 PM</span>
                            <span className="text-red-300">⚡ Power outage — house plunged into darkness</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-red-400 min-w-[64px]">9:32 PM</span>
                            <span className="text-red-300">💡 Power restored — body discovered</span>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-noir-300 leading-relaxed">
                    The 15-minute blackout is the murder window. Someone killed Victor in the darkness,
                    staged a locked room, and returned to their position without being seen.
                </p>
                <p className="text-sm text-noir-400 italic">
                    You will have access to evidence collected from the scene, interview transcripts
                    from all six suspects, and various documents. Your job is to determine who, how, and why.
                </p>
            </div>
        ),
    },
    {
        title: 'Your Mission',
        content: (
            <div className="space-y-4">
                <p className="text-sm text-noir-300 leading-relaxed">
                    You are the lead investigator on this case. You must:
                </p>
                <div className="space-y-3">
                    {[
                        { icon: '🔍', text: 'Examine all physical evidence from the crime scene and surrounding areas' },
                        { icon: '🗣️', text: 'Interview each suspect — ask questions, find contradictions' },
                        { icon: '⏱️', text: 'Reconstruct the timeline — determine who was where and when' },
                        { icon: '🔗', text: 'Map relationships — understand the web of motives and connections' },
                        { icon: '📄', text: 'Review documents — wills, records, reports that reveal the truth' },
                        { icon: '🎯', text: 'Make your accusation — name the killer and explain exactly how they did it' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-noir-800/30 rounded-lg">
                            <span className="text-lg">{item.icon}</span>
                            <p className="text-sm text-noir-300">{item.text}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-red-900/10 border border-red-800/20 rounded-xl p-4 mt-4">
                    <p className="text-sm text-red-300/80 font-medium mb-1">⚠️ Warning</p>
                    <p className="text-xs text-noir-400">
                        This is not a simple case. You have 3 accusation attempts. Each accusation must include
                        a detailed explanation connecting at least 8 logical evidence points. Guessing will fail.
                        Red herrings are present. Trust the evidence, not your instincts.
                    </p>
                </div>
            </div>
        ),
    },
];

export default function BriefingSection() {
    const [currentPage, setCurrentPage] = useState(0);
    const proceedToInvestigation = useGameStore(s => s.proceedToInvestigation);

    const isLastPage = currentPage === briefingPages.length - 1;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
            <div className="max-w-3xl w-full">
                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-8">
                    {briefingPages.map((_, i) => (
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
                            <span className="text-label">{currentPage + 1} of {briefingPages.length}</span>
                        </div>

                        <h2 className="text-2xl font-serif font-bold text-noir-100 mb-6">
                            {briefingPages[currentPage].title}
                        </h2>

                        {briefingPages[currentPage].content}
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

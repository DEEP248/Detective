import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function Notepad() {
    const [isOpen, setIsOpen] = useState(false);
    const playerNotes = useGameStore(s => s.playerNotes);
    const setPlayerNotes = useGameStore(s => s.setPlayerNotes);

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-noir-700/40 
                   bg-noir-800/50 text-xs text-noir-400 hover:text-evidence hover:border-evidence/30
                   transition-all duration-200"
            >
                <span>📝</span>
                <span>Notes</span>
            </button>

            {/* Slide-out panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-noir-900 
                         border-l border-noir-700/50 z-50 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-noir-700/30">
                                <h3 className="font-serif font-semibold text-noir-100">Detective's Notebook</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg
                           text-noir-400 hover:text-noir-100 hover:bg-noir-800 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Notepad */}
                            <div className="flex-1 p-5">
                                <textarea
                                    value={playerNotes}
                                    onChange={(e) => setPlayerNotes(e.target.value)}
                                    placeholder="Record your observations, theories, and connections here...

Example notes:
- Adrian knows exact time (9:32) — suspicious?
- Window locked from inside but latch marks...
- Who had access to servant corridors?
- Shoe size UK 10 = Adrian's size
- Why did Adrian change shoes?"
                                    className="w-full h-full bg-noir-800/30 border border-noir-700/30 rounded-xl p-4
                           text-sm text-noir-200 placeholder-noir-600 resize-none font-mono
                           focus:outline-none focus:border-evidence/30 transition-colors
                           leading-relaxed"
                                />
                            </div>

                            {/* Footer */}
                            <div className="px-5 py-3 border-t border-noir-700/30">
                                <p className="text-[10px] text-noir-500">
                                    Notes are saved automatically to your browser.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

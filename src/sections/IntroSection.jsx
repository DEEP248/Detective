import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function IntroSection() {
    const startGame = useGameStore(s => s.startGame);
    const [phase, setPhase] = useState(0);
    const [showStart, setShowStart] = useState(false);

    const lines = [
        'October 14th. 9:17 PM.',
        'The lights go out.',
        'Thunder shakes the manor.',
        'Fifteen minutes of darkness.',
        'When the lights return...',
        'Victor Hale is dead.',
        'The library window — locked from inside.',
        'No forced entry. No weapon found.',
        'Six suspects. Six stories.',
        'One truth.',
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setPhase(prev => {
                if (prev >= lines.length) {
                    clearInterval(timer);
                    setTimeout(() => setShowStart(true), 600);
                    return prev;
                }
                return prev + 1;
            });
        }, 1200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-noir-950 via-noir-950 to-noir-900" />
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-16"
                >
                    <p className="text-xs uppercase tracking-[0.4em] text-noir-500 mb-4">Episode 1</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-noir-100 leading-tight">
                        The Silence<br />
                        <span className="text-evidence text-shadow-warm">Protocol</span>
                    </h1>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-evidence to-transparent mx-auto mt-6" />
                    <p className="text-lg font-serif italic text-noir-400 mt-4">The Last Candle</p>
                </motion.div>

                {/* Typewriter lines */}
                <div className="space-y-3 mb-16 min-h-[300px]">
                    {lines.map((line, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={phase > index ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className={`text-sm md:text-base font-mono leading-relaxed
                ${index === 5 ? 'text-red-400 font-semibold text-lg' : ''}
                ${index === lines.length - 1 ? 'text-evidence font-semibold text-lg mt-6' : ''}
                ${index < 5 ? 'text-noir-400' : ''}
                ${index > 5 && index < lines.length - 1 ? 'text-noir-300' : ''}
              `}
                        >
                            {phase > index ? line : ''}
                        </motion.p>
                    ))}
                </div>

                {/* Start button */}
                {showStart && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <button
                            onClick={startGame}
                            className="group relative px-10 py-4 bg-transparent border border-evidence/40 
                       rounded-lg overflow-hidden transition-all duration-500
                       hover:border-evidence hover:shadow-glow-warm"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-evidence/0 via-evidence/5 to-evidence/0 
                             group-hover:via-evidence/15 transition-all duration-500" />
                            <span className="relative text-sm uppercase tracking-[0.25em] text-evidence font-semibold">
                                Begin Investigation
                            </span>
                        </button>
                    </motion.div>
                )}

                {/* Continue saved game */}
                {showStart && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-[11px] text-noir-600 mt-6"
                    >
                        Your progress is automatically saved to this browser.
                    </motion.p>
                )}
            </div>

            {/* Candle glow at bottom */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full bg-amber-500/10 rounded-full blur-[60px]" />
            </motion.div>
        </div>
    );
}

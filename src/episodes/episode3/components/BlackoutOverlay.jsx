import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlackoutOverlay({ onComplete }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [phase, setPhase] = useState(0); // 0=dark, 1=crash, 2=footsteps, 3=scream, 4=done

    const handleMouseMove = useCallback((e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', (e) => {
            if (e.touches[0]) setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        });

        // Phase progression
        const timers = [
            setTimeout(() => setPhase(1), 2000),   // Crash after 2s
            setTimeout(() => setPhase(2), 4500),   // Footsteps after 4.5s
            setTimeout(() => setPhase(3), 7000),   // Scream after 7s
            setTimeout(() => setPhase(4), 10000),  // Lights back after 10s
        ];

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            timers.forEach(clearTimeout);
        };
    }, [handleMouseMove]);

    useEffect(() => {
        if (phase === 4) {
            setTimeout(() => onComplete?.(), 1000);
        }
    }, [phase, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden select-none"
            style={{
                background: phase < 4
                    ? `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, rgba(255,220,150,0.08) 0%, rgba(0,0,0,0.97) 100%)`
                    : 'rgba(0,0,0,0.97)',
                cursor: 'none',
            }}
        >
            {/* Subtle grain texture */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")' }}
            />

            {/* Flashlight beam hint */}
            {phase < 4 && (
                <div
                    className="absolute pointer-events-none"
                    style={{
                        left: mousePos.x - 40,
                        top: mousePos.y - 40,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,220,150,0.05) 0%, transparent 70%)',
                    }}
                />
            )}

            {/* Phase text overlays */}
            <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {phase === 0 && (
                        <motion.div
                            key="dark"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <p className="text-2xl font-serif text-noir-500 tracking-wider">
                                ⚫ The lights go out.
                            </p>
                            <p className="text-xs text-noir-600 mt-4 animate-pulse">Move your cursor...</p>
                        </motion.div>
                    )}
                    {phase === 1 && (
                        <motion.div
                            key="crash"
                            initial={{ opacity: 0, scale: 1.2 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', damping: 10 }}
                            className="text-center"
                        >
                            <motion.p
                                className="text-3xl font-bold text-red-400/80"
                                animate={{ x: [0, -5, 5, -5, 0] }}
                                transition={{ duration: 0.3 }}
                            >
                                💥 CRASH!
                            </motion.p>
                            <p className="text-sm text-noir-500 mt-2">Glass shattering...</p>
                        </motion.div>
                    )}
                    {phase === 2 && (
                        <motion.div
                            key="steps"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <motion.p
                                className="text-xl text-noir-400 font-serif tracking-widest"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                👣 Footsteps... running...
                            </motion.p>
                        </motion.div>
                    )}
                    {phase === 3 && (
                        <motion.div
                            key="scream"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <motion.p
                                className="text-4xl font-bold text-red-500"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 0.5, repeat: 3 }}
                            >
                                😱 SCREAM!
                            </motion.p>
                            <p className="text-sm text-red-400/60 mt-3">Then... silence.</p>
                        </motion.div>
                    )}
                    {phase === 4 && (
                        <motion.div
                            key="lights"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center"
                        >
                            <motion.p
                                className="text-2xl font-serif text-evidence"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 1 }}
                            >
                                💡 The lights come back on.
                            </motion.p>
                            <motion.p
                                className="text-sm text-red-400 mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Sanya is on the floor. The cake knife is in her chest.
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Timer in corner */}
            {phase < 4 && (
                <div className="absolute top-4 right-4">
                    <motion.span
                        className="text-xs text-red-500/50 font-mono"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        BLACKOUT
                    </motion.span>
                </div>
            )}
        </motion.div>
    );
}

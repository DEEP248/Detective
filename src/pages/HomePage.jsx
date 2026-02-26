import { motion } from 'framer-motion';
import { episodes, loadEpisode } from '../episodes';
import useGameStore from '../store/gameStore';

export default function HomePage() {
    const playEpisode = useGameStore(s => s.playEpisode);

    const handlePlay = (ep) => {
        if (!ep.available) return;
        const data = loadEpisode(ep.id);
        playEpisode(ep.id, data);
    };

    return (
        <div className="min-h-screen bg-noir-950">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-4">
                {/* Background gradient */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-noir-950 via-noir-900 to-noir-950" />
                    <motion.div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(232,115,74,0.06) 0%, transparent 70%)' }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />
                </div>

                <motion.div
                    className="relative z-10 text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.p
                        className="text-xs uppercase tracking-[0.5em] text-evidence/60 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Interactive Mystery Platform
                    </motion.p>

                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-noir-100 leading-[1.1] mb-4">
                        Detective{' '}
                        <span className="text-evidence text-shadow-warm">Duniya</span>
                    </h1>

                    <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-evidence/60 to-transparent mx-auto my-6" />

                    <p className="text-lg sm:text-xl font-serif italic text-noir-400">
                        Think Deep. Doubt Everyone.
                    </p>

                    <p className="text-sm text-noir-500 mt-4 max-w-md mx-auto">
                        Interactive mystery stories made for smart minds.
                        Investigate. Interrogate. Deduce.
                    </p>

                    <motion.a
                        href="#episodes"
                        className="inline-block mt-10 px-8 py-3.5 bg-gradient-to-r from-evidence/80 to-amber-400/60 
                                   text-noir-950 font-semibold rounded-lg text-sm uppercase tracking-wider
                                   hover:from-evidence hover:to-amber-400/80 hover:shadow-glow-warm
                                   transition-all duration-300 active:scale-95"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Investigation
                    </motion.a>
                </motion.div>
            </section>

            {/* Episode Selection Grid */}
            <section id="episodes" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-noir-100 mb-2">Choose Your Case</h2>
                    <p className="text-sm text-noir-500">Each mystery is a self-contained story. Play in any order.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {episodes.map((ep, i) => (
                        <motion.div
                            key={ep.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handlePlay(ep)}
                            className={`group relative rounded-2xl overflow-hidden border transition-all duration-300
                                ${ep.available
                                    ? 'cursor-pointer border-noir-700/50 hover:border-evidence/40 hover:shadow-glow bg-noir-900/80'
                                    : 'cursor-not-allowed border-noir-800/30 bg-noir-900/40'
                                }`}
                        >
                            {/* Card Header */}
                            <div className="p-5 pb-3" style={{ borderBottom: `2px solid ${ep.available ? ep.color + '30' : '#2a2118'}` }}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-noir-500">
                                        Episode {ep.number}
                                    </span>
                                    <span className="text-2xl">{ep.icon}</span>
                                </div>
                                <h3 className={`text-lg font-serif font-bold leading-snug mb-1
                                    ${ep.available ? 'text-noir-100 group-hover:text-evidence transition-colors' : 'text-noir-600'}`}>
                                    {ep.title}
                                </h3>
                                <p className={`text-[11px] ${ep.available ? 'text-noir-400' : 'text-noir-600'}`}>
                                    {ep.subtitle}
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 pt-3 space-y-3">
                                <p className={`text-xs leading-relaxed ${ep.available ? 'text-noir-400' : 'text-noir-600'}`}>
                                    {ep.description}
                                </p>

                                <div className="flex items-center gap-3 text-[10px]">
                                    {ep.available ? (
                                        <>
                                            <span className="px-2 py-0.5 rounded-full bg-blood-600/20 text-blood-400 font-medium">
                                                {ep.difficulty}
                                            </span>
                                            <span className="text-noir-500">⏱ {ep.time}</span>
                                            <span className="text-noir-500">👤 {ep.suspectCount} suspects</span>
                                        </>
                                    ) : (
                                        <span className="px-2 py-0.5 rounded-full bg-noir-800 text-noir-500 font-medium">
                                            Coming Soon
                                        </span>
                                    )}
                                </div>

                                {ep.available && (
                                    <button
                                        className="w-full mt-2 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider
                                                   transition-all duration-300
                                                   bg-evidence/10 text-evidence border border-evidence/20
                                                   group-hover:bg-evidence/20 group-hover:border-evidence/40"
                                    >
                                        ▶ Play Now
                                    </button>
                                )}

                                {!ep.available && (
                                    <div className="w-full mt-2 py-2.5 rounded-lg text-xs text-center text-noir-600 
                                                    border border-noir-800/50 bg-noir-900/50">
                                        🔒 Locked
                                    </div>
                                )}
                            </div>

                            {/* Locked overlay */}
                            {!ep.available && (
                                <div className="absolute inset-0 bg-noir-950/50 backdrop-blur-[2px]" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why Detective Duniya */}
            <section className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-noir-100 mb-2">Why Detective Duniya?</h2>
                    <p className="text-sm text-noir-500">More than a game — it's brain training disguised as entertainment.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                        { icon: '🧠', title: 'Brain Training', desc: 'Sharpen critical thinking, pattern recognition, and logical deduction.' },
                        { icon: '🇮🇳', title: 'Indian Stories', desc: 'Mysteries set in India with relatable characters and local settings.' },
                        { icon: '⏱️', title: '40 Min Experience', desc: 'Each episode is a complete mystery you can solve in one sitting.' },
                        { icon: '🔍', title: 'Deep Investigation', desc: '20+ evidence items, 6-7 suspects with interviews, and timeline analysis.' },
                        { icon: '🎭', title: 'Fair But Hard', desc: 'Every clue is findable. Every answer is logical. No guessing needed.' },
                        { icon: '📱', title: 'Play Anywhere', desc: 'Works on mobile, tablet, and desktop. No downloads. No signup.' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="p-5 rounded-xl bg-noir-900/60 border border-noir-700/30 hover:border-evidence/20 transition-colors"
                        >
                            <span className="text-2xl mb-3 block">{item.icon}</span>
                            <h3 className="text-sm font-semibold text-noir-200 mb-1">{item.title}</h3>
                            <p className="text-xs text-noir-500 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Coming Soon */}
            <section className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                <div className="flex flex-col sm:flex-row gap-4">
                    {[
                        { icon: '🏆', title: 'Leaderboard', desc: 'Compete with other detectives worldwide.' },
                        { icon: '📅', title: 'Daily Challenge', desc: 'A new mini-mystery every day.' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 p-5 rounded-xl border border-dashed border-noir-700/40 bg-noir-900/30 text-center"
                        >
                            <span className="text-xl">{item.icon}</span>
                            <h3 className="text-sm font-semibold text-noir-400 mt-2">{item.title}</h3>
                            <p className="text-[11px] text-noir-600 mt-1">{item.desc}</p>
                            <span className="inline-block mt-3 text-[10px] uppercase tracking-widest text-noir-600 px-3 py-1 border border-noir-700/40 rounded-full">
                                Coming Soon
                            </span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-noir-800/50 py-8 px-4">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="text-sm font-serif text-noir-400">Detective <span className="text-evidence">Duniya</span></p>
                        <p className="text-[10px] text-noir-600 mt-1">Think Deep. Doubt Everyone.</p>
                    </div>
                    <p className="text-[10px] text-noir-600">
                        Built by <a href="https://github.com/DEEP248" className="text-evidence/60 hover:text-evidence transition-colors">DEEP248</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

import { motion } from 'framer-motion';
import { timelineEvents } from '../data/timeline';
import { staggerContainer, staggerItem } from '../animations/variants';

export default function TimelineBoard() {
    const categoryColors = {
        social: 'bg-blue-900/30 border-blue-800/40',
        conflict: 'bg-red-900/30 border-red-800/40',
        movement: 'bg-amber-900/30 border-amber-800/40',
        environment: 'bg-slate-800/30 border-slate-700/40',
        critical: 'bg-red-900/40 border-red-600/50',
        investigation: 'bg-emerald-900/30 border-emerald-800/40',
    };

    const categoryDots = {
        social: 'bg-blue-500',
        conflict: 'bg-red-500',
        movement: 'bg-amber-500',
        environment: 'bg-slate-400',
        critical: 'bg-red-400 ring-2 ring-red-400/30',
        investigation: 'bg-emerald-500',
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-serif font-bold text-noir-100">Event Timeline</h2>
                    <p className="text-xs text-noir-400 mt-1">October 14th — Hale Manor Dinner Party</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    {[
                        { color: 'bg-blue-500', label: 'Social' },
                        { color: 'bg-red-500', label: 'Conflict' },
                        { color: 'bg-amber-500', label: 'Movement' },
                        { color: 'bg-red-400', label: 'Critical' },
                    ].map(legend => (
                        <div key={legend.label} className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${legend.color}`} />
                            <span className="text-[10px] text-noir-500">{legend.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="relative space-y-0"
            >
                {/* Timeline line */}
                <div className="absolute left-[1.35rem] top-6 bottom-6 w-0.5 bg-gradient-to-b from-noir-600 via-red-800/50 to-noir-600" />

                {timelineEvents.map((event, index) => (
                    <motion.div
                        key={event.id}
                        variants={staggerItem}
                        className="relative flex gap-4 py-3 group"
                    >
                        {/* Dot */}
                        <div className="relative z-10 mt-1.5">
                            <div className={`w-3 h-3 rounded-full ${categoryDots[event.category]} 
                             transition-transform group-hover:scale-125`} />
                        </div>

                        {/* Content */}
                        <div className={`flex-1 p-4 rounded-xl border transition-all duration-200
                           ${categoryColors[event.category]}
                           group-hover:border-evidence/30`}>
                            <div className="flex items-center gap-3 mb-1.5">
                                <span className="text-xs font-mono font-bold text-evidence/80 bg-evidence/10 
                               px-2 py-0.5 rounded">
                                    {event.time}
                                </span>
                                {event.category === 'critical' && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 animate-pulse">
                                        Critical
                                    </span>
                                )}
                            </div>
                            <h3 className="text-sm font-semibold text-noir-100 mb-1">{event.title}</h3>
                            <p className="text-xs text-noir-400 leading-relaxed">{event.description}</p>
                            {event.source && (
                                <p className="text-[10px] text-noir-500 mt-2 italic">Source: {event.source}</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

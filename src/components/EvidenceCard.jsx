import { motion } from 'framer-motion';
import { staggerItem, cardHover } from '../animations/variants';
import useGameStore from '../store/gameStore';

export default function EvidenceCard({ item, onClick }) {
    const readEvidence = useGameStore(s => s.readEvidence);
    const isRead = readEvidence.includes(item.id);
    const isKey = item.isKeyEvidence;

    const categoryColors = {
        crime_scene: 'border-red-800/50 bg-red-950/20',
        physical: 'border-amber-800/50 bg-amber-950/20',
        house: 'border-blue-800/50 bg-blue-950/20',
        timing: 'border-purple-800/50 bg-purple-950/20',
        document: 'border-emerald-800/50 bg-emerald-950/20',
    };

    const categoryLabels = {
        crime_scene: 'Crime Scene',
        physical: 'Physical Evidence',
        house: 'House Systems',
        timing: 'Timeline Analysis',
        document: 'Documents',
    };

    return (
        <motion.div
            variants={staggerItem}
            whileHover="hover"
            initial="rest"
            animate="rest"
            onClick={onClick}
            className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-300
                  ${categoryColors[item.category] || 'border-noir-700/50 bg-noir-900/40'}
                  ${!isRead ? 'ring-1 ring-evidence/20' : ''}
                  hover:border-evidence/40 hover:shadow-glow group`}
        >
            {/* New badge */}
            {!isRead && (
                <motion.div
                    className="absolute -top-2 -right-2 w-5 h-5 bg-evidence rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-[10px] font-bold text-noir-950">!</span>
                </motion.div>
            )}

            {/* Key evidence indicator */}
            {isKey && (
                <div className="absolute top-3 right-3 text-evidence/60 text-xs">★</div>
            )}

            {/* Icon & Title */}
            <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl mt-0.5 grayscale-[30%] group-hover:grayscale-0 transition-all">
                    {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-noir-100 group-hover:text-evidence transition-colors leading-tight">
                        {item.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-noir-500 mt-1 inline-block">
                        {categoryLabels[item.category]}
                    </span>
                </div>
            </div>

            {/* Summary */}
            <p className="text-xs text-noir-400 leading-relaxed line-clamp-3 mt-2">
                {item.summary}
            </p>

            {/* Location */}
            {item.location && (
                <div className="mt-3 pt-2 border-t border-noir-700/30">
                    <span className="text-[10px] text-noir-500">
                        📍 {item.location}
                    </span>
                </div>
            )}

            {/* Read indicator */}
            {isRead && (
                <div className="absolute bottom-2 right-2">
                    <span className="text-[10px] text-noir-600">✓ Reviewed</span>
                </div>
            )}
        </motion.div>
    );
}

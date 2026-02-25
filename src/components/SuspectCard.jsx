import { motion } from 'framer-motion';
import { staggerItem } from '../animations/variants';
import useGameStore from '../store/gameStore';

export default function SuspectCard({ suspect, onClick }) {
    const interviewedSuspects = useGameStore(s => s.interviewedSuspects);
    const isInterviewed = interviewedSuspects.includes(suspect.id);

    const suspicionColors = {
        high: 'border-red-800/40 hover:border-red-600/60',
        medium: 'border-amber-800/40 hover:border-amber-600/60',
        low: 'border-emerald-800/40 hover:border-emerald-600/60',
    };

    const suspicionLabels = {
        high: { text: 'High Suspicion', color: 'text-red-400' },
        medium: { text: 'Moderate Suspicion', color: 'text-amber-400' },
        low: { text: 'Low Suspicion', color: 'text-emerald-400' },
    };

    return (
        <motion.div
            variants={staggerItem}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            onClick={onClick}
            className={`cursor-pointer rounded-xl border bg-noir-900/60 p-5 transition-all duration-300
                  ${suspicionColors[suspect.suspicionLevel]}
                  hover:shadow-card-hover group`}
        >
            {/* Portrait & Name */}
            <div className="flex items-center gap-4 mb-3">
                <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-3xl
                     border-2 transition-colors duration-300"
                    style={{
                        borderColor: suspect.color + '60',
                        backgroundColor: suspect.color + '15',
                    }}
                >
                    {suspect.portrait}
                </div>
                <div className="flex-1">
                    <h3 className="font-serif font-semibold text-noir-100 group-hover:text-evidence transition-colors">
                        {suspect.name}
                    </h3>
                    <p className="text-xs text-noir-400 mt-0.5">{suspect.role}</p>
                    <p className="text-xs text-noir-500">Age {suspect.age}</p>
                </div>
            </div>

            {/* Suspicion Level */}
            <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${suspicionLabels[suspect.suspicionLevel].color}`}>
                    {suspicionLabels[suspect.suspicionLevel].text}
                </span>
                {isInterviewed && (
                    <span className="text-[10px] text-noir-500 flex items-center gap-1">
                        <span className="text-emerald-500">●</span> Interviewed
                    </span>
                )}
            </div>

            {/* Description */}
            <p className="text-xs text-noir-400 leading-relaxed line-clamp-2 mb-3">
                {suspect.description}
            </p>

            {/* Personality */}
            <div className="pt-2 border-t border-noir-700/30">
                <span className="text-[10px] text-noir-500 italic">
                    "{suspect.personality}"
                </span>
            </div>
        </motion.div>
    );
}

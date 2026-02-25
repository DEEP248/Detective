import { motion } from 'framer-motion';
import { relationships, victimProfile } from '../data/relationships';
import { suspects } from '../data/suspects';
import { staggerContainer, staggerItem } from '../animations/variants';

export default function RelationshipMap() {
    const allPeople = [
        { ...victimProfile, id: 'victor' },
        ...suspects,
    ];

    const tensionColors = {
        high: 'text-red-400 border-red-800/50',
        medium: 'text-amber-400 border-amber-800/50',
        low: 'text-emerald-400 border-emerald-800/50',
    };

    const typeIcons = {
        spouse: '💍',
        business: '💼',
        adversarial: '⚔️',
        professional: '🤝',
        friendship: '🫂',
        distrust: '👁️',
        neutral: '➖',
        interest: '🔍',
        friendly: '😊',
        familiar: '🏠',
        cautious: '⚠️',
    };

    // Group relationships by person
    const suspectRelationships = suspects.map(suspect => {
        const rels = relationships.filter(
            r => r.from === suspect.id || r.to === suspect.id
        );
        return { suspect, relationships: rels };
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-serif font-bold text-noir-100">Relationship Map</h2>
                <p className="text-xs text-noir-400 mt-1">
                    Connections between suspects and the victim. Tension levels indicate conflict.
                </p>
            </div>

            {/* Victim card at center */}
            <div className="flex justify-center mb-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-950/30 border border-red-800/40 rounded-xl p-5 max-w-md text-center"
                >
                    <div className="text-4xl mb-2">{victimProfile.portrait}</div>
                    <h3 className="font-serif font-bold text-red-300 text-lg">{victimProfile.name}</h3>
                    <p className="text-xs text-red-400/60 mt-1">{victimProfile.role}</p>
                </motion.div>
            </div>

            {/* Connection lines (visual representation) */}
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {suspectRelationships.map(({ suspect, relationships: rels }) => (
                    <motion.div
                        key={suspect.id}
                        variants={staggerItem}
                        className="bg-noir-900/50 border border-noir-700/40 rounded-xl p-4 hover:border-evidence/20 transition-colors"
                    >
                        {/* Suspect header */}
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-xl border"
                                style={{
                                    borderColor: suspect.color + '60',
                                    backgroundColor: suspect.color + '10',
                                }}
                            >
                                {suspect.portrait}
                            </div>
                            <div>
                                <h4 className="font-medium text-noir-100 text-sm">{suspect.name}</h4>
                                <p className="text-[10px] text-noir-500">{suspect.role}</p>
                            </div>
                        </div>

                        {/* Relationships */}
                        <div className="space-y-2">
                            {rels.map((rel, i) => {
                                const otherPersonId = rel.from === suspect.id ? rel.to : rel.from;
                                const otherPerson = allPeople.find(p => p.id === otherPersonId);
                                if (!otherPerson) return null;

                                return (
                                    <div
                                        key={i}
                                        className={`flex items-start gap-2 p-2 rounded-lg border bg-noir-800/30
                               ${tensionColors[rel.tension]}`}
                                    >
                                        <span className="text-sm mt-0.5">{typeIcons[rel.type] || '🔗'}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-noir-200">
                                                    → {otherPerson.name}
                                                </span>
                                                <span className={`text-[9px] uppercase tracking-wider font-semibold 
                                        ${tensionColors[rel.tension]}`}>
                                                    {rel.tension} tension
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-noir-400 mt-0.5 leading-relaxed">
                                                {rel.label}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

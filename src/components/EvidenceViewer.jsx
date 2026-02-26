import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import useGameStore from '../store/gameStore';

export default function EvidenceViewer({ evidenceId, onClose }) {
    const markEvidenceRead = useGameStore(s => s.markEvidenceRead);
    const discoveredEvidence = useGameStore(s => s.discoveredEvidence);
    const evidence = useGameStore(s => s.episodeData?.evidence) || [];
    const item = evidence.find(e => e.id === evidenceId);

    useEffect(() => {
        if (evidenceId) {
            markEvidenceRead(evidenceId);
        }
    }, [evidenceId, markEvidenceRead]);

    if (!item) return null;

    const categoryIcons = {
        crime_scene: '🔍',
        physical: '🧪',
        house: '🏠',
        timing: '⏱️',
        document: '📄',
        testimony: '🗣️',
        background: '📋',
        method: '🔬',
        misdirection: '🎭',
    };

    const categoryLabels = {
        crime_scene: 'Crime Scene Evidence',
        physical: 'Physical Evidence',
        house: 'House Systems',
        timing: 'Timeline Analysis',
        document: 'Document Evidence',
        testimony: 'Witness Testimony',
        background: 'Background Research',
        method: 'Method Analysis',
        misdirection: 'Suspect Lead',
    };

    // Find what this evidence unlocks
    const unlockedBy = evidence.filter(e =>
        e.prerequisites.includes(evidenceId) && discoveredEvidence.includes(e.id)
    );
    const willUnlock = evidence.filter(e =>
        e.prerequisites.includes(evidenceId) && !discoveredEvidence.includes(e.id)
    );

    return (
        <Modal isOpen={!!evidenceId} onClose={onClose} title={null} size="lg">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-label">
                                {categoryIcons[item.category]} {categoryLabels[item.category]}
                            </span>
                            {item.isKeyEvidence && (
                                <span className="evidence-tag text-[10px]">★ Key Evidence</span>
                            )}
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-noir-50">{item.title}</h2>
                    </div>
                </div>

                <div className="divider" />

                {/* Summary */}
                <div className="bg-noir-800/50 rounded-lg p-4 border border-noir-700/30">
                    <p className="text-label mb-2">Summary</p>
                    <p className="text-sm text-noir-200 leading-relaxed">{item.summary}</p>
                </div>

                {/* Full Text */}
                <div>
                    <p className="text-label mb-3">Detailed Analysis</p>
                    <div className="prose prose-sm prose-invert max-w-none">
                        {item.fullText.split('\n\n').map((paragraph, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.08 }}
                                className={`text-sm leading-relaxed mb-4 
                  ${paragraph.startsWith('NOTE:') || paragraph.startsWith('HOWEVER:') || paragraph.startsWith('KEY')
                                        ? 'text-evidence/90 bg-evidence/5 p-3 rounded-lg border border-evidence/10'
                                        : 'text-noir-300'}`}
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-noir-400">
                    <span>📍</span>
                    <span>Location: {item.location}</span>
                </div>

                {/* Connections */}
                {(unlockedBy.length > 0 || willUnlock.length > 0) && (
                    <div className="pt-4 border-t border-noir-700/30">
                        <p className="text-label mb-3">Evidence Connections</p>
                        <div className="space-y-2">
                            {unlockedBy.map(e => (
                                <div key={e.id} className="flex items-center gap-2 text-xs text-emerald-400/80">
                                    <span>→</span>
                                    <span>This evidence helped unlock: <strong>{e.title}</strong></span>
                                </div>
                            ))}
                            {willUnlock.length > 0 && (
                                <div className="text-xs text-noir-500 italic mt-2">
                                    {willUnlock.length} connected piece(s) of evidence may still be uncovered...
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Logic tags (hidden from player, but shown subtly) */}
                {item.logicTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {item.logicTags.map(tag => (
                            <span key={tag} className="evidence-tag text-[10px]">
                                {tag.replace(/_/g, ' ')}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
}

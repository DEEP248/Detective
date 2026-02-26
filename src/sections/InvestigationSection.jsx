import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';
import EvidenceCard from '../components/EvidenceCard';
import EvidenceViewer from '../components/EvidenceViewer';
import SuspectCard from '../components/SuspectCard';
import SuspectProfile from '../components/SuspectProfile';
import TimelineBoard from '../components/TimelineBoard';
import RelationshipMap from '../components/RelationshipMap';
import PoliceReport from '../components/PoliceReport';
import AccusationPanel from '../components/AccusationPanel';
import HintSystem from '../components/HintSystem';
import Notepad from '../components/Notepad';
import { staggerContainer } from '../animations/variants';
import { formatTime } from '../utils/helpers';

const tabs = [
    { id: 'evidence', label: 'Evidence', icon: '🔍' },
    { id: 'suspects', label: 'Suspects', icon: '👤' },
    { id: 'timeline', label: 'Timeline', icon: '⏱️' },
    { id: 'relationships', label: 'Relations', icon: '🔗' },
    { id: 'documents', label: 'Reports', icon: '📄' },
    { id: 'accusation', label: 'Accuse', icon: '⚖️' },
];

export default function InvestigationSection() {
    const activeTab = useGameStore(s => s.activeTab);
    const setActiveTab = useGameStore(s => s.setActiveTab);
    const discoveredEvidence = useGameStore(s => s.discoveredEvidence);
    const readEvidence = useGameStore(s => s.readEvidence);
    const startTime = useGameStore(s => s.startTime);
    const caseSolved = useGameStore(s => s.caseSolved);
    const interviewedSuspects = useGameStore(s => s.interviewedSuspects);
    const getDiscoveryProgress = useGameStore(s => s.getDiscoveryProgress);
    const episodeData = useGameStore(s => s.episodeData);
    const goHome = useGameStore(s => s.goHome);

    const evidence = episodeData?.evidence || [];
    const suspects = episodeData?.suspects || [];
    const meta = episodeData?.meta;

    const [selectedEvidence, setSelectedEvidence] = useState(null);
    const [selectedSuspect, setSelectedSuspect] = useState(null);
    const [elapsed, setElapsed] = useState(0);
    const [newEvidenceAlert, setNewEvidenceAlert] = useState(null);
    const [prevDiscoveredCount, setPrevDiscoveredCount] = useState(discoveredEvidence.length);

    // Track elapsed time
    useEffect(() => {
        if (!startTime || caseSolved) return;
        const interval = setInterval(() => {
            setElapsed(Date.now() - startTime);
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime, caseSolved]);

    // Detect new evidence unlocks
    useEffect(() => {
        if (discoveredEvidence.length > prevDiscoveredCount) {
            const newIds = discoveredEvidence.filter((id, i) => i >= prevDiscoveredCount);
            const newItems = newIds.map(id => evidence.find(e => e.id === id)).filter(Boolean);
            if (newItems.length > 0) {
                setNewEvidenceAlert(newItems);
                setTimeout(() => setNewEvidenceAlert(null), 4000);
            }
        }
        setPrevDiscoveredCount(discoveredEvidence.length);
    }, [discoveredEvidence.length]);

    // Filter evidence by category for display
    const discoveredItems = evidence.filter(e => discoveredEvidence.includes(e.id));
    const unreadCount = discoveredEvidence.filter(id => !readEvidence.includes(id)).length;

    // Dynamically build categories from discovered evidence
    const categoryMap = {
        crime_scene: 'Crime Scene',
        physical: 'Physical',
        house: 'House Systems',
        timing: 'Timing',
        document: 'Documents',
        testimony: 'Testimony',
        background: 'Background',
        method: 'Method',
        misdirection: 'Misdirection',
    };
    const activeCategories = [...new Set(discoveredItems.map(e => e.category))];
    const categories = activeCategories.map(id => ({ id, label: categoryMap[id] || id }));

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top bar */}
            <div className="sticky top-0 z-30 bg-noir-950/90 backdrop-blur-md border-b border-noir-800/50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Left - case info */}
                    <div className="flex items-center gap-4">
                        <button onClick={goHome} className="text-noir-500 hover:text-evidence transition-colors text-xs mr-2">
                            ← Home
                        </button>
                        <div>
                            <h1 className="text-sm font-serif font-bold text-noir-200">{meta?.title || 'Detective Duniya'}</h1>
                            <p className="text-[10px] text-noir-500">Episode {meta?.number}</p>
                        </div>
                    </div>

                    {/* Center - progress */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-xs font-mono text-evidence">{discoveredEvidence.length}/{evidence.length}</p>
                            <p className="text-[9px] text-noir-500">Evidence</p>
                        </div>
                        <div className="w-px h-6 bg-noir-700" />
                        <div className="text-center">
                            <p className="text-xs font-mono text-evidence">{interviewedSuspects.length}/{suspects.length}</p>
                            <p className="text-[9px] text-noir-500">Interviewed</p>
                        </div>
                        <div className="w-px h-6 bg-noir-700" />
                        <div className="text-center">
                            <p className="text-xs font-mono text-noir-300">{getDiscoveryProgress()}%</p>
                            <p className="text-[9px] text-noir-500">Progress</p>
                        </div>
                        <div className="w-px h-6 bg-noir-700" />
                        <div className="text-center">
                            <p className="text-xs font-mono text-noir-300">{formatTime(elapsed)}</p>
                            <p className="text-[9px] text-noir-500">Elapsed</p>
                        </div>
                    </div>

                    {/* Right - tools */}
                    <div className="flex items-center gap-2">
                        <HintSystem />
                        <Notepad />
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-0.5 bg-noir-800">
                    <motion.div
                        className="h-full bg-gradient-to-r from-evidence/50 to-evidence"
                        initial={{ width: 0 }}
                        animate={{ width: `${getDiscoveryProgress()}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="sticky top-[62px] z-20 bg-noir-950/80 backdrop-blur-sm border-b border-noir-800/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium
                           whitespace-nowrap transition-all duration-200 relative
                  ${activeTab === tab.id
                                        ? 'bg-noir-800 text-evidence border border-evidence/20'
                                        : 'text-noir-400 hover:text-noir-200 hover:bg-noir-800/50'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                                {tab.id === 'evidence' && unreadCount > 0 && (
                                    <span className="w-4 h-4 rounded-full bg-evidence text-noir-950 text-[9px] 
                                 font-bold flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
                <AnimatePresence mode="wait">
                    {/* EVIDENCE TAB */}
                    {activeTab === 'evidence' && (
                        <motion.div
                            key="evidence"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-6">
                                <h2 className="text-xl font-serif font-bold text-noir-100">Evidence Board</h2>
                                <p className="text-xs text-noir-400 mt-1">
                                    {discoveredEvidence.length} pieces discovered. Click to examine.
                                    New evidence unlocks as you review related findings.
                                </p>
                            </div>

                            {categories.map(category => {
                                const catItems = discoveredItems.filter(e => e.category === category.id);
                                if (catItems.length === 0) return null;

                                return (
                                    <div key={category.id} className="mb-8">
                                        <h3 className="text-label mb-3">{category.label}</h3>
                                        <motion.div
                                            variants={staggerContainer}
                                            initial="initial"
                                            animate="animate"
                                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                                        >
                                            {catItems.map(item => (
                                                <EvidenceCard
                                                    key={item.id}
                                                    item={item}
                                                    onClick={() => setSelectedEvidence(item.id)}
                                                />
                                            ))}
                                        </motion.div>
                                    </div>
                                );
                            })}

                            {/* Locked evidence hint */}
                            {discoveredItems.length < evidence.length && (
                                <div className="mt-8 p-4 bg-noir-800/20 border border-dashed border-noir-700/30 
                                rounded-xl text-center">
                                    <p className="text-xs text-noir-500">
                                        🔒 {evidence.length - discoveredItems.length} pieces of evidence remain locked.
                                        Review existing evidence to unlock new findings.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* SUSPECTS TAB */}
                    {activeTab === 'suspects' && (
                        <motion.div
                            key="suspects"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-6">
                                <h2 className="text-xl font-serif font-bold text-noir-100">Suspect Profiles</h2>
                                <p className="text-xs text-noir-400 mt-1">
                                    {interviewedSuspects.length}/{suspects.length} suspects fully interviewed.
                                    Click to review profiles and conduct interviews.
                                </p>
                            </div>

                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {suspects.map(suspect => (
                                    <SuspectCard
                                        key={suspect.id}
                                        suspect={suspect}
                                        onClick={() => setSelectedSuspect(suspect.id)}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* TIMELINE TAB */}
                    {activeTab === 'timeline' && (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TimelineBoard />
                        </motion.div>
                    )}

                    {/* RELATIONSHIPS TAB */}
                    {activeTab === 'relationships' && (
                        <motion.div
                            key="relationships"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <RelationshipMap />
                        </motion.div>
                    )}

                    {/* DOCUMENTS TAB */}
                    {activeTab === 'documents' && (
                        <motion.div
                            key="documents"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PoliceReport />
                        </motion.div>
                    )}

                    {/* ACCUSATION TAB */}
                    {activeTab === 'accusation' && (
                        <motion.div
                            key="accusation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AccusationPanel />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* New evidence notification */}
            <AnimatePresence>
                {newEvidenceAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        className="fixed bottom-6 left-1/2 z-50 bg-noir-900 border border-evidence/30 
                       rounded-xl shadow-glow-warm p-4 max-w-sm w-full"
                    >
                        <div className="flex items-start gap-3">
                            <motion.span
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl"
                            >
                                🔓
                            </motion.span>
                            <div>
                                <p className="text-sm font-semibold text-evidence">New Evidence Unlocked</p>
                                {newEvidenceAlert.map(item => (
                                    <p key={item.id} className="text-xs text-noir-300 mt-1">
                                        {item.icon} {item.title}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Evidence viewer modal */}
            <EvidenceViewer
                evidenceId={selectedEvidence}
                onClose={() => setSelectedEvidence(null)}
            />

            {/* Suspect profile modal */}
            <SuspectProfile
                suspectId={selectedSuspect}
                onClose={() => setSelectedSuspect(null)}
            />
        </div>
    );
}

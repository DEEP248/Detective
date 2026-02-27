import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../../../store/gameStore';
import BlackoutOverlay from './BlackoutOverlay';
import PhoneUnlockPuzzle from './PhoneUnlockPuzzle';
import TornPaperPuzzle from './TornPaperPuzzle';
import AccusationPanel from '../../../components/AccusationPanel';
import HintSystem from '../../../components/HintSystem';
import Modal from '../../../components/Modal';

// ─── CONSTANTS ───
const SPEED_MULTIPLIER = 3; // 1 real second = 3 game seconds
const TOTAL_GAME_MINUTES = 11; // Game ends at minute 11
const BLACKOUT_MINUTE = 10;

export default function RealTimeSection() {
    const episodeData = useGameStore(s => s.episodeData);
    const goHome = useGameStore(s => s.goHome);
    const discoveredEvidence = useGameStore(s => s.discoveredEvidence);
    const discoverEvidence = useGameStore(s => s.discoverEvidence);
    const markEvidenceRead = useGameStore(s => s.markEvidenceRead);
    const setActiveTab = useGameStore(s => s.setActiveTab);

    const rooms = episodeData?.rooms || [];
    const suspects = episodeData?.suspects || [];
    const suspectMovements = episodeData?.suspectMovements || [];
    const storyEvents = episodeData?.storyEvents || [];
    const evidence = episodeData?.evidence || [];

    // ─── STATE ───
    const [phase, setPhase] = useState('realtime'); // realtime | blackout | investigation
    const [gameMinute, setGameMinute] = useState(0);
    const [gameSeconds, setGameSeconds] = useState(0);
    const [currentRoom, setCurrentRoom] = useState('living_room');
    const [dialogueBubble, setDialogueBubble] = useState(null);
    const [eventNotif, setEventNotif] = useState(null);
    const [itemPopup, setItemPopup] = useState(null);
    const [activeEvidence, setActiveEvidence] = useState(null);
    const [activePuzzle, setActivePuzzle] = useState(null);
    const [showAccusation, setShowAccusation] = useState(false);
    const [solvedPuzzles, setSolvedPuzzles] = useState([]);
    const [showTutorial, setShowTutorial] = useState(true); // Tutorial overlay on first load
    const timerRef = useRef(null);
    const shownEventsRef = useRef(new Set());

    // ─── TIMER (paused during tutorial) ───
    useEffect(() => {
        if (phase !== 'realtime' || showTutorial) return;

        timerRef.current = setInterval(() => {
            setGameSeconds(prev => {
                const next = prev + SPEED_MULTIPLIER;
                if (next >= 60) {
                    setGameMinute(m => {
                        const newMin = m + 1;
                        if (newMin >= BLACKOUT_MINUTE) {
                            clearInterval(timerRef.current);
                            setPhase('blackout');
                        }
                        return newMin;
                    });
                    return next - 60;
                }
                return next;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [phase, showTutorial]);

    // ─── STORY EVENT NOTIFICATIONS ───
    useEffect(() => {
        if (phase !== 'realtime') return;
        const events = storyEvents.filter(e =>
            e.minute <= gameMinute && e.type !== 'blackout' && e.type !== 'murder' && !shownEventsRef.current.has(e.minute)
        );
        if (events.length > 0) {
            const latest = events[events.length - 1];
            shownEventsRef.current.add(latest.minute);
            setEventNotif(latest);
            setTimeout(() => setEventNotif(null), 8000);
        }
    }, [gameMinute, phase, storyEvents]);

    // ─── GET SUSPECTS IN CURRENT ROOM ───
    const getSuspectsInRoom = useCallback((roomId) => {
        const currentPositions = {};
        suspectMovements.forEach(m => {
            if (m.minute <= gameMinute) {
                currentPositions[m.suspect] = m.room;
            }
        });
        return suspects.filter(s => currentPositions[s.id] === roomId);
    }, [gameMinute, suspectMovements, suspects]);

    // ─── GET DIALOGUE FOR SUSPECT ───
    const getDialogue = useCallback((suspect) => {
        const dialogues = suspect.dialogues || {};
        for (const range of Object.keys(dialogues)) {
            const [start, end] = range.split('-').map(Number);
            if (gameMinute >= start && gameMinute < end) {
                return dialogues[range];
            }
        }
        return null;
    }, [gameMinute]);

    // ─── HANDLE SUSPECT CLICK ───
    const handleSuspectClick = (suspect) => {
        const d = getDialogue(suspect);
        if (d) {
            setDialogueBubble({ suspect: suspect.name, text: d.text, color: suspect.color });
            setTimeout(() => setDialogueBubble(null), 7000);
        }
    };

    // ─── HANDLE ROOM ITEM CLICK ───
    const handleItemClick = (item) => {
        setItemPopup(item);
        setTimeout(() => setItemPopup(null), 8000);
    };

    // ─── BLACKOUT COMPLETE → INVESTIGATION ───
    const handleBlackoutComplete = useCallback(() => {
        setPhase('investigation');
        // Discover first 2 evidence items automatically
        if (evidence.length > 0) {
            discoverEvidence(evidence[0].id);
            if (evidence.length > 1) discoverEvidence(evidence[1].id);
        }
    }, [evidence, discoverEvidence]);

    // ─── PUZZLE SOLVED ───
    const handlePuzzleSolved = (puzzleType, evidenceId) => {
        setSolvedPuzzles(prev => [...prev, puzzleType]);
        discoverEvidence(evidenceId);
        markEvidenceRead(evidenceId);
        setTimeout(() => setActivePuzzle(null), 1500);
    };

    // ─── EVIDENCE CLICK IN INVESTIGATION ───
    const handleEvidenceClick = (item) => {
        if (!discoveredEvidence.includes(item.id)) {
            discoverEvidence(item.id);
        }
        if (item.type === 'puzzle' && !solvedPuzzles.includes(item.puzzleType)) {
            setActivePuzzle(item);
        } else {
            markEvidenceRead(item.id);
            setActiveEvidence(item);
        }
    };

    const currentRoomData = rooms.find(r => r.id === currentRoom) || rooms[0];
    const roomSuspects = getSuspectsInRoom(currentRoom);

    // ═══════════════════════════════════════════
    // RENDER: BLACKOUT PHASE
    // ═══════════════════════════════════════════
    if (phase === 'blackout') {
        return <BlackoutOverlay onComplete={handleBlackoutComplete} />;
    }

    // ═══════════════════════════════════════════
    // RENDER: ACCUSATION
    // ═══════════════════════════════════════════
    if (showAccusation) {
        return (
            <div className="min-h-screen bg-noir-950 p-4">
                <button
                    onClick={() => setShowAccusation(false)}
                    className="mb-4 text-xs text-noir-500 hover:text-noir-300 transition-colors"
                >
                    ← Back to Evidence
                </button>
                <AccusationPanel />
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // RENDER: INVESTIGATION PHASE
    // ═══════════════════════════════════════════
    if (phase === 'investigation') {
        return (
            <div className="min-h-screen bg-noir-950 text-noir-100">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-noir-950/95 backdrop-blur-sm border-b border-red-900/30 px-4 py-3">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-serif font-bold text-red-400">🔍 Crime Scene Investigation</h2>
                            <p className="text-xs text-noir-400">Sanya Mehra found dead. Examine evidence. Find the killer.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <HintSystem />
                            <button
                                onClick={() => setShowAccusation(true)}
                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-900/30 text-red-400 border border-red-800/30
                                           hover:bg-red-900/50 transition-colors"
                            >
                                ⚖️ Accuse
                            </button>
                            <button onClick={goHome} className="text-sm text-noir-500 hover:text-noir-300 transition-colors">
                                ✕
                            </button>
                        </div>
                    </div>
                </div>

                {/* Evidence Grid */}
                <div className="max-w-4xl mx-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {evidence.map(item => {
                            const discovered = discoveredEvidence.includes(item.id);
                            const isPuzzle = item.type === 'puzzle';
                            const puzzleSolved = solvedPuzzles.includes(item.puzzleType);
                            return (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => discovered && handleEvidenceClick(item)}
                                    className={`text-left p-4 rounded-xl border transition-all duration-200
                                        ${discovered
                                            ? 'bg-noir-900/80 border-noir-700/50 hover:border-evidence/40 cursor-pointer'
                                            : 'bg-noir-900/30 border-noir-800/30 opacity-40 cursor-not-allowed'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{item.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-semibold text-noir-200 truncate">{item.title}</h3>
                                            <p className="text-sm text-noir-400 mt-1 line-clamp-2">{item.summary}</p>
                                            {isPuzzle && !puzzleSolved && discovered && (
                                                <span className="inline-block mt-2 text-xs text-evidence bg-evidence/10 px-2 py-0.5 rounded-full">
                                                    🧩 Interactive Puzzle
                                                </span>
                                            )}
                                            {isPuzzle && puzzleSolved && (
                                                <span className="inline-block mt-2 text-xs text-green-400 bg-green-900/20 px-2 py-0.5 rounded-full">
                                                    ✓ Solved
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Suspect Quick Interviews */}
                    <div className="mt-8">
                        <h3 className="text-base font-semibold text-noir-200 mb-3">👥 Quick Interviews</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {suspects.map(s => (
                                <details key={s.id} className="bg-noir-900/60 border border-noir-700/30 rounded-xl overflow-hidden group">
                                    <summary className="p-3 cursor-pointer flex items-center gap-3 hover:bg-noir-800/30 transition-colors">
                                        <span className="text-xl">{s.portrait}</span>
                                        <div>
                                            <p className="text-sm font-semibold text-noir-200">{s.name}</p>
                                            <p className="text-xs text-noir-400">{s.role}</p>
                                        </div>
                                    </summary>
                                    <div className="p-3 pt-0 space-y-2">
                                        {s.interview.map((qa, i) => (
                                            <div key={i} className="text-sm">
                                                <p className="text-evidence/80 font-medium">Q: {qa.q}</p>
                                                <p className="text-noir-400 mt-0.5">"{qa.a}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Evidence Detail Modal */}
                <AnimatePresence>
                    {activeEvidence && (
                        <Modal onClose={() => setActiveEvidence(null)}>
                            <div className="p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{activeEvidence.icon}</span>
                                    <h3 className="text-base font-serif font-bold text-noir-100">{activeEvidence.title}</h3>
                                </div>
                                <div className="text-sm text-noir-300 whitespace-pre-line leading-relaxed">
                                    {activeEvidence.fullText}
                                </div>
                            </div>
                        </Modal>
                    )}
                </AnimatePresence>

                {/* Puzzle Modal */}
                <AnimatePresence>
                    {activePuzzle && (
                        <Modal onClose={() => setActivePuzzle(null)}>
                            <div className="p-4">
                                {activePuzzle.puzzleType === 'phone_unlock' && (
                                    <PhoneUnlockPuzzle
                                        clueText="Hint: Check the fridge photo. What's her lucky number?"
                                        onSolve={() => handlePuzzleSolved('phone_unlock', activePuzzle.id)}
                                    />
                                )}
                                {activePuzzle.puzzleType === 'torn_paper' && (
                                    <TornPaperPuzzle
                                        onSolve={() => handlePuzzleSolved('torn_paper', activePuzzle.id)}
                                    />
                                )}
                            </div>
                        </Modal>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // RENDER: REAL-TIME PHASE
    // ═══════════════════════════════════════════
    return (
        <div className="min-h-screen bg-noir-950 text-noir-100 flex flex-col">
            {/* Top Bar — Timer + Room Name */}
            <div className="sticky top-0 z-10 bg-noir-950/95 backdrop-blur-sm border-b border-noir-800/50 px-4 py-2">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={goHome} className="text-sm text-noir-500 hover:text-noir-300 transition-colors">
                            ← Home
                        </button>
                        <span className="text-noir-700">|</span>
                        <span className="text-sm font-medium text-noir-300">{currentRoomData?.icon} {currentRoomData?.name}</span>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center gap-3">
                        <motion.div
                            className={`font-mono text-sm font-bold tracking-wider
                                ${gameMinute >= 8 ? 'text-red-400' : gameMinute >= 5 ? 'text-amber-400' : 'text-evidence'}`}
                            animate={gameMinute >= 8 ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            {String(gameMinute).padStart(2, '0')}:{String(Math.floor(gameSeconds)).padStart(2, '0')}
                        </motion.div>
                        <span className="text-xs text-noir-500">/ {TOTAL_GAME_MINUTES}:00</span>
                    </div>
                </div>

                {/* Timer progress bar */}
                <div className="max-w-4xl mx-auto mt-1">
                    <div className="h-1 bg-noir-800 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${gameMinute >= 8 ? 'bg-red-500' : 'bg-evidence'}`}
                            style={{ width: `${((gameMinute * 60 + gameSeconds) / (TOTAL_GAME_MINUTES * 60)) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Tutorial Overlay */}
            <AnimatePresence>
                {showTutorial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-noir-950/95 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-lg w-full bg-noir-900 border border-noir-700/50 rounded-2xl p-8 text-center"
                        >
                            <span className="text-4xl mb-4 block">🎂</span>
                            <h2 className="text-xl font-serif font-bold text-evidence mb-2">How This Case Works</h2>
                            <p className="text-sm text-noir-400 mb-6">Episode 3 plays differently from previous cases.</p>

                            <div className="text-left space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <span className="text-lg flex-shrink-0">⏱️</span>
                                    <div>
                                        <p className="text-sm font-semibold text-noir-200">Real-Time Countdown</p>
                                        <p className="text-sm text-noir-400">A clock is ticking. You have until minute 10 to observe the party. At minute 10 — the lights go out.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-lg flex-shrink-0">🚪</span>
                                    <div>
                                        <p className="text-sm font-semibold text-noir-200">Explore 4 Rooms</p>
                                        <p className="text-sm text-noir-400">Use the tabs at the bottom to move between rooms. Each room has items to examine and people to talk to.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-lg flex-shrink-0">👤</span>
                                    <div>
                                        <p className="text-sm font-semibold text-noir-200">Click on People</p>
                                        <p className="text-sm text-noir-400">Click any person to hear what they're saying. Watch who goes where — suspects move between rooms over time.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-lg flex-shrink-0">🔍</span>
                                    <div>
                                        <p className="text-sm font-semibold text-noir-200">After the Blackout</p>
                                        <p className="text-sm text-noir-400">After the murder, you'll investigate evidence, solve puzzles, and accuse the killer. You get 3 attempts.</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowTutorial(false)}
                                className="w-full py-3 rounded-xl text-base font-bold bg-evidence/20 text-evidence border border-evidence/30
                                           hover:bg-evidence/30 transition-all duration-200"
                            >
                                ▶ Start the Party
                            </button>
                            <p className="text-xs text-noir-600 mt-3">The timer starts when you click this button.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Story Event Notification */}
            <AnimatePresence>
                {eventNotif && (
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="fixed top-16 left-1/2 -translate-x-1/2 z-20 max-w-md"
                    >
                        <div className={`px-5 py-3.5 rounded-xl border text-sm text-center shadow-2xl leading-relaxed
                            ${eventNotif.type === 'clue'
                                ? 'bg-evidence/10 border-evidence/30 text-evidence'
                                : eventNotif.type === 'tension'
                                    ? 'bg-red-900/20 border-red-800/30 text-red-300'
                                    : eventNotif.type === 'critical'
                                        ? 'bg-red-900/30 border-red-700/40 text-red-200 font-semibold'
                                        : 'bg-noir-800/80 border-noir-700/40 text-noir-300'
                            }`}
                        >
                            {eventNotif.text}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Room Content */}
            <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
                {/* Room description */}
                <motion.p
                    key={currentRoom}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-noir-500 mb-6 italic"
                >
                    {currentRoomData?.description}
                </motion.p>

                {/* Suspects in this room */}
                <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-widest text-noir-600 mb-3">People Here</h3>
                    {roomSuspects.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                            {roomSuspects.map(s => (
                                <motion.button
                                    key={s.id}
                                    onClick={() => handleSuspectClick(s)}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-noir-900/60 border border-noir-700/30
                                               hover:border-evidence/30 transition-all duration-200 group"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="text-xl">{s.portrait}</span>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-noir-200 group-hover:text-evidence transition-colors">{s.name}</p>
                                        <p className="text-xs text-noir-500">{s.role}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-noir-600 italic">No one is here right now.</p>
                    )}
                </div>

                {/* Dialogue Bubble */}
                <AnimatePresence>
                    {dialogueBubble && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-3 rounded-xl border border-noir-700/40 bg-noir-900/80"
                            style={{ borderLeftColor: dialogueBubble.color, borderLeftWidth: 3 }}
                        >
                            <p className="text-xs text-noir-500 mb-1 font-semibold">{dialogueBubble.suspect}:</p>
                            <p className="text-sm text-noir-200 italic leading-relaxed">"{dialogueBubble.text}"</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Room Items */}
                <div>
                    <h3 className="text-xs uppercase tracking-widest text-noir-600 mb-3">Things to Examine</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {currentRoomData?.items?.map(item => (
                            <motion.button
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                className="p-3 rounded-xl bg-noir-900/40 border border-noir-800/40 text-left
                                           hover:border-evidence/20 hover:bg-noir-900/60 transition-all duration-200"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-2xl block mb-1">{item.icon}</span>
                                <p className="text-sm text-noir-300 font-medium">{item.name}</p>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Item Popup */}
                <AnimatePresence>
                    {itemPopup && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-4 p-3 rounded-xl bg-noir-800/50 border border-noir-700/30"
                        >
                            <div className="flex items-start gap-2">
                                <span className="text-2xl">{itemPopup.icon}</span>
                                <div>
                                    <p className="text-sm font-semibold text-noir-200">{itemPopup.name}</p>
                                    <p className="text-sm text-noir-400 mt-1 leading-relaxed">{itemPopup.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Navigation — Room Tabs */}
            <div className="sticky bottom-0 z-10 bg-noir-950/95 backdrop-blur-sm border-t border-noir-800/50">
                <div className="max-w-4xl mx-auto flex">
                    {rooms.map(room => (
                        <button
                            key={room.id}
                            onClick={() => { setCurrentRoom(room.id); setDialogueBubble(null); setItemPopup(null); }}
                            className={`flex-1 py-3 text-center transition-all duration-200
                                ${currentRoom === room.id
                                    ? 'text-evidence border-t-2 border-evidence bg-evidence/5'
                                    : 'text-noir-500 hover:text-noir-300 border-t-2 border-transparent'
                                }`}
                        >
                            <span className="text-lg block">{room.icon}</span>
                            <span className="text-xs mt-0.5 block">{room.name}</span>
                            {/* Show dot if suspects are here */}
                            {getSuspectsInRoom(room.id).length > 0 && currentRoom !== room.id && (
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-evidence/60 mt-1" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

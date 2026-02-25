import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { evidence } from '../data/evidence';

const useGameStore = create(
    persist(
        (set, get) => ({
            // Game state
            gameStarted: false,
            currentSection: 'intro',  // intro, briefing, investigation, accusation, solved

            // Evidence discovery
            discoveredEvidence: [],    // array of evidence ids
            readEvidence: [],          // evidence the player has actually read (opened)

            // Suspect interactions
            interviewedSuspects: [],   // suspect ids that have been fully interviewed
            currentInterview: null,    // suspect id currently being interviewed
            revealedQuestions: {},     // { suspectId: [questionIndices] }

            // Notes & board
            playerNotes: '',
            boardPositions: {},        // { evidenceId: { x, y } } for evidence board positions

            // Timeline arrangement
            playerTimeline: [],        // player's arranged timeline event ids

            // Hints
            usedHints: [],
            hintPenalty: 0,

            // Accusation attempts
            accusationAttempts: 0,
            maxAccusationAttempts: 3,
            caseSolved: false,
            accusationResult: null,

            // UI state
            activeModal: null,         // id of currently open modal/evidence
            activeTab: 'evidence',     // evidence, suspects, timeline, relationships, documents

            // Time tracking
            startTime: null,
            endTime: null,

            // Actions
            startGame: () => set({
                gameStarted: true,
                currentSection: 'briefing',
                startTime: Date.now(),
                // Auto-discover initial evidence
                discoveredEvidence: ['crime_scene_overview', 'power_outage_report', 'will_document', 'clara_stolen_docs', 'eleanor_phone_records'],
            }),

            proceedToInvestigation: () => set({ currentSection: 'investigation' }),

            discoverEvidence: (evidenceId) => {
                const state = get();
                if (state.discoveredEvidence.includes(evidenceId)) return;

                // Check prerequisites
                const item = evidence.find(e => e.id === evidenceId);
                if (!item) return;
                const prereqsMet = item.prerequisites.every(p => state.discoveredEvidence.includes(p));
                if (!prereqsMet) return;

                set({ discoveredEvidence: [...state.discoveredEvidence, evidenceId] });
            },

            markEvidenceRead: (evidenceId) => {
                const state = get();
                if (state.readEvidence.includes(evidenceId)) return;

                set({ readEvidence: [...state.readEvidence, evidenceId] });

                // After reading, check what new evidence can be unlocked
                const currentDiscovered = [...state.discoveredEvidence];
                const newlyUnlocked = [];

                evidence.forEach(e => {
                    if (!currentDiscovered.includes(e.id) && !newlyUnlocked.includes(e.id)) {
                        const allPrereqs = e.prerequisites.every(p =>
                            currentDiscovered.includes(p) || newlyUnlocked.includes(p)
                        );
                        // Only auto-discover if all prereqs are in readEvidence
                        const allRead = e.prerequisites.every(p =>
                            [...state.readEvidence, evidenceId].includes(p)
                        );
                        if (allPrereqs && allRead) {
                            newlyUnlocked.push(e.id);
                        }
                    }
                });

                if (newlyUnlocked.length > 0) {
                    set({ discoveredEvidence: [...currentDiscovered, ...newlyUnlocked] });
                }
            },

            interviewSuspect: (suspectId) => {
                const state = get();
                if (!state.interviewedSuspects.includes(suspectId)) {
                    set({ interviewedSuspects: [...state.interviewedSuspects, suspectId] });
                }
            },

            revealQuestion: (suspectId, questionIndex) => {
                const state = get();
                const current = state.revealedQuestions[suspectId] || [];
                if (current.includes(questionIndex)) return;
                set({
                    revealedQuestions: {
                        ...state.revealedQuestions,
                        [suspectId]: [...current, questionIndex],
                    },
                });
            },

            setPlayerNotes: (notes) => set({ playerNotes: notes }),

            setBoardPosition: (evidenceId, position) => {
                const state = get();
                set({
                    boardPositions: {
                        ...state.boardPositions,
                        [evidenceId]: position,
                    },
                });
            },

            useHint: (hintId, cost) => {
                const state = get();
                if (state.usedHints.includes(hintId)) return;
                set({
                    usedHints: [...state.usedHints, hintId],
                    hintPenalty: state.hintPenalty + cost,
                });
            },

            setActiveModal: (modalId) => set({ activeModal: modalId }),
            setActiveTab: (tab) => set({ activeTab: tab }),
            setCurrentSection: (section) => set({ currentSection: section }),

            attemptAccusation: (result) => {
                const state = get();
                const newAttempts = state.accusationAttempts + 1;

                if (result.success) {
                    set({
                        caseSolved: true,
                        accusationAttempts: newAttempts,
                        accusationResult: result,
                        currentSection: 'solved',
                        endTime: Date.now(),
                    });
                } else {
                    set({
                        accusationAttempts: newAttempts,
                        accusationResult: result,
                    });
                }
            },

            clearAccusationResult: () => set({ accusationResult: null }),

            resetGame: () => set({
                gameStarted: false,
                currentSection: 'intro',
                discoveredEvidence: [],
                readEvidence: [],
                interviewedSuspects: [],
                currentInterview: null,
                revealedQuestions: {},
                playerNotes: '',
                boardPositions: {},
                playerTimeline: [],
                usedHints: [],
                hintPenalty: 0,
                accusationAttempts: 0,
                caseSolved: false,
                accusationResult: null,
                activeModal: null,
                activeTab: 'evidence',
                startTime: null,
                endTime: null,
            }),

            // Computed-like getters
            getDiscoveryProgress: () => {
                const state = get();
                const total = evidence.length;
                return Math.round((state.discoveredEvidence.length / total) * 100);
            },

            canMakeAccusation: () => {
                const state = get();
                return state.accusationAttempts < state.maxAccusationAttempts &&
                    state.discoveredEvidence.length >= 8 &&
                    !state.caseSolved;
            },

            getScore: () => {
                const state = get();
                if (!state.caseSolved) return 0;
                const baseScore = 1000;
                const hintDeduction = state.hintPenalty;
                const attemptDeduction = (state.accusationAttempts - 1) * 100;
                const timeBonus = state.endTime && state.startTime
                    ? Math.max(0, 200 - Math.floor((state.endTime - state.startTime) / 60000))
                    : 0;
                return Math.max(0, baseScore - hintDeduction - attemptDeduction + timeBonus);
            },
        }),
        {
            name: 'silence-protocol-save',
            version: 1,
        }
    )
);

export default useGameStore;

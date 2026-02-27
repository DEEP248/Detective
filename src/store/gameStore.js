import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGameStore = create(
    persist(
        (set, get) => ({
            // ========== PLATFORM STATE ==========
            currentPage: 'home',           // 'home' | 'playing'
            activeEpisodeId: null,         // 'episode1' | 'episode2' | etc.
            episodeData: null,             // loaded episode data (lazy)

            // ========== GAME STATE ==========
            gameStarted: false,
            currentSection: 'intro',       // intro, briefing, investigation, solved

            // Evidence
            discoveredEvidence: [],
            readEvidence: [],

            // Suspects
            interviewedSuspects: [],
            currentInterview: null,
            revealedQuestions: {},

            // Notes
            playerNotes: '',

            // Hints
            usedHints: [],
            hintPenalty: 0,

            // Accusation
            accusationAttempts: 0,
            maxAccusationAttempts: 3,
            caseSolved: false,
            accusationResult: null,

            // UI
            activeModal: null,
            activeTab: 'evidence',

            // Time
            startTime: null,
            endTime: null,

            // ========== PLATFORM ACTIONS ==========
            playEpisode: (episodeId, data) => set({
                currentPage: 'playing',
                activeEpisodeId: episodeId,
                episodeData: data,
                // Reset game state for fresh play
                gameStarted: false,
                currentSection: 'intro',
                discoveredEvidence: [],
                readEvidence: [],
                interviewedSuspects: [],
                currentInterview: null,
                revealedQuestions: {},
                playerNotes: '',
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

            goHome: () => set({
                currentPage: 'home',
                activeEpisodeId: null,
                episodeData: null,
                gameStarted: false,
                currentSection: 'intro',
            }),

            // ========== GAME ACTIONS ==========
            startGame: () => {
                const state = get();
                const ep = state.episodeData;
                if (!ep) return;
                set({
                    gameStarted: true,
                    currentSection: 'briefing',
                    startTime: Date.now(),
                    discoveredEvidence: ep.initialEvidence || [],
                });
            },

            proceedToInvestigation: () => set({ currentSection: 'investigation' }),

            discoverEvidence: (evidenceId) => {
                const state = get();
                if (state.discoveredEvidence.includes(evidenceId)) return;
                const ep = state.episodeData;
                if (!ep) return;
                const item = ep.evidence.find(e => e.id === evidenceId);
                if (!item) return;
                const prereqsMet = item.prerequisites.every(p => state.discoveredEvidence.includes(p));
                if (!prereqsMet) return;
                set({ discoveredEvidence: [...state.discoveredEvidence, evidenceId] });
            },

            markEvidenceRead: (evidenceId) => {
                const state = get();
                if (state.readEvidence.includes(evidenceId)) return;
                const ep = state.episodeData;
                if (!ep) return;

                set({ readEvidence: [...state.readEvidence, evidenceId] });

                const currentDiscovered = [...state.discoveredEvidence];
                const newlyUnlocked = [];

                ep.evidence.forEach(e => {
                    if (!currentDiscovered.includes(e.id) && !newlyUnlocked.includes(e.id)) {
                        const allPrereqs = e.prerequisites.every(p =>
                            currentDiscovered.includes(p) || newlyUnlocked.includes(p)
                        );
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

            resetGame: () => {
                const state = get();
                set({
                    gameStarted: false,
                    currentSection: 'intro',
                    discoveredEvidence: [],
                    readEvidence: [],
                    interviewedSuspects: [],
                    currentInterview: null,
                    revealedQuestions: {},
                    playerNotes: '',
                    usedHints: [],
                    hintPenalty: 0,
                    accusationAttempts: 0,
                    caseSolved: false,
                    accusationResult: null,
                    activeModal: null,
                    activeTab: 'evidence',
                    startTime: null,
                    endTime: null,
                });
            },

            // Computed-like getters
            getDiscoveryProgress: () => {
                const state = get();
                const ep = state.episodeData;
                if (!ep) return 0;
                const total = ep.evidence.length;
                return Math.round((state.discoveredEvidence.length / total) * 100);
            },

            canMakeAccusation: () => {
                const state = get();
                const ep = state.episodeData;
                const totalEvidence = ep?.evidence?.length || 20;
                const minRequired = Math.max(2, Math.ceil(totalEvidence * 0.6));
                return state.accusationAttempts < state.maxAccusationAttempts &&
                    state.discoveredEvidence.length >= minRequired &&
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
            name: 'detective-duniya-save',
            version: 2,
            partialize: (state) => ({
                // Only persist game progress, not episodeData (too large)
                currentPage: state.currentPage,
                activeEpisodeId: state.activeEpisodeId,
                gameStarted: state.gameStarted,
                currentSection: state.currentSection,
                discoveredEvidence: state.discoveredEvidence,
                readEvidence: state.readEvidence,
                interviewedSuspects: state.interviewedSuspects,
                revealedQuestions: state.revealedQuestions,
                playerNotes: state.playerNotes,
                usedHints: state.usedHints,
                hintPenalty: state.hintPenalty,
                accusationAttempts: state.accusationAttempts,
                caseSolved: state.caseSolved,
                activeTab: state.activeTab,
                startTime: state.startTime,
                endTime: state.endTime,
            }),
        }
    )
);

export default useGameStore;

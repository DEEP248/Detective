// Episode 1: The Last Candle — Puzzle Logic (Simplified)
// Obfuscated killer identity + simplified validation (select suspect only)

// Encoded answer key (not plaintext)
const _aK = [97, 100, 114, 105, 97, 110];
const _resolveKey = () => _aK.map(c => String.fromCharCode(c)).join('');

// 10 logic connections for the case (used for reveal, not validation)
export const logicConnections = [
    {
        id: 'mud_near_window',
        label: 'Mud impressions beneath library window',
        description: 'Fresh shoe prints in mud directly below the library window prove someone was outside during the storm.',
        category: 'physical',
    },
    {
        id: 'shoe_size_match',
        label: 'Shoe size matches the suspect (UK 10)',
        description: 'The mud impressions are UK size 10 — matching only one guest among all attendees.',
        category: 'physical',
    },
    {
        id: 'window_latch_loosened',
        label: 'Window latch was pre-loosened',
        description: 'The library window latch was tampered with before the murder, allowing it to be locked from outside.',
        category: 'preparation',
    },
    {
        id: 'breaker_panel_location',
        label: 'The killer knew breaker panel location',
        description: 'The suspect admitted knowing the breaker panel\'s location. The outage was caused by manually tripping it.',
        category: 'means',
    },
    {
        id: 'exact_time_knowledge',
        label: 'The killer knew exact power return time',
        description: 'The suspect volunteered that power returned at exactly 9:32 — suggesting they were the one who reset the breaker.',
        category: 'behavior',
    },
    {
        id: 'servant_corridor_access',
        label: 'The killer had servant corridor access',
        description: 'The suspect knew and used the service corridors to move unseen between the basement, east exit, and guest rooms.',
        category: 'means',
    },
    {
        id: 'will_change_motive',
        label: 'Will change would remove killer as executor',
        description: 'The new will would have removed the suspect as executor, exposing their embezzlement from the trust.',
        category: 'motive',
    },
    {
        id: 'power_outage_timing',
        label: 'Power outage was deliberately timed',
        description: 'The blackout at 9:17 PM was manually created to provide cover for the murder.',
        category: 'means',
    },
    {
        id: 'fake_locked_room',
        label: 'Locked room was faked with wire',
        description: 'The killer locked the window from outside using wire through the frame gap, creating a false locked-room illusion.',
        category: 'method',
    },
    {
        id: 'shoe_change',
        label: 'The killer changed shoes after the crime',
        description: 'The suspect changed from muddy brown oxfords to clean black loafers to hide evidence of being outside.',
        category: 'cover_up',
    },
];

// Simplified accusation: just check if the suspect matches
export function validateAccusation(suspectId) {
    const correctKey = _resolveKey();
    if (suspectId === correctKey) {
        return {
            success: true,
            score: 100,
            message: 'Your deduction is correct. Justice will be served.',
        };
    }
    return {
        success: false,
        score: 0,
        message: 'That is not the killer. The evidence does not support this accusation. Reconsider the facts.',
    };
}

// Hints system
export const hints = [
    { id: 1, threshold: 0, text: 'Start by reading the crime scene overview and power outage report. These establish the basic facts.', cost: 0 },
    { id: 2, threshold: 2, text: 'Pay attention to the library window. "Locked from inside" doesn\'t always mean what it seems.', cost: 5 },
    { id: 3, threshold: 4, text: 'Check the mud beneath the window. Compare shoe sizes of all suspects.', cost: 5 },
    { id: 4, threshold: 6, text: 'The power outage was deliberate. Who knew where the breaker panel was?', cost: 10 },
    { id: 5, threshold: 8, text: 'Someone volunteered information nobody asked for. That\'s a behavioral red flag.', cost: 10 },
    { id: 6, threshold: 10, text: 'Look at the will document carefully. Who benefits from the CURRENT will, not the new one?', cost: 15 },
    { id: 7, threshold: 12, text: 'The killer needed a way to move through the house unseen. The service corridors connect key locations.', cost: 15 },
    { id: 8, threshold: 14, text: 'Someone changed their shoes during the evening. Why would you do that during a murder investigation?', cost: 20 },
];

export function getAvailableHints(discoveredCount, usedHintIds) {
    return hints.filter(h =>
        discoveredCount >= h.threshold && !usedHintIds.includes(h.id)
    );
}

// Reveal the answer
export function getRevealData() {
    const killer = _resolveKey();
    return {
        killerId: killer,
        killerName: 'Adrian Cross',
        summary: 'Adrian Cross, the seemingly harmless family friend, orchestrated a meticulously planned locked-room murder. His calm demeanor and twenty years of trust were the perfect cover for a cold, calculated killer.',
        method: 'Adrian tripped the breaker to cause the blackout, exited through the east door, entered the library via the pre-loosened window, killed Victor with the fireplace poker, exited and locked the window from outside using picture wire, changed his muddy shoes, then returned to the basement to restore power — all within 15 minutes.',
        motive: 'Victor\'s new will would have removed Adrian as executor of the Windward Trust Foundation, exposing Adrian\'s embezzlement through a Channel Islands shell company.',
        keyEvidence: [
            'Mud impressions (UK size 10) beneath the library window match only Adrian',
            'Window latch had tool marks — pre-loosened before the murder',
            'Adrian admitted knowing the basement breaker panel location',
            'Adrian volunteered the exact time power returned (9:32 PM)',
            'Service corridors gave Adrian unseen access throughout the house',
            'The new will would expose Adrian\'s financial crimes',
            'The blackout was deliberately caused by tripping the main breaker',
            'Picture wire was used to lock the window from outside — faking a locked room',
            'Adrian changed from muddy brown oxfords to clean black loafers after the crime',
            'Adrian\'s calm, cooperative demeanor was a deliberate act',
        ],
    };
}

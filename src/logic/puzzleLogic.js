// Puzzle validation engine — answer is obfuscated to prevent source-code cheating

// Encoded answer key (not plaintext)
const _aK = [97, 100, 114, 105, 97, 110];
const _resolveKey = () => _aK.map(c => String.fromCharCode(c)).join('');

// Logic connections — labels use "the killer" instead of naming the answer
export const logicConnections = [
    {
        id: 'mud_near_window',
        label: 'Mud impressions beneath library window',
        description: 'Fresh shoe prints in mud directly below the library window prove someone was outside during the storm.',
        _m: [109, 117, 100, 44, 112, 114, 105, 110, 116, 115, 44, 105, 109, 112, 114, 101, 115, 115, 105, 111, 110, 115, 44, 119, 105, 110, 100, 111, 119, 44, 111, 117, 116, 115, 105, 100, 101, 44, 98, 101, 110, 101, 97, 116, 104, 44, 98, 101, 108, 111, 119],
        category: 'physical',
    },
    {
        id: 'shoe_size_match',
        label: 'Shoe size matches the suspect (UK 10)',
        description: 'The mud impressions are UK size 10 — matching only one guest among all attendees.',
        _m: [115, 104, 111, 101, 44, 115, 105, 122, 101, 44, 117, 107, 32, 49, 48, 44, 115, 105, 122, 101, 32, 49, 48, 44, 109, 97, 116, 99, 104, 44, 97, 100, 114, 105, 97, 110, 44, 111, 120, 102, 111, 114, 100, 44, 112, 114, 105, 110, 116],
        category: 'physical',
    },
    {
        id: 'window_latch_loosened',
        label: 'Window latch was pre-loosened',
        description: 'The library window latch was tampered with before the murder, allowing it to be locked from outside.',
        _m: [108, 97, 116, 99, 104, 44, 108, 111, 111, 115, 101, 110, 101, 100, 44, 116, 97, 109, 112, 101, 114, 44, 119, 105, 110, 100, 111, 119, 44, 112, 114, 101, 112, 97, 114, 101, 100, 44, 109, 97, 110, 105, 112, 117, 108, 97, 116, 101, 100, 44, 98, 101, 110, 116, 44, 116, 111, 111, 108, 32, 109, 97, 114, 107, 115],
        category: 'preparation',
    },
    {
        id: 'breaker_panel_location',
        label: 'The killer knew breaker panel location',
        description: 'The suspect admitted knowing the breaker panel\'s location. The outage was caused by manually tripping it.',
        _m: [98, 114, 101, 97, 107, 101, 114, 44, 112, 97, 110, 101, 108, 44, 98, 97, 115, 101, 109, 101, 110, 116, 44, 109, 97, 110, 117, 97, 108, 44, 116, 114, 105, 112, 112, 101, 100, 44, 112, 111, 119, 101, 114, 44, 101, 108, 101, 99, 116, 114, 105, 99, 97, 108],
        category: 'means',
    },
    {
        id: 'exact_time_knowledge',
        label: 'The killer knew exact power return time',
        description: 'The suspect volunteered that power returned at exactly 9:32 — suggesting they were the one who reset the breaker.',
        _m: [57, 58, 51, 50, 44, 101, 120, 97, 99, 116, 44, 112, 114, 101, 99, 105, 115, 101, 44, 116, 105, 109, 101, 44, 119, 97, 116, 99, 104, 44, 118, 111, 108, 117, 110, 116, 101, 101, 114, 44, 114, 101, 115, 101, 116, 44, 112, 111, 119, 101, 114, 32, 114, 101, 116, 117, 114, 110],
        category: 'behavior',
    },
    {
        id: 'servant_corridor_access',
        label: 'The killer had servant corridor access',
        description: 'The suspect knew and used the service corridors to move unseen between the basement, east exit, and guest rooms.',
        _m: [115, 101, 114, 118, 97, 110, 116, 44, 99, 111, 114, 114, 105, 100, 111, 114, 44, 115, 101, 114, 118, 105, 99, 101, 44, 112, 97, 115, 115, 97, 103, 101, 44, 117, 110, 115, 101, 101, 110, 44, 114, 111, 117, 116, 101, 44, 97, 99, 99, 101, 115, 115],
        category: 'means',
    },
    {
        id: 'will_change_motive',
        label: 'Will change would remove killer as executor',
        description: 'The new will would have removed the suspect as executor, exposing their embezzlement from the trust.',
        _m: [119, 105, 108, 108, 44, 101, 120, 101, 99, 117, 116, 111, 114, 44, 116, 114, 117, 115, 116, 44, 101, 109, 98, 101, 122, 122, 108, 101, 44, 109, 111, 116, 105, 118, 101, 44, 102, 111, 117, 110, 100, 97, 116, 105, 111, 110, 44, 119, 105, 110, 100, 119, 97, 114, 100, 44, 115, 104, 101, 108, 108, 32, 99, 111, 109, 112, 97, 110, 121, 44, 99, 104, 97, 110, 110, 101, 108, 32, 105, 115, 108, 97, 110, 100, 115],
        category: 'motive',
    },
    {
        id: 'power_outage_timing',
        label: 'Power outage was deliberately timed',
        description: 'The blackout at 9:17 PM was manually created to provide cover for the murder.',
        _m: [57, 58, 49, 55, 44, 111, 117, 116, 97, 103, 101, 44, 98, 108, 97, 99, 107, 111, 117, 116, 44, 100, 101, 108, 105, 98, 101, 114, 97, 116, 101, 44, 116, 105, 109, 101, 100, 44, 99, 111, 118, 101, 114, 44, 100, 97, 114, 107, 110, 101, 115, 115, 44, 109, 97, 110, 117, 97, 108],
        category: 'means',
    },
    {
        id: 'fake_locked_room',
        label: 'Locked room was faked with wire',
        description: 'The killer locked the window from outside using wire through the frame gap, creating a false locked-room illusion.',
        _m: [119, 105, 114, 101, 44, 108, 111, 99, 107, 101, 100, 44, 102, 97, 107, 101, 44, 111, 117, 116, 115, 105, 100, 101, 44, 105, 108, 108, 117, 115, 105, 111, 110, 44, 102, 114, 97, 109, 101, 44, 103, 97, 112, 44, 112, 105, 97, 110, 111, 32, 119, 105, 114, 101, 44, 112, 105, 99, 116, 117, 114, 101, 32, 119, 105, 114, 101],
        category: 'method',
    },
    {
        id: 'shoe_change',
        label: 'The killer changed shoes after the crime',
        description: 'The suspect changed from muddy brown oxfords to clean black loafers to hide evidence of being outside.',
        _m: [99, 104, 97, 110, 103, 101, 100, 44, 115, 104, 111, 101, 115, 44, 111, 120, 102, 111, 114, 100, 44, 108, 111, 97, 102, 101, 114, 44, 98, 114, 111, 119, 110, 44, 98, 108, 97, 99, 107, 44, 109, 117, 100, 100, 121, 44, 103, 117, 101, 115, 116, 32, 114, 111, 111, 109, 44, 119, 97, 114, 100, 114, 111, 98, 101],
        category: 'cover_up',
    },
];

// Decode keywords at runtime (not stored as readable strings)
function _decodeMatchers(encoded) {
    return encoded.map(c => String.fromCharCode(c)).join('').split(',').map(s => s.trim());
}

// Validate an accusation explanation against required logic connections
export function validateAccusation(suspectId, explanation) {
    const correctKey = _resolveKey();

    if (suspectId !== correctKey) {
        return {
            success: false,
            score: 0,
            matchedConnections: [],
            message: 'Your accusation does not match the evidence. The suspect you\'ve chosen cannot be connected to all the physical evidence at the scene. Review the forensic findings and reconsider.',
        };
    }

    const normalizedExplanation = explanation.toLowerCase();
    const matchedConnections = [];

    for (const connection of logicConnections) {
        const keywords = _decodeMatchers(connection._m);
        const keywordMatched = keywords.some(keyword =>
            normalizedExplanation.includes(keyword.toLowerCase())
        );
        if (keywordMatched) {
            matchedConnections.push(connection.id);
        }
    }

    const score = matchedConnections.length;
    const totalRequired = 8;

    if (score >= totalRequired) {
        return {
            success: true,
            score,
            matchedConnections,
            message: 'CASE SOLVED.',
        };
    } else if (score >= 5) {
        return {
            success: false,
            score,
            matchedConnections,
            message: `You're on the right track with ${score} valid connections, but your theory still has significant gaps. You need at least ${totalRequired} logical connections to build an airtight case. Review the physical evidence and timeline more carefully.`,
        };
    } else if (score >= 2) {
        return {
            success: false,
            score,
            matchedConnections,
            message: `Your theory only establishes ${score} logical connections. A case this complex requires at least ${totalRequired}. You're missing critical evidence about the method, motive, and cover-up. Go back to the evidence board.`,
        };
    } else {
        return {
            success: false,
            score,
            matchedConnections,
            message: 'Your explanation lacks substantial evidence. A prosecution needs cold, hard proof — not hunches. Return to your investigation and build a stronger case.',
        };
    }
}

// Get the real-time match count for UI feedback (works for any suspect)
export function getConnectionCount(explanation) {
    if (!explanation || explanation.length < 20) return 0;
    const normalizedExplanation = explanation.toLowerCase();
    let count = 0;
    for (const connection of logicConnections) {
        const keywords = _decodeMatchers(connection._m);
        if (keywords.some(k => normalizedExplanation.includes(k.toLowerCase()))) {
            count++;
        }
    }
    return count;
}

// Reveal the answer (only call when game is over — solved or all attempts exhausted)
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

// Check if a clue's prerequisites are met
export function canUnlockEvidence(evidenceId, discoveredIds, evidenceList) {
    const item = evidenceList.find(e => e.id === evidenceId);
    if (!item) return false;
    return item.prerequisites.every(prereq => discoveredIds.includes(prereq));
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

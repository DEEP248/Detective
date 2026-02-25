// The 10 required logic connections and keyword-matching for accusation validation

export const logicConnections = [
    {
        id: 'mud_near_window',
        label: 'Mud impressions beneath library window',
        description: 'Fresh shoe prints in mud directly below the library window prove someone was outside during the storm.',
        keywords: ['mud', 'prints', 'impressions', 'window', 'outside', 'beneath', 'below'],
        category: 'physical',
    },
    {
        id: 'shoe_size_match',
        label: 'Shoe size matches Adrian (UK 10)',
        description: 'The mud impressions are UK size 10 — matching only Adrian Cross among all guests.',
        keywords: ['shoe', 'size', 'uk 10', 'size 10', 'match', 'adrian', 'oxford', 'print'],
        category: 'physical',
    },
    {
        id: 'window_latch_loosened',
        label: 'Window latch was pre-loosened',
        description: 'The library window latch was tampered with before the murder, allowing it to be locked from outside.',
        keywords: ['latch', 'loosened', 'tamper', 'window', 'prepared', 'manipulated', 'bent', 'tool marks'],
        category: 'preparation',
    },
    {
        id: 'breaker_panel_location',
        label: 'Adrian knew breaker panel location',
        description: 'Adrian admitted knowing the breaker panel\'s location. The outage was caused by manually tripping it.',
        keywords: ['breaker', 'panel', 'basement', 'manual', 'tripped', 'power', 'electrical'],
        category: 'means',
    },
    {
        id: 'adrian_exact_time',
        label: 'Adrian knew exact power return time',
        description: 'Adrian volunteered that power returned at exactly 9:32 — suggesting he was the one who reset the breaker.',
        keywords: ['9:32', 'exact', 'precise', 'time', 'watch', 'volunteer', 'reset', 'power return'],
        category: 'behavior',
    },
    {
        id: 'servant_corridor_access',
        label: 'Adrian had servant corridor access',
        description: 'Adrian knew and used the service corridors to move unseen between the basement, east exit, and guest rooms.',
        keywords: ['servant', 'corridor', 'service', 'passage', 'unseen', 'route', 'access'],
        category: 'means',
    },
    {
        id: 'will_change_motive',
        label: 'Will change would remove Adrian as executor',
        description: 'The new will would have removed Adrian as executor, exposing his embezzlement from the trust.',
        keywords: ['will', 'executor', 'trust', 'embezzle', 'motive', 'foundation', 'windward', 'shell company', 'channel islands'],
        category: 'motive',
    },
    {
        id: 'power_outage_timing',
        label: 'Power outage was deliberately timed',
        description: 'The blackout at 9:17 PM was manually created to provide cover for the murder.',
        keywords: ['9:17', 'outage', 'blackout', 'deliberate', 'timed', 'cover', 'darkness', 'manual'],
        category: 'means',
    },
    {
        id: 'fake_locked_room',
        label: 'Locked room was faked with wire',
        description: 'The killer locked the window from outside using wire through the frame gap, creating a false locked-room illusion.',
        keywords: ['wire', 'locked', 'fake', 'outside', 'illusion', 'frame', 'gap', 'piano wire', 'picture wire'],
        category: 'method',
    },
    {
        id: 'shoe_change',
        label: 'Adrian changed shoes after the crime',
        description: 'Adrian changed from muddy brown oxfords to clean black loafers to hide evidence of being outside.',
        keywords: ['changed', 'shoes', 'oxford', 'loafer', 'brown', 'black', 'muddy', 'guest room', 'wardrobe'],
        category: 'cover_up',
    },
];

// Validate an accusation explanation against required logic connections
export function validateAccusation(suspectId, explanation) {
    if (suspectId !== 'adrian') {
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
        const keywordMatched = connection.keywords.some(keyword =>
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

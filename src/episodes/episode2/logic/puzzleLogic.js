// Episode 2: The Silent Poison — Puzzle Logic
// Obfuscated killer identity + simplified validation (select suspect only)

// Obfuscated killer key: char codes for 'rohan'
const _k = [114, 111, 104, 97, 110];
function _resolveKey() {
    return _k.map(c => String.fromCharCode(c)).join('');
}

// 10 logic connections for the case (used for scoring/reveal, not for validation)
export const logicConnections = [
    {
        id: 'fingerprint_smudge',
        label: 'Fingerprint smudge on Rajiv\'s glass',
        description: 'Someone touched Rajiv\'s glass and tried to wipe the fingerprint. The smudge suggests a male hand.',
        category: 'physical',
    },
    {
        id: 'cctv_timing',
        label: 'CCTV gap during critical window',
        description: 'The CCTV cameras went offline for exactly 10 minutes. A timer device was used to cause this — it was planned.',
        category: 'method',
    },
    {
        id: 'rohan_near_table',
        label: 'Rohan was near the drinks table',
        description: 'Despite claiming he never went near the table, the waiter saw Rohan standing next to Rajiv\'s glass during the power fluctuation.',
        category: 'physical',
    },
    {
        id: 'milk_ingredients_question',
        label: 'Rohan asked about milk ingredients',
        description: 'Rohan asked the waiter what was in the kesar doodh. He needed to know if the spices would mask the poison\'s taste.',
        category: 'behavior',
    },
    {
        id: 'chemistry_background',
        label: 'Rohan has a chemistry degree',
        description: 'Rohan\'s B.Sc. thesis was specifically about organophosphate compounds — the exact type of poison used.',
        category: 'background',
    },
    {
        id: 'poison_delivery',
        label: 'Poison ring used to deliver the poison',
        description: 'Rohan purchased a hollow "poison ring" online. It was found in the bathroom dustbin with organophosphate residue.',
        category: 'method',
    },
    {
        id: 'kurta_change',
        label: 'Rohan changed his kurta to hide evidence',
        description: 'The blue kurta had yellow poison residue in the pocket area. Rohan changed to a pocketless green kurta to hide this.',
        category: 'physical',
    },
    {
        id: 'debt_motive',
        label: 'Financial ruin from cancelled contract',
        description: 'Rajiv cancelled the printing contract. Rohan owed ₹18 lakh with no way to repay. He was about to lose everything.',
        category: 'motive',
    },
    {
        id: 'overheard_cancellation',
        label: 'Rohan heard engagement would be cancelled',
        description: 'Rohan overheard Rajiv telling Devendra the engagement would be cancelled the next morning. His family would be humiliated.',
        category: 'motive',
    },
    {
        id: 'premeditation',
        label: 'Purchases prove planning weeks in advance',
        description: 'Rohan bought pesticide and the poison ring within 48 hours of learning about the cancelled contract.',
        category: 'method',
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
    { id: 1, threshold: 0, text: 'Start by reading the scene overview and poison report. Understand what killed Rajiv and how.', cost: 0 },
    { id: 2, threshold: 2, text: 'Look at the glass analysis carefully. Someone touched Rajiv\'s glass who shouldn\'t have.', cost: 5 },
    { id: 3, threshold: 4, text: 'The CCTV gap is not accidental. Someone planned it. Who had access to the electrical panel?', cost: 5 },
    { id: 4, threshold: 6, text: 'One person asked about the milk ingredients before the ceremony. Why would they need to know?', cost: 10 },
    { id: 5, threshold: 8, text: 'Check everyone\'s educational background. One person has the exact knowledge needed to plan this poisoning.', cost: 10 },
    { id: 6, threshold: 10, text: 'The engagement ceremony ritual created an opportunity. During the blessing, someone was very close to the glass.', cost: 15 },
    { id: 7, threshold: 12, text: 'Follow the money. One person was in financial ruin because of a deal Rajiv cancelled.', cost: 15 },
    { id: 8, threshold: 14, text: 'Someone changed their clothes during the ceremony. Check what was on the original outfit.', cost: 20 },
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
        killerName: 'Rohan Sharma',
        summary: 'Rohan Sharma, Kavya\'s quiet brother, planned and executed a cold-blooded poisoning. His calm exterior and family connection made him the least suspected person in the room.',
        method: 'Rohan used a hollow "poison ring" to carry organophosphate powder. During the ashirwad blessing ritual, he hugged Rajiv and dropped the poison into his kesar doodh glass. He had pre-set a timer on the hall\'s electrical circuit to create a CCTV gap, and used the power fluctuation to check the glass and wipe his fingerprint.',
        motive: 'Rajiv cancelled a ₹25 lakh printing contract that was Rohan\'s only hope to escape ₹18 lakh in debt. On top of that, Rohan overheard Rajiv planning to cancel the engagement the next morning — meaning his sister Kavya would be humiliated and his family\'s last connection to Rajiv\'s wealth would be severed.',
        keyEvidence: [
            'Fingerprint smudge on Rajiv\'s glass rim — someone touched it who shouldn\'t have',
            'CCTV cameras went offline for exactly 10 minutes — a timer device was found on the circuit',
            'Waiter Ramu saw Rohan near the drinks table during the power fluctuation',
            'Rohan asked about kesar doodh ingredients — needed to know if spices would mask the poison',
            'Rohan has a B.Sc. in Chemistry — thesis was on organophosphate compounds',
            'Poison ring purchased online 19 days before the murder — found in bathroom dustbin',
            'Blue kurta had yellow poison residue in pocket — changed to pocketless green kurta',
            'Owes ₹18 lakh — Rajiv cancelled the contract that was his only hope',
            'Overheard Rajiv say engagement would be cancelled "tomorrow morning"',
            'Bought pesticide and poison ring within 48 hours of learning about the cancelled deal',
        ],
    };
}

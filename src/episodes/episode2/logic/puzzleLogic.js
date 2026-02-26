// Episode 2: The Silent Poison — Puzzle Logic (Secured)
// All sensitive data is encoded to prevent source-code reading
import { simpleHash, decodeText, decodeArray } from '../../../utils/crypto.js';

// Hash of the correct answer — cannot be reversed
const _answerHash = 'a4ae7ca0';

// Decryption key split across variables
const _p1 = 'malhotra_';
const _p2 = 'haveli';
const _p3 = '_926';
const _dk = () => _p1 + _p2 + _p3;

// Logic connections — NO suspect names, only "the killer"
export const logicConnections = [
    {
        id: 'fingerprint_smudge',
        label: 'Fingerprint smudge on the victim\'s glass',
        description: 'Someone touched the victim\'s glass and tried to wipe the fingerprint. The smudge suggests a male hand.',
        category: 'physical',
    },
    {
        id: 'cctv_timing',
        label: 'CCTV gap during critical window',
        description: 'The CCTV cameras went offline for exactly 10 minutes. A timer device was used to cause this — it was planned.',
        category: 'method',
    },
    {
        id: 'near_table',
        label: 'The killer was near the drinks table',
        description: 'Despite claiming otherwise, the waiter saw the killer standing next to the victim\'s glass during the power fluctuation.',
        category: 'physical',
    },
    {
        id: 'milk_ingredients_question',
        label: 'The killer asked about milk ingredients',
        description: 'The killer asked the waiter what was in the kesar doodh. They needed to know if the spices would mask the poison\'s taste.',
        category: 'behavior',
    },
    {
        id: 'chemistry_background',
        label: 'The killer has a chemistry degree',
        description: 'The killer\'s B.Sc. thesis was specifically about organophosphate compounds — the exact type of poison used.',
        category: 'background',
    },
    {
        id: 'poison_delivery',
        label: 'A poison ring was used to deliver the poison',
        description: 'A hollow "poison ring" was purchased online. It was found in the bathroom dustbin with organophosphate residue.',
        category: 'method',
    },
    {
        id: 'kurta_change',
        label: 'The killer changed clothes to hide evidence',
        description: 'The original outfit had yellow poison residue in the pocket area. The killer changed to a pocketless outfit to hide this.',
        category: 'physical',
    },
    {
        id: 'debt_motive',
        label: 'Financial ruin from cancelled contract',
        description: 'The victim cancelled a major contract. The killer owed a large sum with no way to repay. They were about to lose everything.',
        category: 'motive',
    },
    {
        id: 'overheard_cancellation',
        label: 'The killer overheard the engagement would be cancelled',
        description: 'The killer overheard the victim planning to cancel the engagement the next morning. Their family would be humiliated.',
        category: 'motive',
    },
    {
        id: 'premeditation',
        label: 'Purchases prove planning weeks in advance',
        description: 'The killer bought pesticide and a poison ring within 48 hours of learning about the cancelled contract.',
        category: 'method',
    },
];

// Simplified validation — compare hash only
export function validateAccusation(suspectId) {
    if (simpleHash(suspectId) === _answerHash) {
        return { success: true, score: 100, message: 'Your deduction is correct. Justice will be served.' };
    }
    return { success: false, score: 0, message: 'That is not the killer. The evidence does not support this accusation. Reconsider the facts.' };
}

// Hints (no suspect names)
export const hints = [
    { id: 1, threshold: 0, text: 'Start by reading the scene overview and poison report. Understand what killed the victim and how.', cost: 0 },
    { id: 2, threshold: 2, text: 'Look at the glass analysis carefully. Someone touched the victim\'s glass who shouldn\'t have.', cost: 5 },
    { id: 3, threshold: 4, text: 'The CCTV gap is not accidental. Someone planned it. Who had access to the electrical panel?', cost: 5 },
    { id: 4, threshold: 6, text: 'One person asked about the milk ingredients before the ceremony. Why would they need to know?', cost: 10 },
    { id: 5, threshold: 8, text: 'Check everyone\'s educational background. One person has the exact knowledge needed to plan this poisoning.', cost: 10 },
    { id: 6, threshold: 10, text: 'The engagement ceremony ritual created an opportunity. During the blessing, someone was very close to the glass.', cost: 15 },
    { id: 7, threshold: 12, text: 'Follow the money. One person was in financial ruin because of a deal the victim cancelled.', cost: 15 },
    { id: 8, threshold: 14, text: 'Someone changed their clothes during the ceremony. Check what was on the original outfit.', cost: 20 },
];

export function getAvailableHints(discoveredCount, usedHintIds) {
    return hints.filter(h => discoveredCount >= h.threshold && !usedHintIds.includes(h.id));
}

// Encoded reveal data — decoded only when game ends
const _enc = {
    killerName: 'Pw4ECQFUIQk+GgwX',
    summary: 'Pw4ECQFUIQk+GgwXSUwiPk9LV0oSTBkaHRcVfwoTGREEDC0VEkYBAAIGChBSADEMQRMdCQoqTVdSTQBMCwAYFkw9BA4ZAQkNf0ldXx4OAgEBE1xBFwESVgYNBTIZV04ZBB4BAAZSADEMQRAEAQAzQBJVAg8CDQwAGw4xSAwXAQlJN1BfFhkJCUgDERMSK0gSAxYcDDxNV1JNEQkaHBscQTYGQQINCUktVl1bQw==',
    method: 'Pw4ECQFUBxI6DEEXRQQGM1VdQU0RAwEcGxxBLQEPEUUYBn9aU0QfGEwHHRMTDzAYCRkWHAE+TVcWHQ4bDAoGXEEbHRMfCwtJK1FXFgwSBAEdAxMFfwoNExYfADFeEkQEFRkJA1hSCTpICQMCCww7GWBXBwgaSA4aFkE7Gg4GFQkNf01aU00RAwEcGxxBNgYVGUUEACwZWVMeAB5ICxsdBTdIBhoEHxpxGXpTTQkNDE8EAARyGwQCRQ1JK1BfUx9BAwZPABoEfwAAGglMDDNcUUIfCA8JA1QRCC0LFB8RTB0wGVFECAAYDU8VUiIcPDdWAg0ZcxlTWAlBGRsKEFIVNw1BBgobDC0ZVFoYAhgdDgAbDjFIFRlFDwE6WlkWGQkJSAgYExIsSAAYAUweNklXFgUIH0gJHRwGOhoRBAwCHXE=',
    motive: 'PwAGARlUEQAxCwQaCQkNf1gSBFhBAAkEHFIRLQEPAgwCDn9aXVgZEw0LG1QGCT4cQQEEH0kNVlpXA0YfSAAaHhh/AA4GAEwdMBlXRQ4AHA1PRUpBMwkKHkUFB39dV1QZT0wnAVQGDi9IDhBFGAE+TR4WPw4ECQFUHRc6GgkTBB4Nf2tTXAQXTBgDFRwPNgYGVhEDSTxYXFUIDUwcBxFSBDEPABEAAQwxTRJCBQRMBgoMBkEyBxMYDAIOcxlfUwwPBQYIVBoILEgSHxYYDC0ZeVcbGA1IGBsHDTtIAxNFBBwyUF5fDBUJDE8VHAV/AAgFRQoIMlBeT0oSTAQOBwZBPAcPGAAPHTZWXBYZDkw6Dh4bF3gbQQEADQUrURJBAhQADE8WF0EsDRcTFwkNcQ==',
    keyEvidence: [
        'KwgCDwoGAhM2BhVWFgEcO15XFgIPTDoOHhsXfw8NFxYfSS1QXxhNMgMFChscBH8cDgMGBAw7GVtCTRYEB08HGg4qBAVWCwMdf1FTQAg=',
        'LiI4Pk8XEww6GgAFRRsMMU0SWQsHAAEBEVIHMBpBEx0NCitVSxZcUUwFBhoHFTobT1YkTB02VFdETQUJHgYXF0EoCRJWAwMcMV0SWQNBGAAKVBEILQsUHxE=',
        'OgAFHAoGUjM+BRRWFg0ef01aU00KBQQDEQBBMQ0ABEUYAToZVkQEDwcbTwATAzMNQRIQHgAxXhJCBQRMGAADFxN/Dg0DBhgcPk1bWQM=',
        'OQkJSAQdHg06GkEXFgcMOxlTVAIUGEgEEQEALUgFGQoIAX9QXFEfBAgBChoGEnFILxMACAw7GUZZTQoCBxhUGwd/GxEfBgkaf05dQwEFTAUOBxlBKwAEVhUDACxWXA==',
        'OQkJSAQdHg06GkEeBB9JPhlwGD4CQkgGGlIiNw0MHxYYGyYXEmIFBB8BHFQFACxIDhhFAxs4WFxZHQkDGx8cExU6SAIZCBwGKldWRQ==',
        'PQ4FGwAaUhM2BgZWFRkbPFFTRQgFTAcBGBsPOkhQT0UICCZKElQIBwMaClQGCTpIDAMXCAwtFxJwAhQCDE8dHEE9CRUeFwMGMhlWQx4VDgEB',
        'Lw0ZDU8fBxMrCUEeBAhJJlxeWgIWTBgAHQEOMUgTExYFDSpcEl8DQRwHDB8XFXFIIh4EAg46XRJCAkEcBwwfFxUzDRIFRQsbOlxcFgYUHhwO',
        'IhYJG09FSkEzCQoeS0w7PlNbQE0CDQYMER4NOgxBAg0JSTxWXEIfAA8cTwAaACtIFhcWTB03XFtETQ4CBBZUGg4vDQ==',
        'IhcJGgcRExM7SDMXDwUff0pTT00EAg8OExcMOgYVVhIDHDNdElQIQQ8JARcXDTMNBVYRAwQwS0BZGkEBBx0aGw84',
        'Lw4ZDwcAUhE6GxUfBgUNOhlTWAlBHAcGBx0PfxoIGAJMHjZNWl8DQVhQTxwdFC0bQRkDTAU6WEBYBA8LSA4WHRQrSBUeAEwKPldRUwENCQxPEBcAMw==',
    ],
};

export function getRevealData() {
    const key = _dk();
    return {
        killerId: (() => { const h = _answerHash; const s = ['arjun', 'kavya', 'rohan', 'sunita', 'devendra', 'meera', 'vikram']; return s.find(x => simpleHash(x) === h) || ''; })(),
        killerName: decodeText(_enc.killerName, key),
        summary: decodeText(_enc.summary, key),
        method: decodeText(_enc.method, key),
        motive: decodeText(_enc.motive, key),
        keyEvidence: decodeArray(_enc.keyEvidence, key),
    };
}

// Episode 1: The Last Candle — Puzzle Logic (Secured)
// All sensitive data is encoded to prevent source-code reading
import { simpleHash, decodeText, decodeArray } from '../../../utils/crypto.js';

// Hash of the correct answer — cannot be reversed to find the name
const _answerHash = '8591a720';

// Decryption key split across multiple variables (reassembled at runtime only)
const _p1 = 'hale_';
const _p2 = 'manor';
const _p3 = '_1847';
const _dk = () => _p1 + _p2 + _p3;

// Logic connections — NO suspect names anywhere
export const logicConnections = [
    {
        id: 'mud_near_window',
        label: 'Mud impressions beneath library window',
        description: 'Fresh shoe prints in mud directly below the library window prove someone was outside during the storm.',
        category: 'physical',
    },
    {
        id: 'window_wire',
        label: 'Window lock was manipulated with a wire',
        description: 'A thin wire loop was found in the garden mud. It was used to lock the window from outside after the killer exited.',
        category: 'method',
    },
    {
        id: 'volunteered_check',
        label: 'The killer volunteered information about checking on the victim',
        description: 'The killer told police they checked on the victim during the blackout — this places them at the scene without being asked.',
        category: 'behavior',
    },
    {
        id: 'window_scratch',
        label: 'Scratch on the window latch',
        description: 'A small scratch on the window latch matches a wire tool, not forced entry — consistent with the lock-from-outside technique.',
        category: 'physical',
    },
    {
        id: 'prior_access',
        label: 'The killer had prior access to the library earlier that evening',
        description: 'The killer visited the library before the blackout. They could have unlocked the window during this visit.',
        category: 'method',
    },
    {
        id: 'hidden_weapon',
        label: 'Murder weapon hidden inside the grandfather clock',
        description: 'The fireplace poker was not missing — it was hidden inside the clock. Only someone with intimate knowledge of the room would know this hiding spot.',
        category: 'physical',
    },
    {
        id: 'shoe_mud',
        label: 'The killer\'s shoes had matching mud',
        description: 'Clay-rich garden soil on the killer\'s shoes matches the mud beneath the library window.',
        category: 'physical',
    },
    {
        id: 'fraud_discovery',
        label: 'The victim discovered financial fraud 3 days before',
        description: 'Victor\'s private notes reveal he found evidence of long-term embezzlement and planned to expose it.',
        category: 'motive',
    },
    {
        id: 'bank_records',
        label: 'Suspicious bank transfers totalling over £200,000',
        description: 'The killer\'s bank records show a pattern of transfers that point to years of financial manipulation.',
        category: 'motive',
    },
    {
        id: 'kitchen_entrance',
        label: 'Someone returned through the kitchen during the blackout',
        description: 'The cook heard footsteps in the kitchen passageway during the power outage. Someone used the back entrance to re-enter unnoticed.',
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
    { id: 1, threshold: 0, text: 'Start with the crime scene overview and power outage report. Understand the sequence of events.', cost: 0 },
    { id: 2, threshold: 2, text: 'Look at the library window carefully. How was it locked from inside if someone exited?', cost: 5 },
    { id: 3, threshold: 4, text: 'Check which suspects had access to the library BEFORE the blackout. Prior access matters.', cost: 5 },
    { id: 4, threshold: 6, text: 'One suspect volunteered information without being asked. That is suspicious, not helpful.', cost: 10 },
    { id: 5, threshold: 8, text: 'The murder wasn\'t spontaneous. Follow the money — who had a financial secret to protect?', cost: 10 },
    { id: 6, threshold: 10, text: 'Check every suspect\'s footwear and clothing. Physical evidence doesn\'t lie.', cost: 15 },
    { id: 7, threshold: 12, text: 'The cook heard footsteps during the blackout. Someone used the back entrance to sneak back in.', cost: 15 },
    { id: 8, threshold: 14, text: 'The killer hid the weapon inside the grandfather clock — hidden in plain sight.', cost: 20 },
];

export function getAvailableHints(discoveredCount, usedHintIds) {
    return hints.filter(h => discoveredCount >= h.threshold && !usedHintIds.includes(h.id));
}

// Encoded reveal data — decoded only when game ends (all attempts used or correct answer)
const _enc = {
    killerName: 'KQUeDD4DQS0dHSxC',
    summary: 'KQUeDD4DQS0dHSxCFBRDAARMFjoIDAcBFTNIGFxWGgwAACweQQgOHzZdQRRRGggJCztBQQEdETdUS0BFCRUJAX8MQQMKBjZSTVhYHRIAHH8dDQ8BHDpVGFhYCwoJAXIfDgECUjJESlBSGk9MLTYeQQ0OHjIRXFFaDQACCi1NAAALUitGXVpDEUEVAD4fEk4AFH9FSkFEHEEbAC0IQRoHF39BXUZRDQIYRTwCFwsdUjleShRWSAIDCTtBQQ0OHjxEVFVDDQVMDjYBDQsdXA==',
    method: 'KQUeDD4DQRscFzsRTFxSSFBZSDIEDxsbF39TVFVUAw4ZEX8ZDk4KHCtUShRDAARMCTYPEw8dC39FUEZYHQYERSsFBE4YGzFVV0MXAARMDT4JQR4dFylYV0FEBBhMEDEBDg0EFzsRXEFFAQ8LRTcEEk4KEy1dUVFFSBcFFjYZT04nF39CTEZCCwpMMzYOFQEdUihYTFwXHAkJRTkEEwsfHj5SXRRHBwoJF3NNFgcfFzsRUUAXCw0JBDFBQQ8BFn9ZUVAXARVMDDEeCAoKUitZXRRQGgACATkMFQYKAH9SVFtUA09MLTpNFQYKHH9UQF1DDQVMETcfDhsIGn9FUFEXHwgCATAaTU4DHTxaXVAXARVMAy0CDE4ABytCUVBSSBQfDDEKQQ9PBjdYVhRAARMJRTMCDh5PWjleTVpTSA0NETofQQcBUitZXRRQCRMIADFNDBsLW3MRWVpTSBMJESofDwsLUiteGEBfDUEECioeBE4bGi1eTVNfSBUEAH8PAA0EUjRYTFdfDQ9MADEZEw8BETodGFVFGggaDDEKQQcBUitYVVEXHA5MDzAED04KBDpDQVtZDUEbDToDQRoHF39dUVNfHBJMBj4ABE4NEzxaGFtZRg==',
    motive: 'KQUeDD4DQQYOFn9TXVFZSBIJBi0IFQIWUjpcWlFNEg0FCzhNDAEBFyYRXkZYBUE6DDwZDhxPFDBDGE1SCRMfRSsFEwEaFTcRTFxSARNMFjcMEwsLUj1ES11ZDRIfRTsIAAIGHDhCFhRhAQIYCi1NBQccETBHXUZSDEEYDTpNBxwOBzsRCxRTCRgfRT0IBwEdF39FUFEXDAgCCzofQR4OACtIGFVZDEEPCjELEwEBBjpVGHVTGggNC38dEwcZEytUVE0ZSDcFBisCE04fHj5fVlFTSBUDRToVEQEcF39ZUVkXHAkJRTEIGRpPHzBDVl1ZD09MIzAfQS8LADZQVhgXARVMEj4eQQUGHjMRV0YXCgRMAToeFRwACzpVFhRjHwQCESZNGAsOACwRV1IXDhMFADEJEgYGAn9cXVVZHEECCisFCAAIUjBfW1EXHAkJRTICDwsWUihQSxRWHEEfET4GBEA=',
    keyEvidence: [
        'LhMJFjdNDBsLUj1UVlFWHAlMETcIQQIGEC1QSk0XHwgCATAaQR4dHSlUSxREBwwJCjEIQR0bHTBVGEBfDRMJRTsYEwcBFX9FUFEXGxUDFzI=',
        'PAkJRTMEAxwOACYRT11ZDA4bRTMCAgVPBT5CGFlWBggcEDMMFQsLUihYTFwXCUEYDTYDQRkGADoRVFtYGEEKCioDBU4GHH9FUFEXDwAeAToDQQMaFg==',
        'PAkJRTQEDQIKAH9HV1hCBhUJAC0IBU4bGjpIGFdfDQIHADtNDgBPBjdUGEJeCxUFCH8JFBwGHDgRTFxSSAMABDwGDhsbXn9BVFVUAQ8LRSsFBAMcFzNHXUcXCRVMETcIQR0MFzFU',
        'KUEfCD4BDU4cES1QTFdfSA4CRSsFBE4YGzFVV0MXBAAYBjdNDA8bETdUSxRWSBYFFzpNFQEAHnMRVltDSAcDFzwIBU4KHCtDQQ==',
        'PAkJRTQEDQIKAH9ZWVAXGBMFCi1NAA0MFyxCGEBYSBUEAH8BCAwdEy1IGFFWGg0FAC1NFQYOBn9UTlFZAQ8LRT4DBU4MHSpdXBRfCRcJRSoDDQEMGTpVGEBfDUEbDDEJDhk=',
        'PAkJRTkEEwsfHj5SXRRHBwoJF39FDBsdFjpDGENSCREDC3ZNFg8cUjdYXFBSBkEFCywEBQtPBjdUGFNFCQ8IAz4ZCQsdUjxdV1dc',
        'PAkJRTQEDQIKAH9CUFtSG0EEBDtNAgIOC3JDUVdfSAwZAX8AABoMGjZfXxRDAARMAj4fBQsBUixeUVgXCgQCAD4ZCU4bGjoRT11ZDA4b',
        'PggPETAfQR4dGylQTFEXBg4YACxNEwsZFz5dGFxSSAUFFjwCFwsdFzsRTFxSSAoFCTMIE04KHz1UQk5bDQwJCytNUk4LEyZCGFZSDg4eAA==',
        'OxQfFTYOCAEaAX9TWVpcSBUeBDEeBwsdAX9FV0BWBAgCAn8CFwsdUm0BCAQHWEEcCioDBR1PFDBEVlAXAQ9METcIQQUGHjNUShRFDQIDFzse',
        'PAkJRTwCDgVPGjpQSlAXDg4DESwZBB4cUjZfGEBfDUEHDCsOCQsBUjtESl1ZD0EYDTpNAwIOETReTUAZSDIDCDoCDwtPByxUXBRDAARMBz4OCk4KHCtDWVpUDU8=',
    ],
};

export function getRevealData() {
    const key = _dk();
    return {
        killerId: (() => { const h = _answerHash; const s = ['adrian', 'james', 'clara', 'eleanor', 'marcus', 'beatrice']; return s.find(x => simpleHash(x) === h) || ''; })(),
        killerName: decodeText(_enc.killerName, key),
        summary: decodeText(_enc.summary, key),
        method: decodeText(_enc.method, key),
        motive: decodeText(_enc.motive, key),
        keyEvidence: decodeArray(_enc.keyEvidence, key),
    };
}

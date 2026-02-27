// Episode 3: The Blackout Birthday — Puzzle Logic (Secured)
import { simpleHash, decodeText, decodeArray } from '../../../utils/crypto.js';

const _answerHash = '292d3a74';

const _p1 = 'bandra_';
const _p2 = 'penthouse';
const _p3 = '_30';
const _dk = () => _p1 + _p2 + _p3;

// Logic connections — NO suspect names
export const logicConnections = [
    {
        id: 'knife_taken',
        label: 'The cake knife was taken from the kitchen early in the party',
        description: 'The murder weapon was stolen from the knife rack between minute 3 and 7. Only one suspect was in the kitchen during that window.',
        category: 'method',
    },
    {
        id: 'security_silhouette',
        label: 'Security camera captured a figure during the blackout',
        description: 'A woman of medium build was seen moving toward the kitchen at 10:58 PM. The clothing matches one suspect.',
        category: 'physical',
    },
    {
        id: 'phone_confrontation',
        label: 'Victim confronted the killer by text hours before the party',
        description: 'The victim\'s phone reveals a heated text exchange about financial fraud — sent just hours before the birthday party.',
        category: 'motive',
    },
    {
        id: 'torn_confession',
        label: 'A torn resignation letter proves the killer\'s guilt',
        description: 'A confession letter was found torn up in the study trash. It acknowledges unauthorized fund transfers.',
        category: 'motive',
    },
    {
        id: 'alibi_contradiction',
        label: 'The killer\'s alibi contradicts the security footage',
        description: 'The killer claimed to be in one location during the blackout, but security footage shows them elsewhere.',
        category: 'behavior',
    },
];

export function validateAccusation(suspectId) {
    if (simpleHash(suspectId) === _answerHash) {
        return { success: true, score: 100, message: 'Case closed. The birthday party killer is caught.' };
    }
    return { success: false, score: 0, message: 'Wrong suspect. Look at the evidence again — who had access, motive, and opportunity?' };
}

export const hints = [
    { id: 1, threshold: 0, text: 'The murder weapon came from the kitchen. Who visited the kitchen early in the party?', cost: 0 },
    { id: 2, threshold: 1, text: 'The security camera caught a silhouette. Focus on body type and clothing color.', cost: 5 },
    { id: 3, threshold: 2, text: 'Unlock Sanya\'s phone. The clue is on the fridge — her lucky number.', cost: 10 },
    { id: 4, threshold: 3, text: 'Assemble the torn letter. It was written by someone who knew they were caught.', cost: 15 },
    { id: 5, threshold: 4, text: 'Compare everyone\'s claimed position during the blackout with the security footage.', cost: 20 },
];

export function getAvailableHints(discoveredCount, usedHintIds) {
    return hints.filter(h => discoveredCount >= h.threshold && !usedHintIds.includes(h.id));
}

const _enc = {
    killerName: 'MhMHHRNBGxUWBhkdBB0=',
    summary: 'MhMHHRNBGxUWBhkdBB1fRQxSXhsASRdSAjBdAwEBBgsQAUU+XVRCAgILAQQsBEUMARsGGxYWLBNAAxMaChcTc1AOBxgEChFTDTpBEBYOThQABCkVCxpUDRcFHBYqQVVCDghEE0FrQEUCFQMHVRYIPVZKGA0LCRcPK15FPRwNTwYHCjNWEBYJC0QRADQVRQUaAQkQUwEqQVkMBk4FHEE6ERcCDUgEHAcGN1ZeQhcHFxsVc1ARHB0YHxAXRStbVUICBxYRFDYERQwGDQ4eFhd/R19CAg8RAQR/BA0LVAoDFBAOMEZETkEPChZBLAQEDBYNC1UgBDFKUUIIAEQGCTpQAQ8GAwEQABZx',
    method: 'MhMHHRNBKx8KBVQcBxBTBj5YVUIKAA0UBH8WFwEZSBsdFkU0WkQBCQsKUhM+Ew5OFRxPGBoLKkdVQlJOExoIMxVFHgYNGxAdATZdV0IVAUQRCToTDk4bBk8BGwB/UFEWBBwNHAZxUCQaVAUGGwYROhMITkEdDBdBKxUWGhEMTwEbAH9QWRACGw0GQT0CAA8fDR1VEAQqQFkMBk4FUgMtGQAIVA4DHBAOOkEeQiAaRB8IMQURC1RZX1lTFjdWEAQNBxQCBDtQEQYRSA0HFgQ0VkJCBxwLH0ErGABOHAkDGQQEJh8QEg0bChUIMRdFGhwNTxQDBC1HXQcPGkQbDysfRQoVGgQbFhYsHRAxCQtEARU+EgcLEEg8FB0cPhNHCg5OExMSfwMRDxoMBhsURTFWURBBGgwXQTwRDgtUHA4XHwBxE2MKBE4QGgQxUBcPGkgbGlMRN1YQCQgaBxoEMVARAVQfDgYbRTdWQkIJDwoWEn8RCwpUGgoBBhcxVlRCFQFEBgk6UAkHAgEBElMXMFxdQgMLAh0TOlARBhFIAxwUDStAEAEAAwFSAz4TDkA=',
    motive: 'MQAAHRNBOxkWDRseCgcWAX9HWAMVTjQACCYRRQYVDE8QHgc6SUoOBApERlF/HAQFHEgJBxwIf0dYBwgcRBEOMgAEAA1IAAMWF38LEA8OABAaEnFQNg8aEQ5VEAoxVUINDxoBFkEPAgwXFUgNDFMROktEQgkBEQASfxIACBsaClUHDToTQAMTGh1SADEURR4YCQEbFgF/R19CERwBAQQxBEUaHA1PFAYBNkcQEAQdER4VLFAEGlQJTxccBC1XEA8ECxAbDzhQCgBUJQAbFwQmHRAyEwcdE0EoAgoaEUgOVQEALFpXDAAaDR0PfxwAGgANHVUSATJaRBYIAANSBCkVFxcAAAYbFEU9RkRCFQEWF0E2BEUbBEZPIhoRNxNYBxNOBxMTOhUXQlQOHRAWATBeHEIAAABSEzoAEBoVHAYaHUU+UV8XFU4QHUE9FUUKERsbBxwcOlccQjEcDQsAfwMEGVQcBxBTFT5BRBtBDxdSCToCRQIVGxtVEA0+XVMHQRoLUhI2HAAAFw1PJhILJlIe',
    keyEvidence: [
        'NgkLRBEANBVFBRoBCRBTEj5AEBYABQEcQTkCCgNUHAcQUw42R1MKBABEEAQrBwALGkgCHB0QK1YQUUEPChZBaF5FPgYBFhRTEj5AEBYJC0QdDzMJRR0BGx8QEBF/Wl5CFQYBUgo2BAYGEQZPEQYXNl1XQgwHCgcVOlBWQ0FG',
        'NgkLRAEEPAUXBwARTxYSCDpBUUISBgsFEn8RRRkbBQ4bUwo5E10HBQcRH0E9BQwCEEgHEBIBNl1XQhUBExMTO1ARBhFIBBwHBjdWXkIFGxYbDzhQEQYRSA0ZEgY0XEUWT040AAgmEUUDFRwMHRYWf0dYB0EdDR4JMAUAGgANTxQdAX9EURFBGQETEzYeAk4QCR0eUwYzXEQKCAADXA==',
        'MQAAHRNBLxgKABFIHRAFAD5fQ0IAThAXGStQBgEaDh0aHRE+R1kND04TGxU3UDUcHREOVRIHMEZEQhUGAVJVb1AJDx8ATxAeBzpJSg4EAwEcFX8YChsGG08XFgMwQVVCFQYBUhE+AhEXWg==',
        'NgkLRAYOLR5FHBEbBhIdBCtaXwxBAgEGFToCRQgbHQERUwwxE0QKBE4XBhQ7CUUeBgcZEABFD0FZGwBODxwEKFAWBhFIGBQARTxSRQUJGkQTDztQDQ8QSBgHGhErVl5CAE4HHQ85FRYdHQcBWw==',
        'MhMHHRNBPBwEBxkNC1UADToTRwMSTgoXAC1QEQYRSAIAAAw8E0MbEhoBH0E7BRcHGg9PARsAf1FcAwIFCwcVfxIQGlQcBxBTFjpQRRAIGh1SBzAfEQ8TDU8GGwooQBAKBBxEHw4pGQsJVBwAAhIXOxNECgRODxsVPBgAAFhIDBodES1SVAsCGg0cBn8YABxUCQMcEQxx',
    ],
};

export function getRevealData() {
    const key = _dk();
    return {
        killerId: (() => { const h = _answerHash; const s = ['karan', 'priya', 'amit', 'zara', 'dev']; return s.find(x => simpleHash(x) === h) || ''; })(),
        killerName: decodeText(_enc.killerName, key),
        summary: decodeText(_enc.summary, key),
        method: decodeText(_enc.method, key),
        motive: decodeText(_enc.motive, key),
        keyEvidence: decodeArray(_enc.keyEvidence, key),
    };
}

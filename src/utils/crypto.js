// Crypto utility for obfuscating game answers in client-side code
// This prevents casual source-code reading from revealing answers
// Note: Determined reverse-engineers can still break this, but it stops
// simple searches for character names in the JS bundle

// XOR cipher with multi-byte key — fast and sufficient for obfuscation
const _xorCipher = (text, key) => {
    return Array.from(text).map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
};

// Encode string to Base64-safe XOR cipher
export function encodeText(plaintext, key) {
    const xored = _xorCipher(plaintext, key);
    return btoa(unescape(encodeURIComponent(xored)));
}

// Decode Base64 XOR cipher back to plaintext
export function decodeText(encoded, key) {
    try {
        const xored = decodeURIComponent(escape(atob(encoded)));
        return _xorCipher(xored, key);
    } catch {
        return '';
    }
}

// Encode an array of strings
export function encodeArray(arr, key) {
    return arr.map(item => encodeText(item, key));
}

// Decode an array of encoded strings
export function decodeArray(arr, key) {
    return arr.map(item => decodeText(item, key));
}

// Encode an object's string values (one level deep)
export function encodeObject(obj, key) {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'string') {
            result[k] = encodeText(v, key);
        } else if (Array.isArray(v)) {
            result[k] = encodeArray(v, key);
        } else {
            result[k] = v;
        }
    }
    return result;
}

// Simple hash for comparison (not cryptographic, but fast)
// Used to validate suspect selection without storing the answer in plaintext
export function simpleHash(str) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = (hash * 0x01000193) >>> 0;
    }
    return hash.toString(16);
}

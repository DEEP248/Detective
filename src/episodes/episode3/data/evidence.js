// Episode 3: The Blackout Birthday — Evidence

export const evidence = [
    {
        id: 'broken_glass',
        title: 'Broken Glass Fragment',
        category: 'crime_scene',
        icon: '🥃',
        summary: 'A whisky glass shattered near the body. Faint lipstick on one shard.',
        fullText: `CRIME SCENE — GLASS FRAGMENT

A whisky glass was found shattered on the floor next to Sanya's body. One shard has a faint lipstick mark — coral pink. The glass was half-full before it broke.

Key observations:
• The glass fell from the side table, not thrown
• Lipstick shade matches what Sanya was wearing
• This was Sanya's drink — she was standing near it when attacked
• No fingerprints recoverable (glass too fragmented)`,
        prerequisites: [],
        logicTags: ['crime_scene'],
        location: 'Living Room',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'missing_knife',
        title: 'Kitchen Knife Missing',
        category: 'weapon',
        icon: '🔪',
        summary: 'The cake knife is the murder weapon. It was taken from the kitchen rack earlier.',
        fullText: `WEAPON ANALYSIS — CAKE KNIFE

The murder weapon is a 10-inch cake knife from the kitchen rack. Dev Patil (the caterer) noticed it was missing at approximately minute 7 of the party.

Key observations:
• The knife rack on the kitchen wall has one empty slot — the largest knife
• The knife found in the victim matches this set exactly
• Dev mentioned the missing knife to no one — he assumed it was being used for cake prep
• Someone took the knife between minute 3 and minute 7
• During minute 3-5, Priya was in the kitchen "checking on the food"`,
        prerequisites: [],
        logicTags: ['weapon'],
        location: 'Kitchen',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'security_screenshot',
        title: 'Security Camera Screenshot',
        category: 'surveillance',
        icon: '📹',
        summary: 'A blurry figure heading to the kitchen at 10:58 PM. Only a silhouette.',
        fullText: `SECURITY FOOTAGE — HALLWAY CAMERA

The building's hallway camera (outside the apartment) captured a brief image at 10:58 PM — just before the blackout ended. The apartment door was ajar.

Key observations:
• A figure is visible moving from the living room direction toward the kitchen
• The image is blurry due to low light backup power on the camera
• Body shape suggests a woman of medium build
• The figure is wearing dark clothing — Priya was wearing a navy blue dress
• Timestamp: 10:58:12 PM (30 seconds before lights returned)
• No other figures visible in the frame`,
        prerequisites: ['broken_glass'],
        logicTags: ['surveillance'],
        location: 'Building Security',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'phone_locked',
        title: 'Sanya\'s Phone (Locked)',
        category: 'digital',
        icon: '📱',
        type: 'puzzle',
        puzzleType: 'phone_unlock',
        summary: 'Sanya\'s phone was found near her body. Pattern lock is active. Clue: her lucky number.',
        fullText: `DIGITAL EVIDENCE — VICTIM'S PHONE

Sanya's smartphone was found on the floor near her right hand. The screen is cracked but functional. It requires a pattern unlock.

A photo on the kitchen fridge shows Sanya making a "7" hand sign with the caption "My lucky number! 🍀"

UNLOCKED CONTENT:
Recent messages reveal a text thread between Sanya and Priya:

Sanya: "I know about the ₹40 lakh, Priya. The audit confirmed it."
Priya: "Please. Let me explain. It's not what you think."
Sanya: "Monday morning. Board meeting. I'm showing everything."
Priya: "You'll destroy both of us. The company will fail."
Sanya: "YOU destroyed us. I trusted you."
[Last message sent: 6:30 PM — 2 hours before the party]`,
        prerequisites: ['missing_knife'],
        logicTags: ['digital', 'motive'],
        location: 'Living Room Floor',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'torn_letter',
        title: 'Torn Letter Pieces',
        category: 'document',
        icon: '📄',
        type: 'puzzle',
        puzzleType: 'torn_paper',
        summary: 'Torn paper pieces found in the study trash bin. Looks like a letter.',
        fullText: `DOCUMENT EVIDENCE — RECONSTRUCTED LETTER

Six torn pieces of paper were recovered from the study trash bin. When assembled, they form a resignation letter:

---

To: Sanya Mehra, CEO
From: Priya Deshmukh, Co-founder

Date: [2 days before the party]

Subject: Resignation with immediate effect

I am resigning from my position effective immediately. I acknowledge that I have made unauthorized transfers totaling ₹40,28,000 from the company account to my personal account over the past 8 months.

I deeply regret my actions. I was under severe financial pressure due to personal debts. I understand if you choose to pursue legal action.

I am sorry, Sanya. For everything.

— Priya Deshmukh

---

NOTE: This letter was never submitted. Priya tore it up and threw it in Sanya's study bin. Sanya may have found it before the party.`,
        prerequisites: ['security_screenshot'],
        logicTags: ['document', 'motive'],
        location: 'Study Trash Bin',
        discoveredAt: null,
        isKeyEvidence: true,
    },
];

export function getEvidenceById(id) {
    return evidence.find(e => e.id === id);
}

export function getEvidenceByCategory(category) {
    return evidence.filter(e => e.category === category);
}

export function getKeyEvidence() {
    return evidence.filter(e => e.isKeyEvidence);
}

// Episode 3: The Blackout Birthday — Relationships

export const relationships = [
    { from: 'karan', to: 'sanya', type: 'romantic', label: 'Ex-boyfriend. Suing each other over IP.', strength: 'strong', tension: 'high' },
    { from: 'priya', to: 'sanya', type: 'professional', label: 'Co-founder. Embezzled ₹40 lakh.', strength: 'strong', tension: 'critical' },
    { from: 'amit', to: 'sanya', type: 'family', label: 'Younger brother. Property dispute.', strength: 'strong', tension: 'medium' },
    { from: 'zara', to: 'sanya', type: 'friendship', label: 'Best friend. Portfolio stolen by Sanya.', strength: 'strong', tension: 'high' },
    { from: 'dev', to: 'sanya', type: 'secret', label: 'Had an affair. Being blackmailed.', strength: 'medium', tension: 'high' },
    { from: 'karan', to: 'priya', type: 'neutral', label: 'Investor in the company Priya co-founded.', strength: 'weak', tension: 'low' },
    { from: 'karan', to: 'zara', type: 'conflict', label: 'Argued at the party. Old tensions.', strength: 'weak', tension: 'medium' },
    { from: 'amit', to: 'dev', type: 'friendly', label: 'Amit hangs out in the kitchen. Likes the food.', strength: 'weak', tension: 'low' },
    { from: 'priya', to: 'amit', type: 'neutral', label: 'Barely interact. Different circles.', strength: 'weak', tension: 'low' },
];

export const victimProfile = {
    id: 'sanya',
    name: 'Sanya Mehra',
    role: 'Victim — Tech Startup Founder & Birthday Host',
    age: 30,
    portrait: '💀',
    color: '#c45555',
    description: 'Founder of a fast-growing fashion tech startup. Turning 30 tonight. Found dead after a 1-minute blackout at her own party.',
    background: `Sanya Mehra built her startup from scratch over 4 years. She was sharp, ambitious, and didn't tolerate betrayal. In the week before her birthday, she discovered multiple betrayals by people she trusted: her co-founder's embezzlement, her ex-boyfriend's IP theft, her brother's attempts to claim family property, her friend's portfolio being "borrowed" without credit, and her caterer's affair leverage.

She invited everyone to her birthday party anyway. Some say she wanted to confront them all. Others say she wanted one last normal evening before everything fell apart.

The party was on the 22nd floor of a Bandra penthouse. Five guests. One victim. The power went out at minute 10. When it came back at minute 11, Sanya was dead on the living room floor with a cake knife in her chest.`,
};

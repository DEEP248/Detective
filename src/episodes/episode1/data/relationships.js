// Relationships between suspects and victim — for the relationship map

export const relationships = [
    // Connections to Victor (victim)
    { from: 'eleanor', to: 'victor', type: 'spouse', label: 'Wife — 28 years married', strength: 'strong', tension: 'high' },
    { from: 'daniel', to: 'victor', type: 'business', label: 'Business partner — co-founded Hale & Reed', strength: 'strong', tension: 'high' },
    { from: 'clara', to: 'victor', type: 'adversarial', label: 'Journalist investigating Victor', strength: 'weak', tension: 'high' },
    { from: 'marcus', to: 'victor', type: 'professional', label: 'Butler — 32 years service, recently fired', strength: 'strong', tension: 'medium' },
    { from: 'sofia', to: 'victor', type: 'professional', label: 'Researcher — funded by Victor\'s foundation', strength: 'medium', tension: 'medium' },
    { from: 'adrian', to: 'victor', type: 'friendship', label: 'Family friend — 20 years. Estate executor.', strength: 'strong', tension: 'low' },

    // Connections between suspects
    { from: 'eleanor', to: 'adrian', type: 'friendship', label: 'Long-standing friendship. Adrian is a trusted confidant.', strength: 'medium', tension: 'low' },
    { from: 'eleanor', to: 'daniel', type: 'distrust', label: 'Eleanor distrusts Daniel\'s business ethics.', strength: 'weak', tension: 'medium' },
    { from: 'daniel', to: 'marcus', type: 'neutral', label: 'Acquaintances through the household.', strength: 'weak', tension: 'low' },
    { from: 'clara', to: 'daniel', type: 'interest', label: 'Clara was investigating Daniel as part of her exposé.', strength: 'medium', tension: 'medium' },
    { from: 'sofia', to: 'eleanor', type: 'friendly', label: 'Casual social acquaintances through charity events.', strength: 'weak', tension: 'low' },
    { from: 'adrian', to: 'marcus', type: 'familiar', label: 'Marcus has served Adrian during many visits. Adrian tips generously.', strength: 'medium', tension: 'low' },
    { from: 'adrian', to: 'daniel', type: 'cautious', label: 'Professional courtesy. Adrian aware of Daniel\'s "difficulties."', strength: 'weak', tension: 'low' },
];

export const victimProfile = {
    id: 'victor',
    name: 'Victor Hale',
    role: 'Victim — Host of the Dinner Party',
    age: 58,
    portrait: '💀',
    color: '#c45555',
    description: 'Founder of Hale & Reed Investments. A powerful, controlling man with a complicated legacy. Known for both philanthropy and ruthless business practices. Found dead in his own library.',
    background: `Victor Hale built his fortune through aggressive acquisitions and strategic investments. While publicly known for his charitable foundation and medical research funding, those closer to him knew a different man — one who controlled everyone around him with money, leverage, and force of personality.

In the weeks before his death, Victor was making dramatic changes: altering his will, confronting business fraud, threatening journalists, and dismissing loyal staff. He was a man creating enemies faster than he could manage them.

The question isn't who wanted him dead — nearly everyone did. The question is who had the means, the planning, and the cold precision to execute a locked-room murder in a house full of witnesses.`,
};

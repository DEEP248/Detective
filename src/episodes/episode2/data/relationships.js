// Episode 2: The Silent Poison — Relationships

export const relationships = [
    // Connections to Rajiv (victim)
    { from: 'meera', to: 'rajiv', type: 'spouse', label: 'Wife — 27 years married. Recent trust issues.', strength: 'strong', tension: 'medium' },
    { from: 'arjun', to: 'rajiv', type: 'family', label: 'Son — wants business control, father won\'t give it.', strength: 'strong', tension: 'medium' },
    { from: 'kavya', to: 'rajiv', type: 'family', label: 'Fiancée of son — liked by Rajiv, but engagement at risk.', strength: 'medium', tension: 'low' },
    { from: 'rohan', to: 'rajiv', type: 'business', label: 'Kavya\'s brother — cancelled contract, financial ruin.', strength: 'weak', tension: 'high' },
    { from: 'devendra', to: 'rajiv', type: 'business', label: 'Partner 15 years — land deal dispute, ₹3 crore.', strength: 'strong', tension: 'high' },
    { from: 'sunita', to: 'rajiv', type: 'professional', label: 'House manager 20 years — fears losing home if haveli sold.', strength: 'strong', tension: 'medium' },
    { from: 'anil', to: 'rajiv', type: 'professional', label: 'Family doctor 18 years — overbilling issue discovered.', strength: 'medium', tension: 'medium' },

    // Connections between suspects
    { from: 'rohan', to: 'kavya', type: 'family', label: 'Brother and sister. Rohan is protective of Kavya.', strength: 'strong', tension: 'low' },
    { from: 'arjun', to: 'kavya', type: 'romantic', label: 'Engaged couple. Genuinely in love.', strength: 'strong', tension: 'low' },
    { from: 'meera', to: 'arjun', type: 'family', label: 'Mother and son. Meera supports the marriage.', strength: 'strong', tension: 'low' },
    { from: 'devendra', to: 'rohan', type: 'neutral', label: 'Barely know each other. Devendra noticed Rohan acting nervous.', strength: 'weak', tension: 'low' },
    { from: 'sunita', to: 'meera', type: 'professional', label: 'Sunita is loyal to Meera. They have a warm relationship.', strength: 'medium', tension: 'low' },
    { from: 'anil', to: 'meera', type: 'friendly', label: 'Family doctor. Sat next to Meera during ceremony.', strength: 'medium', tension: 'low' },
    { from: 'devendra', to: 'meera', type: 'neutral', label: 'Social acquaintances through Rajiv.', strength: 'weak', tension: 'low' },
];

export const victimProfile = {
    id: 'rajiv',
    name: 'Rajiv Malhotra',
    role: 'Victim — Businessman & Host',
    age: 55,
    portrait: '💀',
    color: '#c45555',
    description: 'Owner of Malhotra Textiles. A respected but feared businessman in Jaipur. Found dead at his son\'s engagement ceremony after drinking poisoned kesar doodh.',
    background: `Rajiv Malhotra built his textile empire over 30 years. Known for sharp business sense but also for breaking promises when it suited him. He cancelled deals, changed his mind on partnerships, and controlled his family with money.

In the weeks before his death, Rajiv was making decisions that affected everyone around him: cancelling contracts, planning to sell the family haveli, considering cancelling his son's engagement, and discovering financial irregularities with his doctor.

Everyone at the ceremony had a reason to be angry with Rajiv. But anger is not murder. The question is: who planned this carefully enough to poison one specific glass, in a room full of witnesses, during a celebration?`,
};

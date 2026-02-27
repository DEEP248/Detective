// Episode 3: The Blackout Birthday — Timeline & Suspect Movements
// This drives the real-time mode: where each suspect is at each minute

export const suspectMovements = [
    // Minute 0-1: Everyone in living room (party start)
    { minute: 0, suspect: 'karan', room: 'living_room' },
    { minute: 0, suspect: 'priya', room: 'living_room' },
    { minute: 0, suspect: 'amit', room: 'living_room' },
    { minute: 0, suspect: 'zara', room: 'living_room' },
    { minute: 0, suspect: 'dev', room: 'kitchen' },

    // Minute 3: People start moving
    { minute: 3, suspect: 'karan', room: 'balcony' },
    { minute: 3, suspect: 'priya', room: 'kitchen' },
    { minute: 3, suspect: 'amit', room: 'kitchen' },
    { minute: 3, suspect: 'zara', room: 'balcony' },
    { minute: 3, suspect: 'dev', room: 'living_room' },

    // Minute 5: Shifting again
    { minute: 5, suspect: 'karan', room: 'living_room' },
    { minute: 5, suspect: 'priya', room: 'living_room' },
    { minute: 5, suspect: 'amit', room: 'balcony' },
    { minute: 5, suspect: 'zara', room: 'living_room' },
    { minute: 5, suspect: 'dev', room: 'kitchen' },

    // Minute 7: Final pre-blackout positions
    { minute: 7, suspect: 'karan', room: 'balcony' },
    { minute: 7, suspect: 'priya', room: 'study' },      // KEY: Priya goes to study
    { minute: 7, suspect: 'amit', room: 'study' },
    { minute: 7, suspect: 'zara', room: 'living_room' },
    { minute: 7, suspect: 'dev', room: 'kitchen' },

    // Minute 9: Just before blackout
    { minute: 9, suspect: 'karan', room: 'balcony' },
    { minute: 9, suspect: 'priya', room: 'living_room' },  // KEY: Priya returns to living room
    { minute: 9, suspect: 'amit', room: 'study' },
    { minute: 9, suspect: 'zara', room: 'living_room' },
    { minute: 9, suspect: 'dev', room: 'kitchen' },
];

// Story events that appear as notifications during real-time mode
export const storyEvents = [
    { minute: 0, text: '🎵 The party begins. Music fills the penthouse.', type: 'ambient' },
    { minute: 2, text: '🔔 Doorbell. A late delivery arrives — more wine.', type: 'ambient' },
    { minute: 4, text: '😤 You hear raised voices from the balcony. Karan and Zara are arguing.', type: 'tension' },
    { minute: 5, text: '📱 Sanya checks her phone and frowns. She whispers something to Priya.', type: 'clue' },
    { minute: 6, text: '🔪 Dev notices a knife is missing from the rack. He looks concerned.', type: 'clue' },
    { minute: 7, text: '📧 Sanya goes to her study. She looks upset. She comes back 2 minutes later.', type: 'clue' },
    { minute: 8, text: '💡 The lights flicker briefly. Everyone looks up.', type: 'tension' },
    { minute: 9, text: '🎂 "Time for the cake!" Sanya calls everyone to the living room.', type: 'critical' },
    { minute: 10, text: '⚫ BLACKOUT. Everything goes dark.', type: 'blackout' },
    { minute: 10.3, text: '🔊 CRASH! Glass breaking somewhere nearby.', type: 'blackout' },
    { minute: 10.5, text: '👣 Rapid footsteps. Someone is running.', type: 'blackout' },
    { minute: 10.8, text: '😱 A short, sharp scream. Then silence.', type: 'blackout' },
    { minute: 11, text: '💡 Lights come back on. Sanya is on the floor. The cake knife is in her chest.', type: 'murder' },
];

// What actually happened (revealed after accusation)
export const trueTimeline = [
    { time: 'Min 3', event: 'Priya goes to kitchen. Pockets the cake knife from the rack while Dev is serving starters.' },
    { time: 'Min 7', event: 'Priya enters the study. Finds the torn resignation letter in the trash — Sanya already found it.' },
    { time: 'Min 8', event: 'Priya trips the circuit breaker near the study hallway, causing the flicker. Tests it.' },
    { time: 'Min 9', event: 'Priya returns to living room. Positions herself near Sanya by the cake table.' },
    { time: 'Min 10', event: 'Priya flips the circuit breaker from the hallway switch. Full blackout.' },
    { time: 'Min 10:20', event: 'In the darkness, Priya stabs Sanya with the cake knife. Glass falls from the table.' },
    { time: 'Min 10:30', event: 'Priya runs to the kitchen, drops the phone she took from Sanya, washes hands.' },
    { time: 'Min 10:50', event: 'Priya returns to living room. Stands near the speaker — "I was trying to fix the music."' },
    { time: 'Min 11', event: 'Lights return. Sanya is found dead. Kitchen knife in her chest.' },
];

export const timelineEvents = storyEvents.filter(e => e.type !== 'blackout').map((e, i) => ({
    id: `event_${i}`,
    time: `Minute ${e.minute}`,
    event: e.text.replace(/^[^\s]+\s/, ''),
    confirmed: true,
    source: 'Party observation',
    category: e.type === 'clue' ? 'critical' : e.type === 'tension' ? 'social' : 'social',
}));

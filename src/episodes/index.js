// Episode registry — all data loaded eagerly for instant play
import { evidence as ep1Evidence, getEvidenceById as ep1GetById, getEvidenceByCategory as ep1GetByCat, getKeyEvidence as ep1GetKey } from './episode1/data/evidence.js';
import { suspects as ep1Suspects, getSuspectById as ep1GetSuspect } from './episode1/data/suspects.js';
import { timelineEvents as ep1Timeline, trueTimeline as ep1TrueTimeline } from './episode1/data/timeline.js';
import { relationships as ep1Relationships, victimProfile as ep1Victim } from './episode1/data/relationships.js';
import * as ep1Logic from './episode1/logic/puzzleLogic.js';

import { evidence as ep2Evidence, getEvidenceById as ep2GetById, getEvidenceByCategory as ep2GetByCat, getKeyEvidence as ep2GetKey } from './episode2/data/evidence.js';
import { suspects as ep2Suspects, getSuspectById as ep2GetSuspect } from './episode2/data/suspects.js';
import { timelineEvents as ep2Timeline, trueTimeline as ep2TrueTimeline } from './episode2/data/timeline.js';
import { relationships as ep2Relationships, victimProfile as ep2Victim } from './episode2/data/relationships.js';
import * as ep2Logic from './episode2/logic/puzzleLogic.js';

import { evidence as ep3Evidence, getEvidenceById as ep3GetById, getEvidenceByCategory as ep3GetByCat, getKeyEvidence as ep3GetKey } from './episode3/data/evidence.js';
import { suspects as ep3Suspects, getSuspectById as ep3GetSuspect } from './episode3/data/suspects.js';
import { timelineEvents as ep3Timeline, trueTimeline as ep3TrueTimeline, suspectMovements as ep3Movements, storyEvents as ep3StoryEvents } from './episode3/data/timeline.js';
import { relationships as ep3Relationships, victimProfile as ep3Victim } from './episode3/data/relationships.js';
import { rooms as ep3Rooms, getRoomById as ep3GetRoom } from './episode3/data/rooms.js';
import * as ep3Logic from './episode3/logic/puzzleLogic.js';

export const episodes = [
    {
        id: 'episode1',
        number: 1,
        title: 'The Last Candle',
        subtitle: 'A Locked-Room Murder at an English Manor',
        difficulty: 'Hard',
        time: '40–45 min',
        setting: 'England',
        icon: '🕯️',
        description: 'A dinner party at Hale Manor turns deadly. The host is found dead in a locked library during a blackout. Six suspects. One truth.',
        available: true,
        color: '#c9a84c',
        suspectCount: 6,
        evidenceCount: 20,
    },
    {
        id: 'episode2',
        number: 2,
        title: 'The Silent Poison',
        subtitle: 'Death at a Jaipur Engagement Ceremony',
        difficulty: 'Hard',
        time: '40–45 min',
        setting: 'India',
        icon: '☠️',
        description: 'A businessman collapses after drinking saffron milk at a lavish engagement ceremony. Seven guests were present. The poison was in his glass only.',
        available: true,
        color: '#e8734a',
        suspectCount: 7,
        evidenceCount: 20,
    },
    {
        id: 'episode3',
        number: 3,
        title: 'The Blackout Birthday',
        subtitle: 'A Real-Time Murder at a Mumbai Penthouse',
        difficulty: 'Medium',
        time: '15–18 min',
        setting: 'India',
        icon: '🎂',
        description: 'A birthday party at a Mumbai penthouse. 5 guests. A real-time countdown. At minute 10, the lights go out. At minute 11, the host is dead.',
        available: true,
        color: '#e85d99',
        suspectCount: 5,
        evidenceCount: 5,
        gameMode: 'realtime',
    },
    {
        id: 'episode4',
        number: 4,
        title: 'The Midnight Express',
        subtitle: 'Coming Soon',
        difficulty: '???',
        time: '???',
        setting: '???',
        icon: '🚂',
        description: 'A murder on a cross-country sleeper train. No one boarded. No one left.',
        available: false,
        color: '#5a7a8e',
        suspectCount: 0,
        evidenceCount: 0,
    },
];

// Pre-built episode data — instant access, no loading delay
const episodeDataMap = {
    episode1: {
        evidence: ep1Evidence, getEvidenceById: ep1GetById, getEvidenceByCategory: ep1GetByCat, getKeyEvidence: ep1GetKey,
        suspects: ep1Suspects, getSuspectById: ep1GetSuspect,
        timelineEvents: ep1Timeline, trueTimeline: ep1TrueTimeline,
        relationships: ep1Relationships, victimProfile: ep1Victim,
        ...ep1Logic,
        meta: episodes[0],
        briefing: {
            pages: [
                {
                    title: 'The Victim',
                    icon: '💀',
                    content: [
                        'Victor Hale, 58. Financier. Philanthropist. Host of tonight\'s dinner party.',
                        'Found dead in the library at 9:32 PM. Cause of death: blunt force trauma to the head. The fireplace poker is missing.',
                        'Victor was a powerful man who controlled everyone around him with money and influence. In the weeks before his death, he was making dramatic changes to his will, confronting fraud, and creating enemies.',
                    ],
                },
                {
                    title: 'The Scene',
                    icon: '🏰',
                    content: [
                        'Hale Manor, English countryside. October 14th. A violent storm rages outside.',
                        'At 9:17 PM, the power goes out. For 15 minutes, the house is plunged into complete darkness. When the lights return at 9:32 PM, Victor is dead.',
                        'The library window was locked from inside. No forced entry. The door was ajar. Six guests were present in the house.',
                    ],
                },
                {
                    title: 'Your Mission',
                    icon: '🔍',
                    content: [
                        'Examine the evidence. Interrogate the suspects. Reconstruct the timeline.',
                        'Each clue unlocks new findings. Every suspect has secrets. One of them is a killer.',
                        'You have 3 attempts to name the killer. Choose wisely — there are no second chances after your third try.',
                    ],
                },
            ],
            caseNumber: 'DD-EP1-7742',
        },
        intro: {
            lines: [
                'October 14th. 9:17 PM.',
                'The lights go out.',
                'Thunder shakes the manor.',
                'Fifteen minutes of darkness.',
                'When the lights return...',
                'Victor Hale is dead.',
                'The library window — locked from inside.',
                'No forced entry. No weapon found.',
                'Six suspects. Six stories.',
                'One truth.',
            ],
            highlightLine: 5,
        },
        initialEvidence: ['crime_scene_overview', 'power_outage_report', 'will_document', 'clara_stolen_docs', 'eleanor_phone_records'],
    },
    episode2: {
        evidence: ep2Evidence, getEvidenceById: ep2GetById, getEvidenceByCategory: ep2GetByCat, getKeyEvidence: ep2GetKey,
        suspects: ep2Suspects, getSuspectById: ep2GetSuspect,
        timelineEvents: ep2Timeline, trueTimeline: ep2TrueTimeline,
        relationships: ep2Relationships, victimProfile: ep2Victim,
        ...ep2Logic,
        meta: episodes[1],
        briefing: {
            pages: [
                {
                    title: 'The Victim',
                    icon: '💀',
                    content: [
                        'Rajiv Malhotra, 55. Successful businessman. Owner of Malhotra Textiles. A respected but feared man in Jaipur\'s business circles.',
                        'Collapsed and died within minutes after drinking kesar doodh (saffron milk) during his son\'s engagement ceremony. Doctor confirms poisoning.',
                        'Rajiv had many business deals, many secrets, and many people who wanted him gone. But only one person acted.',
                    ],
                },
                {
                    title: 'The Scene',
                    icon: '🏛️',
                    content: [
                        'Malhotra Haveli, Jaipur, Rajasthan. A grand heritage mansion decorated for the engagement of Arjun Malhotra and Kavya Sharma.',
                        'During the celebration, the lights flickered for about 10 minutes due to a power fluctuation. CCTV footage from that period is missing.',
                        'Seven people were in the private hall when Rajiv drank the poisoned milk. The poison was found only in his glass. Other glasses were clean.',
                    ],
                },
                {
                    title: 'Your Mission',
                    icon: '🔍',
                    content: [
                        'Study the evidence. Interview all seven suspects. Find out who had access to the drink.',
                        'Look for inconsistencies in their stories. Check their motives. Follow the trail of the poison.',
                        'You have 3 chances to name the killer. Select the right person — justice depends on your deduction.',
                    ],
                },
            ],
            caseNumber: 'DD-EP2-0926',
        },
        intro: {
            lines: [
                'Jaipur, Rajasthan. 8:45 PM.',
                'The Malhotra Haveli glows with celebration.',
                'An engagement ceremony. Music. Laughter.',
                'The lights flicker. Ten minutes of confusion.',
                'Rajiv Malhotra raises his glass of kesar doodh.',
                'He takes a sip... and collapses.',
                'Poison. In his glass only.',
                'Seven people were in the hall.',
                'The CCTV footage is missing.',
                'Find the killer.',
            ],
            highlightLine: 5,
        },
        initialEvidence: ['scene_overview', 'poison_report', 'cctv_gap', 'glass_analysis', 'guest_list'],
    },
    episode3: {
        evidence: ep3Evidence, getEvidenceById: ep3GetById, getEvidenceByCategory: ep3GetByCat, getKeyEvidence: ep3GetKey,
        suspects: ep3Suspects, getSuspectById: ep3GetSuspect,
        timelineEvents: ep3Timeline, trueTimeline: ep3TrueTimeline,
        relationships: ep3Relationships, victimProfile: ep3Victim,
        rooms: ep3Rooms, getRoomById: ep3GetRoom,
        suspectMovements: ep3Movements, storyEvents: ep3StoryEvents,
        ...ep3Logic,
        meta: episodes[2],
        briefing: {
            pages: [
                {
                    title: 'The Party',
                    icon: '🎂',
                    content: [
                        'Sanya Mehra is turning 30. A penthouse party in Bandra, Mumbai. Five guests. Good food, old tensions.',
                        'You are an observer. Watch. Listen. Explore the rooms. Talk to people.',
                        'Time is ticking. Something is about to happen.',
                    ],
                },
                {
                    title: 'The Rules',
                    icon: '⏱️',
                    content: [
                        '15-minute real-time countdown. Navigate rooms freely. Click suspects to hear them.',
                        'At minute 10, the lights will go out. At minute 11, someone will be dead.',
                        'After the murder: investigate, solve puzzles, and name the killer. 3 attempts.',
                    ],
                },
            ],
            caseNumber: 'DD-EP3-3007',
        },
        intro: {
            lines: [
                'Mumbai. 22nd floor. Bandra West.',
                'A birthday party. Five guests.',
                'Old friends. Older secrets.',
                'The music plays. The clock ticks.',
                'At minute ten...',
                'The lights go out.',
                'One minute of darkness.',
                'When they come back on...',
                'The birthday girl is dead.',
                'The cake knife is in her chest.',
            ],
            highlightLine: 5,
        },
        initialEvidence: ['broken_glass', 'missing_knife'],
        gameMode: 'realtime',
    },
};

// Instant episode loader — no network delay
export function loadEpisode(episodeId) {
    const data = episodeDataMap[episodeId];
    if (!data) throw new Error(`Episode ${episodeId} not found`);
    return data;
}

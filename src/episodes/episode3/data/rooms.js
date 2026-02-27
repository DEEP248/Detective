// Episode 3: The Blackout Birthday — Rooms

export const rooms = [
    {
        id: 'living_room',
        name: 'Living Room',
        icon: '🛋️',
        description: 'The main party area. Cake table, music system, string lights.',
        bgGradient: 'from-amber-950/30 via-noir-900 to-noir-950',
        items: [
            { id: 'cake_table', name: 'Birthday Cake', icon: '🎂', text: 'Three-tier chocolate cake. "Happy 30th Sanya!" in gold frosting. The cake knife is missing.' },
            { id: 'music_system', name: 'Music System', icon: '🎵', text: 'Bluetooth speaker connected to Sanya\'s phone. Currently playing Bollywood hits.' },
            { id: 'gift_pile', name: 'Gift Pile', icon: '🎁', text: 'A stack of wrapped gifts. One expensive-looking box has no name tag.' },
            { id: 'wine_glasses', name: 'Drinks Table', icon: '🍷', text: 'Red wine, whisky, and mocktails. One glass is half-empty with lipstick on the rim.' },
        ],
    },
    {
        id: 'kitchen',
        name: 'Kitchen',
        icon: '🍳',
        description: 'Catering prep area. Knife rack on the wall, back service door.',
        bgGradient: 'from-slate-950/30 via-noir-900 to-noir-950',
        items: [
            { id: 'knife_rack', name: 'Knife Rack', icon: '🔪', text: 'A professional knife set mounted on the wall. One slot is empty — the largest knife is gone.' },
            { id: 'back_door', name: 'Back Door', icon: '🚪', text: 'Service entrance. Currently unlocked. Leads to the building\'s service stairwell.' },
            { id: 'fridge', name: 'Fridge', icon: '🧊', text: 'Covered in magnets and photos. One photo shows Sanya making a "7" hand sign. Text below: "My lucky number! 🍀"' },
            { id: 'trash_bin', name: 'Trash Bin', icon: '🗑️', text: 'Full of food packaging. Some torn paper pieces are visible at the bottom. They look like a letter.' },
        ],
    },
    {
        id: 'balcony',
        name: 'Balcony',
        icon: '🌃',
        description: 'Open-air seating with Mumbai skyline view. Private conversations.',
        bgGradient: 'from-blue-950/30 via-noir-900 to-noir-950',
        items: [
            { id: 'city_view', name: 'City View', icon: '🏙️', text: 'The Mumbai skyline glitters below. 22nd floor. The sea breeze carries distant music.' },
            { id: 'ashtray', name: 'Ashtray', icon: '🚬', text: 'Two cigarette butts. One has lipstick. Sanya doesn\'t smoke.' },
            { id: 'phone_charger', name: 'Phone Charging', icon: '🔌', text: 'A phone charger plugged into the outdoor socket. No phone attached.' },
        ],
    },
    {
        id: 'study',
        name: 'Study',
        icon: '📚',
        description: 'Sanya\'s home office. Laptop, locked drawer, documents on desk.',
        bgGradient: 'from-emerald-950/30 via-noir-900 to-noir-950',
        items: [
            { id: 'laptop', name: 'Laptop', icon: '💻', text: 'Sanya\'s work laptop. Screen shows an email draft: "Re: Financial Audit Results — URGENT"' },
            { id: 'locked_drawer', name: 'Locked Drawer', icon: '🔒', text: 'A desk drawer with a small lock. It won\'t open. Something rattles inside when you shake it.' },
            { id: 'whiteboard', name: 'Whiteboard', icon: '📋', text: 'Startup roadmap. One note in red: "PRIYA — DISCUSS ACCOUNTS DISCREPANCY — MONDAY"' },
            { id: 'photo_frame', name: 'Family Photo', icon: '📷', text: 'Sanya, Amit, and their parents. Happy faces. A sticky note on the frame: "Call property lawyer — update will"' },
        ],
    },
];

export function getRoomById(id) {
    return rooms.find(r => r.id === id);
}

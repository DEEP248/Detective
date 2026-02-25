// Evidence items — the core clues the player must discover and connect
// Each clue has an id, category, prerequisites (other clue ids that must be found first),
// and logical connection tags for the accusation system.

export const evidence = [
    // === CRIME SCENE EVIDENCE ===
    {
        id: 'crime_scene_overview',
        title: 'Crime Scene Overview',
        category: 'crime_scene',
        icon: '🔍',
        summary: 'Victor Hale found dead in the library at 9:32 PM. Blunt force trauma to the head.',
        fullText: `Victor Hale, age 58, was found deceased in the library of Hale Manor at approximately 9:32 PM on the evening of October 14th. The body was discovered near the fireplace by Adrian Cross and Dr. Sofia Klein.

Cause of death: Blunt force trauma to the right temporal region, consistent with a single heavy blow from a rounded, heavy object.

The library door was unlocked (ajar when the body was discovered). The single window was found locked from the inside. No signs of forced entry through the door or window.

The fireplace poker from the library set is missing. The remaining tools (tongs, shovel, brush) are in their stand. A fire had been burning earlier in the evening but had reduced to embers by the time of discovery.

Blood spatter pattern indicates the victim was struck while standing, facing the fireplace. He fell forward and to the right.`,
        prerequisites: [],
        logicTags: [],
        location: 'Library',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'murder_weapon',
        title: 'Missing Fireplace Poker',
        category: 'crime_scene',
        icon: '🔥',
        summary: 'The fireplace poker from the library set is missing. Consistent with the murder weapon.',
        fullText: `The cast-iron fireplace poker belonging to the library\'s hearth tool set is missing. The set — manufactured by Harrington & Sons, circa 1920 — originally included four pieces: poker, tongs, shovel, and brush.

Weight of comparable model: approximately 1.8 kg. Length: 72 cm. The poker features a hooked end.

The wound on Victor\'s head is consistent with the dimensions and weight of such an instrument. No other blunt objects in the library match the wound profile.

Despite thorough search of the library, the poker has not been recovered in the room. This suggests the killer took it when leaving.

NOTE: A poker matching this description was later found in the basement utility room, wiped clean but with trace evidence in the crevices consistent with blood.`,
        prerequisites: ['crime_scene_overview'],
        logicTags: [],
        location: 'Library / Basement',
        discoveredAt: null,
        isKeyEvidence: false,
    },
    {
        id: 'locked_window',
        title: 'Locked Window Mystery',
        category: 'crime_scene',
        icon: '🪟',
        summary: 'Library window was locked from inside. But closer inspection reveals the latch mechanism has been tampered with.',
        fullText: `The library contains a single large sash window facing the south garden. At the time of discovery, the window was found locked from the inside via a brass latch mechanism.

Initial assessment: The locked window appeared to confirm that no one could have entered or exited through it, supporting the theory that the killer left through the door.

HOWEVER: Closer examination reveals:
- The latch mechanism shows subtle tool marks, suggesting it was recently manipulated.
- The latch pin is slightly bent — it can be pushed into locked position from the outside with a thin instrument inserted through the window frame gap.
- A small scratch on the exterior frame, at latch height, is consistent with a rigid wire being used to push the latch closed.

This is critical: the window COULD have been re-locked from the outside by someone who knew the mechanism and had a suitable tool.`,
        prerequisites: ['crime_scene_overview'],
        logicTags: ['window_latch_loosened', 'fake_locked_room'],
        location: 'Library',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'wire_fragment',
        title: 'Wire Fragment in Window Frame',
        category: 'crime_scene',
        icon: '🧷',
        summary: 'A thin piece of steel wire found caught in the exterior window frame.',
        fullText: `A fragment of thin steel wire, approximately 4 cm in length, was found caught in the exterior frame of the library window, at the same height as the latch mechanism.

The wire is consistent with piano wire or picture-hanging wire — thin enough to be inserted through the slight gap between the sash and frame, rigid enough to push the latch pin into the locked position.

This fragment appears to have broken off when the wire was withdrawn after locking the window.

The wire matches specification of picture-hanging wire available in the manor\'s utility room. A spool of such wire is kept in the basement near the breaker panel.

This evidence strongly supports the theory that the window was locked from the OUTSIDE after the killer exited through it.`,
        prerequisites: ['locked_window'],
        logicTags: ['fake_locked_room', 'window_latch_loosened'],
        location: 'Library Window (Exterior)',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    // === PHYSICAL EVIDENCE ===
    {
        id: 'mud_prints',
        title: 'Mud Impressions Below Window',
        category: 'physical',
        icon: '👣',
        summary: 'Fresh shoe impressions in mud beneath the library window. Size UK 10. Pattern does not match the victim\'s shoes.',
        fullText: `Fresh shoe impressions were found in the rain-softened mud directly beneath the library window. The storm had been ongoing since approximately 8:30 PM, meaning any impressions made before the rain would have been washed away.

These prints were made DURING or AFTER the storm began.

Details:
- Shoe size: UK 10 (EU 44)
- Pattern: Smooth sole with minimal tread — consistent with dress shoes or oxfords, NOT boots or rough footwear.
- Depth of impression suggests a person of moderate weight (approximately 75-85 kg).
- Direction: Impressions show approach TO the window and departure FROM it, suggesting someone stood at the window and then walked away toward the east side of the house.

Victor Hale wore UK size 9 shoes. These prints do not belong to him.

For reference — shoe sizes of guests (from voluntary disclosure):
- Eleanor Hale: UK 6
- Daniel Reed: UK 9
- Clara Monroe: UK 5
- Marcus Vale: UK 8
- Dr. Sofia Klein: UK 6
- Adrian Cross: UK 10`,
        prerequisites: ['locked_window'],
        logicTags: ['mud_near_window', 'shoe_size_match'],
        location: 'Garden (below library window)',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'shoe_change',
        title: 'Adrian\'s Shoe Change',
        category: 'physical',
        icon: '👞',
        summary: 'Adrian Cross arrived in brown oxfords but was wearing black loafers after the murder.',
        fullText: `Multiple photographs taken during the pre-dinner aperitifs show Adrian Cross wearing brown leather Oxford shoes.

After the discovery of the body, Adrian was observed wearing black leather loafers.

When questioned, Adrian explained he changed shoes because his oxfords were "pinching" and that he keeps spare clothing in the guest room wardrobe due to his frequent visits.

HOWEVER:
- The guest room wardrobe indeed contains several items of Adrian\'s clothing, including the black loafers.
- The brown oxfords were found in the guest room, placed neatly in the wardrobe.
- The soles of the brown oxfords have been wiped, but faint traces of mud are visible in the welt (the seam between sole and upper).
- The sole pattern of the brown oxfords is smooth — MATCHING the impressions found beneath the library window.
- The brown oxfords are UK size 10.

Adrian changed his shoes AFTER going outside. The mud on the oxfords is consistent with the soil beneath the library window.`,
        prerequisites: ['mud_prints'],
        logicTags: ['shoe_change', 'shoe_size_match', 'mud_near_window'],
        location: 'Guest Room',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    // === HOUSE SYSTEMS ===
    {
        id: 'breaker_panel',
        title: 'Breaker Panel Location',
        category: 'house',
        icon: '⚡',
        summary: 'The main breaker panel is in the basement, near the wine cellar entrance. Few guests would know its location.',
        fullText: `The main electrical breaker panel for Hale Manor is located in the basement utility room, adjacent to the wine cellar entrance.

The power outage at 9:17 PM was caused by the main breaker being manually tripped. This was NOT caused by the storm — the breaker was found in the OFF position, which requires physical manipulation. Storm-related outages would trip individual circuit breakers, not the main breaker.

The basement utility room is accessible via:
1. The main basement stairs from the kitchen
2. The service corridor that runs from the servants\' entrance to the basement

Access to the basement is not restricted but is not commonly visited by guests. Most guests would not know the exact location of the breaker panel.

When asked, the following guests confirmed knowledge of the breaker panel location:
- Marcus Vale: "Of course. I've managed this house for 32 years."
- Adrian Cross: "Yes, it\'s next to the wine cellar entrance. I\'ve been coming here for twenty years."
- Other guests expressed unfamiliarity with the basement layout.`,
        prerequisites: ['power_outage_report'],
        logicTags: ['breaker_panel_location', 'power_outage_timing'],
        location: 'Basement',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'power_outage_report',
        title: 'Power Outage Analysis',
        category: 'house',
        icon: '💡',
        summary: 'Power went out at 9:17 PM and returned at 9:32 PM. The outage was caused by manually tripping the main breaker — not the storm.',
        fullText: `ELECTRICAL ANALYSIS REPORT

Power failure occurred at 9:17 PM.
Power restored at 9:32 PM.
Duration of outage: 15 minutes.

Cause: The main breaker switch was found in the OFF (tripped) position. This is a manual lever-action switch that requires deliberate physical force to move from ON to OFF. It cannot be accidentally tripped by power surges or storm activity.

Storm-related outages affect individual circuit breakers, which were all found in the ON position. The main breaker overrides all circuits.

The breaker was reset (returned to ON) at 9:32 PM. It is unknown who reset it — no one has claimed responsibility.

NOTE: The 15-minute window of darkness provided the killer with cover to commit the murder and return to a plausible location without being observed.

The breaker panel is located in the basement utility room. It is not visible or accessible from the main living areas without deliberately descending to the basement.`,
        prerequisites: [],
        logicTags: ['power_outage_timing', 'breaker_panel_location'],
        location: 'Basement Utility Room',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'servant_corridor',
        title: 'Servant Corridor Map',
        category: 'house',
        icon: '🚪',
        summary: 'A network of service corridors connects the basement, kitchen, and east wing — allowing unobserved movement.',
        fullText: `Hale Manor, built in 1887, features a system of narrow service corridors designed for domestic staff to move through the house without being seen by residents and guests.

The corridor system connects:
- Basement utility room (where the breaker panel is located)
- Kitchen
- Servants\' entrance (east side of the house)
- East wing hallway (near the guest rooms)

Critically, the east side of the house is also where the library window faces. Someone exiting the library through the window would find themselves on the south-east corner of the building, a short walk from the servants\' entrance.

Route reconstruction: A person could descend to the basement via the service corridor, trip the breaker, return upstairs through the corridor, exit via the servants\' entrance, approach the library window from outside, re-enter the house through the servants\' entrance, and return to the main living areas — all without passing through any primary rooms where guests were gathered.

Marcus Vale confirmed that Adrian Cross had extensive knowledge of these corridors from his many visits.`,
        prerequisites: ['breaker_panel'],
        logicTags: ['servant_corridor_access'],
        location: 'Throughout Hale Manor',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    // === TIMING EVIDENCE ===
    {
        id: 'adrian_time_knowledge',
        title: 'Adrian\'s Precise Timing',
        category: 'timing',
        icon: '⏱️',
        summary: 'Adrian knew exactly when power returned (9:32 PM). He volunteered this without being asked. No one else had such precise timing.',
        fullText: `During interviews, Adrian Cross volunteered that the power returned at "exactly 9:32 PM" — stating he checked his watch as the lights came on.

This is notable for several reasons:

1. NO OTHER GUEST provided such precise timing for the power restoration. Most estimated "around 9:30" or "about 9:35."

2. Adrian volunteered this information without being asked. When asked "Where were you during the blackout?" he included the precise timestamp unprompted.

3. If Adrian was simply in the hallway looking for candles (as he claims), there would be little reason to check his watch at the exact moment of power restoration.

4. HOWEVER: If Adrian was the one who RESET the breaker, he would know the exact time because he was the one who flipped it back on. He would need to know the time to ensure he could return to a visible location before others could observe him.

5. Adrian claims he was "near the service corridor entrance" while looking for candles. The service corridor leads directly to the basement where the breaker panel is located.

This suggests Adrian was not merely near the service corridor — he was IN it, and he was at the breaker panel.`,
        prerequisites: ['power_outage_report', 'breaker_panel'],
        logicTags: ['adrian_exact_time', 'breaker_panel_location'],
        location: 'N/A — Interview Analysis',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'marcus_clock',
        title: 'Marcus\'s Clock Discrepancy',
        category: 'timing',
        icon: '🕐',
        summary: 'The billiard room clock was 8 minutes fast. Marcus\'s timeline is off — the power outage was at 9:17, not 9:25 as he reported.',
        fullText: `Marcus Vale reported that the power went out at "9:25 by the billiard room clock."

However, investigation reveals that the billiard room clock runs approximately 8 minutes fast. Marcus himself confirmed this when questioned: "It runs a touch fast... perhaps 5 or 8 minutes ahead."

This means when the billiard clock showed 9:25, the actual time was approximately 9:17 PM — consistent with the verified power outage time.

This discrepancy is important because:
1. It initially makes the timeline seem inconsistent — if taken at face value, Marcus\'s account suggests the outage happened later than it did.
2. It could lead investigators to suspect Marcus of lying about the timeline.
3. However, once the clock error is accounted for, Marcus\'s account perfectly aligns with other evidence.

This is a RED HERRING that may waste investigative time but ultimately confirms Marcus\'s account rather than contradicting it.`,
        prerequisites: ['power_outage_report'],
        logicTags: [],
        location: 'Billiard Room',
        discoveredAt: null,
        isKeyEvidence: false,
    },
    {
        id: 'sofia_tod_estimate',
        title: 'Dr. Klein\'s Time of Death Estimate',
        category: 'timing',
        icon: '🩺',
        summary: 'Dr. Klein estimated death between 9:10-9:25 PM. The wide window includes time before the blackout, but cold air from the window affected her reading.',
        fullText: `Dr. Sofia Klein, as the only physician present, performed a preliminary assessment of Victor Hale\'s body at approximately 9:35 PM.

Her estimate: Time of death between 9:10 PM and 9:25 PM.

This wide window is significant because it includes time BEFORE the blackout (9:17 PM), which could suggest the murder happened in the light — which would make a locked-room scenario even more puzzling.

HOWEVER, Dr. Klein notes: "The storm\'s cold air from the window complicated readings." The library window, though locked, has poor insulation. Cold air from the storm would have cooled the body faster than normal, making it appear death occurred earlier than it actually did.

Adjusted estimate (accounting for accelerated cooling): Death most likely occurred between 9:18 and 9:28 PM — squarely within the blackout window.

Dr. Klein\'s initial wider estimate is medically defensible but functionally misleading. This is not deliberate deception — it\'s a genuine limitation of field assessment under unusual conditions.`,
        prerequisites: ['crime_scene_overview'],
        logicTags: [],
        location: 'Library (Medical Assessment)',
        discoveredAt: null,
        isKeyEvidence: false,
    },
    // === DOCUMENT EVIDENCE ===
    {
        id: 'will_document',
        title: 'Victor\'s Draft Will Amendment',
        category: 'document',
        icon: '📜',
        summary: 'Victor was changing his will to redirect family inheritance to a new foundation. Several people had reason to prevent this.',
        fullText: `DRAFT — AMENDMENT TO LAST WILL AND TESTAMENT OF VICTOR JAMES HALE

Prepared by: Whitmore & Associates, Solicitors
Date of draft: October 11 (three days before the murder)
Status: UNSIGNED

Key changes from existing will:
1. Reduction of spousal inheritance from 60% to 15% of estate.
2. Elimination of children\'s trust fund (previously 25% of estate).
3. Creation of "The Hale Foundation for Ethical Commerce" — receiving 70% of estate.
4. Appointment of NEW executor — replacing the current executor (Adrian Cross).

NOTE: Adrian Cross was the executor of Victor\'s CURRENT will. The new will would have REMOVED him from this position. As executor, Adrian had significant control over the distribution of Victor\'s estate.

Additional note: The current will, with Adrian as executor, has now taken effect following Victor\'s death — as the amended version was never signed.

With Victor dead before signing the new will, Adrian retains his position as executor and the access and control that comes with it.`,
        prerequisites: [],
        logicTags: ['will_change_motive'],
        location: 'Victor\'s Study',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'trust_records',
        title: 'Hale Family Trust Records',
        category: 'document',
        icon: '📊',
        summary: 'Financial irregularities in the family trust. A shell company in the Channel Islands received unexplained transfers.',
        fullText: `HALE FAMILY TRUST — ANNUAL TRANSACTION SUMMARY (PARTIAL)

Executor: Adrian Cross
Trust value: £4.2 million (approximate)

Flagged transactions over the past 3 years:
- 14 transfers to "Windward Holdings Ltd" (Channel Islands) totaling £380,000
- Windward Holdings Ltd is registered to a nominee director service — beneficial owner undisclosed
- Transfers approved by executor (Adrian Cross) under "investment diversification"
- No corresponding investment returns recorded
- Company formation date of Windward Holdings: 6 months after Adrian was appointed executor

Victor Hale had begun investigating these transactions after a routine audit flagged the transfers three weeks before his death. He had not yet confronted Adrian directly but had consulted with his solicitor about changing the executor.

This is the TRUE motive: Adrian was embezzling from the trust. Victor was about to discover this and remove Adrian as executor. Adrian had to act before the new will was signed.`,
        prerequisites: ['will_document'],
        logicTags: ['will_change_motive'],
        location: 'Victor\'s Private Files',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'clara_stolen_docs',
        title: 'Clara\'s Stolen Documents',
        category: 'document',
        icon: '📰',
        summary: 'Documents stolen by Clara Monroe relate to Victor\'s business deals — not personal financial matters or the trust.',
        fullText: `Documents recovered from Clara Monroe\'s bag:

1. Correspondence between Hale & Reed Investments and several acquisition targets, showing aggressive negotiation tactics.
2. Internal memos discussing "acceptable collateral damage" in hostile takeovers.
3. A draft press release (never issued) about a factory closure that displaced 200 workers.
4. Financial projections showing projected personal gains from takeover activities.

These documents relate to Victor Hale\'s BUSINESS practices, not his personal finances or the family trust.

Clara was investigating corporate malfeasance for her exposé. She had no knowledge of or interest in the family trust, the will change, or Adrian\'s role as executor.

While the theft of documents is criminal, the content has no bearing on the murder. Clara\'s actions were motivated by journalism, not personal gain or violence.`,
        prerequisites: [],
        logicTags: [],
        location: 'Clara\'s Bag / Victor\'s Study',
        discoveredAt: null,
        isKeyEvidence: false,
    },
    {
        id: 'eleanor_phone_records',
        title: 'Eleanor\'s Phone Records',
        category: 'document',
        icon: '📱',
        summary: 'Eleanor\'s call with her sister ended at 9:20 PM, not 9:30 PM as she claimed. She went to the kitchen for wine.',
        fullText: `Phone records obtained for Eleanor Hale\'s mobile:

INCOMING CALL
From: Margaret Ashton (Eleanor\'s sister)
Time: 9:14 PM
Duration: 6 minutes
Call ended: 9:20 PM
Reason for disconnect: Unknown (possibly signal loss due to storm)

Eleanor initially claimed she was on the phone "the whole time" during the blackout (9:17 - 9:32 PM). The records show the call ended at 9:20 PM.

When confronted with this discrepancy, Eleanor admitted she went to the kitchen for wine after the call dropped. She was embarrassed about drinking alone during a crisis.

Kitchen staff (a temporary hire for the evening) confirmed seeing a woman matching Eleanor\'s description entering the kitchen at approximately 9:22 PM.

Eleanor\'s lie was about EMBARRASSMENT, not about covering a crime. Her actual location (kitchen) is on the opposite side of the house from the library and the service corridors.`,
        prerequisites: [],
        logicTags: [],
        location: 'Phone Records',
        discoveredAt: null,
        isKeyEvidence: false,
    },
    // === ADDITIONAL KEY EVIDENCE ===
    {
        id: 'window_latch_tampering',
        title: 'Window Latch Pre-Tampering',
        category: 'crime_scene',
        icon: '🔧',
        summary: 'The library window latch was loosened BEFORE the murder. Tool marks suggest preparation, not force during the crime.',
        fullText: `Detailed forensic analysis of the library window latch reveals:

1. The latch pin has been slightly bent — not from force during the night, but from deliberate manipulation over time. The bend is uniform and controlled, not the result of sudden force.

2. Small tool marks on the latch housing are partially oxidized, suggesting they were made HOURS or possibly DAYS before the crime — not during the blackout.

3. The latch, once loosened, can be pushed into the "locked" position from outside using a thin rigid wire inserted through the 3mm gap between the window sash and frame.

4. This means someone who knew the window mechanism had PREPARED the latch in advance, ensuring they could lock the window behind them after exiting.

This was a PREMEDITATED setup. The killer planned the locked-room illusion before the dinner party even began.

Who had prior access to the library? All guests arrived that evening, but Adrian Cross had visited the manor the previous weekend "to help Victor prepare for the party."`,
        prerequisites: ['locked_window', 'wire_fragment'],
        logicTags: ['window_latch_loosened', 'fake_locked_room'],
        location: 'Library Window',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'poker_in_basement',
        title: 'Poker Found in Basement',
        category: 'physical',
        icon: '🔨',
        summary: 'The missing fireplace poker was found in the basement utility room — near the breaker panel. It had been wiped clean.',
        fullText: `The missing library fireplace poker was recovered from the basement utility room, placed behind a storage shelf near the breaker panel.

The poker had been wiped with a cloth (fibers consistent with a shop rag found in the utility room), but trace amounts of biological material were found in the decorative crevices near the hooked end. Analysis confirms this is consistent with the victim\'s blood type.

The poker was found approximately 3 meters from the breaker panel.

Route analysis: Someone could carry the poker from the library through the garden (exiting via the window), enter the servants\' entrance on the east side, descend to the basement via the service corridor, leave the poker, reset the breaker, and return upstairs through the corridor — all within the 15-minute blackout window.

The placement of the poker in the basement directly connects the murder to the person who had access to the breaker panel.`,
        prerequisites: ['murder_weapon', 'breaker_panel'],
        logicTags: ['breaker_panel_location', 'servant_corridor_access'],
        location: 'Basement Utility Room',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'adrian_previous_visit',
        title: 'Adrian\'s Weekend Visit',
        category: 'timing',
        icon: '📅',
        summary: 'Adrian visited the manor the weekend before the murder, ostensibly to "help prepare." He had full access to the house for 48 hours.',
        fullText: `Calendar records and Eleanor Hale\'s confirmation establish that Adrian Cross visited Hale Manor the weekend of October 7-8 — one week before the murder.

Stated purpose: Helping Victor prepare for the dinner party.

During this visit, Adrian had unsupervised access to:
- The entire house, including the library, basement, and service corridors
- The library window mechanism
- The breaker panel
- The utility room (where the wire and tools were stored)

Eleanor recalls: "Adrian was here all weekend. He and Victor went over guest arrangements. Adrian spent quite a bit of time wandering the house — he said he was feeling nostalgic, remembering old times."

Marcus Vale (who was still serving at the time): "Mr. Cross was in the library for some time on Saturday afternoon. I offered him tea but he said he was just looking at Victor\'s book collection."

This visit provided Adrian with the opportunity to:
1. Loosen the library window latch
2. Familiarize himself with the exact position and operation of the breaker panel
3. Identify the wire in the utility room
4. Plan his route through the service corridors`,
        prerequisites: ['window_latch_tampering', 'servant_corridor'],
        logicTags: ['window_latch_loosened', 'breaker_panel_location', 'servant_corridor_access'],
        location: 'Calendar Records',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'daniel_financial_records',
        title: 'Daniel Reed\'s Financial Records',
        category: 'document',
        icon: '💰',
        summary: 'Daniel was embezzling from the company, but this was SEPARATE from the trust embezzlement. Two different financial crimes.',
        fullText: `Daniel Reed\'s financial records reveal significant personal debt and evidence of funds siphoned from Hale & Reed Investments company accounts (not the family trust).

This is a SEPARATE financial crime from the Hale Family Trust embezzlement attributed to Adrian Cross.

Daniel\'s embezzlement:
- Source: Company operating accounts
- Amount: ~£150,000 over 18 months
- Method: Inflated expense reports and phantom vendor payments
- Victor\'s knowledge: Yes — discovered 2 weeks prior

Adrian\'s embezzlement:
- Source: Hale Family Trust
- Amount: ~£380,000 over 3 years
- Method: Shell company transfers
- Victor\'s knowledge: Starting to suspect, had not confirmed

Key distinction: Daniel had motive, but his financial crime was already discovered. He had nothing to gain from Victor\'s death — the evidence against him already existed. In fact, Victor\'s death makes things WORSE for Daniel, as the estate audit will expose his embezzlement more thoroughly.

Adrian\'s embezzlement, by contrast, would only be discovered if Victor completed his investigation and changed his will/executor. Victor\'s death STOPPED that process.`,
        prerequisites: ['trust_records'],
        logicTags: ['will_change_motive'],
        location: 'Financial Records',
        discoveredAt: null,
        isKeyEvidence: true,
    },
];

export const getEvidenceById = (id) => evidence.find(e => e.id === id);
export const getEvidenceByCategory = (cat) => evidence.filter(e => e.category === cat);
export const getKeyEvidence = () => evidence.filter(e => e.isKeyEvidence);

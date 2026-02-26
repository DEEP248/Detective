// Episode 2: The Silent Poison — Evidence items
// Each clue has progressive unlocking via prerequisites

export const evidence = [
    // === SCENE EVIDENCE ===
    {
        id: 'scene_overview',
        title: 'Scene Overview',
        category: 'crime_scene',
        icon: '🔍',
        summary: 'Rajiv Malhotra collapsed after drinking kesar doodh during the engagement ceremony. Dead within minutes.',
        fullText: `Rajiv Malhotra, age 55, collapsed at 8:47 PM during his son Arjun's engagement ceremony at the Malhotra Haveli, Jaipur.

He had been holding a silver glass of kesar doodh (saffron milk). After taking two sips, he suddenly grabbed his chest, began frothing at the mouth, and fell to the ground.

Dr. Anil Verma, the family doctor present at the ceremony, rushed to assist. He confirmed death within 4 minutes. Preliminary assessment: poisoning by an organophosphate compound.

The private hall had seven people present at the time: Meera (wife), Arjun (son), Kavya (fiancée), Rohan (Kavya's brother), Devendra (business partner), Sunita (house manager via kitchen), and Dr. Anil (family doctor).

The hall doors were not locked. Guests moved freely between the main hall and the private hall throughout the evening.`,
        prerequisites: [],
        logicTags: [],
        location: 'Private Hall',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'poison_report',
        title: 'Poison Analysis Report',
        category: 'crime_scene',
        icon: '☠️',
        summary: 'The poison was an organophosphate compound. It dissolves slowly in hot liquid and is nearly tasteless in spiced milk.',
        fullText: `TOXICOLOGY PRELIMINARY REPORT

Substance identified: Organophosphate compound (suspected methyl parathion derivative).

Properties:
- Available in agricultural supply stores as pesticide
- In powder form, it is nearly odorless
- Dissolves slowly in warm/hot liquids over 3-5 minutes
- Masked effectively by strong flavors like saffron and cardamom
- Lethal dose: approximately 200mg for an adult male
- Time to effect: 2-5 minutes after ingestion
- Symptoms: constricted pupils, excessive salivation, frothing, seizure, cardiac arrest

The kesar doodh was served warm. The saffron and cardamom would mask any slight taste. The poison would need to be added to the glass at least 3-4 minutes before drinking to fully dissolve.

NOTE: This type of compound is available in rural Rajasthan from agricultural suppliers. A person with chemistry knowledge would know the correct dosage and dissolution properties.`,
        prerequisites: [],
        logicTags: ['poison_knowledge'],
        location: 'Lab Analysis',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'glass_analysis',
        title: 'Glass Fingerprint Analysis',
        category: 'crime_scene',
        icon: '🥛',
        summary: 'Only Rajiv\'s glass contained poison. A strange fingerprint smudge was found on the rim — someone wiped part of the glass.',
        fullText: `FORENSIC ANALYSIS — DRINKING GLASSES

Seven silver glasses of kesar doodh were served from a single tray. Each glass was tested:

Glass 1 (Rajiv): POSITIVE for organophosphate compound. Fingerprints found: Rajiv Malhotra (primary grip), one SMUDGED partial print on the rim that does not match Rajiv.
Glass 2-7 (Others): ALL NEGATIVE for any toxic substance.

The smudged print on Rajiv's glass is significant:
- It appears someone touched the rim of the glass briefly
- The print was partially wiped — as if the person tried to remove evidence
- The angle of the smudge suggests someone reaching across or leaning over the glass
- The print is too damaged for positive identification but the finger width suggests a male hand

The waiter (Ramu) wore cotton gloves when serving. His glove fibers are present on all glasses equally.

CONCLUSION: The poison was added to Rajiv's glass AFTER it left the kitchen and BEFORE he drank it. Someone touched his glass specifically.`,
        prerequisites: [],
        logicTags: ['fingerprint_smudge'],
        location: 'Forensic Lab',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'cctv_gap',
        title: 'CCTV Footage Gap',
        category: 'crime_scene',
        icon: '📹',
        summary: 'CCTV cameras in the private hall stopped recording for exactly 10 minutes. The footage gap coincides with the power fluctuation.',
        fullText: `CCTV SYSTEM ANALYSIS

The Malhotra Haveli has 8 CCTV cameras. The two cameras covering the private hall experienced a recording gap:

Camera 5 (Hall entrance): Gap from 8:35 PM to 8:45 PM
Camera 6 (Hall interior): Gap from 8:35 PM to 8:45 PM

All other cameras (exterior, kitchen, corridors) continued recording normally.

The gap coincides with a reported "power fluctuation" in the hall area. However:
- The power fluctuation only affected the hall and its immediate electrical circuit
- The rest of the haveli maintained normal power
- The CCTV system has battery backup but the two hall cameras appear to have been manually disconnected from their power source

CRITICAL: The footage gap creates a 10-minute window where movements in the hall are unrecorded. The drinks were served approximately 3 minutes before the CCTV gap began.

Review of footage BEFORE the gap (8:30-8:35 PM): Shows all seven individuals present. The drinks tray has been placed on the side table. Rohan Sharma is visible moving from his seat toward the general direction of the drinks table at 8:34:52 PM — just before the cameras cut out.`,
        prerequisites: [],
        logicTags: ['cctv_timing'],
        location: 'Security System',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'guest_list',
        title: 'Guest and Seating Record',
        category: 'crime_scene',
        icon: '📋',
        summary: 'Seven people were in the private hall. Seating chart shows Rohan was closest to the drinks service table.',
        fullText: `PRIVATE HALL — SEATING ARRANGEMENT

The private hall at Malhotra Haveli was arranged for the intimate engagement ceremony:

STAGE AREA (North): Arjun and Kavya (engaged couple)
TABLE 1 (East, family): Rajiv Malhotra, Meera Malhotra, Dr. Anil Verma
TABLE 2 (West, guests): Devendra Singh, two business associates (left before the incident)
STANDING AREA (South): Rohan Sharma

DRINKS SERVICE TABLE: Located in the south-east corner, near where Rohan was standing.

After the tray was placed on the service table by the waiter (Ramu), guests were expected to collect their own drinks or have them passed.

NOTE: Rohan's position was the closest to the drinks service table. He was approximately 2 meters away. The next closest person was Devendra, approximately 5 meters away at Table 2.`,
        prerequisites: [],
        logicTags: ['rohan_near_table'],
        location: 'Event Records',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    // === PHYSICAL EVIDENCE ===
    {
        id: 'napkin_stain',
        title: 'Yellow Stain on Napkin',
        category: 'physical',
        icon: '🧻',
        summary: 'A cloth napkin near the drinks table has a faint yellow stain. Chemical analysis confirms it matches the poison compound.',
        fullText: `A white cloth napkin was recovered from the floor near the drinks service table.

The napkin has a faint yellow stain, approximately 2cm in diameter. Chemical analysis confirms the yellow substance is consistent with the organophosphate compound found in Rajiv's glass.

This suggests:
- Someone handled the poison near the drinks table
- The poison may have been carried in powder form and some residue transferred to the napkin
- The napkin was likely used to wipe hands or the glass rim after adding the poison

The napkin has no identifiable fingerprints — it was crumpled, suggesting hasty disposal.

The yellow color is a known reaction when organophosphate powder contacts the specific fabric dye used in these napkins. The reaction takes 10-15 minutes to become visible, which is why it wasn't noticed immediately.`,
        prerequisites: ['glass_analysis', 'poison_report'],
        logicTags: ['poison_residue', 'fingerprint_smudge'],
        location: 'Near Drinks Table',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'kurta_change',
        title: 'Rohan\'s Kurta Change',
        category: 'physical',
        icon: '👔',
        summary: 'Rohan changed his kurta shortly after the ceremony started. His old kurta has a small yellow stain on the pocket area.',
        fullText: `Witness accounts and photo comparison reveal that Rohan Sharma changed his kurta (traditional shirt) during the event:

Before ceremony: Blue silk kurta with gold embroidery
After ceremony: Green cotton kurta (simpler design)

Rohan's explanation: "I spilled sherbet on my blue kurta."

HOWEVER, examination of the blue kurta recovered from Rohan's bag reveals:
- No sherbet stain anywhere on the garment
- A small yellow stain on the RIGHT POCKET area, consistent with organophosphate residue
- The stain pattern suggests something was carried in or removed from the pocket

The green kurta he changed into has no pockets — an unusual choice for a formal event.

If Rohan carried the poison in his kurta pocket, the yellow stain would be consistent with powder residue leaking through the fabric. Changing the kurta would remove this evidence from his person.`,
        prerequisites: ['napkin_stain'],
        logicTags: ['kurta_change', 'poison_residue'],
        location: 'Rohan\'s Bag',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'waiter_testimony',
        title: 'Waiter Ramu\'s Statement',
        category: 'testimony',
        icon: '🧑‍🍳',
        summary: 'Waiter Ramu confirms Rohan asked about milk ingredients AND was seen near the drinks table during the power fluctuation.',
        fullText: `WITNESS STATEMENT — Ramu (Waiter, temporary hire for the event)

"I prepared the tray in the kitchen with Sunita ma'am. Seven silver glasses of kesar doodh, all from the same pot. I carried the tray to the private hall and placed it on the side table.

Before I placed the tray, the young man — Kavya's brother (Rohan) — asked me what was in the kesar doodh. He wanted to know all the ingredients. I told him: milk, saffron, cardamom, sugar, and crushed almonds. He nodded and walked away.

After I placed the tray, I went to refill water glasses. When the lights flickered, I was near the kitchen entrance. I looked back and saw the young man near the drinks table. He was standing very close to it. When the lights came back, he was walking away from the table toward the stage area.

I did not see him touch any glass. But he was definitely near the table during the dark period. He told me later he was 'just standing there.' But his position was right next to Sahib's glass."`,
        prerequisites: ['cctv_gap', 'guest_list'],
        logicTags: ['rohan_near_table', 'milk_ingredients_question'],
        location: 'Witness Interview',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    // === BACKGROUND EVIDENCE ===
    {
        id: 'rohan_chemistry',
        title: 'Rohan\'s Chemistry Background',
        category: 'background',
        icon: '🧪',
        summary: 'Rohan has a B.Sc. in Chemistry from Rajasthan University. His thesis was on "Organophosphate Compounds in Agriculture."',
        fullText: `EDUCATIONAL RECORD — Rohan Sharma

Rajasthan University, Jaipur
B.Sc. Chemistry — Graduated 2020
Final year thesis: "Organophosphate Compounds in Agricultural Applications: Toxicity Profiles and Environmental Impact"

The thesis specifically covers:
- Lethal dosage calculations for various organophosphate compounds
- Dissolution rates in different liquids (including warm milk)
- Methods of detection and masking
- Sourcing of compounds from agricultural suppliers

Rohan never pursued a career in chemistry. He started a printing business in 2021 which has been struggling financially.

When asked about his chemistry degree, Rohan was dismissive: "That was years ago. I don't remember any of it."

However, the specific poison used to kill Rajiv — and its method of delivery (warm spiced milk) — aligns precisely with the knowledge documented in Rohan's thesis.`,
        prerequisites: ['poison_report'],
        logicTags: ['chemistry_background', 'poison_knowledge'],
        location: 'University Records',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'rohan_debt',
        title: 'Rohan\'s Financial Crisis',
        category: 'background',
        icon: '💰',
        summary: 'Rohan owes ₹18 lakh to a moneylender. His printing business is failing. He was desperate for the deal Rajiv cancelled.',
        fullText: `FINANCIAL INVESTIGATION — Rohan Sharma

Rohan's printing business "Sharma Print Solutions" has been in financial trouble for 2 years:
- Outstanding debt: ₹18 lakh to a private moneylender (Pappu Yadav)
- Monthly interest: ₹36,000
- Business revenue: ₹45,000/month (barely covers interest)
- Threat of asset seizure if not repaid by March

Rohan had pinned all his hopes on a large printing contract with Malhotra Textiles. Rajiv had verbally promised this contract 6 months ago.

THREE WEEKS BEFORE THE MURDER:
Rajiv quietly cancelled the printing contract and gave it to a different vendor. He did not inform Rohan directly — Rohan found out through a supplier.

When Rohan confronted Rajiv (10 days before the engagement), Rajiv said: "Business is business. Your quality is not good enough."

Without this contract, Rohan faces complete financial ruin within 3 months. The moneylender has already sent threats.`,
        prerequisites: ['scene_overview'],
        logicTags: ['debt_motive', 'cancelled_deal'],
        location: 'Financial Records',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'cancelled_deal',
        title: 'The Cancelled Printing Contract',
        category: 'background',
        icon: '📝',
        summary: 'Rajiv cancelled a ₹25 lakh printing contract with Rohan\'s company three weeks before the murder. Rohan\'s only hope for financial survival.',
        fullText: `CONTRACT RECORDS — Malhotra Textiles

A verbal agreement existed between Rajiv Malhotra and Rohan Sharma for a printing contract worth ₹25 lakh over 12 months. This contract was for packaging and label printing for Malhotra Textiles' new product line.

Timeline:
- 6 months ago: Rajiv verbally promised the contract to Rohan
- 3 months ago: Rohan invested ₹8 lakh in new printing equipment specifically for this contract (borrowed from the moneylender)
- 3 weeks ago: Rajiv awarded the contract to "Jaipur Premium Prints" — a larger, more established company
- 10 days ago: Rohan confronted Rajiv. Rajiv refused to reconsider.

Rohan invested borrowed money in equipment for a contract that was then given to someone else. He now owes ₹18 lakh with no way to repay.

Key detail: Rohan told his friend Vikram (who provided this testimony) that Rajiv "destroyed my life for no reason" and that he would "make him pay for this." Vikram assumed it was just angry talk.`,
        prerequisites: ['rohan_debt'],
        logicTags: ['cancelled_deal', 'debt_motive'],
        location: 'Business Records',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'engagement_cancellation',
        title: 'Planned Engagement Cancellation',
        category: 'background',
        icon: '💔',
        summary: 'Rajiv was planning to cancel Arjun and Kavya\'s engagement the next morning. Rohan overheard this conversation.',
        fullText: `PHONE RECORDS AND WITNESS STATEMENT

Rajiv Malhotra made a phone call to his lawyer at 6:15 PM on the day of the engagement (2.5 hours before his death):

"I've decided. I'm cancelling the engagement tomorrow morning. The Sharma family is not suitable. The brother is a failure and I don't want that association with my family name."

This call was overheard by a household staff member who was cleaning the corridor near Rajiv's study.

CRITICAL: Devendra Singh confirmed that during a private conversation at 7:30 PM, Rajiv told him the same thing: "Tomorrow morning I will tell Arjun. The engagement with the Sharma girl is off."

Devendra recalls seeing Rohan standing near the doorway during this conversation. When Devendra pointed this out, Rajiv said: "Let him hear. He should know."

If Rohan overheard this, he knew that:
1. His sister's engagement was about to be cancelled
2. His family would be publicly humiliated
3. His only remaining connection to Rajiv's wealth would be severed
4. Combined with the cancelled contract, he had nothing left to lose.`,
        prerequisites: ['cancelled_deal'],
        logicTags: ['overheard_cancellation', 'debt_motive'],
        location: 'Phone Records / Witness',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    // === METHOD EVIDENCE ===
    {
        id: 'hug_opportunity',
        title: 'The Traditional Blessing Hug',
        category: 'method',
        icon: '🤗',
        summary: 'During the ashirwad (blessing) ritual, each family member hugged Rajiv. This was Rohan\'s opportunity to drop poison into the glass.',
        fullText: `CEREMONY TIMELINE ANALYSIS

At approximately 8:30 PM, after the ring exchange, the traditional "ashirwad" (blessing) ritual took place. Family members approached Rajiv one by one to receive his blessing and offer congratulations.

Order of hugs/blessings:
1. Arjun (son) — touched Rajiv's feet, then hugged
2. Kavya (fiancée) — touched Rajiv's feet, received blessing
3. Meera (wife) — stood beside Rajiv
4. Rohan (Kavya's brother) — hugged Rajiv from the right side
5. Devendra — handshake only
6. Dr. Anil — handshake only

At the time of hugging, Rajiv was standing near the side table where his kesar doodh glass was placed. He had not yet picked it up.

Rohan's hug was notably longer than expected — approximately 4-5 seconds. During this hug, Rohan's right hand was positioned over Rajiv's right shoulder, directly above the table where the glass sat.

A skilled person could release powder from a concealed position (such as between fingers or from under a ring) into the glass during this embrace. The warm milk would begin dissolving the powder within seconds.`,
        prerequisites: ['waiter_testimony', 'guest_list'],
        logicTags: ['hug_opportunity', 'rohan_near_table'],
        location: 'Ceremony Analysis',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'silver_ring',
        title: 'Rohan\'s Silver Ring',
        category: 'method',
        icon: '💍',
        summary: 'Rohan was wearing a large silver ring with a hollow compartment. Such rings were historically used to conceal poison.',
        fullText: `PHYSICAL EVIDENCE — Rohan Sharma's Ring

Rohan was wearing a large ornate silver ring on his right hand during the ceremony. After the incident, the ring was not on his finger.

When asked, Rohan said: "I must have lost it in the commotion."

The ring was found in the bathroom attached to the private hall, in the dustbin under crumpled paper towels.

Analysis of the ring reveals:
- It has a HOLLOW COMPARTMENT beneath the decorative top plate
- The compartment can hold approximately 300mg of powder
- Residue inside the compartment tested POSITIVE for organophosphate traces
- The compartment opens with a small sliding mechanism on the side

This type of ring is historically known as a "poison ring" — used centuries ago to discreetly carry and deliver poison. Modern replicas are available online as novelty jewelry.

Rohan purchased this ring online 3 weeks ago. The purchase matches an order from "VintageReplicas.in" on his credit card statement — 2 days after learning about the cancelled printing contract.`,
        prerequisites: ['hug_opportunity', 'poison_report'],
        logicTags: ['poison_delivery', 'hug_opportunity'],
        location: 'Bathroom Dustbin',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    // === MISDIRECTION EVIDENCE ===
    {
        id: 'devendra_dispute',
        title: 'Devendra\'s Land Deal Dispute',
        category: 'misdirection',
        icon: '🏗️',
        summary: 'Devendra and Rajiv were fighting over a ₹3 crore land deal. Devendra threatened legal action. A strong motive — but a red herring.',
        fullText: `BUSINESS DISPUTE — Devendra Singh vs. Rajiv Malhotra

Devendra Singh and Rajiv Malhotra co-owned a textile company for 15 years. Recently, they disagreed over a land deal in Jodhpur:

- Land value: ₹3 crore
- Dispute: Rajiv wanted to develop the land alone, cutting Devendra out
- Devendra's position: He invested ₹1.2 crore of his own money into the purchase
- Rajiv's position: The land was bought through the company, so it belongs to both equally

Two weeks before the murder, Devendra sent Rajiv a legal notice threatening a court case.

HOWEVER:
- Devendra was sitting at his table throughout the ceremony
- Multiple witnesses confirm he was arguing about politics
- He drinks whisky, not milk — he never went near the milk tray
- His fingerprints are NOT on Rajiv's glass
- He had legal recourse and was actively pursuing it

The dispute is real and the motive is genuine, but Devendra had means to fight this in court. He did not need to kill.`,
        prerequisites: ['scene_overview'],
        logicTags: [],
        location: 'Legal Records',
        discoveredAt: null,
        isKeyEvidence: false,
    },
    {
        id: 'meera_secret_account',
        title: 'Meera\'s Discovery of Secret Account',
        category: 'misdirection',
        icon: '🏦',
        summary: 'Meera found Rajiv\'s secret bank account with ₹2 crore. She was furious — but the account was for a surprise retirement trip.',
        fullText: `FINANCIAL RECORDS — Rajiv Malhotra

Meera Malhotra discovered a hidden bank account in Mumbai in Rajiv\'s name containing ₹2 crore. She found bank statements in his study two weeks before the engagement.

Meera confronted Rajiv. He refused to explain, saying "it's none of your business." This led to a major argument.

HOWEVER, investigation reveals:
- The account was opened 8 months ago
- Deposits were from legitimate bonus income from the textile business
- Rajiv had been planning a surprise: a retirement trip to Europe for their 28th wedding anniversary
- Travel bookings were found in Rajiv's email: flights, hotels, and a Mediterranean cruise for two
- Rajiv's lawyer confirms the account was meant for "a personal surprise for his wife"

Meera's anger was based on a misunderstanding. The "secret" was a gift, not betrayal.

Additionally, Meera was surrounded by relatives near the stage the entire evening. She never went near the drinks table.`,
        prerequisites: ['scene_overview'],
        logicTags: [],
        location: 'Bank Records',
        discoveredAt: null,
        isKeyEvidence: false,
    },
    {
        id: 'dr_anil_billing',
        title: 'Dr. Anil\'s Overbilling Issue',
        category: 'misdirection',
        icon: '💊',
        summary: 'Dr. Anil overbilled the family by ₹4 lakh over 3 years. Minor issue that makes him look suspicious but lacks motive for murder.',
        fullText: `MEDICAL BILLING RECORDS — Dr. Anil Verma

Review of medical bills submitted by Dr. Anil Verma to the Malhotra family over 3 years reveals:
- Total billed: ₹12.5 lakh
- Estimated fair market value of services: ₹8.5 lakh
- Overbilling amount: approximately ₹4 lakh

The overbilling was through inflated consultation fees and unnecessary "comprehensive health packages."

Rajiv had noticed the discrepancy and planned to discuss it with Dr. Anil the following week.

HOWEVER:
- ₹4 lakh over 3 years is a minor amount for a doctor of his stature
- Dr. Anil was prepared to refund and apologize
- He has no criminal history or violent tendencies
- He was seated next to Meera at the family table throughout
- His fingerprints are NOT on Rajiv's glass
- He correctly identified the poison, which helped the investigation

The overbilling makes Dr. Anil look suspicious, but the motive is far too weak for murder.`,
        prerequisites: ['poison_report'],
        logicTags: [],
        location: 'Medical Records',
        discoveredAt: null,
        isKeyEvidence: false,
    },
    {
        id: 'sunita_haveli_sale',
        title: 'Sunita\'s Fear of Haveli Sale',
        category: 'misdirection',
        icon: '🏠',
        summary: 'Rajiv planned to sell the haveli and move to Mumbai. Sunita would lose her home and job. But she was in the kitchen throughout.',
        fullText: `STAFF RECORDS — Sunita Devi

Sunita has been the house manager at Malhotra Haveli for 20 years. She lives in the staff quarters within the haveli compound.

Rajiv had told Meera (overheard by Sunita) that after Arjun's wedding, he planned to sell the haveli and move to Mumbai for business expansion.

Sunita's concerns:
- Loss of job after 20 years
- Loss of housing (she has no other home)
- Her children attend school nearby
- She is 45 years old with limited job prospects elsewhere

HOWEVER:
- Sunita was in the kitchen throughout the ceremony (confirmed by 4 kitchen staff)
- She prepared all glasses from the same pot — all tested clean
- The poison was added AFTER the glasses left the kitchen
- She had no access to the private hall during the ceremony
- Her motive, while real, does not connect to the method of murder`,
        prerequisites: ['scene_overview'],
        logicTags: [],
        location: 'Staff Records',
        discoveredAt: null,
        isKeyEvidence: false,
    },
    {
        id: 'power_fluctuation',
        title: 'Power Fluctuation Analysis',
        category: 'method',
        icon: '⚡',
        summary: 'The power fluctuation was limited to the hall circuit only. It may have been deliberately caused to create the CCTV gap.',
        fullText: `ELECTRICAL ANALYSIS — Malhotra Haveli

The power fluctuation at 8:35 PM affected only the private hall electrical circuit:
- Hall lights flickered and dimmed for about 10 minutes
- CCTV cameras on that circuit lost power
- Kitchen, garden, and other areas remained fully powered

Investigation of the electrical panel reveals:
- The hall circuit breaker shows signs of manual manipulation
- A small timer device was found attached to the circuit — set to cut power for 10 minutes
- The timer is a common agricultural device used for automated irrigation systems
- It was attached with electrical tape and removed after use (found in the garden bin)

This means:
- The power fluctuation was PLANNED, not accidental
- Someone set it up BEFORE the ceremony to create a specific window
- The person who set it needed access to the electrical panel in the utility room
- The utility room was unlocked and accessible from the garden entrance

Sunita confirmed that Rohan was seen near the utility room earlier that afternoon, saying he was "looking for the bathroom." The bathroom is on the opposite side of the hall.`,
        prerequisites: ['cctv_gap'],
        logicTags: ['cctv_timing', 'power_planned'],
        location: 'Electrical Panel',
        discoveredAt: null,
        isKeyEvidence: true,
    },
    {
        id: 'rohan_purchases',
        title: 'Rohan\'s Recent Purchases',
        category: 'method',
        icon: '🛒',
        summary: 'Rohan bought pesticide from an agricultural shop and a "poison ring" replica online — both within 3 weeks of the murder.',
        fullText: `PURCHASE RECORDS — Rohan Sharma

Credit card and shop records reveal two significant purchases:

1. AGRICULTURAL SUPPLIER (Tonk Road, Jaipur) — 18 days before murder
   Item: "Parathion-M 50% Concentrate" (500ml bottle)
   Listed use: Crop pest control
   Note: Rohan does not own farmland. His printing business has no agricultural connection.
   Shop owner recalls: "A young man bought it. Said it was for his uncle's farm. Paid cash but I noted his Aadhaar for the register."

2. ONLINE PURCHASE (VintageReplicas.in) — 19 days before murder
   Item: "Medieval Silver Poison Ring — Hollow Compartment Replica"
   Price: ₹2,800
   Delivery: To Rohan's home address
   Note: This is the ring found in the bathroom dustbin with organophosphate residue.

Both purchases were made within 48 hours of Rohan learning about the cancelled printing contract. This establishes PREMEDITATION — Rohan planned the murder for nearly 3 weeks.`,
        prerequisites: ['silver_ring', 'rohan_chemistry'],
        logicTags: ['premeditation', 'poison_delivery', 'chemistry_background'],
        location: 'Purchase Records',
        discoveredAt: null,
        isKeyEvidence: true,
    },
];

export const getEvidenceById = (id) => evidence.find(e => e.id === id);
export const getEvidenceByCategory = (cat) => evidence.filter(e => e.category === cat);
export const getKeyEvidence = () => evidence.filter(e => e.isKeyEvidence);

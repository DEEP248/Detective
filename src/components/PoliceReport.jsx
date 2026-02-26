import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';
import { staggerContainer, staggerItem } from '../animations/variants';

export default function PoliceReport() {
    const victimProfile = useGameStore(s => s.episodeData?.victimProfile) || {};
    const meta = useGameStore(s => s.episodeData?.meta);
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-serif font-bold text-noir-100">Police Report</h2>
                <p className="text-xs text-noir-400 mt-1">Official incident report — For authorized personnel only</p>
            </div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-6"
            >
                {/* Header Block */}
                <motion.div variants={staggerItem} className="bg-noir-800/50 border border-noir-700/40 rounded-xl p-6 font-mono">
                    <div className="text-xs space-y-2 text-noir-300">
                        <div className="flex justify-between border-b border-noir-700/30 pb-2">
                            <span className="text-noir-500 uppercase tracking-wider text-[10px]">Metropolitan Police Service</span>
                            <span className="text-noir-500 text-[10px]">CASE FILE #MP-2024-7742</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <span className="text-noir-500 text-[10px] block">INCIDENT TYPE</span>
                                <span className="text-red-400">Homicide — Suspicious Death</span>
                            </div>
                            <div>
                                <span className="text-noir-500 text-[10px] block">DATE OF INCIDENT</span>
                                <span>14 October 2024</span>
                            </div>
                            <div>
                                <span className="text-noir-500 text-[10px] block">LOCATION</span>
                                <span>Hale Manor, Ashford Lane, Surrey</span>
                            </div>
                            <div>
                                <span className="text-noir-500 text-[10px] block">REPORTING OFFICER</span>
                                <span>DI Catherine Wells, Badge #4419</span>
                            </div>
                            <div>
                                <span className="text-noir-500 text-[10px] block">VICTIM</span>
                                <span className="text-red-300">{victimProfile.name}, Age {58}, Male</span>
                            </div>
                            <div>
                                <span className="text-noir-500 text-[10px] block">CAUSE OF DEATH</span>
                                <span className="text-red-300">Blunt Force Trauma — Right Temporal Region</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Narrative */}
                <motion.div variants={staggerItem} className="bg-noir-800/50 border border-noir-700/40 rounded-xl p-6">
                    <h3 className="text-label mb-3">Incident Narrative</h3>
                    <div className="text-sm text-noir-300 leading-relaxed space-y-3 font-mono">
                        <p>
                            On the evening of 14 October, emergency services were contacted at 21:38 regarding a
                            suspected homicide at Hale Manor. Officers arrived at 21:52 to find the victim,
                            Victor James Hale (DOB: 03/05/1966), deceased in the ground-floor library.
                        </p>
                        <p>
                            The victim was discovered by Adrian Cross (family friend) and Dr. Sofia Klein (guest)
                            at approximately 21:33, shortly after electrical power was restored following a
                            15-minute outage.
                        </p>
                        <p>
                            Preliminary examination by Dr. Klein (a licensed physician) indicated death by blunt
                            force trauma to the right temporal region. A single heavy blow appears to have been
                            the cause. The suspected weapon — a cast-iron fireplace poker — was missing from the
                            library hearth set.
                        </p>
                        <p>
                            The library presents a locked-room scenario: the single window was found secured from
                            the inside, and the door was ajar at the time of discovery. Six guests were present
                            in the house at the time of the incident.
                        </p>
                        <p className="text-amber-300/70 bg-amber-900/10 p-3 rounded-lg border border-amber-800/20">
                            NOTE: The power outage has been determined to be non-accidental. The main circuit
                            breaker was manually set to the OFF position. This is being treated as a deliberate act.
                        </p>
                    </div>
                </motion.div>

                {/* Persons of Interest */}
                <motion.div variants={staggerItem} className="bg-noir-800/50 border border-noir-700/40 rounded-xl p-6">
                    <h3 className="text-label mb-3">Persons of Interest</h3>
                    <div className="space-y-3 font-mono text-xs">
                        {[
                            { name: 'Eleanor Hale', relation: 'Spouse of victim', status: 'Being interviewed' },
                            { name: 'Daniel Reed', relation: 'Business partner', status: 'Being interviewed' },
                            { name: 'Clara Monroe', relation: 'Journalist / Guest', status: 'Being interviewed' },
                            { name: 'Marcus Vale', relation: 'Former butler', status: 'Being interviewed' },
                            { name: 'Dr. Sofia Klein', relation: 'Physician / Guest', status: 'Cooperative' },
                            { name: 'Adrian Cross', relation: 'Family friend', status: 'Cooperative' },
                        ].map((person, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-noir-900/40 rounded-lg">
                                <div>
                                    <span className="text-noir-200">{person.name}</span>
                                    <span className="text-noir-500 ml-2">— {person.relation}</span>
                                </div>
                                <span className="text-noir-500 text-[10px] uppercase">{person.status}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Scene Details */}
                <motion.div variants={staggerItem} className="bg-noir-800/50 border border-noir-700/40 rounded-xl p-6">
                    <h3 className="text-label mb-3">Scene Assessment</h3>
                    <div className="text-sm text-noir-300 leading-relaxed space-y-3 font-mono">
                        <p>
                            • Library door: Unlocked, found ajar. No signs of forced entry.
                        </p>
                        <p>
                            • Library window: Single sash window, found LOCKED from inside. Examination of latch
                            mechanism ongoing — preliminary observations suggest possible tool marks.
                        </p>
                        <p>
                            • Suspected weapon: Fireplace poker from Harrington & Sons set (c.1920), missing
                            from library. Remainder of set intact.
                        </p>
                        <p>
                            • Weather conditions: Severe storm. Heavy rain from approximately 20:30.
                            Ground saturated.
                        </p>
                        <p>
                            • Note: Fresh shoe impressions observed in mud beneath library window.
                            Impressions being photographed and measured. Preliminary size: UK 10.
                        </p>
                        <p className="text-red-300/60 italic">
                            Classification: ACTIVE INVESTIGATION. Do not share outside authorized chain.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

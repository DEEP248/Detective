import { AnimatePresence, motion } from 'framer-motion';
import useGameStore from './store/gameStore';
import IntroSection from './sections/IntroSection';
import BriefingSection from './sections/BriefingSection';
import InvestigationSection from './sections/InvestigationSection';

export default function App() {
    const currentSection = useGameStore(s => s.currentSection);
    const gameStarted = useGameStore(s => s.gameStarted);

    // If game was previously started and saved, skip intro
    const showSection = () => {
        switch (currentSection) {
            case 'intro':
                return <IntroSection key="intro" />;
            case 'briefing':
                return <BriefingSection key="briefing" />;
            case 'investigation':
            case 'accusation':
            case 'solved':
                return <InvestigationSection key="investigation" />;
            default:
                return <IntroSection key="intro" />;
        }
    };

    return (
        <div className="min-h-screen bg-noir-950 noise-overlay">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {showSection()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

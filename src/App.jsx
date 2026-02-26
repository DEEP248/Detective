import useGameStore from './store/gameStore';
import { loadEpisode } from './episodes';
import HomePage from './pages/HomePage';
import IntroSection from './sections/IntroSection';
import BriefingSection from './sections/BriefingSection';
import InvestigationSection from './sections/InvestigationSection';

export default function App() {
    const currentPage = useGameStore(s => s.currentPage);
    const activeEpisodeId = useGameStore(s => s.activeEpisodeId);
    const episodeData = useGameStore(s => s.episodeData);
    const currentSection = useGameStore(s => s.currentSection);
    const gameStarted = useGameStore(s => s.gameStarted);

    // On render: if user had a game in progress but episodeData is null (page reload),
    // restore it synchronously
    if (currentPage === 'playing' && activeEpisodeId && !episodeData) {
        try {
            const data = loadEpisode(activeEpisodeId);
            useGameStore.setState({ episodeData: data });
            // Return nothing this render — next render will have episodeData
            return null;
        } catch {
            useGameStore.setState({ currentPage: 'home', activeEpisodeId: null });
        }
    }

    // Homepage
    if (currentPage === 'home' || !episodeData) {
        return <HomePage />;
    }

    // Playing an episode
    if (!gameStarted || currentSection === 'intro') {
        return <IntroSection />;
    }
    if (currentSection === 'briefing') {
        return <BriefingSection />;
    }
    return <InvestigationSection />;
}

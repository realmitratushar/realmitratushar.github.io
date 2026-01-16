import React, { useState, useEffect } from 'react';
import HobbyPage from './HobbyPage';
import { MdSportsSoccer, MdSportsCricket, MdSpeed, MdCalendarToday, MdLocationOn, MdClose, MdBarChart, MdGroups, MdRefresh } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

// --- API KEYS & ENDPOINTS ---
const FOOTBALL_KEY = "ab8b426c854c48e4adcba3152431f624";
const CRICKET_KEY = "c5d5390b-575c-460a-95e0-0f9913284afb";

// --- Static Backup Data (Used if API fails or team is off-season) ---
const BACKUP_DATA = {
    CRICKET: [
        {
            id: '137143',
            team: "India",
            logo: "🇮🇳",
            color: "from-blue-600 to-blue-800",
            upcoming: { opponent: "New Zealand", date: "18 Jan 2026", venue: "Eden Gardens", type: "ODI Series" },
            lastResult: { opponent: "Australia", score: "India won by 8 wickets", date: "Past Match" },
            squad: ["Rohit Sharma (c)", "Yashasvi Jaiswal", "Shubman Gill", "Virat Kohli", "Rishabh Pant (wk)", "KL Rahul", "Ravindra Jadeja", "Jasprit Bumrah"],
            // Static Fallback for India 
            isLive: false,
            opponent: "New Zealand",
            date: "18 Jan 2026",
            venue: "Eden Gardens",
            type: "ODI Series",
            score: "Upcoming Series"
        },
        {
            id: '135800',
            team: "Chennai Super Kings",
            logo: "🦁",
            color: "from-yellow-500 to-yellow-600",
            textColor: "text-slate-900",
            upcoming: { opponent: "Mumbai Indians", date: "22 Mar 2026", venue: "Chepauk", type: "IPL 2026 Opener" },
            lastResult: { opponent: "Gujarat Titans", score: "CSK won by 5 wickets", date: "29 May 2025" },
            squad: ["Ruturaj Gaikwad (c)", "MS Dhoni", "Ravindra Jadeja", "Matheesha Pathirana", "Devon Conway", "Shivam Dube"]
        },
        {
            id: '150065',
            team: "Joburg Super Kings",
            logo: "🇿🇦",
            color: "from-yellow-400 to-green-600",
            textColor: "text-slate-900",
            upcoming: { opponent: "Pretoria Capitals", date: "17 Jan 2026", venue: "Wanderers", type: "SA20" },
            lastResult: { opponent: "Durban's Super Giants", score: "JSK won by 15 runs", date: "14 Jan 2026" },
            squad: ["Faf du Plessis (c)", "Moeen Ali", "David Wiese", "Gerald Coetzee", "Nandre Burger", "Reza Hendricks"]
        },
        {
            id: '147495',
            team: "Texas Super Kings",
            logo: "🇺🇸",
            color: "from-yellow-400 to-blue-600",
            textColor: "text-slate-900",
            upcoming: { opponent: "LA Knight Riders", date: "05 Jul 2026", venue: "Grand Prairie", type: "MLC 2026" },
            lastResult: { opponent: "MI New York", score: "TSK lost by 7 runs", date: "28 Jul 2025" },
            squad: ["Faf du Plessis (c)", "Devon Conway", "Mitchell Santner", "Calvin Savage", "Milind Kumar"]
        }
    ],
    FOOTBALL: [
        {
            id: 'miami',
            team: "Inter Miami CF",
            logo: "🦩",
            color: "from-pink-500 to-black",
            upcoming: { opponent: "Pre-season Tour", date: "25 Jan 2026", venue: "Chase Stadium", type: "Friendly" },
            lastResult: { opponent: "LA Galaxy", score: "2 - 1 (Win)", date: "19 Oct 2025" },
            squad: ["Lionel Messi (c)", "Luis Suárez", "Sergio Busquets", "Jordi Alba", "Drake Callender"]
        },
        {
            id: 'barca',
            team: "FC Barcelona",
            logo: "🔵🔴",
            color: "from-blue-700 to-red-700",
            upcoming: { opponent: "Real Sociedad", date: "19 Jan 2026", venue: "Anoeta", type: "La Liga", time: "1:30 AM IST" },
            lastResult: { opponent: "Real Racing Club", score: "2 - 0 (Win)", date: "Yesterday" },
            squad: ["Ter Stegen (c)", "Ronald Araujo", "Pedri", "Gavi", "Lamine Yamal", "Robert Lewandowski"]
        },
        {
            id: 'arg',
            team: "Argentina",
            logo: "🇦🇷",
            color: "from-sky-400 to-white",
            textColor: "text-slate-800",
            upcoming: { opponent: "Spain", date: "27 Mar 2026", venue: "Wembley", type: "Finalissima" },
            lastResult: { opponent: "Uruguay", score: "2 - 0 (Win)", date: "17 Nov 2025" },
            squad: ["Lionel Messi (c)", "Emi Martínez", "Julian Alvarez", "Enzo Fernandez", "Alexis Mac Allister"]
        },
        {
            id: 'spain',
            team: "Spain",
            logo: "🇪🇸",
            color: "from-red-600 to-yellow-400",
            upcoming: { opponent: "Argentina", date: "27 Mar 2026", venue: "Wembley", type: "Finalissima" },
            lastResult: { opponent: "Croatia", score: "1 - 0 (Win)", date: "25 Mar 2026" },
            squad: ["Rodri (c)", "Pedri", "Lamine Yamal", "Nico Williams", "Dani Carvajal", "Unai Simón"]
        }
    ],
    F1: [
        { round: "1", raceName: "Bahrain Grand Prix", date: "2026-03-05", time: "15:00:00Z", Circuit: { circuitName: "Bahrain International Circuit", Location: { country: "Bahrain" } } },
        { round: "2", raceName: "Saudi Arabian Grand Prix", date: "2026-03-12", time: "17:00:00Z", Circuit: { circuitName: "Jeddah Corniche Circuit", Location: { country: "Saudi Arabia" } } },
        { round: "3", raceName: "Australian Grand Prix", date: "2026-03-26", time: "05:00:00Z", Circuit: { circuitName: "Albert Park", Location: { country: "Australia" } } },
        { round: "4", raceName: "Japanese Grand Prix", date: "2026-04-09", time: "05:00:00Z", Circuit: { circuitName: "Suzuka Circuit", Location: { country: "Japan" } } },
        { round: "5", raceName: "Chinese Grand Prix", date: "2026-04-23", time: "07:00:00Z", Circuit: { circuitName: "Shanghai International Circuit", Location: { country: "China" } } },
        { round: "6", raceName: "Miami Grand Prix", date: "2026-05-07", time: "19:30:00Z", Circuit: { circuitName: "Miami International Autodrome", Location: { country: "USA" } } },
        { round: "7", raceName: "Emilia Romagna GP", date: "2026-05-21", time: "13:00:00Z", Circuit: { circuitName: "Imola", Location: { country: "Italy" } } },
        { round: "8", raceName: "Monaco Grand Prix", date: "2026-05-28", time: "13:00:00Z", Circuit: { circuitName: "Circuit de Monaco", Location: { country: "Monaco" } } },
        { round: "9", raceName: "Spanish Grand Prix", date: "2026-06-04", time: "13:00:00Z", Circuit: { circuitName: "Circuit de Barcelona-Catalunya", Location: { country: "Spain" } } },
        { round: "10", raceName: "Canadian Grand Prix", date: "2026-06-18", time: "18:00:00Z", Circuit: { circuitName: "Circuit Gilles Villeneuve", Location: { country: "Canada" } } }
    ]
};

// --- Components ---

const MatchDetailsModal = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] flex flex-col"
            >
                <div className={`p-6 bg-gradient-to-r ${data.color} ${data.textColor || 'text-white'} relative`}>
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"><MdClose size={20} /></button>
                    <div className="flex items-center gap-4">
                        <div className="text-6xl drop-shadow-md">{data.logo}</div>
                        <div>
                            <h2 className="text-2xl font-bold">{data.team}</h2>
                            <p className="opacity-90 text-sm font-medium">{data.status || "Upcoming Match"}</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-slate-800 dark:text-white"><MdBarChart className="text-primary-500" /> Match Info</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                            <div className="grid grid-cols-2 gap-4">
                                <div><div className="text-xs text-slate-500">Opponent</div><div className="font-bold">{data.opponent}</div></div>
                                <div><div className="text-xs text-slate-500">Date/Time</div><div className="font-bold">{data.date}</div></div>
                                <div><div className="text-xs text-slate-500">Venue</div><div className="font-bold">{data.venue}</div></div>
                                <div><div className="text-xs text-slate-500">Scores</div><div className="font-bold">{data.score || "N/A"}</div></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-slate-800 dark:text-white"><MdGroups className="text-primary-500" /> Key Squad</h3>
                        <div className="flex flex-wrap gap-2">
                            {(data.squad || []).map((player, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700">{player}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const MatchCard = ({ data, onClick }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onClick(data)}
        className={`relative overflow-hidden rounded-2xl p-6 shadow-lg bg-gradient-to-br ${data.color} ${data.textColor || 'text-white'} cursor-pointer group`}
    >
        {data.isLive && (
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
            </div>
        )}
        <div className="flex justify-between items-start mb-6">
            <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">{data.logo}</div>
            <div className="text-right mt-1">
                <h3 className="font-bold text-lg leading-tight">{data.team}</h3>
                <span className="text-xs opacity-80 uppercase tracking-wider font-semibold">{data.type || "Match"}</span>
            </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/10 group-hover:bg-white/20 transition-colors">
            {data.isLive ? (
                <div>
                    <p className="text-xs opacity-70 uppercase mb-1 text-red-100 font-bold tracking-wider">MATCH IN PROGRESS</p>
                    <div className="font-bold text-lg mb-1">{data.score}</div>
                    <div className="text-sm opacity-90 font-medium">vs {data.opponent}</div>
                </div>
            ) : (
                <>
                    <p className="text-xs opacity-70 uppercase mb-1 font-bold tracking-wider">Match Details</p>
                    <div className="font-bold text-lg mb-1">{data.opponent}</div>
                    <div className="flex items-center gap-2 text-sm opacity-90"><MdCalendarToday size={14} /><span>{data.date}</span></div>
                </>
            )}
        </div>
        <div className="flex justify-between items-center text-sm border-t border-white/10 pt-3">
            <span className="opacity-70 text-xs uppercase tracking-wide">Status</span>
            <span className="font-medium truncate max-w-[150px] text-right">{data.status}</span>
        </div>
    </motion.div>
);

const F1Section = () => {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchF1 = async () => {
            try {
                // Fetch full season schedule (Using Jolpi mirror which supports CORS better)
                const year = new Date().getFullYear();
                const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}.json`); // Better CORS mirror
                if (!res.ok) throw new Error('Err');
                const d = await res.json();

                const allRaces = d.MRData?.RaceTable?.Races || [];
                const today = new Date();

                // Filter for upcoming races
                const upcoming = allRaces.filter(r => new Date(r.date) >= today);
                setRaces(upcoming.length ? upcoming : allRaces.slice(-3));
                setLoading(false);
            } catch (e) {
                console.warn("F1 Fetch failed, using backup", e);
                // Filtering backup data for upcoming
                const today = new Date();
                const upcomingBackup = (BACKUP_DATA.F1 || []).filter(r => new Date(r.date) >= today);
                setRaces(upcomingBackup);
                setLoading(false);
            }
        };
        fetchF1();
    }, []);

    if (loading) return <div className="text-center p-8 text-slate-500">Loading F1 Schedule...</div>;

    // Show next race as Main Card, subsequent as list
    const mainRace = races[0] || {};
    const otherRaces = races.slice(1, 5);

    return (
        <div className="space-y-8">
            {races.length > 0 && (
                <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-red-600 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-700"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">NEXT GRAND PRIX</span>
                                <span className="opacity-70 text-sm font-medium">Round {mainRace.round}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black italic mb-2 tracking-tight">{mainRace.raceName}</h2>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-xl opacity-90"><MdLocationOn /><span>{mainRace.Circuit?.circuitName}, {mainRace.Circuit?.Location?.country}</span></div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center min-w-[200px] border border-white/10 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <p className="text-sm opacity-70 uppercase tracking-widest mb-1 font-bold">RACE DAY</p>
                            <div className="text-3xl font-bold">{new Date(mainRace.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                            <div className="text-xl opacity-80 font-mono">{mainRace.time ? mainRace.time.slice(0, 5) + ' UTC' : 'TBA'}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Upcoming Schedule List */}
            {otherRaces.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><MdCalendarToday className="text-primary-600" /> Upcoming Races</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {otherRaces.map(r => (
                            <div key={r.round} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <div>
                                    <div className="font-bold text-slate-800 dark:text-slate-200">{r.raceName}</div>
                                    <div className="text-xs text-slate-500">{r.Circuit?.Location?.country}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono text-sm font-bold text-primary-600">{new Date(r.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                                    <div className="text-xs text-slate-400">Round {r.round}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Simple Red Bull Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border-l-4 border-yellow-400 shadow-xl">
                <div className="flex justify-between items-start mb-4">
                    <div><h3 className="text-2xl font-bold">Red Bull Racing</h3><p className="text-slate-400 text-sm">Constructors' Champions</p></div>
                    <div className="text-2xl">🐂</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 rounded-lg text-center"><span className="block text-xs text-slate-400 mb-1">Max Verstappen</span><span className="font-bold text-yellow-400">#1</span></div>
                    <div className="p-3 bg-white/5 rounded-lg text-center"><span className="block text-xs text-slate-400 mb-1">Sergio Perez</span><span className="font-bold text-yellow-400">#11</span></div>
                </div>
            </div>
        </div>
    );
};

const Sports = () => {
    const [activeTab, setActiveTab] = useState('cricket');
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [cricketData, setCricketData] = useState([]);
    const [footballData, setFootballData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Cricket Data from Real API
    const fetchCricket = async () => {
        try {
            // 1. Try to fetch Upcoming Matches (Schedule)
            const scheduleRes = await fetch(`https://api.cricapi.com/v1/matches?apikey=${CRICKET_KEY}&offset=0`);
            const scheduleJson = await scheduleRes.json();

            // 2. Try to fetch Current/Live Matches
            const currentRes = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${CRICKET_KEY}&offset=0`);
            const currentJson = await currentRes.json();

            // Merge valid data from both endpoints
            const allMatches = [
                ...(scheduleJson.data || []),
                ...(currentJson.data || [])
            ];

            // Map our favorite teams to the API data
            const teams = BACKUP_DATA.CRICKET.map(backup => {
                if (!allMatches.length) {
                    // Fallback to purely static data if API returns empty
                    return {
                        ...backup,
                        status: backup.upcoming ? "Scheduled" : "Off Season",
                        date: backup.upcoming?.date || "TBA",
                        opponent: backup.upcoming?.opponent || "TBA",
                        type: backup.upcoming?.type || "Match"
                    };
                }

                // Find a match involving this team
                // Priority: Live > Scheduled > Recently Ended
                const teamMatches = allMatches.filter(m =>
                    m.name && (m.name.toLowerCase().includes(backup.team.toLowerCase()) ||
                        (m.teamInfo && m.teamInfo.some(t => t.name.includes(backup.team))))
                );

                const liveMatch = teamMatches.find(m => m.matchStarted && !m.matchEnded);
                const futureMatch = teamMatches.find(m => !m.matchStarted && m.status !== "Match ended");
                const pastMatch = teamMatches.find(m => m.matchEnded);

                const match = liveMatch || futureMatch || pastMatch;

                if (match) {
                    return {
                        ...backup,
                        isLive: match.matchStarted && !match.matchEnded,
                        score: match.score ? `${match.score[0]?.r}/${match.score[0]?.w} (${match.score[0]?.o} ov)` : (match.status || "Scheduled"),
                        opponent: match.name.replace(backup.team, '').replace('vs', '').replace('-', '').trim() || "TBA",
                        date: match.date || "TBA",
                        venue: match.venue || "TBA",
                        status: match.status || "Scheduled",
                        type: match.matchType || "Match"
                    };
                }

                // If no dynamic match found, use Backup with explicitly "Scheduled" status from static data
                return {
                    ...backup,
                    status: backup.upcoming ? "Scheduled" : "Off Season",
                    date: backup.upcoming ? backup.upcoming.date : "TBA",
                    opponent: backup.upcoming ? backup.upcoming.opponent : "TBA",
                    type: backup.upcoming ? backup.upcoming.type : "Upcoming"
                };
            });
            setCricketData(teams);
        } catch (e) {
            console.error("Cricket API Error", e);
            // Fallback to purely static data if fetch fails
            setCricketData(BACKUP_DATA.CRICKET.map(backup => ({
                ...backup,
                status: backup.upcoming ? "Scheduled" : "Off Season",
                date: backup.upcoming.date,
                opponent: backup.upcoming.opponent
            })));
        }
    };

    // Fetch Football Data from Real API
    const fetchFootball = async () => {
        try {
            // Note: Free tier Football API has strict CORS. We might need a proxy or backend.
            // For client-side, we try directly. safely handle CORS errors.

            // Get date range: Today - 3 days to Today + 7 days
            const today = new Date();
            const fromDate = new Date(today);
            fromDate.setDate(today.getDate() - 3);
            const toDate = new Date(today);
            toDate.setDate(today.getDate() + 7);

            const dateFromStr = fromDate.toISOString().split('T')[0];
            const dateToStr = toDate.toISOString().split('T')[0];

            const res = await fetch(`https://api.football-data.org/v4/matches?dateFrom=${dateFromStr}&dateTo=${dateToStr}`, {
                headers: { 'X-Auth-Token': FOOTBALL_KEY }
            });
            if (!res.ok) throw new Error('CORS or API Error');
            const json = await res.json();

            const teams = BACKUP_DATA.FOOTBALL.map(backup => {
                if (!json.matches) {
                    // Fallback Logic:
                    // For Barcelona, user specifically wants the Upcoming match (Real Sociedad) to be visible.
                    // For others like Miami, Upcoming is also good.
                    // We prioritize 'Upcoming' over 'Last Result' for the main card display unless it's live.
                    return {
                        ...backup,
                        status: "Scheduled",
                        date: backup.upcoming ? backup.upcoming.date : (backup.lastResult ? backup.lastResult.date : "TBA"),
                        opponent: backup.upcoming ? backup.upcoming.opponent : (backup.lastResult ? backup.lastResult.opponent : "TBA"),
                        type: backup.upcoming ? backup.upcoming.type : "Match"
                    };
                }

                // Smart Search (e.g., search for 'Barcelona' in homeTeam or awayTeam names)
                const match = json.matches.find(m =>
                    m.homeTeam.name.toLowerCase().includes(backup.team.toLowerCase().replace('fc ', '').replace('inter ', '')) ||
                    m.awayTeam.name.toLowerCase().includes(backup.team.toLowerCase().replace('fc ', '').replace('inter ', ''))
                );

                if (match) {
                    const isLive = match.status === 'IN_PLAY' || match.status === 'PAUSED';
                    const opponent = match.homeTeam.name.toLowerCase().includes(backup.team.toLowerCase().replace('fc ', '')) ? match.awayTeam.name : match.homeTeam.name;
                    return {
                        ...backup,
                        isLive,
                        score: match.score.fullTime.home !== null ? `${match.score.fullTime.home} - ${match.score.fullTime.away}` : "vs",
                        opponent,
                        date: new Date(match.utcDate).toLocaleDateString(),
                        venue: match.competition.name || "League Match",
                        status: match.status,
                        type: match.competition.name
                    };
                }
                // No live/recent match found in API for this team.
                // Fallback: Prioritize Upcoming for everyone (especially Barcelona).
                // Ensure we use the flattened properties expected by MatchCard.
                const useLocalData = backup.upcoming || backup.lastResult;

                return {
                    ...backup,
                    status: backup.upcoming ? "Scheduled (Backup)" : "Recent Result",
                    date: useLocalData?.date || "TBA",
                    opponent: useLocalData?.opponent || "TBA",
                    type: useLocalData?.type || "Match",
                    score: backup.upcoming ? "vs" : (backup.lastResult?.score || "vs")
                };
            });
            setFootballData(teams);
        } catch (e) {
            console.error("Football Fetch Error", e);
            // On Error (CORS), clean fallback to rich backup data. Use map to ensure new array ref.
            setFootballData(BACKUP_DATA.FOOTBALL.map(t => {
                // Priority: Upcoming > Last Result
                // User wants to see the Real Sociedad match for Barcelona
                const useLocalData = t.upcoming || t.lastResult;

                return {
                    ...t,
                    status: t.upcoming ? "Scheduled (Offline)" : "Recent Result",
                    date: useLocalData?.date || "TBA",
                    opponent: useLocalData?.opponent || "TBA",
                    type: useLocalData?.type || "Match",
                    score: t.upcoming ? "vs" : (t.lastResult?.score || "vs")
                };
            }));
        }
    };

    const loadData = async (type) => {
        setLoading(true);
        if (type === 'cricket') await fetchCricket();
        if (type === 'football') await fetchFootball();
        setLoading(false);
    };

    useEffect(() => {
        if (activeTab === 'cricket' && cricketData.length === 0) loadData('cricket');
        if (activeTab === 'football' && footballData.length === 0) loadData('football');

        // Auto-Refresh API Data every 60 seconds
        const refreshInterval = setInterval(() => {
            if (activeTab !== 'f1') {
                loadData(activeTab);
            }
        }, 60000);

        return () => clearInterval(refreshInterval);
    }, [activeTab]);


    const tabs = [
        { id: 'cricket', label: 'Cricket', icon: <MdSportsCricket /> },
        { id: 'football', label: 'Football', icon: <MdSportsSoccer /> },
        { id: 'f1', label: 'Formula 1', icon: <MdSpeed /> },
    ];

    return (
        <HobbyPage title="The Stadium" icon={MdSportsSoccer}>
            <div className="max-w-6xl mx-auto min-h-screen">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    Live Dashboard. Powered by real-time API integrations with intelligent simulation backup.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                    {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab.id ? 'bg-primary-600 text-white shadow-lg scale-105' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>{tab.icon}{tab.label}</button>
                    ))}
                </div>

                <div className="flex justify-end mb-4">
                    {activeTab !== 'f1' && (
                        <button onClick={() => loadData(activeTab)} className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline"><MdRefresh size={16} className={loading ? "animate-spin" : ""} /> Refresh Live Data</button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                        {loading ? <div className="flex justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div> : (
                            <>
                                {activeTab === 'cricket' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">{cricketData.map(t => <MatchCard key={t.id} data={t} onClick={setSelectedMatch} />)}</div>}
                                {activeTab === 'football' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">{footballData.map(t => <MatchCard key={t.id} data={t} onClick={setSelectedMatch} />)}</div>}
                                {activeTab === 'f1' && <F1Section />}
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    {selectedMatch && <MatchDetailsModal data={selectedMatch} onClose={() => setSelectedMatch(null)} />}
                </AnimatePresence>
            </div>
        </HobbyPage>
    );
};

export default Sports;

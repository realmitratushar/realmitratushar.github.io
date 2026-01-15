import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const WeatherBackground = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userCoords, setUserCoords] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    // Local time fallback
    const currentHour = new Date().getHours();
    const isLocalNight = currentHour < 6 || currentHour > 18;

    useEffect(() => {
        let isMounted = true;
        let safetyTimer = null;

        if (!navigator.geolocation) {
            if (isMounted) { setError("N/A"); setLoading(false); }
            return;
        }

        safetyTimer = setTimeout(() => {
            if (isMounted && loading) setLoading(false);
        }, 4000);

        const geoOptions = { enableHighAccuracy: false, timeout: 3500, maximumAge: 60000 };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                if (!isMounted) return;
                clearTimeout(safetyTimer);

                const { latitude, longitude } = position.coords;
                setUserCoords({ latitude, longitude });

                try {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=kmh&_t=${Date.now()}`);
                    if (!response.ok) throw new Error(`${response.status}`);
                    const data = await response.json();
                    if (isMounted) setWeatherData(data);
                } catch (err) {
                    if (isMounted) setError(err.message);
                } finally {
                    if (isMounted) setLoading(false);
                }
            },
            (err) => {
                if (!isMounted) return;
                clearTimeout(safetyTimer);
                setLoading(false);
            },
            geoOptions
        );

        return () => { isMounted = false; if (safetyTimer) clearTimeout(safetyTimer); };
    }, []);

    // --- Logic ---
    const currentWeather = weatherData?.current_weather;
    const apiIsDay = currentWeather?.is_day;
    const isDay = apiIsDay !== undefined ? apiIsDay === 1 : !isLocalNight;
    const code = currentWeather?.weathercode;
    const windSpeed = currentWeather?.windspeed || 0;

    const getWeatherType = (code, windSpeed) => {
        if (code === undefined) return isDay ? 'sunny' : 'clear-night';

        // Severe / Special
        if (code === 96 || code === 99) return 'hail'; // Hail
        if (code >= 95) return 'stormy';
        if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snowy';
        if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rainy';

        if (windSpeed >= 25) return 'windy'; // Slightly higher threshold for distinct windy mode

        if (code === 2 || code === 3 || code === 45 || code === 48) return 'cloudy';
        if (code === 0 || code === 1) return isDay ? 'sunny' : 'clear-night';

        return isDay ? 'sunny' : 'clear-night';
    };

    const type = getWeatherType(code, windSpeed);

    // --- Auto-Theme Switching ---
    useEffect(() => {
        const root = window.document.documentElement;
        // Dark Mode Conditions: Night OR Stormy/Hail/Rainy/Snowy
        const shouldBeDark = !isDay || ['stormy', 'hail', 'rainy', 'snowy'].includes(type);

        if (shouldBeDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDay, type]);

    // --- Visual Components ---

    const Sun = () => (
        <div className="absolute top-10 right-10 pointer-events-none">
            <motion.div
                className="w-24 h-24 bg-yellow-400 rounded-full blur-xl opacity-80"
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity }}
            />
            {/* Sun Rays / Glare */}
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-yellow-200/20 rounded-full blur-3xl" />
        </div>
    );

    const Moon = () => (
        <div className="absolute top-10 right-10 w-20 h-20 pointer-events-none">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
            <div className="w-full h-full bg-slate-200 rounded-full shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.5)] overflow-hidden relative">
                <div className="absolute top-4 left-5 w-4 h-4 bg-slate-400/30 rounded-full" />
                <div className="absolute bottom-6 right-4 w-6 h-6 bg-slate-400/30 rounded-full" />
            </div>
        </div>
    );

    const Star = ({ delay, top, left }) => (
        <motion.div
            className="absolute bg-white rounded-full shadow-[0_0_3px_white]"
            style={{ top, left, width: Math.random() * 2 + 1, height: Math.random() * 2 + 1 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay }}
        />
    );

    const Cloud = ({ top, left, scale, speed = 25, isNight = false }) => (
        <motion.div
            className={`absolute rounded-full blur-xl ${isNight ? 'bg-slate-700/40' : 'bg-white/70'}`}
            style={{ width: 180 * scale, height: 80 * scale, top, left }}
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
        />
    );

    const RainDrop = () => (
        <motion.div
            className="absolute w-[1.5px] h-6 bg-blue-400/60"
            style={{ left: `${Math.random() * 100}%`, top: -30 }}
            animate={{ top: '100vh' }}
            transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
        />
    );

    const SnowFlake = () => (
        <motion.div
            className="absolute w-2 h-2 bg-white/90 rounded-full blur-[0.5px]"
            style={{ left: `${Math.random() * 100}%`, top: -10 }}
            animate={{ top: '100vh', x: [-15, 15, -15], rotate: 360 }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        />
    );

    const HailStone = () => (
        <motion.div
            className="absolute w-2.5 h-2.5 bg-blue-50/90 rounded-full border border-blue-200/50 shadow-sm"
            style={{ left: `${Math.random() * 100}%`, top: -10 }}
            animate={{ top: '100vh' }}
            transition={{ duration: 0.3 + Math.random() * 0.2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
        />
    );

    const WindLine = () => (
        <motion.div
            className="absolute h-[2px] bg-white/30 rounded-full blur-[0.5px]"
            style={{ width: 100 + Math.random() * 200, top: `${Math.random() * 100}%`, left: -300 }}
            animate={{ left: '100vw' }}
            transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "linear", delay: Math.random() * 3 }}
        />
    );

    const LightningFlash = () => (
        <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0, 0.4, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: Math.random() * 4 + 4 }}
        />
    );

    // --- Strict Color Logic ---
    const getBgStyle = () => {
        if (!isDay) {
            // NIGHT: Always Black/Dark
            if (type === 'stormy' || type === 'hail') return 'bg-gradient-to-b from-gray-950 to-black'; // Pitch black
            if (type === 'snowy') return 'bg-[#0B1026]'; // Dark Navy
            return 'bg-black'; // Standard Night
        }

        // DAY: Varies from White -> Dark
        switch (type) {
            case 'sunny': return 'bg-gradient-to-b from-sky-300 to-white'; // Bright
            case 'cloudy': return 'bg-gradient-to-b from-slate-300 to-slate-100'; // Grayish
            case 'windy': return 'bg-gradient-to-b from-slate-300 to-slate-100'; // Light Gray
            // Restored Darker backgrounds for atmosphere, as they now trigger Dark Mode (White Text)
            case 'rainy': return 'bg-gradient-to-b from-slate-600 to-slate-400'; // Moody Dark
            case 'stormy': return 'bg-gradient-to-b from-slate-800 to-slate-600'; // Severe Dark
            case 'hail': return 'bg-gradient-to-b from-slate-700 to-slate-500'; // Cold Dark
            case 'snowy': return 'bg-gradient-to-b from-[#e2e8f0] to-white'; // Cold White
            default: return 'bg-sky-100';
        }
    };

    return (
        <div className={`fixed inset-0 z-[-1] overflow-hidden transition-colors duration-1000 ${getBgStyle()}`}>

            {/* --- CELESTIAL BODIES --- */}
            {isDay && type === 'sunny' && <Sun />}

            {!isDay && (
                <>
                    <Moon />
                    {[...Array(80)].map((_, i) => <Star key={i} top={`${Math.random() * 100}%`} left={`${Math.random() * 100}%`} delay={Math.random() * 5} />)}
                </>
            )}

            {/* --- WEATHER LAYERS --- */}

            {/* CLOUDS: Present in Cloudy, Windy, Rainy, Stormy, Hail */}
            {(['cloudy', 'windy', 'rainy', 'stormy', 'hail'].includes(type)) && (
                <>
                    <Cloud top="10%" left="5%" scale={1.2} speed={type === 'windy' ? 20 : 50} isNight={!isDay} />
                    <Cloud top="20%" left="40%" scale={1.5} speed={type === 'windy' ? 15 : 45} isNight={!isDay} />
                    <Cloud top="50%" left="20%" scale={1.0} speed={type === 'windy' ? 25 : 60} isNight={!isDay} />
                    <Cloud top="15%" left="80%" scale={1.2} speed={type === 'windy' ? 18 : 40} isNight={!isDay} />
                    {/* Extra clouds for Storm/Rain */}
                    {['rainy', 'stormy', 'hail'].includes(type) && (
                        <>
                            <Cloud top="5%" left="60%" scale={1.4} isNight={!isDay} />
                            <Cloud top="30%" left="10%" scale={1.3} isNight={!isDay} />
                        </>
                    )}
                </>
            )}

            {/* WIND */}
            {(!shouldReduceMotion && (type === 'windy' || type === 'stormy' || type === 'hail')) &&
                [...Array(type === 'windy' ? 15 : 8)].map((_, i) => <WindLine key={i} />)
            }

            {/* RAIN */}
            {(!shouldReduceMotion && (type === 'rainy' || type === 'stormy')) &&
                [...Array(100)].map((_, i) => <RainDrop key={i} />)
            }

            {/* HAIL */}
            {(!shouldReduceMotion && type === 'hail') &&
                [...Array(80)].map((_, i) => <HailStone key={i} />)
            }

            {/* SNOW */}
            {(!shouldReduceMotion && type === 'snowy') &&
                [...Array(60)].map((_, i) => <SnowFlake key={i} />)
            }

            {/* STORM LIGHTNING */}
            {(!shouldReduceMotion && (type === 'stormy' || type === 'hail')) && <LightningFlash />}

            {/* DEBUG INFO */}
            <div className={`absolute bottom-4 right-4 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border ${isDay ? 'bg-black/10 text-slate-700 border-black/10' : 'bg-white/10 text-white/70 border-white/10'}`}>
                {loading ? '...' : (
                    error ? `Err` :
                        `Loc:${userCoords?.latitude?.toFixed(2)},${userCoords?.longitude?.toFixed(2)} | ${type.toUpperCase()} | ${isDay ? 'DAY' : 'NIGHT'}`
                )}
            </div>
        </div>
    );
};

export default WeatherBackground;

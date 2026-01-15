import React from 'react';
import HobbyPage from './HobbyPage';
import { MdFlight, MdLocationOn } from 'react-icons/md';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import travelData from '../../data/travel.json';
import { motion } from 'framer-motion';

// Fix for default marker icon in Leaflet with React
// Using standard red marker
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapSection = ({ title, locations }) => {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <MdLocationOn className="text-red-500" />
                {title}
            </h2>
            <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 z-0">
                <MapContainer
                    center={[22.5937, 78.9629]} // Center of India
                    zoom={4}
                    scrollWheelZoom={true}
                    className="h-full w-full z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            position={[location.lat, location.lng]}
                            icon={redIcon}
                        >
                            <Popup>
                                <div className="text-center p-1">
                                    <h3 className="font-bold text-base m-0">{location.name}</h3>
                                    <p className="text-sm text-slate-500 m-0 mt-1">{location.description}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

const Travel = () => {
    return (
        <HobbyPage title="Travel" icon={MdFlight}>
            <div className="max-w-6xl mx-auto">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    Traveling opens up new perspectives and creates unforgettable memories.
                    Here's a visual journey of where I've been and where I dream of going.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <MapSection title="Places that I have Visited" locations={travelData.visited} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <MapSection title="My Travel Bucket List" locations={travelData.bucketList} />
                </motion.div>
            </div>
        </HobbyPage>
    );
};

export default Travel;

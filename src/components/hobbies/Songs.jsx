import React from 'react';
import HobbyPage from './HobbyPage';
import { MdMusicNote } from 'react-icons/md';

const Songs = () => {
    return (
        <HobbyPage title="Songs" icon={MdMusicNote}>
            <p>My playlist favorites...</p>
        </HobbyPage>
    );
};

export default Songs;

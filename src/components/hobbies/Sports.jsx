import React from 'react';
import HobbyPage from './HobbyPage';
import { MdSportsSoccer } from 'react-icons/md';

const Sports = () => {
    return (
        <HobbyPage title="Sports" icon={MdSportsSoccer}>
            <p>Sports I follow and play...</p>
        </HobbyPage>
    );
};

export default Sports;

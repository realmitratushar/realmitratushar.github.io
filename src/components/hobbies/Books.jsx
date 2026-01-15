import React from 'react';
import HobbyPage from './HobbyPage';
import { MdBook } from 'react-icons/md';

const Books = () => {
    return (
        <HobbyPage title="Books" icon={MdBook}>
            <p>Books I've read and recommend...</p>
        </HobbyPage>
    );
};

export default Books;

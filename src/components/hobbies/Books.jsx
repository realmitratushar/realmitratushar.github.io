import React, { useState } from 'react';
import HobbyPage from './HobbyPage';
import { MdBook, MdCheckCircle, MdPlayCircle, MdBookmark, MdStar } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA SOURCE (Headless CMS Proxy) ---
const LIBRARY = {
    reading: [
        {
            id: 'r1',
            title: "The Art of War",
            author: "Sun Tzu",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630683326i/10534.jpg",
            rating: 4.5
        },
        {
            id: 'r2',
            title: "Salman Khan: Sultan of Bollywood",
            author: "Mohar Basu",
            cover: "https://m.media-amazon.com/images/I/71WQggzfGwL._SL1500_.jpg",
            rating: 4
        },
        {
            id: 'r3',
            title: "Good Economics for Hard Times",
            author: "Abhijit Banerjee",
            cover: "https://images-na.ssl-images-amazon.com/images/P/9391165990.01.LZZZZZZZ.jpg",
            rating: 4
        },
        {
            id: 'r4',
            title: "Mein Kampf",
            author: "Adolf Hitler",
            cover: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/book/q/c/6/-original-imagxnfaepqzzht3.jpeg?q=90",
            rating: 0
        },
        {
            id: 'r5',
            title: "Wings of Fire",
            author: "A.P.J. Abdul Kalam",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1588286863i/634583.jpg",
            rating: 0
        }
    ],
    completed: [
        {
            id: 'c20',
            title: "Tuesdays with Morrie",
            author: "Mitch Albom",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1423763749i/6900.jpg",
            rating: 5
        },
        {
            id: 'c1',
            title: "Ikigai",
            author: "Héctor García",
            cover: "https://images.randomhouse.com/cover/9780143130727",
            rating: 5
        },
        {
            id: 'c2',
            title: "Life's Amazing Secrets",
            author: "Gaur Gopal Das",
            cover: "https://covers.openlibrary.org/b/isbn/9780143442295-L.jpg",
            rating: 5
        },
        {
            id: 'c3',
            title: "Attitude is Everything",
            author: "Jeff Keller",
            cover: "https://m.media-amazon.com/images/I/41F8ATXoMOL._SY445_SX342_.jpg",
            rating: 4.5
        },
        {
            id: 'c4',
            title: "Rich Dad Poor Dad",
            author: "Robert Kiyosaki",
            cover: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
            rating: 5
        },
        {
            id: 'c5',
            title: "The Diary of a Young Girl",
            author: "Anne Frank",
            cover: "https://covers.openlibrary.org/b/isbn/9780385480338-L.jpg",
            rating: 5
        },
        {
            id: 'c6',
            title: "A Tale of Two Cities",
            author: "Charles Dickens",
            cover: "https://covers.openlibrary.org/b/isbn/9780451530578-L.jpg",
            rating: 5
        },
        {
            id: 'c7',
            title: "A Christmas Carol",
            author: "Charles Dickens",
            cover: "https://covers.openlibrary.org/b/isbn/9780553212440-L.jpg",
            rating: 5
        },
        {
            id: 'c8',
            title: "Strange Case of Dr Jekyll and Mr Hyde",
            author: "Robert Louis Stevenson",
            cover: "https://covers.openlibrary.org/b/isbn/9780486266886-L.jpg",
            rating: 5
        },
        {
            id: 'c9',
            title: "Kabuliwala",
            author: "Rabindranath Tagore",
            cover: "https://covers.openlibrary.org/b/isbn/9780140188547-L.jpg",
            rating: 5
        },
        {
            id: 'c10',
            title: "Robinson Crusoe",
            author: "Daniel Defoe",
            cover: "https://covers.openlibrary.org/b/isbn/9780140430073-L.jpg",
            rating: 5
        },
        {
            id: 'c11',
            title: "Treasure Island",
            author: "Robert Louis Stevenson",
            cover: "https://covers.openlibrary.org/b/isbn/9780141192451-L.jpg",
            rating: 5
        },
        {
            id: 'c12',
            title: "The Three Musketeers",
            author: "Alexandre Dumas",
            cover: "https://covers.openlibrary.org/b/isbn/9780143105008-L.jpg",
            rating: 5
        },
        {
            id: 'c13',
            title: "David Copperfield",
            author: "Charles Dickens",
            cover: "https://covers.openlibrary.org/b/isbn/9780140439441-L.jpg",
            rating: 5
        },
        {
            id: 'c14',
            title: "Around the World in Eighty Days",
            author: "Jules Verne",
            cover: "https://covers.openlibrary.org/b/isbn/9780241468654-L.jpg",
            rating: 5
        },
        {
            id: 'c15',
            title: "The Invisible Man",
            author: "H.G. Wells",
            cover: "https://covers.openlibrary.org/b/isbn/9780198702672-L.jpg",
            rating: 5
        },
        {
            id: 'c16',
            title: "The Jungle Book",
            author: "Rudyard Kipling",
            cover: "https://covers.openlibrary.org/b/isbn/9780141325293-L.jpg",
            rating: 5
        },
        {
            id: 'c17',
            title: "The Call of the Wild",
            author: "Jack London",
            cover: "https://covers.openlibrary.org/b/isbn/9780241341490-L.jpg",
            rating: 5
        },
        {
            id: 'c18',
            title: "Oliver Twist",
            author: "Charles Dickens",
            cover: "https://covers.openlibrary.org/b/isbn/9780141439747-L.jpg",
            rating: 5
        },
        {
            id: 'c19',
            title: "How I Taught My Grandmother to Read",
            author: "Sudha Murty",
            cover: "https://covers.openlibrary.org/b/isbn/9780143333647-L.jpg",
            rating: 5
        }
    ],
    wishlist: [
        {
            id: 'w1',
            title: "Talk Like TED",
            author: "Carmine Gallo",
            cover: "https://covers.openlibrary.org/b/isbn/9781250061539-L.jpg"
        },
        {
            id: 'w2',
            title: "The 4-Hour Work Week",
            author: "Timothy Ferriss",
            cover: "https://covers.openlibrary.org/b/isbn/9780307465351-L.jpg"
        },
        {
            id: 'w3',
            title: "Dracula",
            author: "Bram Stoker",
            cover: "https://covers.openlibrary.org/b/isbn/9780141196886-L.jpg"
        },
        {
            id: 'w4',
            title: "The Godfather",
            author: "Mario Puzo",
            cover: "https://covers.openlibrary.org/b/isbn/9780451205766-L.jpg"
        },
        {
            id: 'w6',
            title: "Why I Killed Gandhi",
            author: "Nathuram Godse",
            cover: "https://images-na.ssl-images-amazon.com/images/P/9355715927.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w7',
            title: "Days at the Morisaki Bookshop",
            author: "Satoshi Yagisawa",
            cover: "https://covers.openlibrary.org/b/isbn/9780063278677-L.jpg"
        },
        {
            id: 'w8',
            title: "Midnight’s Children",
            author: "Salman Rushdie",
            cover: "https://covers.openlibrary.org/b/isbn/9780812976533-L.jpg"
        },
        {
            id: 'w9',
            title: "Malgudi Days",
            author: "R.K. Narayan",
            cover: "https://covers.openlibrary.org/b/isbn/9780143039655-L.jpg"
        },
        {
            id: 'w10',
            title: "Gitanjali",
            author: "Rabindranath Tagore",
            cover: "https://covers.openlibrary.org/b/isbn/9781513215907-L.jpg"
        },
        {
            id: 'w11',
            title: "The Red Sari",
            author: "Javier Moro",
            cover: "https://images-na.ssl-images-amazon.com/images/P/9351941035.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w12',
            title: "The Satanic Verses",
            author: "Salman Rushdie",
            cover: "https://covers.openlibrary.org/b/isbn/9780812976717-L.jpg"
        },

        {
            id: 'w14',
            title: "The Lost River: On The Trail of the Sarasvati",
            author: "Michel Danino",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0143068644.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w15',
            title: "Our Moon Has Blood Clots",
            author: "Rahul Pandita",
            cover: "https://covers.openlibrary.org/b/isbn/818400513X-L.jpg"
        },
        {
            id: 'w16',
            title: "Land of the Seven Rivers",
            author: "Sanjeev Sanyal",
            cover: "https://covers.openlibrary.org/b/isbn/9780143420934-L.jpg"
        },
        {
            id: 'w17',
            title: "How Prime Ministers Decide",
            author: "Neerja Chowdhury",
            cover: "https://images-na.ssl-images-amazon.com/images/P/9390652456.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w18',
            title: "Half Lion: How P.V. Narasimha Rao Transformed India",
            author: "Vinay Sitapati",
            cover: "https://covers.openlibrary.org/b/isbn/9780670088225-L.jpg"
        },
        {
            id: 'w19',
            title: "Jugalbandi: The BJP Before Modi",
            author: "Vinay Sitapati",
            cover: "https://covers.openlibrary.org/b/isbn/0670091073-L.jpg"
        },
        {
            id: 'w20',
            title: "10 Judgements That Changed India",
            author: "Zia Mody",
            cover: "https://covers.openlibrary.org/b/isbn/9780670086627-L.jpg"
        },
        {
            id: 'w21',
            title: "Train to Pakistan",
            author: "Khushwant Singh",
            cover: "https://covers.openlibrary.org/b/isbn/9780143065883-L.jpg"
        },
        {
            id: 'w22',
            title: "Glimpses of World History",
            author: "Jawaharlal Nehru",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0143031058.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w23',
            title: "Connect The Dots",
            author: "Rashmi Bansal",
            cover: "https://covers.openlibrary.org/b/isbn/9788190453028-L.jpg"
        },
        {
            id: 'w24',
            title: "The Bose Deception: Declassified",
            author: "Anuj Dhar",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0670097276.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w25',
            title: "Tiananmen Square: The Making of a Protest",
            author: "Vijay Gokhale",
            cover: "https://images-na.ssl-images-amazon.com/images/P/9354225357.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w26',
            title: "How India Manages Its National Security",
            author: "Arvind Gupta",
            cover: "https://covers.openlibrary.org/b/isbn/9780670090686-L.jpg"
        },
        {
            id: 'w27',
            title: "Broken Promises: Caste, Crime and Politics in Bihar",
            author: "Mrityunjay Sharma",
            cover: "https://images-na.ssl-images-amazon.com/images/P/B0CW59MQFY.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w28',
            title: "The Emergency: A Personal History",
            author: "Coomi Kapoor",
            cover: "https://covers.openlibrary.org/b/isbn/9780670087587-L.jpg"
        },
        {
            id: 'w29',
            title: "Democracy, Interrupted: The Emergency 1975-77",
            author: "Sanjaya Baru (Intro)",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0670092754.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w30',
            title: "Indus Basin Uninterrupted",
            author: "Uttam Kumar Sinha",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0143460501.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w31',
            title: "Why Bharat Matters",
            author: "S. Jaishankar",
            cover: "https://images-na.ssl-images-amazon.com/images/P/B0CQHJCVSQ.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w32',
            title: "Through the Broken Glass",
            author: "T.N. Seshan",
            cover: "https://images-na.ssl-images-amazon.com/images/P/B0C5MYB388.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w33',
            title: "Bose: The Untold Story",
            author: "Chandrachur Ghose",
            cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1639216059i/59799838.jpg"
        },
        {
            id: 'w34',
            title: "Ayodhya: 6 December 1992",
            author: "P. V. Narasimha Rao",
            cover: "https://covers.openlibrary.org/b/isbn/9780670058587-L.jpg"
        },
        {
            id: 'w35',
            title: "Devdas",
            author: "Sarat Chandra Chattopadhyay",
            cover: "https://covers.openlibrary.org/b/isbn/9780143029267-L.jpg"
        },
        {
            id: 'w36',
            title: "Chuni Hui Kavitayein",
            author: "Atal Bihari Vajpayee",
            cover: "https://images-na.ssl-images-amazon.com/images/P/9350481634.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w37',
            title: "Gora",
            author: "Rabindranath Tagore",
            cover: "https://covers.openlibrary.org/b/isbn/9788171677559-L.jpg"
        },
        {
            id: 'w38',
            title: "Chokher Bali",
            author: "Rabindranath Tagore",
            cover: "https://covers.openlibrary.org/b/isbn/9788184003048-L.jpg"
        },
        {
            id: 'w39',
            title: "Short Stories from Rabindranath Tagore",
            author: "Rabindranath Tagore",
            cover: "https://covers.openlibrary.org/b/isbn/9780140449839-L.jpg"
        },
        {
            id: 'w40',
            title: "Mansarovar",
            author: "Premchand",
            cover: "https://images-na.ssl-images-amazon.com/images/P/9389225841.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w41',
            title: "Godan",
            author: "Premchand",
            cover: "https://covers.openlibrary.org/b/isbn/9788172242190-L.jpg"
        },
        {
            id: 'w42',
            title: "Gaban",
            author: "Premchand",
            cover: "https://covers.openlibrary.org/b/isbn/9788122311969-L.jpg"
        },
        {
            id: 'w43',
            title: "Madhushala",
            author: "Harivansh Rai Bachchan",
            cover: "https://covers.openlibrary.org/b/isbn/9788170283447-L.jpg"
        },
        {
            id: 'w44',
            title: "Karmayogi: A Biography of E. Sreedharan",
            author: "M.S. Ashokan",
            cover: "https://covers.openlibrary.org/b/isbn/9780143425304-L.jpg"
        },
        {
            id: 'w45',
            title: "I Too Had a Dream",
            author: "Verghese Kurien",
            cover: "https://covers.openlibrary.org/b/isbn/9788174364074-L.jpg"
        },
        {
            id: 'w46',
            title: "India's Power Elite: Caste, Class and Cultural Revolution",
            author: "Sanjaya Baru",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0670092444.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w47',
            title: "The Accidental Prime Minister",
            author: "Sanjaya Baru",
            cover: "https://covers.openlibrary.org/b/isbn/9780143424062-L.jpg"
        },
        {
            id: 'w48',
            title: "A New Cold War: Henry Kissinger and the Rise of China",
            author: "Sanjaya Baru and Rahul Sharma",
            cover: "https://images-na.ssl-images-amazon.com/images/P/935422718X.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w49',
            title: "Why Nations Fail",
            author: "Daron Acemoglu and James A. Robinson",
            cover: "https://covers.openlibrary.org/b/isbn/0307719219-L.jpg"
        },
        {
            id: 'w50',
            title: "The Rise and Fall of the Great Powers",
            author: "Paul Kennedy",
            cover: "https://covers.openlibrary.org/b/isbn/9780679720195-L.jpg"
        },
        {
            id: 'w51',
            title: "Bade Ghar Ki Beti",
            author: "Premchand",
            cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1600843765i/55432581.jpg"
        },
        {
            id: 'w52',
            title: "Parineeta",
            author: "Sarat Chandra Chattopadhyay",
            cover: "https://covers.openlibrary.org/b/isbn/9780143033561-L.jpg"
        },
        {
            id: 'w53',
            title: "Pather Dabi: The Right of Way",
            author: "Sarat Chandra Chattopadhyay",
            cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1264024130i/2381078.jpg"
        },
        {
            id: 'w54',
            title: "Charitraheen",
            author: "Sarat Chandra Chattopadhyay",
            cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1683393714i/150209910.jpg"
        },
        {
            id: 'w55',
            title: "Srikanta",
            author: "Sarat Chandra Chattopadhyay",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0143066471.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w56',
            title: "Nirmala",
            author: "Premchand",
            cover: "https://covers.openlibrary.org/b/isbn/9780195658262-L.jpg"
        },
        {
            id: 'w57',
            title: "Shatranj ke Khiladi",
            author: "Premchand",
            cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1361789355i/6092681.jpg"
        },
        {
            id: 'w58',
            title: "Chhelebela",
            author: "Rabindranath Tagore",
            cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1502176110i/2426632.jpg"
        },
        {
            id: 'w59',
            title: "The Kite Runner",
            author: "Khaled Hosseini",
            cover: "https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg"
        },
        {
            id: 'w60',
            title: "Nithalle Ki Diary",
            author: "Harishankar Parsai",
            cover: "https://images-na.ssl-images-amazon.com/images/P/8126713046.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w61',
            title: "The Master and Margarita",
            author: "Mikhail Bulgakov",
            cover: "https://covers.openlibrary.org/b/isbn/9780143108276-L.jpg"
        },
        {
            id: 'w62',
            title: "War and Peace",
            author: "Leo Tolstoy",
            cover: "https://covers.openlibrary.org/b/isbn/9780140444179-L.jpg"
        },
        {
            id: 'w63',
            title: "Anna Karenina",
            author: "Leo Tolstoy",
            cover: "https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg"
        },
        {
            id: 'w64',
            title: "Notes from Underground",
            author: "Fyodor Dostoevsky",
            cover: "https://covers.openlibrary.org/b/isbn/9780140455120-L.jpg"
        },
        {
            id: 'w65',
            title: "White Nights",
            author: "Fyodor Dostoevsky",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0241252083.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w66',
            title: "The Brothers Karamazov",
            author: "Fyodor Dostoevsky",
            cover: "https://covers.openlibrary.org/b/isbn/9780140449242-L.jpg"
        },
        {
            id: 'w67',
            title: "Crime and Punishment",
            author: "Fyodor Dostoevsky",
            cover: "https://covers.openlibrary.org/b/isbn/9780143107637-L.jpg"
        },
        {
            id: 'w68',
            title: "Man's Search for Meaning",
            author: "Viktor Frankl",
            cover: "https://covers.openlibrary.org/b/isbn/9780807014271-L.jpg"
        },
        {
            id: 'w69',
            title: "The Dragons of Eden",
            author: "Carl Sagan",
            cover: "https://covers.openlibrary.org/b/isbn/9780345346292-L.jpg"
        },
        {
            id: 'w70',
            title: "Pale Blue Dot",
            author: "Carl Sagan",
            cover: "https://covers.openlibrary.org/b/isbn/9780345376596-L.jpg"
        },

        {
            id: 'w72',
            title: "The White Tiger",
            author: "Aravind Adiga",
            cover: "https://covers.openlibrary.org/b/isbn/9781416562603-L.jpg"
        },
        {
            id: 'w73',
            title: "The Kaoboys of R&AW",
            author: "B. Raman",
            cover: "https://covers.openlibrary.org/b/isbn/9780979617430-L.jpg"
        },
        {
            id: 'w74',
            title: "Deewar Mein Ek Khirki Rehti Thi",
            author: "Vinod Kumar Shukla",
            cover: "https://images-na.ssl-images-amazon.com/images/P/939282078X.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w75',
            title: "Beyond Good and Evil",
            author: "Friedrich Nietzsche",
            cover: "https://covers.openlibrary.org/b/isbn/9780140449235-L.jpg"
        },
        {
            id: 'w76',
            title: "The Metamorphosis",
            author: "Franz Kafka",
            cover: "https://covers.openlibrary.org/b/isbn/9780553213690-L.jpg"
        },
        {
            id: 'w77',
            title: "And Then There Were None",
            author: "Agatha Christie",
            cover: "https://covers.openlibrary.org/b/isbn/9780062073471-L.jpg"
        },
        {
            id: 'w78',
            title: "Pachinko",
            author: "Min Jin Lee",
            cover: "https://covers.openlibrary.org/b/isbn/9781455563920-L.jpg"
        },
        {
            id: 'w79',
            title: "The Boy in the Striped Pajamas",
            author: "John Boyne",
            cover: "https://covers.openlibrary.org/b/isbn/9780385751537-L.jpg"
        },
        {
            id: 'w80',
            title: "2 States",
            author: "Chetan Bhagat",
            cover: "https://covers.openlibrary.org/b/isbn/9788129115300-L.jpg"
        },
        {
            id: 'w81',
            title: "The 3 Mistakes of My Life",
            author: "Chetan Bhagat",
            cover: "https://covers.openlibrary.org/b/isbn/9788129135513-L.jpg"
        },
        {
            id: 'w82',
            title: "Half Girlfriend",
            author: "Chetan Bhagat",
            cover: "https://covers.openlibrary.org/b/isbn/9788129135728-L.jpg"
        },
        {
            id: 'w83',
            title: "Wise and Otherwise",
            author: "Sudha Murty",
            cover: "https://covers.openlibrary.org/b/isbn/9780143062226-L.jpg"
        },
        {
            id: 'w84',
            title: "Three Thousand Stitches",
            author: "Sudha Murty",
            cover: "https://covers.openlibrary.org/b/isbn/9780143440055-L.jpg"
        },
        {
            id: 'w85',
            title: "The Subtle Art of Not Giving a F*ck",
            author: "Mark Manson",
            cover: "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg"
        },
        {
            id: 'w86',
            title: "Everything Is F*cked",
            author: "Mark Manson",
            cover: "https://covers.openlibrary.org/b/isbn/9780062888433-L.jpg"
        },
        {
            id: 'w87',
            title: "More Days at the Morisaki Bookshop",
            author: "Satoshi Yagisawa",
            cover: "https://covers.openlibrary.org/b/isbn/9780063278714-L.jpg"
        },
        {
            id: 'w88',
            title: "In Search Of Schrodinger's Cat",
            author: "John Gribbin",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0553342533.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w89',
            title: "India Since Independence",
            author: "Bipan Chandra",
            cover: "https://images-na.ssl-images-amazon.com/images/P/0143104098.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w90',
            title: "The Innovator's Dilemma",
            author: "Clayton Christensen",
            cover: "https://covers.openlibrary.org/b/isbn/9780066620695-L.jpg"
        },
        {
            id: 'w91',
            title: "The Tyranny of Merit",
            author: "Michael Sandel",
            cover: "https://covers.openlibrary.org/b/isbn/9780374289980-L.jpg"
        },
        {
            id: 'w92',
            title: "I Came Upon a Lighthouse",
            author: "Shantanu Naidu",
            cover: "https://covers.openlibrary.org/b/isbn/9789390327522-L.jpg"
        },

        {
            id: 'w94',
            title: "The Interpretation of Dreams",
            author: "Sigmund Freud",
            cover: "https://images-na.ssl-images-amazon.com/images/P/1609422406.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w95',
            title: "Kuchh Ishq Kiya Kuchh Kaam Kiya",
            author: "Piyush Mishra",
            cover: "https://covers.openlibrary.org/b/isbn/9788126728435-L.jpg"
        },

        {
            id: 'w97',
            title: "Saaye Mein Dhoop",
            author: "Dushyant Kumar",
            cover: "https://covers.openlibrary.org/b/isbn/9788171197941-L.jpg"
        },
        {
            id: 'w98',
            title: "Raat Pashmine Ki",
            author: "Gulzar",
            cover: "https://covers.openlibrary.org/b/isbn/9788129102249-L.jpg"
        },
        {
            id: 'w99',
            title: "Bahurani",
            author: "Rabindranath Tagore",
            cover: "https://images-na.ssl-images-amazon.com/images/P/9390183839.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w100',
            title: "A Brief Tour Of Higher Consciousness",
            author: "Itzhak Bentov",
            cover: "https://covers.openlibrary.org/b/isbn/9780892818143-L.jpg"
        },
        {
            id: 'w101',
            title: "Freakonomics",
            author: "Steven Levitt & Stephen Dubner",
            cover: "https://covers.openlibrary.org/b/isbn/9780060731328-L.jpg"
        },
        {
            id: 'w102',
            title: "Misbehaving",
            author: "Richard Thaler",
            cover: "https://covers.openlibrary.org/b/isbn/9780393352795-L.jpg"
        },
        {
            id: 'w103',
            title: "The Undercover Economist",
            author: "Tim Harford",
            cover: "https://covers.openlibrary.org/b/isbn/9780345494016-L.jpg"
        },
        {
            id: 'w104',
            title: "Greenlights",
            author: "Matthew McConaughey",
            cover: "https://covers.openlibrary.org/b/isbn/9780593139134-L.jpg"
        },
        {
            id: 'w105',
            title: "Cinema Speculation",
            author: "Quentin Tarantino",
            cover: "https://covers.openlibrary.org/b/isbn/9780063112582-L.jpg"
        },
        {
            id: 'w106',
            title: "Tumhari Auqaat Kya Hai",
            author: "Piyush Mishra",
            cover: "https://images-na.ssl-images-amazon.com/images/P/9395737824.01.LZZZZZZZ.jpg"
        },
        {
            id: 'w107',
            title: "Source Code",
            author: "Bill Gates",
            cover: "https://covers.openlibrary.org/b/isbn/9780593801581-L.jpg"
        },
        {
            id: 'w108',
            title: "Physics of the Future",
            author: "Michio Kaku",
            cover: "https://covers.openlibrary.org/b/isbn/9780385530804-L.jpg"
        }
    ]
};

const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4 hover:shadow-md transition-shadow"
    >
        <div className={`p-3 rounded-full ${color.bg} ${color.text}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
            <p className="text-2xl font-bold text-black dark:text-white">{value}</p>
        </div>
    </motion.div>
);

const BookGrid = ({ books }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative flex flex-col"
            >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 bg-slate-200 dark:bg-slate-700">
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-slate-100', 'dark:bg-slate-800');
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="text-white w-full">
                            <span className="text-sm font-semibold truncate block">{book.title}</span>
                            <span className="text-xs text-slate-300 truncate block">{book.author}</span>

                        </div>
                    </div>
                </div>
                {/* Fallback info below card for mobile or clarity */}
                <div className="mt-3 md:hidden">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{book.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{book.author}</p>
                </div>
            </motion.div>
        ))}
    </div>
);

const Books = () => {
    const [activeTab, setActiveTab] = useState('reading');

    const tabs = [
        { id: 'reading', label: 'Currently Reading', icon: MdPlayCircle },
        { id: 'completed', label: 'Completed', icon: MdCheckCircle },
        { id: 'wishlist', label: 'Want to Read', icon: MdBookmark },
    ];

    const stats = {
        reading: LIBRARY.reading.length,
        completed: LIBRARY.completed.length,
        wishlist: LIBRARY.wishlist.length
    };

    return (
        <HobbyPage title="The Digital Shelf" icon={MdBook}>
            <div className="mb-12 min-h-screen">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    A curated collection of thoughts on paper. Tracking my journey through pages, chapters, and ideas.
                </p>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        icon={MdPlayCircle}
                        label="Currently Reading"
                        value={stats.reading}
                        color={{ bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' }}
                    />
                    <StatCard
                        icon={MdCheckCircle}
                        label="Completed"
                        value={stats.completed}
                        color={{ bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' }}
                    />
                    <StatCard
                        icon={MdBookmark}
                        label="Want to Read"
                        value={stats.wishlist}
                        color={{ bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' }}
                    />
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-4 border-b border-slate-200 dark:border-slate-700 mb-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'reading' && <BookGrid books={LIBRARY.reading} />}
                        {activeTab === 'completed' && <BookGrid books={LIBRARY.completed} />}
                        {activeTab === 'wishlist' && <BookGrid books={LIBRARY.wishlist} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </HobbyPage>
    );
};

export default Books;

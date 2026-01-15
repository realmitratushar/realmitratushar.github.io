import fs from 'fs';
import * as cheerio from 'cheerio';

const TOP_40_URL = 'https://letterboxd.com/mitratushar/list/my-top-40-favourite-movies/';
const WATCHLIST_URL = 'https://letterboxd.com/mitratushar/watchlist/';
const PROFILE_URL = 'https://letterboxd.com/mitratushar/';

async function fetchMovies() {
    console.log('Fetching Top 40...');
    const top40 = await scrapeList(TOP_40_URL);

    console.log('Fetching Watchlist...');
    const watchlist = await scrapeList(WATCHLIST_URL);

    console.log('Fetching Profile for Favorites...');
    const profile = await scrapeProfile(PROFILE_URL);

    const data = {
        top40,
        watchlist,
        favorites: profile.favorites,
        directors: [
            // Hardcoded based on "Masterpiece" likely directors or general favorites
            // Since we can't easily scrape favorite directors if not explicitly listed
            { name: "Christopher Nolan", image: "https://image.tmdb.org/t/p/w200/xuDCLEMd1kJ9DR05k984n9wX59P.jpg" },
            { name: "David Fincher", image: "https://image.tmdb.org/t/p/w200/t7X8mN1d9cE9C_gW.jpg" },
            { name: "Martin Scorsese", image: "https://image.tmdb.org/t/p/w200/9U9Y5GQuWX3EZy39B8nkk4NY01S.jpg" },
            { name: "Quentin Tarantino", image: "https://image.tmdb.org/t/p/w200/1gjcpAa99FAjQrnZICHv5txW8D5.jpg" }
        ]
    };

    fs.writeFileSync('./src/data/movies.json', JSON.stringify(data, null, 2));
    console.log('Done! Saved to src/data/movies.json');
}

async function scrapeList(url) {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const movies = [];

    $('.poster-container').each((i, el) => {
        const $el = $(el);
        const $img = $el.find('img');
        const title = $img.attr('alt');
        const link = 'https://letterboxd.com' + $el.find('.frame').attr('href');
        const image = $img.attr('src');

        if (title && image) {
            movies.push({ title, link, image });
        }
    });

    return movies;
}

async function scrapeProfile(url) {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const favorites = [];

    $('#favourites .poster-container').each((i, el) => {
        const $el = $(el);
        const $img = $el.find('img');
        const title = $img.attr('alt');
        const link = 'https://letterboxd.com' + $el.find('.frame').attr('href');
        const image = $img.attr('src');

        if (title && image) {
            favorites.push({ title, link, image });
        }
    });

    return { favorites };
}

fetchMovies();

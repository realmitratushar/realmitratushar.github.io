import fs from 'fs';
import * as cheerio from 'cheerio';
import { setTimeout } from 'timers/promises';

const TOP_40_URL = 'https://letterboxd.com/mitratushar/list/my-top-40-favourite-movies/';
const WATCHLIST_URL = 'https://letterboxd.com/mitratushar/watchlist/';

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

async function scrapeList(url) {
    console.log(`Fetching list: ${url}`);
    try {
        const res = await fetch(url, { headers: HEADERS });
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
        const html = await res.text();
        const $ = cheerio.load(html);
        const movies = [];

        $('.poster-container').each((i, el) => {
            const $el = $(el);
            const $img = $el.find('img');
            const title = $img.attr('alt');
            const linkRel = $el.find('.frame').attr('href'); // e.g., /film/parasite/
            const link = 'https://letterboxd.com' + linkRel;
            const image = $img.attr('src');

            if (title && image && linkRel) {
                movies.push({ title, link, image, linkRel });
            }
        });
        console.log(`Found ${movies.length} movies in list.`);
        return movies;
    } catch (error) {
        console.error(`Error scraping list ${url}:`, error);
        return [];
    }
}

async function getDirector(movieUrl) {
    try {
        // console.log(`Fetching director for ${movieUrl}...`);
        const res = await fetch(movieUrl, { headers: HEADERS });
        const html = await res.text();
        const $ = cheerio.load(html);

        // Director usually in .directorlist a
        const directorEl = $('.directorlist a').first();
        const name = directorEl.text().trim();
        const slug = directorEl.attr('href'); // /director/name/
        const link = slug ? 'https://letterboxd.com' + slug : null;

        return { name, link };
    } catch (error) {
        console.error(`Error fetching director for ${movieUrl}:`, error);
        return { name: 'Unknown', link: null };
    }
}

async function getDirectorImage(directorUrl) {
    if (!directorUrl) return null;
    try {
        const res = await fetch(directorUrl, { headers: HEADERS });
        const html = await res.text();
        const $ = cheerio.load(html);

        // Open Graph image usually works for person
        const image = $('meta[property="og:image"]').attr('content');
        return image;
    } catch (error) {
        return null;
    }
}

async function main() {
    console.log("Starting scrape...");

    // 1. Get Top 40
    let top40 = await scrapeList(TOP_40_URL);

    // 2. Get Directors for Top 40
    const directorCounts = {};
    const directorLinks = {};

    console.log("Fetching details for Top 40 movies...");
    for (const movie of top40) {
        await setTimeout(100); // Polite delay
        const director = await getDirector(movie.link);
        if (director.name && director.name !== 'Unknown') {
            directorCounts[director.name] = (directorCounts[director.name] || 0) + 1;
            if (!directorLinks[director.name]) {
                directorLinks[director.name] = director.link;
            }
            // movie.director = director.name; // Optional: add to movie object
        }
    }

    // 3. Compute Top 5 Directors
    const sortedDirectors = Object.entries(directorCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by count desc
        .slice(0, 5);

    const topDirectors = [];
    console.log("Fetching images for Top 5 Directors...");
    for (const [name, count] of sortedDirectors) {
        const link = directorLinks[name];
        // console.log(`Feature: ${name} (${count} movies)`);
        const image = await getDirectorImage(link);
        topDirectors.push({ name, image, count, link });
    }

    // 4. Get Watchlist
    const watchlist = await scrapeList(WATCHLIST_URL);

    const data = {
        top40: top40.map(({ linkRel, ...rest }) => rest), // Clean up
        watchlist: watchlist.map(({ linkRel, ...rest }) => rest),
        directors: topDirectors,
        lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync('./src/data/movies.json', JSON.stringify(data, null, 2));
    console.log('Success! Data saved to src/data/movies.json');
}

main();

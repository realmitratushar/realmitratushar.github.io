import fs from 'fs';
import * as cheerio from 'cheerio';
import { setTimeout } from 'timers/promises';

const RAW_DATA_PATH = './src/data/movies_raw.json';
const OUTPUT_PATH = './src/data/movies.json';

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

async function getDirector(movieUrl) {
    try {
        const res = await fetch(movieUrl, { headers: HEADERS });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const html = await res.text();
        const $ = cheerio.load(html);

        // Director selector on movie page: .directorlist a
        // Metadata: meta[name="twitter:data1"] (value) if twitter:label1 is Director
        // Or structured data

        let name = $('.directorlist a').first().text().trim();
        let slug = $('.directorlist a').first().attr('href'); // /director/name/

        if (!name) {
            // Fallback to meta tags
            const label1 = $('meta[name="twitter:label1"]').attr('content');
            if (label1 === 'Director') {
                name = $('meta[name="twitter:data1"]').attr('content');
            }
        }

        const link = slug ? 'https://letterboxd.com' + slug : null;

        return { name, link };
    } catch (error) {
        // console.error(`Error fetching director for ${movieUrl}:`, error.message);
        return { name: 'Unknown', link: null };
    }
}

async function getDirectorImage(directorUrl) {
    if (!directorUrl) return null;
    try {
        const res = await fetch(directorUrl, { headers: HEADERS });
        if (!res.ok) return null;
        const html = await res.text();
        const $ = cheerio.load(html);

        // Person page og:image
        // <meta property="og:image" content="..." />
        const image = $('meta[property="og:image"]').attr('content');
        return image;
    } catch (error) {
        return null;
    }
}

async function main() {
    console.log("Reading raw data...");
    const rawData = JSON.parse(fs.readFileSync(RAW_DATA_PATH, 'utf8'));
    const { favouriteMovies, watchlist } = rawData;

    console.log(`Processing ${favouriteMovies.length} movies for directors...`);

    const directorCounts = {};
    const directorLinks = {}; // Name -> Link

    // Limit concurrency or sequential
    // Sequential to be safe
    for (const [index, movie] of favouriteMovies.entries()) {
        process.stdout.write(`Fetching ${index + 1}/${favouriteMovies.length}: ${movie.title}... `);
        const { name, link } = await getDirector(movie.link);
        console.log(name);

        if (name && name !== 'Unknown') {
            directorCounts[name] = (directorCounts[name] || 0) + 1;
            if (link && !directorLinks[name]) {
                directorLinks[name] = link;
            }
        }
        movie.director = name; // Add to movie object
        await setTimeout(200); // 200ms delay
    }

    // Top 5 Directors
    const sortedDirectors = Object.entries(directorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    console.log("Top 5 Directors:", sortedDirectors.map(d => d[0]));

    const topDirectors = [];
    for (const [name, count] of sortedDirectors) {
        const link = directorLinks[name];
        const image = await getDirectorImage(link);
        topDirectors.push({ name, image, count, link });
        await setTimeout(100);
    }

    const finalData = {
        top40: favouriteMovies,
        watchlist: watchlist,
        directors: topDirectors,
        lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData, null, 2));
    console.log("Done! Saved to", OUTPUT_PATH);
}

main();

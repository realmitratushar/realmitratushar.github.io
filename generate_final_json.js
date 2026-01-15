import fs from 'fs';

const RAW_DATA_PATH = './src/data/movies_raw.json';
const OUTPUT_PATH = './src/data/movies.json';

const directors = [
    {
        name: "Steven Spielberg",
        image: "https://media.themoviedb.org/t/p/w300_and_h450_face/tZxcg19YQ3e8fJ0pOs7hjlnmmr6.jpg",
        count: 4
    },
    {
        name: "Sooraj Barjatya",
        image: "https://media.themoviedb.org/t/p/w300_and_h450_face/cayLTtN2H1ErYFySfznPkYGOdhA.jpg",
        count: 3
    },
    {
        name: "Hrishikesh Mukherjee",
        image: "https://media.themoviedb.org/t/p/w300_and_h450_face/xkOnk17E4blhoueBN2imPDFByTo.jpg",
        count: 3
    },
    {
        name: "Christopher Nolan",
        image: "https://image.tmdb.org/t/p/original/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg",
        count: 3
    },
    {
        name: "Rajkumar Hirani",
        image: "https://media.themoviedb.org/t/p/w300_and_h450_face/wNnmF3mzG7kyaTYuFr5uMpHIJSw.jpg",
        count: 2
    },
    {
        name: "James Cameron",
        image: "https://media.themoviedb.org/t/p/w300_and_h450_face/9NAZnTjBQ9WcXAQEzZpKy4vdQto.jpg",
        count: 1
    },
    {
        name: "Shakti Samanta",
        image: "https://media.themoviedb.org/t/p/w300_and_h450_face/fJ1bVZVl9qdLOzdyXgApEaUjNVK.jpg",
        count: 1
    },
    {
        name: "Basu Chatterjee",
        image: "https://media.themoviedb.org/t/p/w300_and_h450_face/kwTfesvc5Zjv3rZalK2D8t7S5wy.jpg",
        count: 1
    }
];

const manualPosters = {
    "Saajan (1991)": "https://image.tmdb.org/t/p/original/wg4WBjFhYZeLaaQhE3NeFyfTn2Y.jpg",
    "1942: A Love Story (1994)": "https://image.tmdb.org/t/p/original/nWJj37l6rIrpegYGoobLtdHOqV6.jpg",
    "Kati Patang (1971)": "https://image.tmdb.org/t/p/original/sTLOmWeGw8xQh08zF7E5OAA76t1.jpg",
    "Bhool Bhulaiyaa (2007)": "https://image.tmdb.org/t/p/original/qxQzavDrdBYGZVenGNHKXm6QLaL.jpg",
    "The Truman Show (1998)": "https://image.tmdb.org/t/p/original/vuza0WqY239yBXOadKlGwJsZJFE.jpg"
};

function main() {
    console.log("Reading raw data...");
    const rawData = JSON.parse(fs.readFileSync(RAW_DATA_PATH, 'utf8'));

    // Patch missing images in Top 40
    if (rawData.favouriteMovies) {
        rawData.favouriteMovies = rawData.favouriteMovies.map(movie => {
            if (manualPosters[movie.title]) {
                return { ...movie, image: manualPosters[movie.title] };
            }
            return movie;
        });
    }

    // Add directors to Top 40 if matching (optional, for completeness if UI uses it in future)
    // For now, UI only uses global directors list.

    const finalData = {
        top40: rawData.favouriteMovies,
        watchlist: rawData.watchlist,
        directors: directors,
        lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData, null, 2));
    console.log("Done! Saved to", OUTPUT_PATH);
}

main();

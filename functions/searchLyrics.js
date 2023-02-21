import { request } from "undici";

const apiURL = "https://api.vinndev.me/lyrics";

export async function searchLyrics(query) {
    if (!String(query)) throw "at here! query as string for search the lyrics can not be empty.";

    query = String(query).split(" ").join("+");

    query = await request(`${apiURL}/search?q=${query}`, { method: 'GET' }).catch(console.error);

    if (query && query.statusCode === 200) {
        return (
            query = await query.body.json().catch(console.error)
        );
    }
}
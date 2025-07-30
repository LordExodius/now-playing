// pages/api/user/[uid].tsx

import { renderToStaticMarkup } from "react-dom/server";
import BasicCard from "../../../components/BasicCard"; // Adjust the import path as necessary
import type { NextApiRequest, NextApiResponse } from "next";

const Profile = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid } = req.query;

    const result = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${uid}&api_key=${process.env.LASTFM_API_KEY}&format=json`);
    const jsonData = await result.json();

    if (jsonData.error) {
        console.error(`Error fetching data for user ID ${uid}:`, jsonData.message);
        res.status(500).json({ error: jsonData.message });
        return;
    }

    // Render the BasicCard component with user data
    const cardSvg = renderToStaticMarkup(BasicCard({
        nowPlaying: jsonData.recenttracks.track[0]["@attr"]?.nowplaying || false,
        trackTitle: jsonData.recenttracks.track[0].name,
        artist: jsonData.recenttracks.track[0].artist["#text"],
        album: jsonData.recenttracks.track[0].album["#text"],
        imageUrl: jsonData.recenttracks.track[0].image[2]["#text"]
    }));

    res.setHeader("content-type", "image/svg+xml");
    res.status(200).send(cardSvg);
}

export default Profile;
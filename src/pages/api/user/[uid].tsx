// pages/api/user/[uid].tsx

import { renderToStaticMarkup } from "react-dom/server";
import BasicCard from "@components/BasicCard"; // Adjust the import path as necessary
import type { NextApiRequest, NextApiResponse } from "next";

// serverside function to convert image URL to base64
async function convertImageUrlToBase64(imageUrl: string): Promise<string> {
    try {
        const response = await fetch(imageUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString('base64');
        
        // Determine the content type from the response headers
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        
        return `data:${contentType};base64,${base64}`;
    } catch (error) {
        console.error('Error converting image URL to base64:', error);
        return '';
    }
}

const Profile = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid } = req.query;

    const result = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${uid}&api_key=${process.env.LASTFM_API_KEY}&format=json`);
    const jsonData = await result.json();

    if (jsonData.error) {
        console.error(`Error fetching data for user ID ${uid}:`, jsonData.message);
        res.status(500).json({ error: jsonData.message });
        return;
    }

    // Convert the image URL to base64
    const imageUrl = jsonData.recenttracks.track[0].image[2]["#text"];
    const base64Image = await convertImageUrlToBase64(imageUrl);

    // render BasicCard component with user data
    const cardSvg = renderToStaticMarkup(BasicCard({
        nowPlaying: jsonData.recenttracks.track[0]["@attr"]?.nowplaying || false,
        trackTitle: jsonData.recenttracks.track[0].name,
        artist: jsonData.recenttracks.track[0].artist["#text"],
        album: jsonData.recenttracks.track[0].album["#text"],
        imageUrl: base64Image || imageUrl // Use base64 if available, fallback to original URL
    }, true));

    res.setHeader("content-type", "image/svg+xml");
    res.status(200).send(cardSvg);
}

export default Profile;
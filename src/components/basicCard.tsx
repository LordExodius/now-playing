// Component for the basic card layout

const CARD_WIDTH = 300;
const CARD_HEIGHT = 150;

interface MusicData {
    title: string;
    artist: string;
    album: string;
    imageUrl: string;
    }

const BasicCard = ( musicData: MusicData ) => {
    return (
        <div style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
            <img src={musicData.imageUrl} alt={`${musicData.title} album cover`} />
            <h2>{musicData.title}</h2>
            <p>{musicData.artist}</p>
            <p>{musicData.album}</p>
        </div>
    );
}
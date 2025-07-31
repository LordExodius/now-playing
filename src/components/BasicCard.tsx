// Component for the basic card layout

const CARD_WIDTH = 300;
const CARD_HEIGHT = 80;
const DARK_GREY = "#2c2e31"
const MIDDLE_GREY = "#a7a7a0"
const LIGHT_GREY = "#646669"
const OFF_WHITE = "#d1d0c5"

interface MusicData {
    nowPlaying: boolean;
    trackTitle: string;
    artist: string;
    album: string;
    imageUrl: string;
    }

const BasicCard = ( musicData: MusicData ) => {
    const svgProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        viewBox: `0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`,
        role: "img",
    }

    const nowPlayingStyle = {
        fontFamily: "Arial, sans-serif",
        fontSize: "10px",
        fill: MIDDLE_GREY,
    };

    const titleStyle = {
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        fill: OFF_WHITE,
        fontWeight: "bold",
    };

    const artistStyle = {
        fontFamily: "Arial, sans-serif",
        fontSize: "10px",
        fill: OFF_WHITE,
    };

    const albumStyle = {
        fontFamily: "Arial, sans-serif",
        fontSize: "10px",
        fill: MIDDLE_GREY,
    };

    return (
        <svg {...svgProps}>
            <defs>
                <style>
                </style>
            </defs>

            <rect 
                width="100%" 
                height="100%" 
                fill={DARK_GREY}
                rx="10"/>

            {/* Album Art */}
            <image 
                href={musicData.imageUrl} 
                x="10" 
                y="10" 
                width="60" 
                height="60"
                clip-path="inset(0% round 5px)"/>

            {/* Now Playing / Recently Played */}
            <circle cx="85" cy="15" r="4" fill={musicData.nowPlaying ? "#40ce1cff" : "#c43131ff"} />
            <text x="95" y="19" {...nowPlayingStyle}>{musicData.nowPlaying ? "Now Playing:" : "Recently Played:"}</text>

            {/* Track Information */}
            <text x="80" y="37" {...titleStyle}>{musicData.trackTitle}</text>
            <text x="80" y="52" {...artistStyle}>by {musicData.artist}</text>
            <text x="80" y="67" {...albumStyle}>from {musicData.album}</text>

        </svg>
    );
}

export default BasicCard;
import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const SongPlayer = ({ url, isAutoPlay, layout }) => {
    return (
        <AudioPlayer
            src={url}
            autoPlay={isAutoPlay}
            loop
            showJumpControls={false}
            layout={layout}
            onPlay={e => console.log("onPlay")}
        />
    );
}

export default SongPlayer;
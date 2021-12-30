import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useGlobal } from '../globalstore';

const SongPlayer = ({ src, isAutoPlay, layout, recordId }) => {
    const [globalState, globalActions] = useGlobal();
    return (
        <AudioPlayer
            src={src}
            autoPlay={isAutoPlay}
            loop
            showJumpControls={false}
            layout={layout}
            onPlay={e => recordId && globalActions.incrementPlayCount(recordId)}
        />
    );
}

export default SongPlayer;
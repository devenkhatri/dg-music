import React from 'react';
import { useGlobal } from '../globalstore';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const SongPlayer = ({ playList, playIndex, autoPlay }) => {
    const [globalState, globalActions] = useGlobal();
    return (
        <ReactJkMusicPlayer
            glassBg
            preload
            showMediaSession
            clearPriorAudioLists
            remove={false}
            mode='full'
            showDownload={false}
            spaceBar={true}
            defaultPosition={{
                top: 80,
                left: 10,
            }}
            audioLists={playList}
            autoPlay={autoPlay}
            playIndex={playIndex || 0}
            onAudioPlay={(audioInfo) => { audioInfo.recordId && globalActions.incrementPlayCountAirtable(audioInfo.recordId) }}
        />
    );
}

export default SongPlayer;
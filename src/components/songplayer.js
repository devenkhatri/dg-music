import React from 'react';
import { useGlobal } from '../globalstore';
import './songplayer.css'
import { isBrowser } from '../utils'
import { Grid, Segment, Sticky } from 'semantic-ui-react';
import Marquee from "react-fast-marquee";

const SongPlayer = ({ playList, playIndex, autoPlay }) => {
    const [globalState, globalActions] = useGlobal();
    return (
        <Segment raised inverted className='SongsWrapper'>
            {/* {isBrowser &&
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
                        left: '80%',
                    }}
                    audioLists={playList}
                    autoPlay={false}
                    playIndex={playIndex || 0}
                    onAudioPlay={(audioInfo) => { audioInfo.recordId && globalActions.incrementPlayCountAirtable(audioInfo.recordId) }}
                />
            } */}
            <audio
                src={playList[playIndex]?.musicSrc}
                preload
                autoPlay={autoPlay}
                controls
                loop
                className='songplayer'
                onPlay={()=>{console.log("******* nowplyaing ",playList[playIndex].name);playList[playIndex] && globalActions.incrementPlayCountAirtable(playList[playIndex].recordId)}}
            />
            <Marquee pauseOnHover gradient={false}>{playList[playIndex] ? playList[playIndex].name : 'No Song Selected'}</Marquee>
        </Segment>
    );
}

export default SongPlayer;